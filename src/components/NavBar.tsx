import { Link } from "react-router-dom";
import logo from "/logo.png";
import useProdutoStore from "../store/produtoStore";
import useProdutosComPaginacao from "../hooks/useProdutosComPaginacao";
import useUsuarioStore from "../store/usuarioStore";


function NavBar() {
  const pagina = useProdutoStore((s) => s.pagina);
  const tamanho = useProdutoStore((s) => s.tamanho);
  const nome = useProdutoStore((s) => s.nome);
  const ordenacaoCampo = useProdutoStore((s) => s.ordenacaoCampo);
  const ordenacaoDirecao = useProdutoStore((s) => s.ordenacaoDirecao);

  const usuarioLogado = useUsuarioStore((s) => s.usuarioLogado);

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
          <div className="col-2 d-flex align-items-center">
            <Link to="/">
              <img className="d-md-block" src={logo} style={{ width: "90px" }} />
            </Link>
          </div>
          <div className="justify-content-around col-8 row align-items-center fw-bold">
            <div className="col d-flex justify-content-center align-items-center">
              <Link to="/listar-produtos" style={{ textDecoration: "none", color: "black" }}>
                LISTAR PRODUTOS
              </Link>
            </div>
            <div className="col d-flex justify-content-center align-items-center">
              <Link to="/cadastrar-produto" style={{ textDecoration: "none", color: "black" }}>
                CADASTRAR PRODUTO
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
          <div className="col-2 d-flex align-items-center">
            <div className="col d-flex justify-content-center align-items-center">

              {usuarioLogado ? (
                <svg id="i-user" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" style={{ textDecoration: "none", color: "#d9094a" }}>
                  <path d="M22 11 C22 16 19 20 16 20 13 20 10 16 10 11 10 6 12 3 16 3 20 3 22 6 22 11 Z M4 30 L28 30 C28 21 22 20 16 20 10 20 4 21 4 30 Z" />
                </svg>
              ) : (
                <Link className="ms-1" to="/login" style={{ textDecoration: "none", color: "#d9094a" }}>
                  <svg id="i-signin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path d="M3 16 L23 16 M15 8 L23 16 15 24 M21 4 L29 4 29 28 21 28" />
                  </svg>
                </Link>
              )}
            </div>
            <div className="d-flex justify-content-center align-items-center ms-2">
              <Link to="/carrinho" style={{ textDecoration: "none", color: "#d9094a" }}>
                <svg id="i-cart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                  <path d="M6 6 L30 6 27 19 9 19 M27 23 L10 23 5 2 2 2" />
                  <circle cx="25" cy="27" r="2" />
                  <circle cx="12" cy="27" r="2" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-secondary" style={{ padding: "1px" }}></div>
    </>
  );
}
export default NavBar;
