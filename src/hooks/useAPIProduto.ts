import axios from "axios";
import CustomError from "../util/CustomError";
import { URL_BASE, URL_PRODUTO } from "../util/constants";
import Produto from "../interfaces/produto";

const useAPIProduto = () => {

    const axiosInstance = axios.create({
        baseURL: URL_BASE
    });

    const recuperarProdutosPorSlugDaCategoria = (slug?: string) => axiosInstance
        .get<Produto[]>(URL_PRODUTO + (slug ? "/slugCategoria/" + slug : ""))
        .then((response) => response.data)
        .catch((error) => {
            if (error.response) {
                throw new CustomError(
                    error.response.data.message,
                    error.response.data.errorCode);
                // significa servidor respondeu
            }
            else if(error.request) {
                throw error;
                // significa que o servidor não respondeu
            }
            else {
                throw error;
                // erro desconhecido
            }
        })

    return {recuperarProdutosPorSlugDaCategoria}    
}
export default useAPIProduto