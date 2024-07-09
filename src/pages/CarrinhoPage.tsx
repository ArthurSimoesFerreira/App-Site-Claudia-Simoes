import { Link } from "react-router-dom";
import TabelaDoCarrinho from "../components/TabelaDoCarrinho";
import useCarrinhoStore from "../store/carrinhoStore";
import useFinalizarCompra from "../hooks/useFinalizarCompra";


const CarrinhoPage = () => {
  const { produtos, limparCarrinho } = useCarrinhoStore();
  const { mutate: finalizarCompra } = useFinalizarCompra();

  const handleFinalizarCompra = () => {
    finalizarCompra();
    limparCarrinho();
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Carrinho de Compras</h1>
      {produtos.length === 0 ? (
        <div>
          <p>Seu carrinho está vazio.</p>
        </div>
      ) : (
        <>
          <TabelaDoCarrinho />
          <div className="d-flex justify-content-end">
            <button onClick={handleFinalizarCompra} className="btn btn-success mt-3">Finalizar Compra</button>
          </div>
        </>
      )}
      <Link to="/" className="btn btn-primary">Voltar aos produtos</Link>
    </div>
  );
};

export default CarrinhoPage;
