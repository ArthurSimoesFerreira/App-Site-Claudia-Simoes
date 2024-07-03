import { useQuery } from "@tanstack/react-query";
import useAPI from "./useAPI";
import { URL_PRODUTO } from "../util/constants";
import Produto from "../interfaces/produto";

const useProdutos = () => {
  const {recuperar} = useAPI<Produto>(URL_PRODUTO);
  return useQuery({
    queryKey: ["produtos"],
    queryFn: () => recuperar(),
    staleTime: 10_000,
  })
};
export default useProdutos;
