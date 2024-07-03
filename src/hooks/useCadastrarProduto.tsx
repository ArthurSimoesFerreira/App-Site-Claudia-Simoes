import { useMutation, useQueryClient } from "@tanstack/react-query";
import Produto from "../interfaces/produto";
import { URL_PRODUTO } from "../util/constants";
import useAPI from "./useAPI";

const useCadastrarProduto = () => {
  const {cadastrar} = useAPI<Produto>(URL_PRODUTO);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (produto: Produto) => cadastrar(produto),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["produtos"],
      }),
  });
};
export default useCadastrarProduto;
