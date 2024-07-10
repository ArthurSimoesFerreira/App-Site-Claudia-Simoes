import { Link } from "react-router-dom";
import Produto from "../interfaces/produto";
import useAdicionarProdutoAoCarrinho from "../hooks/useAdicionarProdutoAoCarrinho";
import useDiminuirProdutoDoCarrinho from "../hooks/useDiminuirProdutoDoCarrinho";
import useRemoverProdutoDoCarrinho from "../hooks/useRemoverProdutoDoCarrinho";
import Carrinho from "../interfaces/carrinho";

interface Props {
  produto: Produto;
  produtoNoCarrinho?: Carrinho;
}

const Card = ({ produto, produtoNoCarrinho }: Props) => {
  const { id, imagem, nome: titulo, descricao, preco } = produto;
  const { mutate: adicionarProdutoAoCarrinho } = useAdicionarProdutoAoCarrinho();
  const { mutate: diminuirProdutoDoCarrinho } = useDiminuirProdutoDoCarrinho();
  const { mutate: removerProdutoDoCarrinho } = useRemoverProdutoDoCarrinho();
  const precoAlto = preco * 1.2;

  const handleAdicionarProduto = () => {
    if (produtoNoCarrinho && produto.qtdEstoque > produtoNoCarrinho.quantidade) {
      adicionarProdutoAoCarrinho({ produtoId: produto.id!, quantidade: 1 });
    } else if (produto && !produtoNoCarrinho) {
      adicionarProdutoAoCarrinho({ produtoId: produto.id!, quantidade: 1 });
    }
  };

  const handleDiminuirProduto = () => {
    if (produtoNoCarrinho && produtoNoCarrinho.quantidade > 1) {
      diminuirProdutoDoCarrinho(produto.id!);
    } else {
      removerProdutoDoCarrinho(produto.id!);
    }
  };

  return (
    <div className="card mb-3" style={{ maxWidth: "540px", minHeight: "300px" }}>
      <div className="row g-0" style={{ minHeight: "300px", maxHeight: "300px" }}>
        <div className="col-6">
          <img src={imagem} className="img-fluid rounded-start h-100" style={{ maxHeight: "300px", width: "90%" }} alt={titulo} />
        </div>
        <div className="col-6 h-100">
          <div className="card-body">
            <Link to={`/produtos/${id}`} style={{ textDecoration: "none" }}>
              <h5 className="card-title" style={{ color: "#d9094a" }}>{titulo}</h5>
            </Link>
            <p className="card-text">{descricao}</p>
            <p className="card-text fw-bold text-decoration-line-through" style={{ color: "#db0b0b" }}>
              R$ {precoAlto.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                useGrouping: true
              })}</p>
            <p className="card-text fw-bold" style={{ color: "#19bd44" }}>
              R$ {preco.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                useGrouping: true
              })}
            </p>
            <div className="card-footer border-0 p-0" style={{ backgroundColor: "white" }}>
              {produtoNoCarrinho ? (
                <div className="col">
                  <div className="d-flex justify-content-center align-items-center fw-bolder">
                    Quantidade
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <button onClick={handleDiminuirProduto} className="btn"><svg id="i-arrow-bottom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                      <path d="M6 22 L16 30 26 22 M16 30 L16 2" />
                    </svg></button>
                    <span className="px-3">{produtoNoCarrinho.quantidade}</span>
                    <button onClick={handleAdicionarProduto} className="btn"><svg id="i-arrow-top" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                      <path d="M6 10 L16 2 26 10 M16 2 L16 30" />
                    </svg></button>
                  </div>
                </div>

              ) : (
                <button onClick={handleAdicionarProduto} className="btn btn-primary" style={{ backgroundColor: "#d9094a", borderColor: "#d9094a" }}>Adicionar ao Carrinho</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
