import { useParams } from "react-router-dom";
import useProdutosPorSlugDaCategoria from "../hooks/useProdutosPorSlugDaCategoria";
import Card from "../components/Card";
import useCarrinho from "../hooks/useCarrinho";

const CardsDeProdutosPage = () => {
  const { slug } = useParams();
  const {
    data: produtos,
    isPending: carregandoProdutos,
    error: errorprodutos,
  } = useProdutosPorSlugDaCategoria(slug);

  const { data: carrinho } = useCarrinho();

  if (carregandoProdutos) return <h6>Carregando...</h6>;
  if (errorprodutos) throw errorprodutos;

  return (
    <>
      <h5 className="d-flex justify-content-center fw-bolder fs-3 m-3" style={{ color: "#d9094a" }}>{slug ? slug.charAt(0).toUpperCase() + slug.slice(1).toUpperCase() + "S" : "PRODUTOS"}</h5>
      <div className="row">
        {produtos?.map((produto) => (
          <div className="col-lg-4 col-md-6 col-sm-12 col-12" key={produto.id}>
            <Card produto={produto} produtoNoCarrinho={carrinho?.find((p) => p.produto.id === produto.id)} />
          </div>
        ))}
      </div>
    </>
  );
};
export default CardsDeProdutosPage;
