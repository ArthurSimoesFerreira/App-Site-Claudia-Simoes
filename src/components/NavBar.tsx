import { Link } from "react-router-dom";
import logo from "/logo.png";
import carrinho from "/carrinho.png";
import useProdutoStore from "../util/produtoStore";
import useProdutosComPaginacao from "../hooks/useProdutosComPaginacao";

function NavBar() {
  const pagina = useProdutoStore((s) => s.pagina);
  const tamanho = useProdutoStore((s) => s.tamanho);
  const nome = useProdutoStore((s) => s.nome);

  const {
    data: resultadoPaginado,
    isPending: carregandoProdutos,
    error: errorProdutos,
  } = useProdutosComPaginacao({ pagina, tamanho, nome });

  if (carregandoProdutos) return <h6>Carregando...</h6>;
  if (errorProdutos) throw errorProdutos;

  const produtos = resultadoPaginado.itens;

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-3 d-flex align-items-center">
            <Link to="/" style={{ textDecoration: "none", fontSize: "16px" }}>
              <img className="d-md-block" src={logo} style={{ width: "100px" }} />
            </Link>
          </div>
          <div className="col-6">
            <ul style={{ listStyleType: "none" }}>
              <li className="mt-2 d-flex justify-content-center">
                Faça seu
                <Link className="ms-1" to="/login" style={{ textDecoration: "none" }}>
                  login!
                </Link>
              </li>
              <li className="d-flex justify-content-center">
                <Link to="/cadastrar-produto" style={{ textDecoration: "none" }}>
                  Cadastrar produto
                </Link>
              </li>
              <li className="d-flex justify-content-center">
                <Link to="/listar-produtos" style={{ textDecoration: "none" }}>
                  Listar produtos
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-3 d-flex align-items-center justify-content-end">
            <ul style={{ listStyleType: "none" }}>
              <li className="mt-2 d-flex justify-content-center">
                <Link to="/carrinho" style={{ textDecoration: "none" }}>
                  <img className="d-none d-md-block" src={carrinho} style={{ width: "35px" }} />
                  Carrinho
                </Link>
              </li>
              <li className="d-flex justify-content-center">
                R${" "}
                {produtos
                  .reduce((total, produto) => total + produto.qtdEstoque * produto.preco, 0)
                  .toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true,
                  })}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-secondary" style={{ padding: "1px" }}></div>
    </>
  );
}
export default NavBar;
