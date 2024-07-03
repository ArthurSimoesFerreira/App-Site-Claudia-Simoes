import { create } from "zustand";
import Produto from "../interfaces/produto";

interface ProdutoStore {
    pagina: number;
    tamanho: number;
    nome: string;
    produtoSelecionado: Produto;

    setPagina: (pagina: number) => void;
    setTamanho: (tamanho: number) => void;
    setNome: (nome: string) => void;
    setProdutoSelecionado: (produtoSelecionado: Produto) => void;
}

const useProdutoStore = create<ProdutoStore>((set) => ({
    pagina: 0,
    tamanho: 5,
    nome: "",
    produtoSelecionado: {} as Produto,

    setPagina: (pagina: number) => set(() => ({pagina: pagina})),
    setTamanho: (tamanho: number) => set(() => ({tamanho: tamanho})),
    setNome: (nome: string) => set(() => ({nome: nome})),
    setProdutoSelecionado: (produtoSelecionado: Produto) => set(() => ({produtoSelecionado: produtoSelecionado}))
})) 
export default useProdutoStore;