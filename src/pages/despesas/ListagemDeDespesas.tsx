import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useNavigate } from "react-router-dom";
import {
  Icon,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const ListagemDeDespesas: React.FC = () => {
  const navigate = useNavigate();

  return (
    <LayoutBaseDePagina
      titulo="Listagem de Despesas"
      barraDeFerramentas={
        <FerramentasDaListagem
          textoBotaoNovo="Nova Despesa"
          aoClicarEmNovo={() => navigate("/despesas/detalhe/nova")}
        />
      }
    >
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ m: 1, width: "auto" }}
      >
        <Table>
          <TableHead>

            <TableRow>
                <TableCell>Ação</TableCell>
                <TableCell>ds_descricao</TableCell>
                <TableCell>ds_categoria</TableCell>
                <TableCell>dt_vencimento</TableCell>
                <TableCell>vl_valor_parc</TableCell>
                <TableCell>ds_pago_descricao</TableCell>
                <TableCell>ds_parcela</TableCell>
            </TableRow>

          </TableHead>

          <TableBody>
            
          <TableRow>
	        <TableCell>
		        <IconButton size="small"><Icon>edit</Icon></IconButton>
	        </TableCell>
	        <TableCell>teste 1977</TableCell>
	        <TableCell>IPTU</TableCell>
	        <TableCell>31/12/2022</TableCell>
	        <TableCell>1250.00</TableCell>
	        <TableCell>Não</TableCell>
	        <TableCell>1 / 2</TableCell>
        </TableRow>

        <TableRow>
	        <TableCell>
		        <IconButton size="small"><Icon>edit</Icon></IconButton>
	        </TableCell>
	        <TableCell>IPTU Terreno</TableCell>
	        <TableCell>Sabesp 1</TableCell>
	        <TableCell>01/12/2022</TableCell>
	        <TableCell>59.00</TableCell>
	        <TableCell>Não</TableCell>
	        <TableCell>Despesa Fixa</TableCell>
        </TableRow>

            

          </TableBody>
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  );
};
