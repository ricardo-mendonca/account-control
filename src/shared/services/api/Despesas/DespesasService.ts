import { Api } from "../axios-config";

export interface IListagemDespesa {
  id: number;
  id_usuario: number;
  id_categoria: number;
  cd_qtd_parc: number;
  cd_qtd_tot_parc: number;
  vl_valor_parc: number;
  vl_valor_multa: number;
  vl_valor_desconto: number;
  cd_dia: number;
  cd_mes: number;
  cd_ano: number;
  fl_despesa_fixa: boolean;
  fl_pago: boolean;
  dt_vencimento: string;
  dt_pagamento: Date;
  dt_cadastro: Date;
  dt_alteracao: Date;
  ds_descricao: string;
  fl_ativo: string;
  ds_categoria: string;
  ds_pago_descricao: string;
  ds_parcela: string;
}

export interface IDetalheDespesa {
  id: number;
  id_usuario: number;
  id_categoria: number;
  cd_qtd_parc: number;
  cd_qtd_tot_parc: number;
  vl_valor_parc: number;
  vl_valor_multa: number;
  vl_valor_desconto: number;
  cd_dia: number;
  cd_mes: number;
  cd_ano: number;
  fl_despesa_fixa: boolean;
  fl_pago: boolean;
  dt_vencimento: string;
  dt_pagamento: Date;
  dt_cadastro: Date;
  dt_alteracao: Date;
  ds_descricao: string;
  fl_ativo: string;
  ds_categoria: string;
  ds_pago_descricao: string;
  ds_parcela: string;
}

const get = async (dataI ='', dataF = ''): Promise<any> => {
  try {
    const urlRelativa = `/v1/GetDespesaMes?dataI=${dataI}&dataF=${dataF}`;

    const { data, headers } = await Api().get(urlRelativa);
    if (data) {
      return {
        data
      };
    }
    return new Error("Erro ao listar os registros.");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao listar os registros."
    );
  }
};

export const DespesasService = {
  get,
};