import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as yup from "yup";

import {
  Box,
  Grid,
  LinearProgress,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { DespesasService } from "../../shared/services/api/Despesas/DespesasService";
import { AutoCompleteCategoria } from "./components/AutoCompleteCategoria";
import { FerramentasDeDetalhe } from "../../shared/components";
import { IVFormErrors } from "../../shared/forms/IVFormErros";
import { VTextField } from "../../shared/forms/VTextField";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useVForm } from "../../shared/forms/useVForm";
import { VForm } from "../../shared/forms/VForm";

interface IFormData {
  ds_descricao: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  ds_descricao: yup.string().required().min(3).max(30),
  id: yup.number().default(0),
});

export const DetalheDeDespesas: React.FC = () => {
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const { id = "nova" } = useParams<"id">();

  const [toggleButton, setToggleButton] = useState("Sim");
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newToggleButton: string
  ) => {
    setToggleButton(newToggleButton);
  };

  const handleSave = (dados: IFormData) => {
    console.log(dados);

    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        //setIsLoading(true);
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};
        console.log(validationErrors);
        errors.inner.forEach((error) => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });
        formRef.current?.setErrors(validationErrors);
      });
  };

  const handleDelete = (id: number) => {
    if (window.confirm("mano, tem certeza que deseja apagar o baguio??")) {
      alert("Quase apaguei...");
    }
  };

  useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);

      DespesasService.getById(Number(id)).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(" OPS!! algo deu errado \n" + result.message);
          navigate("/despesas");
        } else {
          setNome(result.ds_descricao);

          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        id: undefined,
        fl_ativo: "",
        ds_descricao: "",
      });
    }
  }, [id]);

  return (
    <LayoutBaseDePagina
      titulo={id === "nova" ? "Nova Despesa" : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          aoClicarEmSalvar={save}
          aoClicarEmSalvarEFechar={saveAndClose}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate("/despesas/detalhe/nova")}
          aoClicarEmVoltar={() => navigate("/despesas")}
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
              <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
                <VTextField
                  fullWidth
                  name="ds_descricao"
                  disabled={isLoading}
                  label="Descrição"
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={8} md={5} lg={5} xl={5}>
                <AutoCompleteCategoria isExternalLoading={isLoading} />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <label>Despesa Fixa? </label>
                <ToggleButtonGroup
                  color="primary"
                  value={toggleButton}
                  exclusive
                  onChange={handleChange}
                  aria-label="teste"
                >
                  <ToggleButton value="1">SIM</ToggleButton>
                  <ToggleButton value="0">Não</ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                <VTextField
                  fullWidth
                  name="teste2"
                  disabled={isLoading}
                  label="Qtd de Parcelas"
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={8} sm={8} md={8} lg={8} xl={8}></Grid>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                <VTextField
                  fullWidth
                  name="teste2"
                  disabled={isLoading}
                  label="Valor Total "
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                <VTextField
                  fullWidth
                  name="teste2"
                  disabled={isLoading}
                  label="Vencimento "
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}></Grid>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                <VTextField
                  fullWidth
                  name="teste2"
                  disabled={isLoading}
                  label="Valor Multa "
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                <VTextField
                  fullWidth
                  name="teste2"
                  disabled={isLoading}
                  label="Data Pagamento "
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}></Grid>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                <VTextField
                  fullWidth
                  name="teste2"
                  disabled={isLoading}
                  label="Valor Desconto"
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <label>Despesa Paga? </label>
                <ToggleButtonGroup
                  color="primary"
                  value={toggleButton}
                  exclusive
                  onChange={handleChange}
                  aria-label="teste"
                >
                  <ToggleButton value="1">SIM</ToggleButton>
                  <ToggleButton value="0">Não</ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid item xs={5} sm={5} md={5} lg={5} xl={5}></Grid>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                <h2> R$ 1.250,99</h2>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBaseDePagina>
  );
};
