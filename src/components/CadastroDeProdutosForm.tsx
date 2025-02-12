import { useForm } from "react-hook-form";
import databaseAdd from "../assets/skin/database_add.png";
import databaseEdit from "../assets/skin/database_edit.png";
import databaseCancel from "../assets/skin/multiply.png";
import Produto from "../interfaces/produto";
import Categoria from "../interfaces/categoria";
import useCadastrarProduto from "../hooks/useCadastrarProduto";
import { useEffect } from "react";
import { z } from "zod";
import dataValida from "../util/dataValida";
import { zodResolver } from "@hookform/resolvers/zod";
import useProdutoStore from "../store/produtoStore";
import dayjs from "dayjs";
import useAlterarProduto from "../hooks/useAlterarProduto";

const categoriaValida = (categoria: string) => {
  return categoria !== "0";
};

const regexData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
const regexImagem = /^[a-z0-9_]+\.(gif|jpg|png|bmp)$/;
const schema = z.object({
  nome: z
    .string()
    .min(1, { message: "O nome deve ser informado." })
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres." }),
  descricao: z.string().min(1, { message: "A descição deve ser informada." }),
  categoria: z.string().refine(categoriaValida, { message: "A categoria deve ser informada." }),
  data_cadastro: z
    .string()
    .min(1, { message: "A data de cadastro deve ser informada." })
    .regex(regexData, { message: "Data inválida." })
    .refine(dataValida, { message: "Data inválida." }),
  preco: z
    .number({ invalid_type_error: "O preço deve ser informado." })
    .min(0.1, { message: "O preço deve ser maior ou igual a R$ 0.10" }),
  qtd_estoque: z
    .number({ invalid_type_error: "A quantidade em estoque deve ser informada." })
    .min(0, { message: "A quantidade em estoque deve ser maior do que zero." }),
  imagem: z
    .string()
    .min(1, { message: "A imagem deve ser informada." })
    .regex(regexImagem, { message: "Nome de imagem inválido." }),
  disponivel: z.boolean(),
});

const CadastroDeProdutosForm = () => {
  const produtoSelecionado = useProdutoStore((s) => s.produtoSelecionado);
  const setProdutoSelecionado = useProdutoStore((s) => s.setProdutoSelecionado);

  type FormProduto = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    setValue,
    formState: { isSubmitSuccessful, errors },
  } = useForm<FormProduto>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (!produtoSelecionado.id) {
      setFocus("nome");
      reset();
      setProdutoSelecionado({} as Produto);
    }
  }, [isSubmitSuccessful, produtoSelecionado.id, reset, setFocus, setProdutoSelecionado]);

  useEffect(() => {
    if (produtoSelecionado.id) {
      setValue("nome", produtoSelecionado.nome);
      setValue("descricao", produtoSelecionado.descricao);
      setValue("categoria", String(produtoSelecionado.categoria.id));
      setValue("data_cadastro", dayjs(produtoSelecionado.dataCadastro).format("DD/MM/YYYY"));
      setValue("preco", produtoSelecionado.preco);
      setValue("qtd_estoque", produtoSelecionado.qtdEstoque);
      setValue("imagem", produtoSelecionado.imagem);
      setValue("disponivel", produtoSelecionado.disponivel);
    } else {
      setFocus("nome");
      reset();
    }
  }, [produtoSelecionado, setFocus, reset, setValue]);

  const { mutate: cadastrarProduto, error: errorCadastrarProduto } = useCadastrarProduto();
  const { mutate: alterarProduto, error: errorAlterarProduto } = useAlterarProduto();

  const onSubmit = ({
    nome,
    descricao,
    categoria,
    data_cadastro,
    preco,
    qtd_estoque,
    imagem,
    disponivel,
  }: FormProduto) => {
    const produto: Produto = {
      nome: nome,
      descricao: descricao,
      imagem: imagem,
      categoria: { id: parseInt(categoria) } as Categoria,
      disponivel: disponivel,
      dataCadastro: new Date(
        data_cadastro.substring(6, 10) +
        "-" +
        data_cadastro.substring(3, 5) +
        "-" +
        data_cadastro.substring(0, 2)
      ),
      qtdEstoque: qtd_estoque,
      preco: preco,
    };
    if (produtoSelecionado.id) {
      produto.id = produtoSelecionado.id;
      alterarProduto(produto);
    } else {
      cadastrarProduto(produto);
    }
  };

  if (errorCadastrarProduto) throw errorCadastrarProduto;
  if (errorAlterarProduto) throw errorAlterarProduto;

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="Off">
      <div className="row">
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="nome" className="col-xl-2 fw-bold">
              Nome
            </label>
            <div className="col-xl-10">
              <input
                {...register("nome")}
                type="text"
                id="nome"
                className={
                  errors.nome
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">{errors.nome?.message}</div>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="descricao" className="col-xl-3 fw-bold">
              Descrição
            </label>
            <div className="col-xl-9">
              <input
                {...register("descricao")}
                type="text"
                id="descricao"
                className={
                  errors.descricao
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">{errors.descricao?.message}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-1">
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="categoria" className="col-xl-2 fw-bold">
              Categoria
            </label>
            <div className="col-xl-10">
              <select
                {...register("categoria")}
                id="categoria"
                className={
                  errors.categoria
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              >
                <option value="0">Selecione uma categoria</option>
                <option value="1">Camisa</option>
                <option value="2">Legging</option>
                <option value="3">Top</option>
              </select>
              <div className="invalid-feedback">{errors.categoria?.message}</div>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="data_cadastro" className="col-xl-3 fw-bold">
              Data Cadastro
            </label>
            <div className="col-xl-9">
              <input
                {...register("data_cadastro")}
                type="text"
                id="data_cadastro"
                className={
                  errors.data_cadastro
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">{errors.data_cadastro?.message}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-1">
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="preco" className="col-xl-2 fw-bold">
              Preço
            </label>
            <div className="col-xl-4">
              <input
                {...register("preco", { valueAsNumber: true })}
                type="number"
                step="0.01"
                id="preco"
                className={
                  errors.preco
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">{errors.preco?.message}</div>
            </div>
            <label htmlFor="qtd_estoque" className="col-xl-3 fw-bold">
              Qtd. Estoque
            </label>
            <div className="col-xl-3">
              <input
                {...register("qtd_estoque", { valueAsNumber: true })}
                type="number"
                id="qtd_estoque"
                className={
                  errors.qtd_estoque
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">{errors.qtd_estoque?.message}</div>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="imagem" className="col-xl-3 fw-bold">
              Imagem
            </label>
            <div className="col-xl-6">
              <input
                {...register("imagem")}
                type="text"
                id="imagem"
                className={
                  errors.imagem
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">{errors.imagem?.message}</div>
            </div>
            <div className="col-xl-3">
              <input
                {...register("disponivel")}
                type="checkbox"
                id="disponivel"
                className="form-check-input"
              />
              <label htmlFor="disponivel" className="form-check-label fw-bold">
                Disponível
              </label>
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-2" />
      <div className="row mb-1">
        <div className="col-xl-12">
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-outline-primary btn-sm fw-bold"
            >
              <img
                src={produtoSelecionado.id ? databaseEdit : databaseAdd}
                alt=""
                width="18"
                className="me-1"
              />
              {produtoSelecionado.id ? "Alterar" : "Cadastrar"}
            </button>
            <button
              type="button"
              className="btn btn-outline-warning btn-sm fw-bold ms-2"
              onClick={() => {
                reset();
                setProdutoSelecionado({} as Produto);
              }}
            >
              <img src={databaseCancel} alt="" width="18" className="me-1" />
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CadastroDeProdutosForm;
