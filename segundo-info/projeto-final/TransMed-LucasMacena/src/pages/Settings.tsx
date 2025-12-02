import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Loader2, Plus, Trash2, MapPin } from "lucide-react";
import { useUserSettings } from "@/hooks/useUserSettings";
import { useAddressAliases } from "@/hooks/useAddressAliases";
import { useState, useEffect } from "react";

export default function Settings() {
  const { settings, isLoading, updateSettings } = useUserSettings();
  const { aliases, isLoading: aliasesLoading, addAlias, deleteAlias } = useAddressAliases();
  const [carPricePerKm, setCarPricePerKm] = useState("");
  const [busPrice, setBusPrice] = useState("");
  const [trainPrice, setTrainPrice] = useState("");
  const [uberBasePrice, setUberBasePrice] = useState("");
  const [uberPricePerKm, setUberPricePerKm] = useState("");
  
  const [newAliasName, setNewAliasName] = useState("");
  const [newAliasAddress, setNewAliasAddress] = useState("");

  useEffect(() => {
    if (settings) {
      setCarPricePerKm(settings.car_price_per_km?.toString() || "");
      setBusPrice(settings.bus_price?.toString() || "");
      setTrainPrice(settings.train_price?.toString() || "");
      setUberBasePrice(settings.uber_base_price?.toString() || "");
      setUberPricePerKm(settings.uber_price_per_km?.toString() || "");
    }
  }, [settings]);

  const handleSave = () => {
    updateSettings({
      car_price_per_km: parseFloat(carPricePerKm),
      bus_price: parseFloat(busPrice),
      train_price: parseFloat(trainPrice),
      uber_base_price: parseFloat(uberBasePrice),
      uber_price_per_km: parseFloat(uberPricePerKm),
    });
  };

  const handleAddAlias = () => {
    if (newAliasName.trim() && newAliasAddress.trim()) {
      addAlias({ name: newAliasName.trim(), address: newAliasAddress.trim() });
      setNewAliasName("");
      setNewAliasAddress("");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Configurações</h2>
        <p className="text-muted-foreground mt-1">
          Personalize suas preferências de transporte
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Preços de Transporte</CardTitle>
          <CardDescription>Configure os custos padrão para cada tipo de transporte</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="car-price">Carro - Preço por km (R$)</Label>
              <Input
                id="car-price"
                type="number"
                step="0.01"
                value={carPricePerKm}
                onChange={(e) => setCarPricePerKm(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bus-price">Tarifa Ônibus (R$)</Label>
              <Input
                id="bus-price"
                type="number"
                step="0.01"
                value={busPrice}
                onChange={(e) => setBusPrice(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="train-price">Tarifa Trem/Metrô (R$)</Label>
              <Input
                id="train-price"
                type="number"
                step="0.01"
                value={trainPrice}
                onChange={(e) => setTrainPrice(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="uber-base">Uber - Tarifa Base (R$)</Label>
              <Input
                id="uber-base"
                type="number"
                step="0.01"
                value={uberBasePrice}
                onChange={(e) => setUberBasePrice(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="uber-km">Uber - Preço por km (R$)</Label>
              <Input
                id="uber-km"
                type="number"
                step="0.01"
                value={uberPricePerKm}
                onChange={(e) => setUberPricePerKm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Atalhos de Endereço
          </CardTitle>
          <CardDescription>
            Crie atalhos para seus locais frequentes (ex: "Casa", "Trabalho")
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-[1fr_2fr_auto]">
            <Input
              placeholder="Nome do atalho"
              value={newAliasName}
              onChange={(e) => setNewAliasName(e.target.value)}
            />
            <Input
              placeholder="Endereço completo"
              value={newAliasAddress}
              onChange={(e) => setNewAliasAddress(e.target.value)}
            />
            <Button onClick={handleAddAlias} size="icon" disabled={!newAliasName.trim() || !newAliasAddress.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {aliasesLoading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : aliases.length > 0 ? (
            <div className="space-y-2 mt-4">
              {aliases.map((alias) => (
                <div key={alias.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{alias.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{alias.address}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteAlias(alias.id)}
                    className="shrink-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              Nenhum atalho cadastrado ainda
            </p>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
}
