import { ReactNode } from "react";

interface Props {
  id?: number;
  imagem: string;
  titulo: string;
  descricao: string;
  preco: string;
  footer: ReactNode;
}

const Card = ({ imagem, titulo, descricao, preco, footer }: Props) => {
  return (
    <div className="card h-100 border-0">
      <img src={imagem} className="card-img-top" alt={titulo} />
      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text">{descricao}</p>
        <p className="card-text fw-bold" style={{color: "rgb(220, 53, 69)"}}>R$ {preco}</p>
      </div>
      <div className="card-footer border-0 p-0">{footer}</div>
    </div>
  );
};
export default Card;
