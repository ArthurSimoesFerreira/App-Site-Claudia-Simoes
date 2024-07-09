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
      <div className="row">
        {produtos?.map((produto) => (
          <div className="col-lg-4 col-md-6 col-sm-12 col-12" key={produto.id}>
            <Card produto={produto} />
          </div>
        ))}
      </div>
    </>
  );
};
export default CardsDeProdutosPage;
