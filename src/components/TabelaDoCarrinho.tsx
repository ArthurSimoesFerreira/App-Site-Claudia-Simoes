import useCarrinhoStore from "../store/carrinhoStore";
import useAdicionarProdutoAoCarrinho from "../hooks/useAdicionarProdutoAoCarrinho";
import useRemoverProdutoDoCarrinho from "../hooks/useRemoverProdutoDoCarrinho";
import useDiminuirProdutoDoCarrinho from "../hooks/useDiminuirProdutoDoCarrinho";
import Produto from "../interfaces/produto";

const TabelaDoCarrinho = () => {
    const { produtos, adicionarProduto, removerProduto, atualizarQuantidade } = useCarrinhoStore();
    const { mutate: adicionarProdutoAoCarrinho } = useAdicionarProdutoAoCarrinho();
    const { mutate: removerProdutoDoCarrinho } = useRemoverProdutoDoCarrinho();
    const { mutate: diminuirProdutoDoCarrinho } = useDiminuirProdutoDoCarrinho();
    const total = produtos.reduce((acc, p) => acc + p.produto.preco * p.quantidade, 0).toFixed(2);

    const handleAdicionarProduto = (produto: Produto) => {
        adicionarProduto(produto, 1);
        adicionarProdutoAoCarrinho({ produtoId: produto.id!, quantidade: 1 });
    };

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
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Produto</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Quantidade</th>
                        <th scope="col">Subtotal</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map(({ produto, quantidade }) => (
                        <tr key={produto.id}>
                            <td>{produto.nome}</td>
                            <td>R$ {produto.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true })}</td>
                            <td>{quantidade}</td>
                            <td>R$ {(produto.preco * quantidade).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true })}</td>
                            <td>
                                <button onClick={() => handleDiminuirProduto(produto)} className="btn btn-danger btn-sm mx-1">-</button>
                                <button onClick={() => handleAdicionarProduto(produto)} className="btn btn-success btn-sm mx-1">+</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={3} className="text-end fw-bold">Total:</td>
                        <td className="fw-bold">R$ {total}</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default TabelaDoCarrinho;
