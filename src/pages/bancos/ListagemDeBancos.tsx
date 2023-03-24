import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { BancosService, IListagemBanco } from "../../shared/services/api/Bancos/BancosService";
import { FerramentasDaListagem } from "../../shared/components"
import { Environment } from "../../shared/environment";
import { useDebounce } from "../../shared/hooks";
import { LayoutBaseDePagina } from "../../shared/layouts"

export const ListagemDeBanco: React.FC = () => {
    const navigate = useNavigate();
//tempo de busca ao digitar
    const { debounce } = useDebounce(600, false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalCount, setTotalCount] = useState(0);
    const [rows, setRows] = useState<IListagemBanco[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    //permite edicao do campo de input
    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    const pagina = useMemo(() => {
        return Number(searchParams.get("pagina") || "1");
    }, [searchParams]);
    const handleDelete = (id: number) => {
        if(window.confirm('Mano, tem certeza que quer apagar o registro '+id+' ?')){
           
          BancosService.deleteById(id)
          .then(result =>{
            if(result instanceof Error){
              alert(result.message);
            } else{
              setRows(oldRows => [
                ...oldRows.filter(oldRow => oldRow.id !== id),
              ]);
              alert('Registro apagado com sucesso!');
            }
          })
        };
    };

    useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            BancosService.get(pagina, busca)
            .then((result) => {
                setIsLoading(false);

                if (result instanceof Error) {
                    alert(result.message);
                    return;
                } else {
                    setTotalCount(result.totalCount);

                    setRows(result.data);
                }
                console.log(result);
            });
        });
        }, [busca, debounce, pagina]);

    return (
        <LayoutBaseDePagina titulo='Listagem de bancos'
            barraDeFerramentas={
                <FerramentasDaListagem
                    mostrarInputBusca
                    textoBotaoNovo="Nova"
                    aoClicarEmNovo={() => navigate('/banco/nova')}
                    textoDaBusca={searchParams.get('busca') ?? ''}
                    aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
                />
            }
        >
 <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ação</TableCell>
              <TableCell>Banco</TableCell>
              <TableCell>Ativo</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton size="small" onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton size="small" onClick={() => navigate(`/banco/${row.id}`)} >
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.nome}</TableCell>
                <TableCell>{row.ativo == '1' ? "Sim" : "Não" }</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
          {rows === null && !isLoading && (
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          )}
          <TableFooter>
            

              {isLoading && (
                <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
                </TableRow>
              )}

              
              {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS ) && (
                <TableRow>
                <TableCell colSpan={3}>
                  <Pagination 
                    page={pagina}
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)} 
                    onChange={(_, newPage) => setSearchParams({busca, pagina: newPage.toString() },{replace: true})}
                  />
                </TableCell>
                </TableRow>
              )}

            
          </TableFooter>
        </Table>
      </TableContainer>





        </LayoutBaseDePagina>








    )
}