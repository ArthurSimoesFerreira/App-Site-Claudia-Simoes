import CadastroDeProdutosForm from "../components/CadastroDeProdutosForm";
import Paginacao from "../components/Paginacao";
import Pesquisa from "../components/Pesquisa";
import TabelaDeProdutos from "../components/TabelaDeProdutos";
import useProdutoStore from "../util/produtoStore";

const ListaDeProdutosPage = () => {
  const produtoSelecionado = useProdutoStore((s) => s.produtoSelecionado);

  return (
    <>
      <h4>{produtoSelecionado.id ? "Alterar Produto" : "Cadastro de Produtos"}</h4>
      <hr className="mt-1" />
      <CadastroDeProdutosForm />

      <h4>Lista de Produtos</h4>
      <hr className="mt-1" />
      <Pesquisa />
      <TabelaDeProdutos />
      <Paginacao />
    </>
  );
};
export default ListaDeProdutosPage;
