import { useQuery } from "@tanstack/react-query";
import useAPICarrinho from "./useAPICarrinho";

const useCarrinho = () => {
    const { obterCarrinho } = useAPICarrinho();
    return useQuery({
        queryKey: ["carrinho"],
        queryFn: obterCarrinho,
        staleTime: 10_000,
    });
};

export default useCarrinho;
