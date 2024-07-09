import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAPICarrinho from "./useAPICarrinho";

const useDiminuirProdutoDoCarrinho = () => {
    const { diminuirQuantidadeProduto } = useAPICarrinho();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (produtoId: number) => diminuirQuantidadeProduto(produtoId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["carrinho"] });
        },
    });
};

export default useDiminuirProdutoDoCarrinho;
