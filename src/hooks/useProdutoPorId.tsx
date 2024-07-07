import { useQuery } from "@tanstack/react-query";
import Produto from "../interfaces/produto";
import { URL_PRODUTO } from "../util/constants";
import useAPI from "./useAPI";

const useProdutoPorId = (id: number) => {
    const { recuperar } = useAPI<Produto>(`${URL_PRODUTO}/${id}`);

    return useQuery({
        queryKey: ["produto", id],
        queryFn: () => recuperar(),
        staleTime: 10_000,
    });
};

export default useProdutoPorId;
