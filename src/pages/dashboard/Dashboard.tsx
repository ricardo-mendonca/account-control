import { FerramentasDaListagem, FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

export const Dashboard = () => {
  return (
  <LayoutBaseDePagina
    titulo="Pagina Inicial" 
    barraDeFerramentas={
      <FerramentasDaListagem mostrarBotaoNovo ={false} />
    }>
   
  </LayoutBaseDePagina>);
};
