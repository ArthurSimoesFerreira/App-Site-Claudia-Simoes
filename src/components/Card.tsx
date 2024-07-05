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
    <div className="card mb-3" style={{ maxWidth: "540px", minHeight: "300px" }}>
      <div className="row g-0" style={{ minHeight: "300px", maxHeight: "300px" }}>
        <div className="col-md-6">
          <img src={imagem} className="img-fluid rounded-start h-100" style={{ maxHeight: "300px" }} alt={titulo} />
        </div>
        <div className="col-md-6 h-100">
          <div className="card-body">
            <h5 className="card-title">{titulo}</h5>
            <p className="card-text">{descricao}</p>
            <p className="card-text fw-bold" style={{ color: "rgb(220, 53, 69)" }}>
              R$ {preco}
            </p>
            <div className="card-footer border-0 p-0">{footer}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
