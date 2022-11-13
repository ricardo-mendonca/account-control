import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { CategoriaService } from '../../shared/services/api/Categoria/CategoriaService';


export const ListagemDeCategorias: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  useEffect(() => {

    CategoriaService.get()
    .then((result) => {
      if(result instanceof Error){
        alert(result.message);
        return
      }

      console.log(result);
    });
  }, []);

  return (
    <LayoutBaseDePagina
      titulo='Listagem de Categorias'
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca
          textoDaBusca={busca}
          textoBotaoNovo='Nova'
          aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
        />
      }
    >

    </LayoutBaseDePagina>
  );
};