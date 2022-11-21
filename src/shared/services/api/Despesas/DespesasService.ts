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

export interface ISubmitCategoria{
  id: number;
  ds_descricao: string;
  id_categoria: string
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

const getById = async (id: number): Promise<IDetalheDespesa | Error> => {
  try {
    const {data} = await Api().get(`v1/GetDespesasId?id=${id}`);
    if(data){
      return data;
    }
    return new Error('Erro ao consultar o registro')
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

const create = async (dados: Omit<ISubmitCategoria, 'id'>): Promise<void | Error> => {
  try {
    const { data } = await Api().post<ISubmitCategoria>('/v1/CreateDespesa', dados);

    if (data) {
      
    }

    return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
}


export const DespesasService = {
  get,
  getById,
  create,
};