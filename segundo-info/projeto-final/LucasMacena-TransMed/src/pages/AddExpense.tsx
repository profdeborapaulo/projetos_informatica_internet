import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Save, MapPin } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { useExpenses } from "@/hooks/useExpenses";
import { useUserSettings } from "@/hooks/useUserSettings";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface GeoapifyFeature {
  properties: {
    formatted: string;
    lat: number;
    lon: number;
  };
}

export default function AddExpense() {
  const [date, setDate] = useState<Date>(new Date());
  const [type, setType] = useState("Carro");
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [calculating, setCalculating] = useState(false);
  const [distanceInfo, setDistanceInfo] = useState<{ km: number; text: string } | null>(null);
  const [geoapifyApiKey, setGeoapifyApiKey] = useState<string>("");
  const [originCoords, setOriginCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [destCoords, setDestCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [originSuggestions, setOriginSuggestions] = useState<GeoapifyFeature[]>([]);
  const [destSuggestions, setDestSuggestions] = useState<GeoapifyFeature[]>([]);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);
  const navigate = useNavigate();
  const { addExpense } = useExpenses();
  const { settings } = useUserSettings();
  const { toast } = useToast();

  // Address aliases for quick access
  const addressAliases: Record<string, string> = {
    "ETEC Antonio Furlan": "ETEC Antônio Furlan, Bauru, SP",
    "etec antonio furlan": "ETEC Antônio Furlan, Bauru, SP",
    "etec furlan": "ETEC Antônio Furlan, Bauru, SP",
    "etec": "ETEC Antônio Furlan, Bauru, SP",
  };

  // Fetch Geoapify API Key
  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("get-geoapify-key");
        if (error) throw error;
        setGeoapifyApiKey(data.apiKey);
      } catch (error) {
        console.error("Error fetching Geoapify API key:", error);
        toast({
          title: "Erro ao carregar API de mapas",
          description: "Não foi possível carregar a integração de mapas.",
          variant: "destructive",
        });
      }
    };
    fetchApiKey();
  }, []);

  // Fetch Geoapify autocomplete suggestions
  const fetchSuggestions = async (text: string, setSuggestions: (suggestions: GeoapifyFeature[]) => void) => {
    if (!text || !geoapifyApiKey || text.length < 3) {
      setSuggestions([]);
      return;
    }

    // Check if text matches an alias
    const aliasMatch = addressAliases[text.toLowerCase()];
    const searchText = aliasMatch || text;

    try {
      const url = new URL('https://api.geoapify.com/v1/geocode/autocomplete');
      url.searchParams.append('text', searchText);
      url.searchParams.append('apiKey', geoapifyApiKey);
      url.searchParams.append('lang', 'pt');

      const response = await fetch(url.toString());
      const data = await response.json();

      if (data.features) {
        // If it was an alias match, automatically select the first result
        if (aliasMatch && data.features.length > 0) {
          setSuggestions([data.features[0]]);
        } else {
          setSuggestions(data.features);
        }
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  // Calculate amount for bus and train based on quantity
  useEffect(() => {
    if (type === "Ônibus" && settings?.bus_price) {
      const calculatedAmount = parseInt(quantity || "1") * Number(settings.bus_price);
      setAmount(calculatedAmount.toFixed(2));
    } else if (type === "Trem/Metrô" && settings?.train_price) {
      const calculatedAmount = parseInt(quantity || "1") * Number(settings.train_price);
      setAmount(calculatedAmount.toFixed(2));
    }
  }, [type, quantity, settings?.bus_price, settings?.train_price]);

  const handleOriginChange = (value: string) => {
    setOrigin(value);
    if (type === "Carro" || type === "Uber/99") {
      fetchSuggestions(value, setOriginSuggestions);
      setShowOriginSuggestions(true);
    }
  };

  const handleDestChange = (value: string) => {
    setDestination(value);
    if (type === "Carro" || type === "Uber/99") {
      fetchSuggestions(value, setDestSuggestions);
      setShowDestSuggestions(true);
    }
  };

  const selectOrigin = (feature: GeoapifyFeature) => {
    setOrigin(feature.properties.formatted);
    setOriginCoords({ lat: feature.properties.lat, lon: feature.properties.lon });
    setShowOriginSuggestions(false);
    setOriginSuggestions([]);
    
    if (destCoords) {
      calculateDistance(
        { lat: feature.properties.lat, lon: feature.properties.lon },
        destCoords
      );
    }
  };

  const selectDestination = (feature: GeoapifyFeature) => {
    setDestination(feature.properties.formatted);
    setDestCoords({ lat: feature.properties.lat, lon: feature.properties.lon });
    setShowDestSuggestions(false);
    setDestSuggestions([]);
    
    if (originCoords) {
      calculateDistance(
        originCoords,
        { lat: feature.properties.lat, lon: feature.properties.lon }
      );
    }
  };

  const calculateDistance = async (
    from: { lat: number; lon: number },
    to: { lat: number; lon: number }
  ) => {
    if (!from || !to || (type !== "Carro" && type !== "Uber/99")) return;

    setCalculating(true);
    try {
      const { data, error } = await supabase.functions.invoke("calculate-distance", {
        body: {
          originLat: from.lat,
          originLon: from.lon,
          destLat: to.lat,
          destLon: to.lon,
        },
      });

      if (error) throw error;

      const distanceKm = data.distanceKm;
      setDistanceInfo({
        km: distanceKm,
        text: data.distanceText,
      });

      // Calculate price based on distance and type
      if (type === "Carro" && settings?.car_price_per_km) {
        const calculatedAmount = distanceKm * Number(settings.car_price_per_km);
        setAmount(calculatedAmount.toFixed(2));
      } else if (type === "Uber/99" && settings?.uber_base_price && settings?.uber_price_per_km) {
        const calculatedAmount = Number(settings.uber_base_price) + (distanceKm * Number(settings.uber_price_per_km));
        setAmount(calculatedAmount.toFixed(2));
      }

      toast({
        title: "Distância calculada",
        description: `${data.distanceText} - Tempo estimado: ${data.durationText}`,
      });
    } catch (error) {
      console.error("Error calculating distance:", error);
      toast({
        title: "Erro ao calcular distância",
        description: "Não foi possível calcular a distância. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setCalculating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addExpense({
      date: format(date, "yyyy-MM-dd"),
      type,
      amount: parseFloat(amount),
      origin,
      destination,
      quantity: (type === "Ônibus" || type === "Trem/Metrô") ? parseInt(quantity) : undefined,
    });
    
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Adicionar Gasto</h2>
        <p className="text-muted-foreground mt-1">
          Registre um novo gasto com transporte
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Gasto</CardTitle>
          <CardDescription>Preencha os detalhes da sua despesa com transporte</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Transporte</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Carro">Carro (Combustível)</SelectItem>
                    <SelectItem value="Ônibus">Ônibus</SelectItem>
                    <SelectItem value="Trem/Metrô">Trem/Metrô</SelectItem>
                    <SelectItem value="Uber/99">Uber/99</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(type === "Ônibus" || type === "Trem/Metrô") ? (
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantidade de Passagens/Bilhetes</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    placeholder="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                  />
                </div>
              ) : null}

              <div className="space-y-2">
                <Label htmlFor="amount">Valor (R$)</Label>
                <div className="relative">
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0,00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    disabled={type === "Carro" || type === "Ônibus" || type === "Trem/Metrô" || type === "Uber/99"}
                    className={(type === "Carro" || type === "Ônibus" || type === "Trem/Metrô" || type === "Uber/99") ? "bg-muted" : ""}
                  />
                  {(type === "Carro" || type === "Uber/99") && distanceInfo && (
                    <div className="absolute -bottom-6 left-0 text-xs text-muted-foreground">
                      Calculado automaticamente: {distanceInfo.text}
                    </div>
                  )}
                  {type === "Ônibus" && settings?.bus_price && (
                    <div className="absolute -bottom-6 left-0 text-xs text-muted-foreground">
                      {quantity || 1}x R$ {Number(settings.bus_price).toFixed(2)}
                    </div>
                  )}
                  {type === "Trem/Metrô" && settings?.train_price && (
                    <div className="absolute -bottom-6 left-0 text-xs text-muted-foreground">
                      {quantity || 1}x R$ {Number(settings.train_price).toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Data</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: ptBR }) : "Selecione uma data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="origin" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Origem
                {(type === "Carro" || type === "Uber/99") && <span className="text-xs text-muted-foreground">(Digite e selecione)</span>}
              </Label>
              <div className="relative">
                <Input
                  id="origin"
                  placeholder={(type === "Carro" || type === "Uber/99") ? "Digite o endereço de origem" : "Ex: Casa, Trabalho, Centro"}
                  value={origin}
                  onChange={(e) => handleOriginChange(e.target.value)}
                  onFocus={() => (type === "Carro" || type === "Uber/99") && setShowOriginSuggestions(true)}
                  required
                />
                {showOriginSuggestions && originSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-auto">
                    {originSuggestions.map((feature, index) => (
                      <button
                        key={index}
                        type="button"
                        className="w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground text-sm"
                        onClick={() => selectOrigin(feature)}
                      >
                        {feature.properties.formatted}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Destino
                {(type === "Carro" || type === "Uber/99") && <span className="text-xs text-muted-foreground">(Digite e selecione)</span>}
              </Label>
              <div className="relative">
                <Input
                  id="destination"
                  placeholder={(type === "Carro" || type === "Uber/99") ? "Digite o endereço de destino" : "Ex: Trabalho, Mercado, Academia"}
                  value={destination}
                  onChange={(e) => handleDestChange(e.target.value)}
                  onFocus={() => (type === "Carro" || type === "Uber/99") && setShowDestSuggestions(true)}
                  required
                />
                {showDestSuggestions && destSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-auto">
                    {destSuggestions.map((feature, index) => (
                      <button
                        key={index}
                        type="button"
                        className="w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground text-sm"
                        onClick={() => selectDestination(feature)}
                      >
                        {feature.properties.formatted}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {calculating && (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                Calculando distância...
              </div>
            )}

            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
              >
                Cancelar
              </Button>
              <Button type="submit" className="gap-2" disabled={calculating}>
                <Save className="h-4 w-4" />
                Salvar Gasto
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
