import axios from "axios";
import CustomError from "../util/CustomError";
import { URL_BASE, URL_CARRINHO } from "../util/constants";
import Carrinho from "../interfaces/carrinho";

const useAPICarrinho = () => {
    const axiosInstance = axios.create({
        baseURL: URL_BASE,
        timeout: 10000,
    });

    const obterCarrinho = async (): Promise<Carrinho[]> => {
        try {
            const response = await axiosInstance.get(URL_CARRINHO);
            return response.data;
        } catch (error: any) {
            throw new CustomError(error.response.data.message, error.response.status);
        }
    };

    const adicionarProduto = async (produtoId: number, quantidade: number): Promise<Carrinho> => {
        try {

            const response = await axiosInstance.post(
                `${URL_CARRINHO}/adicionar/${produtoId}?quantidade=${quantidade}`
            );

            return response.data;
        } catch (error: any) {
            throw new CustomError(error.response.data.message, error.response.status);
        }
    };

    const removerProduto = async (produtoId: number): Promise<void> => {
        try {
            await axiosInstance.delete(`${URL_CARRINHO}/remover/${produtoId}`);
        } catch (error: any) {
            throw new CustomError(error.response.data.message, error.response.status);
        }
    };

    const diminuirQuantidadeProduto = async (produtoId: number): Promise<Carrinho> => {
        try {
            const response = await axiosInstance.put(`${URL_CARRINHO}/diminuir/${produtoId}`);
            return response.data;
        } catch (error: any) {
            throw new CustomError(error.response.data.message, error.response.status);
        }
    };

    const finalizarCompra = async (): Promise<void> => {
        try {
            await axiosInstance.post(`${URL_CARRINHO}/finalizar`);
        } catch (error: any) {
            throw new CustomError(error.response.data.message, error.response.status);
        }
    };

    return {
        obterCarrinho,
        adicionarProduto,
        removerProduto,
        diminuirQuantidadeProduto,
        finalizarCompra,
    };
};

export default useAPICarrinho;
