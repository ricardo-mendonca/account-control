import { debounce, Icon,IconButton,LinearProgress,Paper,Table,TableBody,TableCell,TableContainer,TableFooter,TableHead,TableRow,} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { DespesasService, IListagemDespesa } from "../../shared/services/api/Despesas/DespesasService";
import { useDebounce } from "../../shared/hooks";
import { Environment } from "../../shared/environment";





export const ListagemDeDespesas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(600, false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [rows, setRows] = useState<IListagemDespesa[]>([]);

  const dataI = useMemo(() => {
    return searchParams.get("dataI") || "";
  }, [searchParams]);

  const dataF = useMemo(() => {
    return searchParams.get("dataF") || "";
  }, [searchParams]);

  
  useEffect(() => {
    setIsLoading(true);
  
    debounce(()=>{
   
      DespesasService.get( dataI, dataF)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            
            setRows(result.data);
          }

        });
    });

  },[dataI, dataF]);

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
      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
                <TableCell>Ação</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Vencimento</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Efetivado</TableCell>
                <TableCell>Parcela</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                <IconButton size="small" onClick={() => navigate(`/despesas/detalhe/${row.id}`)} >
                    <Icon>edit</Icon>
                  </IconButton>
	              </TableCell>
	              <TableCell>{row.ds_descricao}</TableCell>
	              <TableCell>{row.ds_categoria}</TableCell>
	              <TableCell>{row.dt_vencimento}</TableCell>
	              <TableCell>{row.vl_valor_parc}</TableCell>
	              <TableCell>{row.ds_pago_descricao}</TableCell>
	              <TableCell>{row.ds_parcela}</TableCell>
            </TableRow>
            ))}
          </TableBody>
          {rows === null && !isLoading && (
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          )}
          <TableFooter>
          {isLoading && (
                <TableRow>
                <TableCell colSpan={12}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
                </TableRow>
              )}
          </TableFooter>

        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  );
};
