import useAdicionarProdutoAoCarrinho from "../hooks/useAdicionarProdutoAoCarrinho";
import useRemoverProdutoDoCarrinho from "../hooks/useRemoverProdutoDoCarrinho";
import useDiminuirProdutoDoCarrinho from "../hooks/useDiminuirProdutoDoCarrinho";
import Produto from "../interfaces/produto";
import Carrinho from "../interfaces/carrinho";
import useRemoverProduto from "../hooks/useRemoverProduto";

interface Props {
    carrinho: Carrinho[];
}

const TabelaDoCarrinho = ({ carrinho }: Props) => {
    const { mutate: adicionarProdutoAoCarrinho } = useAdicionarProdutoAoCarrinho();
    const { mutate: removerProdutoDoCarrinho } = useRemoverProdutoDoCarrinho();
    const { mutate: diminuirProdutoDoCarrinho } = useDiminuirProdutoDoCarrinho();
    const { mutate: removerProduto } = useRemoverProduto();
    const total = carrinho?.reduce((acc, p) => acc + p.produto.preco * p.quantidade, 0).toFixed(2);

    const handleAdicionarProduto = (produto: Produto) => {
        const produtoNoCarrinho = carrinho.find(p => p.produto.id === produto.id);

        if (produtoNoCarrinho && produtoNoCarrinho.quantidade < produto.qtdEstoque) {
            adicionarProdutoAoCarrinho({ produtoId: produto.id!, quantidade: 1 });
        }
    };

    const handleDiminuirProduto = (produto: Produto) => {
        const produtoNoCarrinho = carrinho!.find(p => p.produto.id === produto.id);
        if (produtoNoCarrinho && produtoNoCarrinho.quantidade > 1) {
            diminuirProdutoDoCarrinho(produto.id!);
        } else {
            removerProdutoDoCarrinho(produto.id!);
        }
    };

    const handleRemoverProduto = (produtoId: number) => {
        removerProdutoDoCarrinho(produtoId);
    };

    return (
        <>
            {carrinho?.length ? (
                <>
                    <table className="table text-center align-middle">
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Nome</th>
                                <th>Preço</th>
                                <th>Quantidade</th>
                                <th>Total</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carrinho.map(({ produto, quantidade }) => (
                                <tr key={produto.id}>
                                    <td>
                                        <img src={produto.imagem} alt={produto.nome} style={{ width: "100px", height: "100px" }} />
                                    </td>
                                    <td>{produto.nome}</td>
                                    <td>R$ {produto.preco.toFixed(2)}</td>
                                    <td>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <button onClick={() => handleDiminuirProduto(produto)} className="btn"><svg id="i-arrow-bottom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                                <path d="M6 22 L16 30 26 22 M16 30 L16 2" />
                                            </svg></button>
                                            <span>{quantidade}</span>
                                            <button onClick={() => handleAdicionarProduto(produto)} className="btn"><svg id="i-arrow-top" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                                <path d="M6 10 L16 2 26 10 M16 2 L16 30" />
                                            </svg></button>
                                        </div>
                                    </td>
                                    <td>R$ {(produto.preco * quantidade).toFixed(2)}</td>
                                    <td>
                                        <button onClick={() => handleRemoverProduto(produto.id!)} className="btn btn-danger">Remover</button>
                                    </td>
                                </tr>
                            ))}
                            <tr className="fw-bold">
                                <td colSpan={4}>Total do Pedido</td>
                                <td colSpan={0}>R$ {total}</td>
                            </tr>
                        </tbody>
                    </table>
                </>
            ) : (
                <h2 className="text-center">Seu carrinho está vazio</h2>
            )}
        </>
    );
};

export default TabelaDoCarrinho;
