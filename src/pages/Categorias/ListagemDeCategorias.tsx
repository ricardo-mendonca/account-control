import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow,} from "@mui/material";
import { CategoriaService, IListagemCategoria,} from "../../shared/services/api/Categoria/CategoriaService";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useDebounce } from "../../shared/hooks";
import { Environment } from "../../shared/environment";

export const ListagemDeCategorias: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(600, false);
  const navigate = useNavigate();

  const [rows, setRows] = useState<IListagemCategoria[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const busca = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get("pagina") || "1");
  }, [searchParams]);

  const handleDelete = (id: number) => {
    if(window.confirm('Mano, tem certeza que quer apagar o registro '+id+' ?')){
       
      CategoriaService.deleteById(id)
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
      CategoriaService.get(pagina,busca)
        .then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
                   
          setTotalCount(result.totalCount);
          
          setRows(result.data);
        }
      });
    });
  }, [busca, pagina ]);



  return (
    <LayoutBaseDePagina
      titulo="Listagem de Categorias"
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca
          textoDaBusca={busca}
          textoBotaoNovo="Nova"
          aoClicarEmNovo={() => navigate('/categorias/detalhe/nova')}
          aoMudarTextoDeBusca={(texto) =>
            setSearchParams({ busca: texto, pagina: '1' }, { replace: true })
          }
        />
      }
    >
      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ação</TableCell>
              <TableCell>Descrição</TableCell>
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
                  <IconButton size="small" onClick={() => navigate(`/categorias/detalhe/${row.id}`)} >
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.ds_descricao}</TableCell>
                <TableCell>{row.fl_ativo === "1" ? "Sim" : "Não"}</TableCell>
                
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
  );
};
