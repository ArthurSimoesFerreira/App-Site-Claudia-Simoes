import Produto from "./produto";

interface Carrinho {
    id: number;
    produto: Produto;
    quantidade: number;
}

export default Carrinho;
