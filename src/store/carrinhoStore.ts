import { create } from 'zustand';
import Produto from '../interfaces/produto';

interface ProdutoCarrinho {
    produto: Produto;
    quantidade: number;
}

interface CarrinhoStore {
    produtos: ProdutoCarrinho[];
    adicionarProduto: (produto: Produto, quantidade: number) => void;
    removerProduto: (produtoId: number) => void;
    atualizarQuantidade: (produtoId: number, quantidade: number) => void;
    limparCarrinho: () => void;
}

const useCarrinhoStore = create<CarrinhoStore>((set) => ({
    produtos: [],
    adicionarProduto: (produto, quantidade) => set((state) => {
        const produtoExistente = state.produtos.find(p => p.produto.id === produto.id);
        if (produtoExistente) {
            return {
                produtos: state.produtos.map(p =>
                    p.produto.id === produto.id ? { ...p, quantidade: p.quantidade + quantidade } : p
                )
            };
        } else {
            return {
                produtos: [...state.produtos, { produto, quantidade }]
            };
        }
    }),
    removerProduto: (produtoId) => set((state) => ({
        produtos: state.produtos.filter(p => p.produto.id !== produtoId)
    })),
    atualizarQuantidade: (produtoId, quantidade) => set((state) => ({
        produtos: state.produtos.map(p =>
            p.produto.id === produtoId ? { ...p, quantidade } : p
        ).filter(p => p.quantidade > 0)
    })),
    limparCarrinho: () => set(() => ({
        produtos: []
    }))
}));

export default useCarrinhoStore;
