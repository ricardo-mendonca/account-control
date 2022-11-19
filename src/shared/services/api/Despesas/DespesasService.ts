import { Api } from "../axios-config";

export interface IListagemCategoria {
  Id: number;
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
  dt_vencimento: Date;
  dt_pagamento: Date;
  dt_cadastro: Date;
  dt_alteracao: Date;
  ds_descricao: string;
  fl_ativo: string;
}

export interface IDetalheCategoria {
  Id: number;
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
  dt_vencimento: Date;
  dt_pagamento: Date;
  dt_cadastro: Date;
  dt_alteracao: Date;
  ds_descricao: string;
  fl_ativo: string;
}

const getAll = async (dataI = new Date(), dataF = new Date()): Promise<any> => {
  try {
    const urlRelativa = `/v1/GetDespesaMes?dataI=${dataI}&dataF=${dataF}`;
    const { data } = await Api().get(urlRelativa);
    if (data) {
      return data;
    }
    return new Error("Erro ao listar os registros.");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao listar os registros."
    );
  }
};
