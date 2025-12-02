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
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useExpenses } from "@/hooks/useExpenses";
import { Loader2, Trash2 } from "lucide-react";

export default function History() {
  const { expenses, isLoading, deleteExpense } = useExpenses();

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
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
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
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Excluir despesa?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir esta despesa de R$ {Number(expense.amount).toFixed(2)}? 
                              Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => deleteExpense(expense.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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
