import axios, { AxiosRequestConfig } from "axios";
import { URL_BASE } from "../util/constants";
import CustomError from "../util/CustomError";

const useAPI = <T>(endpoint: string) => {

    const axiosInstance = axios.create({
        baseURL: URL_BASE
    });

    const recuperar = () => axiosInstance
        .get<T[]>(endpoint)
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

    const remover = (id: number) => axiosInstance
        .delete<T>(endpoint + "/" + id)
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

    const recuperarPagina = (config: AxiosRequestConfig) => axiosInstance
        .get<ResultadoPaginado<T>>(endpoint + "/paginacao", config)
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

    const cadastrar = (obj: T) => axiosInstance
        .post<T>(endpoint, obj)
        .then((response) => response.data)
        .catch((error) => {
            console.log(error.response);
            if (error.response) {
                // significa servidor respondeu
                if (error.response.data.errorCode === 422) {
                    throw new CustomError(
                        error.response.data.message,
                        error.response.data.errorCode,
                        Object.values(error.response.data.map));
                }
                else {
                    throw new CustomError(
                        error.response.data.message,
                        error.response.data.errorCode);
                }
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

    const alterar = (obj: T) => axiosInstance
        .put<T>(endpoint, obj)
        .then((response) => response.data)
        .catch((error) => {
            console.log(error.response);
            if (error.response) {
                // significa servidor respondeu
                if (error.response.data.errorCode === 422) {
                    throw new CustomError(
                        error.response.data.message,
                        error.response.data.errorCode,
                        Object.values(error.response.data.map));
                }
                else {
                    throw new CustomError(
                        error.response.data.message,
                        error.response.data.errorCode);
                }
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

    return {recuperar, remover, recuperarPagina, cadastrar, alterar}    
}
export default useAPI