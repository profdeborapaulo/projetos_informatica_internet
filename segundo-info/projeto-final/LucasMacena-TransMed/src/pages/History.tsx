import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useExpenses } from "@/hooks/useExpenses";
import { Loader2 } from "lucide-react";

export default function History() {
  const { expenses, isLoading } = useExpenses();

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "Carro":
        return "default";
      case "Ônibus":
        return "secondary";
      case "Trem/Metrô":
        return "outline";
      default:
        return "default";
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
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Histórico</h2>
        <p className="text-muted-foreground mt-1">
          Todos os seus gastos com transporte registrados
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Últimas Despesas</CardTitle>
          <CardDescription>Visualize e gerencie seu histórico de gastos</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Origem</TableHead>
                <TableHead>Destino</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Nenhuma despesa registrada ainda
                  </TableCell>
                </TableRow>
              ) : (
                expenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>
                      {new Date(expense.date).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getTypeBadgeVariant(expense.type)}>
                        {expense.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{expense.origin}</TableCell>
                    <TableCell>{expense.destination}</TableCell>
                    <TableCell className="text-right font-medium">
                      R$ {Number(expense.amount).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
