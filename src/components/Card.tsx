import { Link } from "react-router-dom";
import Produto from "../interfaces/produto";
import useAdicionarProdutoAoCarrinho from "../hooks/useAdicionarProdutoAoCarrinho";
import useCarrinhoStore from "../store/carrinhoStore";
import useDiminuirProdutoDoCarrinho from "../hooks/useDiminuirProdutoDoCarrinho";
import useRemoverProdutoDoCarrinho from "../hooks/useRemoverProdutoDoCarrinho";

interface Props {
  produto: Produto;
}

const Card = ({ produto }: Props) => {
  const { id, imagem, nome: titulo, descricao, preco } = produto;
  const { produtos, adicionarProduto, atualizarQuantidade, removerProduto } = useCarrinhoStore();
  const produtoNoCarrinho = useCarrinhoStore((s) =>
    s.produtos.find((p) => p.produto.id === id)
  );
  const { mutate: adicionarProdutoAoCarrinho } = useAdicionarProdutoAoCarrinho();
  const { mutate: diminuirProdutoDoCarrinho } = useDiminuirProdutoDoCarrinho();
  const { mutate: removerProdutoDoCarrinho } = useRemoverProdutoDoCarrinho();

  const handleAdicionarProduto = () => {
    adicionarProduto(produto, 1);
    adicionarProdutoAoCarrinho({ produtoId: produto.id!, quantidade: 1 });
  }

  const handleDiminuirProduto = (produto: Produto) => {
    const produtoNoCarrinho = produtos.find(p => p.produto.id === produto.id);
    if (produtoNoCarrinho && produtoNoCarrinho.quantidade > 1) {
      atualizarQuantidade(produto.id!, -1);
      diminuirProdutoDoCarrinho(produto.id!);
    } else {
      removerProduto(produto.id!);
      removerProdutoDoCarrinho(produto.id!);
    }
  };

  return (
    <div className="card mb-3" style={{ maxWidth: "540px", minHeight: "300px" }}>
      <div className="row g-0" style={{ minHeight: "300px", maxHeight: "300px" }}>
        <div className="col-6">
          <img src={imagem} className="img-fluid rounded-start h-100" style={{ maxHeight: "300px" }} alt={titulo} />
        </div>
        <div className="col-6 h-100">
          <div className="card-body">
            <Link to={`/produtos/${id}`} style={{ textDecoration: "none" }}>
              <h5 className="card-title" style={{ color: "#d9094a" }}>{titulo}</h5>
            </Link>
            <p className="card-text">{descricao}</p>
            <p className="card-text fw-bold" style={{ color: "rgb(220, 53, 69)" }}>
              R$ {preco.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                useGrouping: true
              })}
            </p>
            <div className="card-footer border-0 p-0" style={{ backgroundColor: "white" }}>
              {produtoNoCarrinho ? (
                <div className="d-flex justify-content-between align-items-center">
                  <button onClick={() => handleDiminuirProduto(produto)} className="btn btn-danger">-</button>
                  <span className="px-3">{produtoNoCarrinho.quantidade}</span>
                  <button onClick={() => handleAdicionarProduto()} className="btn btn-primary">+</button>
                </div>
              ) : (
                <button onClick={() => handleAdicionarProduto()} className="btn btn-primary" style={{ backgroundColor: "#d9094a", borderColor: "#d9094a" }}>Adicionar ao Carrinho</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
