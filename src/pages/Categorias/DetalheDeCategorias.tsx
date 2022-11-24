import { useEffect,  useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid, LinearProgress, Paper, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import * as yup from 'yup';

import { CategoriaService,ISubmitCategoria} from "../../shared/services/api/Categoria/CategoriaService";
import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

interface IFormData{
  ds_descricao: string;
  fl_ativo: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  ds_descricao: yup.string().required().min(3).max(30),
  fl_ativo: yup.string().required(),
  id: yup.number().default(0)
});

export const DetalheDeCategorias: React.FC = () => {
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");

   //ToggleButtonGroup
   const [toggleButton, setToggleButton] = useState('Sim');
   const handleChange = (event: React.MouseEvent<HTMLElement>, newToggleButton: string,) => {
     setToggleButton(newToggleButton);
   };
  

  useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);

      CategoriaService.getById(Number(id)).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(" OPS!! algo deu errado \n" + result.message);
          navigate("/categorias");
        } else {
          setNome(result.ds_descricao);
          setToggleButton(result.fl_ativo);
          
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        ds_descricao: '',
        fl_ativo: '',
      })
    }
  }, [id]);

  const handleSave = (dados: ISubmitCategoria) => {
    
    dados.fl_ativo = toggleButton
    
    formValidationSchema
      .validate(dados,{ abortEarly: false})
      .then((dadosValidados) => {
        setIsLoading(true);

        if (id === "nova") {
          CategoriaService.create(dadosValidados).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert("Ops!! algo deu ruim! \n" + result.message);
            } else {
              if(isSaveAndClose()){
                navigate('/categorias');
              } else{
                navigate(`/categorias/detalhe/${result}`);
              }
            }
          });
        } else {
          setIsLoading(true);
          CategoriaService.updateById(Number(id), {id: Number(id), ...dadosValidados}).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert("Ops!! algo deu ruim! \n" + result.message);
            } else {
              if(isSaveAndClose()){
                navigate('/categorias');
              }
            }
          });
        }


      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach(error => {
          if (!error.path) return;
          validationErrors[error.path] = error.message;
        });
        formRef.current?.setErrors(validationErrors);
      });
  };

  const handleDelete = (id: number) => {
    if (
      window.confirm(
        "Mano, tem certeza que quer apagar o registro " + id + " ?"
      )
    ) {
      CategoriaService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com sucesso!");
          navigate("/categorias");
        }
      });
    }
  };

 

  return (
    <LayoutBaseDePagina
      titulo={id === "nova" ? "Nova Categoria" : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== "nova"}
          mostrarBotaoApagar={id !== "nova"}

          aoClicarEmSalvar={save}
          aoClicarEmSalvarEFechar={saveAndClose}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate("/categorias/detalhe/nova")}
          aoClicarEmVoltar={() => navigate("/categorias")}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid container direction="column" padding={2} spacing={2}>
            
            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate"></LinearProgress>
              </Grid>
            )}

            <Grid item>
              <Typography variant="h6">Geral</Typography>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={8} md={6} lg={6} xl={6}>
                <VTextField
                  fullWidth
                  name="ds_descricao"
                  disabled={isLoading}
                  label="Categoria"
                  onChange={e => setNome(e.target.value) }
                />
              </Grid>
            </Grid>

         

            <Grid container item direction="row">
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                <label>Despesa Ativa ? </label>
              <ToggleButtonGroup
                  color="primary"
                  
                  value={toggleButton}
                  exclusive
                  onChange={handleChange}
                  aria-label="Platform"
              >
                  <ToggleButton value="1">SIM</ToggleButton>
                  <ToggleButton value="0">Não</ToggleButton>    
              </ToggleButtonGroup>

              </Grid>
            </Grid>

            
          </Grid>
        </Box>
      </VForm>
    </LayoutBaseDePagina>
  );
};
