import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import { Icon,IconButton,LinearProgress,Paper,Table,TableBody,TableCell,TableContainer,TableFooter,TableHead,TableRow,} from "@mui/material";
import { DespesasService, IListagemDespesa } from "../../shared/services/api/Despesas/DespesasService";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { Environment } from "../../shared/environment";
import { useDebounce } from "../../shared/hooks";

export const ListagemDeDespesas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(600, false);
  const navigate = useNavigate();

  const [rows, setRows] = useState<IListagemDespesa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const busca = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get("pagina") || "1");
  }, [searchParams]);


  
  useEffect(() => {
    setIsLoading(true);
  
    debounce(()=>{      
      DespesasService.get( pagina,busca)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            setTotalCount(result.totalCount);
            

            console.log(result);
            setRows(result.data);
          }

        });
    });
  }, [busca, debounce, pagina]);

  return (
    <LayoutBaseDePagina
      titulo="Listagem de Despesas"
      barraDeFerramentas={
        <FerramentasDaListagem
          textoBotaoNovo="Nova Despesa"
          aoClicarEmNovo={() => navigate("/despesa/nova")}
        />
      }
    >
      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
                <TableCell>Ação</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Efetivado</TableCell>
                <TableCell>Parcela</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                <IconButton size="small" onClick={() => navigate(`/despesa/${row.id}`)} >
                    <Icon>edit</Icon>
                  </IconButton>
	              </TableCell>
	              <TableCell>{row.id}</TableCell>
	              <TableCell>{row.descricao}</TableCell>
	              <TableCell>{row.valorParcela}</TableCell>
	              <TableCell>{row.pago}</TableCell>
	              <TableCell>{row.valorParcela}</TableCell>
	              <TableCell>{row.parcela}</TableCell>
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
