import { useParams, useNavigate } from "react-router-dom";
import useProdutoPorId from "../hooks/useProdutoPorId";
import useRemoverProdutoDoCarrinho from "../hooks/useRemoverProdutoDoCarrinho";
import useAdicionarProdutoAoCarrinho from "../hooks/useAdicionarProdutoAoCarrinho";
import useDiminuirProdutoDoCarrinho from "../hooks/useDiminuirProdutoDoCarrinho";
import useCarrinho from "../hooks/useCarrinho";
import useProdutoStore from "../store/produtoStore";
import useRemoverProduto from "../hooks/useRemoverProduto";

const DetalhesDoProdutoPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: produto, error, isPending } = useProdutoPorId(Number(id));
    const { mutate: removerProdutoDoCarrinho } = useRemoverProdutoDoCarrinho();
    const { mutate: adicionarProdutoAoCarrinho } = useAdicionarProdutoAoCarrinho();
    const { mutate: diminuirProdutoDoCarrinho } = useDiminuirProdutoDoCarrinho();
    const { mutate: removerProduto } = useRemoverProduto();
    const { data: carrinho } = useCarrinho();

    const produtoNoCarrinho = carrinho?.find((p) => p.produto.id === Number(id));
    const setProdutoSelecionado = useProdutoStore((s) => s.setProdutoSelecionado);

    if (isPending) return <h6>Carregando...</h6>;
    if (error) throw error;

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
        } else if (produtoNoCarrinho) {
            removerProdutoDoCarrinho(produto.id!);
        }
    };

    const handleRemove = () => {
        removerProduto(produto.id!);
        navigate("/");
    };
    const handleEdit = () => {
        setProdutoSelecionado(produto);
        navigate("/listar-produtos");
    };

    return (
        <div className="row mb-3">
            <div className="col-12 col-md-6 d-flex justify-content-center">
                <img src={`/${produto.imagem}`} alt={produto.nome} className="img-fluid border border-4 rounded border-danger" />
            </div>
            <div className="col-12 col-md-6 d-flex flex-column align-items-center fs-5 border-start border-4 border-danger">
                <h1 className="text-center">{produto.nome}</h1>
                <p>{produto.descricao}</p>
                <p>Preço: R$ {produto.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p>Unidades Disponíveis: {produto.qtdEstoque}</p>
                <p>Categoria: {produto.categoria.nome}</p>
                <div className="mb-3">
                    {produtoNoCarrinho ? (
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="fw-bolder">
                                Quantidade:
                            </div>
                            <button onClick={handleDiminuirProduto} className="btn"><svg id="i-arrow-bottom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                <path d="M6 22 L16 30 26 22 M16 30 L16 2" />
                            </svg></button>
                            <span className="px-3">{produtoNoCarrinho.quantidade}</span>
                            <button onClick={handleAdicionarProduto} className="btn"><svg id="i-arrow-top" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                <path d="M6 10 L16 2 26 10 M16 2 L16 30" />
                            </svg></button>
                        </div>
                    ) : (
                        <button onClick={handleAdicionarProduto} className="btn btn-primary btn-lg" style={{ backgroundColor: "#d9094a", borderColor: "black" }}>Adicionar ao Carrinho</button>
                    )}
                </div>
                <div className="row gap-4">
                    <button onClick={handleEdit} className="col btn btn-warning">Editar</button>
                    <button onClick={handleRemove} className="col btn btn-danger">Remover</button>
                </div>
            </div>
        </div>
    );
};

export default DetalhesDoProdutoPage;
