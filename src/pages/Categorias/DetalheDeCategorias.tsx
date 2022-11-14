import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { CategoriaService } from "../../shared/services/api/Categoria/CategoriaService";


export const DetalheDeCategorias: React.FC =() => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome ] = useState('');


    useEffect(() => {
        if(id !== 'nova' ){
            setIsLoading(true);

            CategoriaService.getById(Number(id))
            .then((result) => {
                setIsLoading(false);

                if(result instanceof Error){
                    alert(' OPS!! algo deu errado \n' + result.message  );
                    navigate('/categorias');

                } else{
                    setNome(result.ds_descricao);
                    console.log(result);
                }
            });
        }
    },[id]);

    const handleSave =() =>{
        console.log('Save');
    }

    const handleDelete = (id: number) => {
        if(window.confirm('Mano, tem certeza que quer apagar o registro '+id+' ?')){
           
          CategoriaService.deleteById(id)
          .then(result =>{
            if(result instanceof Error){
              alert(result.message);
            } else{
              alert('Registro apagado com sucesso!');
              navigate('/categorias');
            }
          })
        };
    };


    return(
        <LayoutBaseDePagina 
            titulo={id === 'nova' ? 'Nova Categoria': nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe 
                    textoBotaoNovo="Nova"
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoApagar={id !== 'nova'}

                    aoClicarEmSalvar={handleSave}
                    aoClicarEmSalvarEFechar={handleSave}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmNovo={() => navigate('/categorias/detalhe/nova')}
                    aoClicarEmVoltar={() => navigate('/categorias')}
                
                />
            }
        >
            {isLoading && (
              <LinearProgress variant="indeterminate"/>      
             )}
        <p>Detalhe de Categoria {id}</p>
        </LayoutBaseDePagina>
    );
};