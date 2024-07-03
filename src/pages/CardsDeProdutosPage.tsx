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
      <h5>{slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : "Produtos"}</h5>
      <div className="row">
        {produtos?.map((produto) => (
          <div className="col-lg-2 col-md-3 col-sm-4 col-6">
            <Card
              imagem={produto.imagem}
              titulo={produto.nome}
              descricao={produto.descricao}
              preco={produto.preco.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                useGrouping: true
              })}
              footer={<input type="button" className="btn btn-primary btn-sm w-100" value="Comprar" />}
            />
          </div>
        ))}
      </div>
    </>
  );
};
export default CardsDeProdutosPage;
