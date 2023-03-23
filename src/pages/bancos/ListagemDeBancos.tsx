import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"




export const ListagemDeBanco = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
      }, [searchParams]);

    return(
        <LayoutBaseDePagina titulo='Listagem de bancos'
            barraDeFerramentas={
            <FerramentasDaListagem
                mostrarInputBusca
                textoBotaoNovo="Nova"
                textoDaBusca={searchParams.get('busca')?? ''}
                aoMudarTextoDeBusca={texto => setSearchParams({busca: texto},{replace: true} )}
            />
        }
        
        >

        </LayoutBaseDePagina>
    )
}