import { useState } from "react";

import { FerramentasDeDetalhe } from "../../shared/components";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutBaseDePagina } from "../../shared/layouts";

export const DetalheDeDespesas: React.FC = () => {
  const navigate = useNavigate();
  const { id = "nova" } = useParams<"id">();
  const [nome, setNome] = useState("");

  return (
    <LayoutBaseDePagina
      titulo={id === "nova" ? "Nova Despesa" : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          aoClicarEmNovo={() => navigate("/despesas/detalhe/nova")}
          aoClicarEmVoltar={() => navigate("/despesas")}
        />
      }
    >
        teste
    </LayoutBaseDePagina>
  );
};
