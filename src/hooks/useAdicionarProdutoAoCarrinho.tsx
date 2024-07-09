import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAPICarrinho from "./useAPICarrinho";

const useAdicionarProdutoAoCarrinho = () => {
    const { adicionarProduto } = useAPICarrinho();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ produtoId, quantidade }: { produtoId: number, quantidade: number }) => adicionarProduto(produtoId, quantidade),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["carrinho"] });
        },
    });
};

export default useAdicionarProdutoAoCarrinho;
