import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { CategoriaService, IListagemCategoria } from "../../shared/services/api/Categoria/CategoriaService";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useDebounce } from "../../shared/hooks";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";



export const ListagemDeCategorias: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(3000, false);

  const [rows, setRows] = useState<IListagemCategoria[]>([]);
  const [isLoading, setIsLoading] =useState(true);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CategoriaService.get()
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            console.log(result);

            setRows(result);
          }
      });
    });
  }, [busca]);

  return (
    <LayoutBaseDePagina
      titulo="Listagem de Categorias"
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca
          textoDaBusca={busca}
          textoBotaoNovo="Nova"
          aoMudarTextoDeBusca={(texto) => setSearchParams(
          { busca: texto }, 
          { replace: true })} />} 
        >
      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width:'auto'}}>
        <Table>
            <TableHead>
                <TableRow>
                  <TableCell>Codigo</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Ativo</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>

              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.ds_descricao}</TableCell>
                  <TableCell>{row.fl_ativo}</TableCell>
              </TableRow>
              ))}

            </TableBody>
            
        </Table>
      </TableContainer>

    </LayoutBaseDePagina>
  );
};
