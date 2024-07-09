import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAPICarrinho from "./useAPICarrinho";

const useFinalizarCompra = () => {
    const { finalizarCompra } = useAPICarrinho();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: finalizarCompra,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["carrinho"] });
        },
    });
};

export default useFinalizarCompra;
