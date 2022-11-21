import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../../shared/hooks";

import { CategoriaService } from "../../../shared/services/api/Categoria/CategoriaService";



type TAutoCompleteOption = {
    id: number;
    label: string;
  }

  interface IAutoCompleteCidadeProps {
    isExternalLoading?: boolean;
  }

export const AutoCompleteCategoria: React.FC<IAutoCompleteCidadeProps> = ({ isExternalLoading = false }) => {
    const { fieldName, registerField, defaultValue, error, clearError } = useField('id_categoria');
    const { debounce } = useDebounce();
    
    const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

    const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [busca, setBusca] = useState('');

    const autoCompleteSelectedOption = useMemo(() => {
        if (!selectedId) return null;
    
        const selectedOption = opcoes.find(opcao => opcao.id === selectedId);
        if (!selectedOption) return null;
    
        return selectedOption;
    }, [selectedId, opcoes]);


    useEffect(() => {
        registerField({
          name: fieldName,
          getValue: () => selectedId,
          setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
        });
      }, [registerField, fieldName, selectedId]);


    useEffect(() => {
        
        setIsLoading(true);
    
        debounce(() => {
          CategoriaService.get(1, busca  )
            .then((result) => {

            setIsLoading(false);
    
            if (result instanceof Error) {
              //alert(result.message);
            } else {
              
              setOpcoes(result.data.map(categoria => ({id: categoria.id, label: categoria.ds_descricao })));
              

            }
          });
        });
      }, [busca]);


  return (
    <Autocomplete
        openText='Abrir'
        closeText='Fechar'
        noOptionsText='Sem opções'
        loadingText='Carregando...'

        disablePortal

        value={autoCompleteSelectedOption}
        options={opcoes}
        loading={isLoading}
        disabled={isExternalLoading}
        onInputChange={(_, newValue) => setBusca(newValue)}
        popupIcon={(isExternalLoading || isLoading) ? <CircularProgress size={28} /> : undefined}
        onChange={(_, newValue) => { setSelectedId(newValue?.id); setBusca(''); clearError(); }}
        renderInput={(params) => (
            <TextField 
                {...params} 
                label="Categoria" 
                error={!!error}
                helperText={error}
            />)}
    />
  );
};
