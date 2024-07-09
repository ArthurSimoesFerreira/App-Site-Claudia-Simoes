import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAPICarrinho from "./useAPICarrinho";

const useRemoverProdutoDoCarrinho = () => {
    const { removerProduto } = useAPICarrinho();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (produtoId: number) => removerProduto(produtoId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["carrinho"] });
        },
    });
};

export default useRemoverProdutoDoCarrinho;
