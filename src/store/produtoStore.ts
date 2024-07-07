import { create } from "zustand";
import Produto from "../interfaces/produto";

interface ProdutoStore {
    pagina: number;
    tamanho: number;
    nome: string;
    produtoSelecionado: Produto;
    ordenacaoCampo: string;
    ordenacaoDirecao: string;

    setPagina: (pagina: number) => void;
    setTamanho: (tamanho: number) => void;
    setNome: (nome: string) => void;
    setProdutoSelecionado: (produtoSelecionado: Produto) => void;
    setOrdenacaoCampo: (campo: string) => void;
    setOrdenacaoDirecao: (direcao: string) => void;
}

const useProdutoStore = create<ProdutoStore>((set) => ({
    pagina: 0,
    tamanho: 5,
    nome: "",
    produtoSelecionado: {} as Produto,
    ordenacaoCampo: "id",
    ordenacaoDirecao: "asc",

    setPagina: (pagina: number) => set(() => ({ pagina: pagina })),
    setTamanho: (tamanho: number) => set(() => ({ tamanho: tamanho })),
    setNome: (nome: string) => set(() => ({ nome: nome })),
    setProdutoSelecionado: (produtoSelecionado: Produto) => set(() => ({ produtoSelecionado: produtoSelecionado })),
    setOrdenacaoCampo: (campo: string) => set(() => ({ ordenacaoCampo: campo })),
    setOrdenacaoDirecao: (direcao: string) => set(() => ({ ordenacaoDirecao: direcao }))
}));

export default useProdutoStore;
