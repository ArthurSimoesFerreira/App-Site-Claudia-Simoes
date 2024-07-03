import useProdutosComPaginacao from "../hooks/useProdutosComPaginacao";
import useProdutoStore from "../util/produtoStore";

const Paginacao = () => {
  const pagina = useProdutoStore(s => s.pagina);
  const tamanho = useProdutoStore(s => s.tamanho);
  const nome = useProdutoStore(s => s.nome);
  const setPagina = useProdutoStore(s => s.setPagina);

  const tratarPaginacao = (pagina: number) => {
    setPagina(pagina);
  };

  const {
    data: resultadoPaginado,
    isPending: carregandoProdutos,
    error: errorProdutos,
  } = useProdutosComPaginacao({pagina, tamanho, nome});

  if (carregandoProdutos) return <h6>Carregando...</h6>;
  if (errorProdutos) throw errorProdutos;

  const totalDePaginas = resultadoPaginado.totalDePaginas;

  const arrayDePaginas = [];

  for (let i = 0; i < totalDePaginas; i++) {
    arrayDePaginas.push(
      <li key={i} className="page-item">
        <a
          onClick={() => tratarPaginacao(i)}
          className={pagina === i ? "page-link active" : "page-link"}
          href="#"
        >
          {i + 1}
        </a>
      </li>
    );
  }

  if (totalDePaginas < 2) return null;
  
  return (
    <nav aria-label="Paginação">
      <ul className="pagination">
        <li className={pagina === 0 ? "page-item disabled" : "page-item"}>
          <a onClick={() => tratarPaginacao(pagina - 1)} className="page-link">
            Anterior
          </a>
        </li>
        {arrayDePaginas}
        <li className={pagina === totalDePaginas - 1 ? "page-item disabled" : "page-item"}>
          <a onClick={() => tratarPaginacao(pagina + 1)} className="page-link">
            Próxima
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default Paginacao;
