import { useMutation, useQueryClient } from "@tanstack/react-query";
import Produto from "../interfaces/produto";
import { URL_PRODUTO } from "../util/constants";
import useAPI from "./useAPI";

const useAlterarProduto = () => {
  const {alterar} = useAPI<Produto>(URL_PRODUTO);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (produto: Produto) => alterar(produto),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["produtos"],
      }),
  });
};
export default useAlterarProduto;
