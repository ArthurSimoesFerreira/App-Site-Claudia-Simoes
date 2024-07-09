import { useParams, useNavigate } from "react-router-dom";
import useProdutoPorId from "../hooks/useProdutoPorId";
import useRemoverProduto from "../hooks/useRemoverProduto";
import useProdutoStore from "../store/produtoStore";
import useCarrinhoStore from "../store/carrinhoStore";

const DetalhesDoProdutoPage = () => {


    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: produto, error, isPending } = useProdutoPorId(Number(id));
    const { mutate: removerProduto } = useRemoverProduto();
    const setProdutoSelecionado = useProdutoStore((s) => s.setProdutoSelecionado);
    const adicionarProduto = useCarrinhoStore((s) => s.adicionarProduto);
    const atualizarQuantidade = useCarrinhoStore((s) => s.atualizarQuantidade);
    const produtoNoCarrinho = useCarrinhoStore((s) =>
        s.produtos.find((p) => p.produto.id === Number(id))
    );
    console.log("produtocarrinho: " + produtoNoCarrinho);


    if (isPending) return <h6>Carregando...</h6>;
    if (error) throw error;

    const handleRemove = () => {
        removerProduto(Number(id));
        navigate("/listar-produtos");
    };

    const handleEdit = () => {
        setProdutoSelecionado(produto);
        navigate("/listar-produtos");
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
                    <button onClick={handleEdit} className="btn btn-warning">Editar</button>
                    <button onClick={handleRemove} className="btn btn-danger">Remover</button>
                    {produtoNoCarrinho ? (
                        <div className="d-flex justify-content-between align-items-center">
                            <button onClick={() => atualizarQuantidade(Number(id), -1)} className="btn btn-danger">-</button>
                            <span className="px-3">{produtoNoCarrinho.quantidade}</span>
                            <button onClick={() => atualizarQuantidade(Number(id), +1)} className="btn btn-primary">+</button>
                        </div>
                    ) : (
                        <button onClick={() => adicionarProduto(produto)} className="btn btn-primary">Adicionar ao Carrinho</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetalhesDoProdutoPage;
