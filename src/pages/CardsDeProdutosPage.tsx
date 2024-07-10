import { useParams } from "react-router-dom";
import Card from "../components/Card";
import useCarrinho from "../hooks/useCarrinho";
import useProdutosPaginadosPorSlugDaCategoria from "../hooks/useProdutosPaginadosPorSlugDaCategoria";
import InfiniteScroll from "react-infinite-scroll-component";


const CardsDeProdutosPage = () => {
  const { slug } = useParams();
  const tamanho = 8;
  const {
    data,
    isPending: carregandoProdutos,
    error: errorprodutos,
    hasNextPage,
    fetchNextPage
  } = useProdutosPaginadosPorSlugDaCategoria({ tamanho, slug });

  const { data: carrinho } = useCarrinho();

  if (carregandoProdutos) return <h6>Carregando...</h6>;
  if (errorprodutos) throw errorprodutos;

  return (
    <InfiniteScroll
      dataLength={data.pages.reduce((total, page) => total + page.itens.length, 0)}
      hasMore={hasNextPage}
      next={() => fetchNextPage()}
      loader={<h6>Carregando...</h6>}>

      <h5 className="d-flex justify-content-center fw-bolder fs-3 m-3" style={{ color: "#d9094a" }}>{slug ? slug.charAt(0).toUpperCase() + slug.slice(1).toUpperCase() + "S" : "PRODUTOS"}</h5>
      <div className="row">
        {data.pages.map((page) =>
          page.itens.map((produto) => (produto.disponivel === true ?
            <div key={produto.id} className="col-lg-4 col-md-6 col-sm-12 col-12">
              <Card
                produto={produto} produtoNoCarrinho={carrinho?.find((p) => p.produto.id === produto.id)}
              />
            </div> :
            <></>
          ))
        )}
      </div>
    </InfiniteScroll>
    // <>
    //   <h5 className="d-flex justify-content-center fw-bolder fs-3 m-3" style={{ color: "#d9094a" }}>{slug ? slug.charAt(0).toUpperCase() + slug.slice(1).toUpperCase() + "S" : "PRODUTOS"}</h5>
    //   <div className="row">
    //     {produtos?.map((produto) => (produto.disponivel === true ?
    //       <div className="col-lg-4 col-md-6 col-sm-12 col-12" key={produto.id}>
    //         <Card produto={produto} produtoNoCarrinho={carrinho?.find((p) => p.produto.id === produto.id)} />
    //       </div> :
    //       <></>
    //     ))}
    //   </div>
    // </>
  );
};
export default CardsDeProdutosPage;
