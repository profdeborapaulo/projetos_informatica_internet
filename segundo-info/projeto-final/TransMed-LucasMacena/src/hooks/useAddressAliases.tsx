import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/integrations/supabase/auth";
import { useToast } from "@/hooks/use-toast";

export interface AddressAlias {
  id: string;
  user_id: string;
  name: string;
  address: string;
  created_at: string;
}

export function useAddressAliases() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: aliases = [], isLoading } = useQuery({
    queryKey: ["address-aliases", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from("address_aliases")
        .select("*")
        .eq("user_id", user.id)
        .order("name", { ascending: true });

      if (error) throw error;
      return data as AddressAlias[];
    },
    enabled: !!user,
  });

  const addAlias = useMutation({
    mutationFn: async (alias: { name: string; address: string }) => {
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("address_aliases")
        .insert([{ ...alias, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address-aliases"] });
      toast({
        title: "Atalho adicionado!",
        description: "Seu atalho de endereço foi salvo.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao adicionar atalho",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteAlias = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("address_aliases").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address-aliases"] });
      toast({
        title: "Atalho excluído",
      });
    },
  });

  return {
    aliases,
    isLoading,
    addAlias: addAlias.mutate,
    deleteAlias: deleteAlias.mutate,
  };
}
