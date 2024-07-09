import { FormEvent, useRef } from "react";
import useProdutoStore from "../store/produtoStore";

const Pesquisa = () => {
  const nome = useProdutoStore(s => s.nome);
  const setNome = useProdutoStore(s => s.setNome);
  const setPagina = useProdutoStore(s => s.setPagina);

  const tratarNome = (nome: string) => {
    setNome(nome);
    setPagina(0);
  }

  const submit = (event: FormEvent) => {
    event.preventDefault();
    tratarNome(nomeRef.current!.value);
  }

  const nomeRef = useRef<HTMLInputElement>(null);

  return (
    <form onSubmit={submit} className="d-flex mb-3">
      <input defaultValue={nome} ref={nomeRef} type="text" className="form-control form-control-sm me-3" placeholder="Pesquisar..." />
      <button className="btn btn-primary btn-sm" type="submit" style={{ backgroundColor: "#d9094a", borderColor: "#d9094a" }}>Pesquisar</button>
    </form>
  );
};
export default Pesquisa;
