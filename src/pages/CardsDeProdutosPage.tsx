import { useParams } from "react-router-dom";
import useProdutosPorSlugDaCategoria from "../hooks/useProdutosPorSlugDaCategoria";
import Card from "../components/Card";

const CardsDeProdutosPage = () => {
  const { slug } = useParams();
  const {
    data: produtos,
    isPending: carregandoProdutos,
    error: errorprodutos,
  } = useProdutosPorSlugDaCategoria(slug);

  if (carregandoProdutos) return <h6>Carregando...</h6>;
  if (errorprodutos) throw errorprodutos;

  return (
    <>
      <h5 className="d-flex justify-content-center align-items-center">{slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : "Produtos"}</h5>
      <div className="row">
        {produtos?.map((produto) => (
          <div className="col-lg-6 col-md-6 col-sm-6 col-6" key={produto.id}>
            <Card produto={produto} />
          </div>
        ))}
      </div>
    </>
  );
};
export default CardsDeProdutosPage;
