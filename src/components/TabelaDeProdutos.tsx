import dayjs from "dayjs";
import deleteIcon from "../assets/skin/database_delete.png";
import useProdutosComPaginacao from "../hooks/useProdutosComPaginacao";
import useProdutoStore from "../util/produtoStore";
import useRemoverProduto from "../hooks/useRemoverProduto";

const TabelaDeProdutos = () => {
  const pagina = useProdutoStore(s => s.pagina);
  const tamanho = useProdutoStore(s => s.tamanho);
  const nome = useProdutoStore(s => s.nome);
  const setPagina = useProdutoStore(s => s.setPagina);
  const setProdutoSelecionado = useProdutoStore(s => s.setProdutoSelecionado);

  const {mutate: removerProduto} = useRemoverProduto();
  
  const tratarRemocao = (id: number) => {
    removerProduto(id);
    setPagina(0);
  }

  const {
    data: resultadoPaginado,
    isPending: carregandoProdutos,
    error: errorProdutos,
  } = useProdutosComPaginacao({pagina, tamanho, nome});

  if (carregandoProdutos) return <h6>Carregando...</h6>;
  if (errorProdutos) throw errorProdutos;

  const produtos = resultadoPaginado.itens;
  
  return (
    <table className="table table-responsive table-sm table-hover table-bordered">
      <thead>
        <tr>
          <th className="align-middle text-center">Id</th>
          <th className="align-middle text-center">Imagem</th>
          <th className="align-middle text-center">Categoria</th>
          <th className="align-middle text-center">Nome</th>
          <th className="align-middle text-center">Data de Cadastro</th>
          <th className="align-middle text-center">Quantidade</th>
          <th className="align-middle text-center">Preço</th>
          <th className="align-middle text-center">Ação</th>
        </tr>
      </thead>
      <tbody>
        {produtos.map((produto) => (
          <tr key={produto.id}>
            <td width="8%" className="align-middle text-center">
              {produto.id}
            </td>
            <td width="12%" className="align-middle text-center">
              <img src={produto.imagem} width={45} />
            </td>
            <td width="12%" className="align-middle text-center">
              {produto.categoria.nome}
            </td>
            <td width="20%" className="align-middle">
              <a className="link-underline" onClick={() => {
                setProdutoSelecionado(produto);
              }}>
              {produto.nome}
              </a>
            </td>
            <td width="12%" className="align-middle text-center">
              {dayjs(produto.dataCadastro).format("DD/MM/YYYY")}
            </td>
            <td width="12%" className="align-middle text-center">
              {produto.qtdEstoque.toLocaleString("pt-BR", {
                useGrouping: true
              })}
            </td>
            <td width="12%" className="align-middle text-end pe-3">
              {produto.preco.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                useGrouping: true,
              })}
            </td>
            <td width="12%" className="align-middle text-center">
              <button onClick={() => tratarRemocao(produto.id!)} className="btn btn-danger btn-sm">
                <img src={deleteIcon} /> Remover
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={4}></td>
          <td className="align-middle text-center fw-bold">Total...</td>
          <td  className="align-middle text-center fw-bold" colSpan={2}>
            R$ {produtos.reduce((total, produto) => total + produto.qtdEstoque * produto.preco, 0).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              useGrouping: true
            })}
          </td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};
export default TabelaDeProdutos;
