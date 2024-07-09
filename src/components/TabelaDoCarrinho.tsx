import useCarrinhoStore from "../store/carrinhoStore";

const TabelaDoCarrinho = () => {
    const { produtos, adicionarProduto, removerProduto, atualizarQuantidade } = useCarrinhoStore();
    const total = produtos.reduce((acc, p) => acc + p.produto.preco * p.quantidade, 0).toFixed(2);

    return (
        <table className="table table-responsive table-sm table-hover table-bordered">
            <thead>
                <tr>
                    <th className="align-middle text-center">Imagem</th>
                    <th className="align-middle text-center">Nome</th>
                    <th className="align-middle text-center">Quantidade</th>
                    <th className="align-middle text-center">Preço</th>
                    <th className="align-middle text-center">Total</th>
                    <th className="align-middle text-center">Ação</th>
                </tr>
            </thead>
            <tbody>
                {produtos.map(({ produto, quantidade }) => (
                    <tr key={produto.id}>
                        <td width="12%" className="align-middle text-center">
                            <img src={produto.imagem} width={45} alt={produto.nome} />
                        </td>
                        <td width="20%" className="align-middle text-center">
                            {produto.nome}
                        </td>
                        <td width="12%" className="align-middle text-center">
                            <button onClick={() => atualizarQuantidade(produto.id, -1)} className="btn btn-danger btn-sm">-</button>
                            <span className="px-3">{quantidade}</span>
                            <button onClick={() => adicionarProduto(produto)} className="btn btn-primary btn-sm">+</button>
                        </td>
                        <td width="12%" className="align-middle text-end pe-3">
                            R$ {produto.preco.toFixed(2)}
                        </td>
                        <td width="12%" className="align-middle text-end pe-3">
                            R$ {(produto.preco * quantidade).toFixed(2)}
                        </td>
                        <td width="12%" className="align-middle text-center">
                            <button onClick={() => removerProduto(produto.id)} className="btn btn-danger btn-sm">Remover</button>
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={4}></td>
                    <td className="align-middle text-center fw-bold">Total:</td>
                    <td className="align-middle text-center fw-bold">R$ {total}</td>
                </tr>
            </tfoot>
        </table>
    );
};

export default TabelaDoCarrinho;
