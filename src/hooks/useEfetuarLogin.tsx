import { useMutation } from "@tanstack/react-query";
import Usuario from "../interfaces/usuario";
import useAPIAutenticacao from "./useAPIAutenticacao";

const useEfetuarLogin = () => {
    const { login } = useAPIAutenticacao();

    return useMutation({
        mutationFn: (usuario: Usuario) => login(usuario),
    });
};

export default useEfetuarLogin;
