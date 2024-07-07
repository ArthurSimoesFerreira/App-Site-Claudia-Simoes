import { Link } from "react-router-dom";
import logo from "/logo.png";
import useProdutoStore from "../store/produtoStore";
import useProdutosComPaginacao from "../hooks/useProdutosComPaginacao";

function NavBar() {
  const pagina = useProdutoStore((s) => s.pagina);
  const tamanho = useProdutoStore((s) => s.tamanho);
  const nome = useProdutoStore((s) => s.nome);
  const ordenacaoCampo = useProdutoStore((s) => s.ordenacaoCampo);
  const ordenacaoDirecao = useProdutoStore((s) => s.ordenacaoDirecao);

  const {
    data: resultadoPaginado,
    isPending: carregandoProdutos,
    error: errorProdutos,
  } = useProdutosComPaginacao({ pagina, tamanho, nome, ordenacaoCampo, ordenacaoDirecao });

  if (carregandoProdutos) return <h6>Carregando...</h6>;
  if (errorProdutos) throw errorProdutos;

  const produtos = resultadoPaginado.itens;

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-3 d-flex align-items-center">
            <Link to="/">
              <img className="d-md-block" src={logo} style={{ width: "90px" }} />
            </Link>
          </div>
          <div className="justify-content-around col-6 row align-items-center">
            <div className="col d-flex justify-content-center align-items-center">
              <Link to="/listar-produtos" style={{ textDecoration: "none" }}>
                Listar produtos
              </Link>
            </div>
            <div className="col d-flex justify-content-center align-items-center">
              <Link to="/cadastrar-produto" style={{ textDecoration: "none" }}>
                Cadastrar produto
              </Link>
            </div>
            <div className="col d-flex justify-content-center align-items-center">
              <Link className="ms-1" to="/login" style={{ textDecoration: "none" }}>
                Login
              </Link>
            </div>
          </div>
          {/* <div className="col-6">
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
          </div> */}
          <div className="col-3 d-flex align-items-center justify-content-end mt-3">
            <ul style={{ listStyleType: "none" }}>
              <li className="d-flex justify-content-center align-items-center">
                <Link to="/carrinho" style={{ textDecoration: "none" }}>
                  <svg id="i-cart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path d="M6 6 L30 6 27 19 9 19 M27 23 L10 23 5 2 2 2" />
                    <circle cx="25" cy="27" r="2" />
                    <circle cx="12" cy="27" r="2" />
                  </svg>
                </Link>
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
