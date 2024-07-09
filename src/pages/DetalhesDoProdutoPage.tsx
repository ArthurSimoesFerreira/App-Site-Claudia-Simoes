import { useParams, useNavigate } from "react-router-dom";
import useProdutoPorId from "../hooks/useProdutoPorId";
import useRemoverProdutoDoCarrinho from "../hooks/useRemoverProdutoDoCarrinho";
import useCarrinhoStore from "../store/carrinhoStore";
import useAdicionarProdutoAoCarrinho from "../hooks/useAdicionarProdutoAoCarrinho";
import useDiminuirProdutoDoCarrinho from "../hooks/useDiminuirProdutoDoCarrinho";

const DetalhesDoProdutoPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: produto, error, isPending } = useProdutoPorId(Number(id));
    const { adicionarProduto, atualizarQuantidade, removerProduto } = useCarrinhoStore();
    const { mutate: removerProdutoDoCarrinho } = useRemoverProdutoDoCarrinho();
    const { mutate: adicionarProdutoAoCarrinho } = useAdicionarProdutoAoCarrinho();
    const { mutate: diminuirProdutoDoCarrinho } = useDiminuirProdutoDoCarrinho();
    const produtoNoCarrinho = useCarrinhoStore((s) =>
        s.produtos.find((p) => p.produto.id === Number(id))
    );

    if (isPending) return <h6>Carregando...</h6>;
    if (error) throw error;

    const handleAdicionarProduto = () => {
        adicionarProduto(produto, 1);
        adicionarProdutoAoCarrinho({ produtoId: produto.id!, quantidade: 1 });
    };

    const handleDiminuirProduto = () => {
        if (produtoNoCarrinho && produtoNoCarrinho.quantidade > 1) {
            atualizarQuantidade(produto.id!, -1);
            diminuirProdutoDoCarrinho(produto.id!);
        } else if (produtoNoCarrinho) {
            removerProduto(produto.id!);
            removerProdutoDoCarrinho(produto.id!);
        }
    };

    return (
        <div className="row">
            <div className="col-12 col-md-6 d-flex justify-content-center">
                <img src={`/${produto.imagem}`} alt={produto.nome} className="img-fluid  border border-dark" />
            </div>
            <div className="col-12 col-md-6 d-flex flex-column align-items-center">
                <h1 className="text-center">{produto.nome}</h1>
                <p>{produto.descricao}</p>
                <p>Preço: R$ {produto.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <div className="d-grid gap-2 w-100">
                    {produtoNoCarrinho ? (
                        <div className="d-flex justify-content-between align-items-center">
                            <button onClick={handleDiminuirProduto} className="btn btn-danger">-</button>
                            <span className="px-3">{produtoNoCarrinho.quantidade}</span>
                            <button onClick={handleAdicionarProduto} className="btn btn-primary">+</button>
                        </div>
                    ) : (
                        <button onClick={handleAdicionarProduto} className="btn btn-primary">Adicionar ao Carrinho</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetalhesDoProdutoPage;
