import { create } from "zustand";
import Produto from "../interfaces/produto";

interface ProdutoCarrinho {
    produto: Produto;
    quantidade: number;
}

interface CarrinhoState {
    produtos: ProdutoCarrinho[];
    adicionarProduto: (produto: Produto) => void;
    removerProduto: (produtoId: number | undefined) => void;
    atualizarQuantidade: (produtoId: number | undefined, quantidade: number) => void;
    limparCarrinho: () => void;
}

const useCarrinhoStore = create<CarrinhoState>((set) => ({
    produtos: [],
    adicionarProduto: (produto) =>
        set((state) => {
            const existente = state.produtos.find((p) => p.produto.id === produto.id);
            if (existente) {
                return {
                    produtos: state.produtos.map((p) =>
                        p.produto.id === produto.id
                            ? { ...p, quantidade: p.quantidade + 1 }
                            : p
                    ),
                };
            } else {
                return { produtos: [...state.produtos, { produto, quantidade: 1 }] };
            }
        }),
    removerProduto: (produtoId) =>
        set((state) => ({
            produtos: state.produtos.filter((p) => p.produto.id !== produtoId),
        })),
    atualizarQuantidade: (produtoId, quantidade) =>
        set((state) => {
            const produtosAtualizados = state.produtos.map((p) =>
                p.produto.id === produtoId
                    ? { ...p, quantidade: p.quantidade + quantidade }
                    : p
            ).filter((p) => p.quantidade > 0);
            return { produtos: produtosAtualizados };
        }),
    limparCarrinho: () => set({ produtos: [] })
}));

export default useCarrinhoStore;
