import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/integrations/supabase/auth";
import { useExpenses } from "@/hooks/useExpenses";
import { useUserSettings } from "@/hooks/useUserSettings";
import { useMemo } from "react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  TrendingDown, 
  Wallet, 
  Calendar, 
  Loader2, 
  Mail, 
  Car, 
  Train, 
  Bus,
  MapPin
} from "lucide-react";

interface MonthlyData {
  month: string;
  monthKey: string;
  total: number;
  potentialSavings: number;
  expenseCount: number;
  byType: Record<string, { count: number; total: number }>;
}

export default function Profile() {
  const { user } = useAuth();
  const { expenses, isLoading } = useExpenses();
  const { settings } = useUserSettings();

  const { monthlyData, totalAllTime, totalSavings, mostUsedType } = useMemo(() => {
    if (!expenses.length) return { monthlyData: [], totalAllTime: 0, totalSavings: 0, mostUsedType: null };

    const grouped: Record<string, { total: number; expenses: typeof expenses }> = {};
    const typeCount: Record<string, number> = {};

    expenses.forEach((expense) => {
      const date = parseISO(expense.date);
      const monthKey = format(date, "yyyy-MM");
      
      if (!grouped[monthKey]) {
        grouped[monthKey] = { total: 0, expenses: [] };
      }
      grouped[monthKey].total += expense.amount;
      grouped[monthKey].expenses.push(expense);

      typeCount[expense.type] = (typeCount[expense.type] || 0) + 1;
    });

    const trainPrice = settings?.train_price || 5.40;
    let totalAllTime = 0;
    let totalSavings = 0;

    const result: MonthlyData[] = Object.entries(grouped)
      .map(([monthKey, data]) => {
        const byType: Record<string, { count: number; total: number }> = {};
        
        data.expenses.forEach((exp) => {
          if (!byType[exp.type]) {
            byType[exp.type] = { count: 0, total: 0 };
          }
          byType[exp.type].count += 1;
          byType[exp.type].total += exp.amount;
        });

        const trainAlternativeCost = data.expenses.reduce((acc, exp) => {
          const qty = exp.quantity || 1;
          return acc + (trainPrice * qty);
        }, 0);
        
        const potentialSavings = Math.max(0, data.total - trainAlternativeCost);
        totalAllTime += data.total;
        totalSavings += potentialSavings;

        return {
          monthKey,
          month: format(parseISO(`${monthKey}-01`), "MMMM yyyy", { locale: ptBR }),
          total: data.total,
          potentialSavings,
          expenseCount: data.expenses.length,
          byType,
        };
      })
      .sort((a, b) => b.monthKey.localeCompare(a.monthKey));

    const mostUsedType = Object.entries(typeCount).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

    return { monthlyData: result, totalAllTime, totalSavings, mostUsedType };
  }, [expenses, settings]);

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "carro":
        return <Car className="h-4 w-4" />;
      case "trem":
      case "metrô":
        return <Train className="h-4 w-4" />;
      case "ônibus":
        return <Bus className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
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
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Meu Perfil</h2>
        <p className="text-muted-foreground mt-1">
          Visualize seus gastos e economia ao longo do tempo
        </p>
      </div>

      {/* User Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Informações da Conta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-primary/10">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/10">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Gasto</p>
                <p className="text-2xl font-bold">R$ {totalAllTime.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-emerald-500/10">
                <TrendingDown className="h-6 w-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Economia Potencial</p>
                <p className="text-2xl font-bold text-emerald-500">R$ {totalSavings.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-muted">
                <Calendar className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Meses Registrados</p>
                <p className="text-2xl font-bold">{monthlyData.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Breakdown */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Histórico Mensal</h3>
        
        {monthlyData.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Nenhuma despesa registrada ainda.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {monthlyData.map((data) => (
              <Card key={data.monthKey}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg capitalize flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    {data.month}
                  </CardTitle>
                  <CardDescription>
                    {data.expenseCount} registro{data.expenseCount !== 1 ? "s" : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 mb-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Wallet className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Total Gasto</p>
                        <p className="font-semibold">R$ {data.total.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/5">
                      <TrendingDown className="h-5 w-5 text-emerald-500" />
                      <div>
                        <p className="text-xs text-muted-foreground">Economia Potencial</p>
                        <p className="font-semibold text-emerald-500">R$ {data.potentialSavings.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Type breakdown */}
                  <div className="border-t pt-4">
                    <p className="text-sm text-muted-foreground mb-2">Por tipo de transporte:</p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(data.byType).map(([type, info]) => (
                        <div 
                          key={type} 
                          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-sm"
                        >
                          {getTypeIcon(type)}
                          <span className="capitalize">{type}</span>
                          <span className="text-muted-foreground">
                            ({info.count}x) R$ {info.total.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
