import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Award } from "lucide-react";

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Análises</h2>
        <p className="text-muted-foreground mt-1">
          Compare custos e descubra as alternativas mais econômicas
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-success/50 bg-success/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-success">Opção Mais Econômica</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/20">
                <Award className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">Trem/Metrô</p>
                <p className="text-xs text-muted-foreground">R$ 5,40 por viagem</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Custo Médio - Ônibus</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-chart-2/20">
                <TrendingDown className="h-6 w-6 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold">R$ 4,80</p>
                <p className="text-xs text-muted-foreground">por viagem</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Custo Médio - Carro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/20">
                <TrendingUp className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">R$ 18,50</p>
                <p className="text-xs text-muted-foreground">por viagem (combustível)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Comparação de Custos por Tipo</CardTitle>
          <CardDescription>Análise detalhada de cada meio de transporte</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex-1">
                <h4 className="font-semibold">Trem/Metrô</h4>
                <p className="text-sm text-muted-foreground">Transporte público rápido</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-success">R$ 5,40</p>
                <p className="text-xs text-muted-foreground">Economia de 71% vs carro</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex-1">
                <h4 className="font-semibold">Ônibus</h4>
                <p className="text-sm text-muted-foreground">Rede ampla de cobertura</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-chart-2">R$ 4,80</p>
                <p className="text-xs text-muted-foreground">Economia de 74% vs carro</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex-1">
                <h4 className="font-semibold">Uber/99</h4>
                <p className="text-sm text-muted-foreground">Porta a porta (10 km)</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-warning">R$ 25,00</p>
                <p className="text-xs text-muted-foreground">35% mais caro que carro</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex-1">
                <h4 className="font-semibold">Carro (Combustível)</h4>
                <p className="text-sm text-muted-foreground">Considerando 10 km/L</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">R$ 18,50</p>
                <p className="text-xs text-muted-foreground">Base de comparação</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-3">Recomendações Personalizadas</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-success mt-2" />
                <p>
                  <strong>Para distâncias curtas (até 5 km):</strong> Considere ônibus ou
                  bicicleta compartilhada
                </p>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-chart-2 mt-2" />
                <p>
                  <strong>Para distâncias médias (5-15 km):</strong> Metrô/trem é a opção
                  mais econômica
                </p>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                <p>
                  <strong>Para distâncias longas (&gt;15 km):</strong> Avalie carona
                  compartilhada ou carro próprio
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
