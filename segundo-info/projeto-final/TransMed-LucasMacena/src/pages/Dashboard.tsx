import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, TrendingDown, TrendingUp, DollarSign, Calendar, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useExpenses } from "@/hooks/useExpenses";
import { useMemo } from "react";

export default function Dashboard() {
  const { expenses, isLoading } = useExpenses();
  const currentMonth = new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

  const stats = useMemo(() => {
    const currentDate = new Date();
    const currentMonthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentDate.getMonth() &&
             expenseDate.getFullYear() === currentDate.getFullYear();
    });

    const total = currentMonthExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
    
    const byType = currentMonthExpenses.reduce((acc, exp) => {
      acc[exp.type] = (acc[exp.type] || 0) + Number(exp.amount);
      return acc;
    }, {} as Record<string, number>);

    const mostUsed = Object.entries(byType).sort((a, b) => b[1] - a[1])[0];
    const daysRegistered = new Set(currentMonthExpenses.map(exp => exp.date)).size;

    return {
      total,
      byType,
      mostUsed: mostUsed ? { type: mostUsed[0], count: currentMonthExpenses.filter(e => e.type === mostUsed[0]).length } : null,
      daysRegistered,
    };
  }, [expenses]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
          <p className="text-muted-foreground mt-1">
            Visão geral dos seus gastos com transporte em {currentMonth}
          </p>
        </div>
        <Link to="/add-expense">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Adicionar Gasto
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Gasto</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {stats.total.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Economia Potencial</CardTitle>
            <TrendingDown className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">R$ {(stats.byType["Carro"] * 0.3 || 0).toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Usando mais transporte público
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transporte Mais Usado</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.mostUsed?.type || "N/A"}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.mostUsed?.count || 0} viagens
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dias Registrados</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.daysRegistered}</div>
            <p className="text-xs text-muted-foreground mt-1">
              de {new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()} dias do mês
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Gastos por Tipo de Transporte</CardTitle>
            <CardDescription>Distribuição dos seus gastos este mês</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(stats.byType).length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Nenhum gasto registrado ainda
              </p>
            ) : (
              Object.entries(stats.byType)
                .sort((a, b) => b[1] - a[1])
                .map(([type, amount]) => {
                  const percentage = (amount / stats.total) * 100;
                  return (
                    <div key={type} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{type}</span>
                        <span className="text-sm font-bold">R$ {amount.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${percentage}%` }} 
                        />
                      </div>
                    </div>
                  );
                })
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recomendações de Economia</CardTitle>
            <CardDescription>Como você pode economizar este mês</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.byType["Carro"] > 0 && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                <TrendingDown className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Use mais transporte público</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Você pode economizar até R$ {(stats.byType["Carro"] * 0.3).toFixed(2)} substituindo viagens de carro por ônibus/metrô
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
              <TrendingDown className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Considere carona solidária</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Compartilhar o carro pode reduzir seus gastos com combustível em até 40%
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-warning/10 border border-warning/20">
              <TrendingDown className="h-5 w-5 text-warning mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Planeje suas rotas</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Otimizar trajetos pode economizar combustível significativamente
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
