import { useEffect, useRef, useState } from "react";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { Form } from "@unform/web";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhe } from "../../shared/components";
import { VTextField } from "../../shared/forms";
import { LayoutBaseDePagina } from "../../shared/layouts";
import {
  CategoriaService,
  ISubmitCategoria,
} from "../../shared/services/api/Categoria/CategoriaService";
import { FormHandles } from "@unform/core";

export const DetalheDeCategorias: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");
  const formRef = useRef<FormHandles>(null);

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
          console.log(result);
          formRef.current?.setData(result);
        }
      });
    }
  }, [id]);

  const handleSave = (dados: ISubmitCategoria) => {
    setIsLoading(true);
    if (id === "nova") {
      CategoriaService.create(dados).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert("Ops!! algo deu ruim! \n" + result.message);
        } else {
          navigate(`/categorias/detalhe/${result}`);
        }
      });
    } else {
      setIsLoading(true);
      CategoriaService.updateById(Number(id), dados).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert("Ops!! algo deu ruim! \n" + result.message);
        } else {
          console.log(result);
          // navigate(`/categorias/detalhe/${result}`);
        }
      });
    }

    console.log(dados);
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
          aoClicarEmSalvar={() => formRef.current?.submitForm()}
          aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate("/categorias/detalhe/nova")}
          aoClicarEmVoltar={() => navigate("/categorias")}
        />
      }
    >
      <Form ref={formRef} onSubmit={handleSave}>
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
                <VTextField
                  fullWidth
                  name="fl_ativo"
                  disabled={isLoading}
                  label="Ativo"
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Form>
    </LayoutBaseDePagina>
  );
};
