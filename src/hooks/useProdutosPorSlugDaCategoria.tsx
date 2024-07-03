import { useQuery } from "@tanstack/react-query";
import useAPIProduto from "./useAPIProduto";

const useProdutosPorSlugDaCategoria = (slug?: string) => {
  const {recuperarProdutosPorSlugDaCategoria} = useAPIProduto();
  return useQuery({
    queryKey: slug ? ["produtos", "slugCategoria", slug] : ["produtos"],
    queryFn: () => recuperarProdutosPorSlugDaCategoria(slug),
    staleTime: 10_000,
  })
};
export default useProdutosPorSlugDaCategoria;
