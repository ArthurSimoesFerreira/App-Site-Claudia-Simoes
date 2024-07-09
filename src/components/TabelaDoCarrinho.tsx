import useCarrinho from "../hooks/useCarrinho";
import useAdicionarProdutoAoCarrinho from "../hooks/useAdicionarProdutoAoCarrinho";
import useRemoverProdutoDoCarrinho from "../hooks/useRemoverProdutoDoCarrinho";
import useDiminuirProdutoDoCarrinho from "../hooks/useDiminuirProdutoDoCarrinho";
import Produto from "../interfaces/produto";
import Carrinho from "../interfaces/carrinho";

interface Props {
    carrinho: Carrinho[];
}

const TabelaDoCarrinho = ({ carrinho }: Props) => {
    const { mutate: adicionarProdutoAoCarrinho } = useAdicionarProdutoAoCarrinho();
    const { mutate: removerProdutoDoCarrinho } = useRemoverProdutoDoCarrinho();
    const { mutate: diminuirProdutoDoCarrinho } = useDiminuirProdutoDoCarrinho();
    const total = carrinho?.reduce((acc, p) => acc + p.produto.preco * p.quantidade, 0).toFixed(2);

    const handleAdicionarProduto = (produto: Produto) => {
        adicionarProdutoAoCarrinho({ produtoId: produto.id!, quantidade: 1 });
    };

    const handleDiminuirProduto = (produto: Produto) => {
        const produtoNoCarrinho = carrinho!.find(p => p.produto.id === produto.id);
        if (produtoNoCarrinho && produtoNoCarrinho.quantidade > 1) {
            diminuirProdutoDoCarrinho(produto.id!);
        } else {
            removerProdutoDoCarrinho(produto.id!);
        }
    };

    return (
        <>
            {carrinho?.length ? (
                <>
                    <h2 className="text-center mb-4">Carrinho de Compras</h2>
                    <table className="table table-bordered text-center">
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Nome</th>
                                <th>Preço</th>
                                <th>Quantidade</th>
                                <th>Total</th>
                                <th>Ações</th>
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
                                    <td>{quantidade}</td>
                                    <td>R$ {(produto.preco * quantidade).toFixed(2)}</td>
                                    <td>
                                        <button onClick={() => handleDiminuirProduto(produto)} className="btn btn-danger me-2">-</button>
                                        <button onClick={() => handleAdicionarProduto(produto)} className="btn btn-primary">+</button>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={4}>Total</td>
                                <td colSpan={2}>R$ {total}</td>
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
