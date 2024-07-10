import { Link } from "react-router-dom";
import TabelaDoCarrinho from "../components/TabelaDoCarrinho";
import useCarrinhoStore from "../store/carrinhoStore";
import useFinalizarCompra from "../hooks/useFinalizarCompra";
import useCarrinho from "../hooks/useCarrinho";
import useAlterarProduto from "../hooks/useAlterarProduto";
import useProdutosPorSlugDaCategoria from "../hooks/useProdutosPorSlugDaCategoria";

const CarrinhoPage = () => {
  const { produtos, limparCarrinho } = useCarrinhoStore();
  const { mutate: finalizarCompra } = useFinalizarCompra();
  const { mutate: alterarProduto } = useAlterarProduto();
  const { data: carrinho } = useCarrinho();
  const { data: todosProdutos } = useProdutosPorSlugDaCategoria("");

  const handleFinalizarCompra = () => {
    const produtosAtualizados = [];

    for (const itemCarrinho of carrinho!) {
      const produto = todosProdutos?.find(produto => produto.id === itemCarrinho.produto.id);

      if (produto) {
        if (produto.qtdEstoque < itemCarrinho.quantidade) {
          return;
        } else if (produto.qtdEstoque === itemCarrinho.quantidade) {
          produto.qtdEstoque -= itemCarrinho.quantidade;
          produto.disponivel = false;
        } else {
          produto.qtdEstoque -= itemCarrinho.quantidade;
        }
        produtosAtualizados.push(produto);
      }
    }

    // Atualiza os produtos no backend
    for (const produto of produtosAtualizados) {
      alterarProduto(produto);
    }

    // Finaliza a compra e esvazia o carrinho
    finalizarCompra();
    limparCarrinho();
  };

  return (
    <div className="container mt-5 mb-5">
      <h1 className="mb-4">Carrinho de Compras</h1>
      {carrinho!.length === 0 ? (
        <div>
          <p>Seu carrinho está vazio.</p>
        </div>
      ) : (
        <>
          <TabelaDoCarrinho carrinho={carrinho!} />
          <div className="d-flex justify-content-between">
            <Link to="/" className="btn btn-primary mt-3">Voltar aos produtos</Link>
            <button onClick={handleFinalizarCompra} className="btn btn-success mt-3">Finalizar Compra</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CarrinhoPage;
