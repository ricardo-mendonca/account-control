import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IListagemDespesa {
  id: number;
  descricao: string;
  qtdParcela: number;
  parcela: number;
  despesaFixa: boolean;
  ativo: boolean;
  pago: boolean;
  valorParcela: number;
  valorMulta: number;
  valorDesconto: number;
  dataCadastro: string;
  dataVencimento: Date;
  dataPagamento: string;
  dataAlteracao: string;
  bancoId: number;
  categoriaId: number;
  usuarioId: number;
}

export interface IDetalheDespesa {
  id: number;
  descricao: string;
  qtdParcela: number;
  parcela: number;
  despesaFixa: boolean;
  ativo: boolean;
  pago: boolean;
  valorParcela: number;
  valorMulta: number;
  valorDesconto: number;
  dataCadastro: Date;
  dataVencimento: Date;
  dataPagamento: Date;
  dataAlteracao: Date;
  bancoId: number;
  categoriaId: number;
  usuarioId: number;
}

export interface ISubmitDespesa {
  id: number;
  descricao: string;
  qtdParcela: number;
  parcela: number;
  despesaFixa: boolean;
  ativo: boolean;
  pago: boolean;
  valorParcela: number;
  valorMulta: number;
  valorDesconto: number;
  dataCadastro: Date;
  dataVencimento: Date;
  dataPagamento: Date;
  dataAlteracao: Date;
  bancoId: number;
  categoriaId: number;
  usuarioId: number;
}

type TDespesasComTotalCount = {
  data: IListagemDespesa[];
  totalCount: number;
}

const get = async (page = 1, filter = '', id = 0): Promise<TDespesasComTotalCount | Error> => {
  try {
    const urlRelativa = `/GetDespesaMes?page=${page}&limit=${Environment.LIMITE_DE_LINHAS}&filter=${filter}&id=${id}`;

    const { data, headers } = await Api().get(urlRelativa);
    if (data) {
      
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
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
    console.log("despesa1");
    console.log(id);
    const { data } = await Api().get(`/GetDespesasId?id=${id}`);
    console.log("despesa2");
    console.log(data);
    if (data) {
      console.log("despesa");
      console.log(data);
      return data;
    }
    return new Error('Erro ao consultar o registro')
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

const create = async (dados: Omit<ISubmitDespesa, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api().post<number>('/CreateDespesa', dados);

    if (data) {
      return data;
    }

    return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
}

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api().delete(`/DeleteDespesa/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
  }
};

const updateById = async (id: number, dados: ISubmitDespesa): Promise<void | Error> => {
  try {

    await Api().put(`/UpdateDespesa/${id}`, dados);    

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
  }
};

export const DespesasService = {
  get,
  getById,
  create,
  deleteById,
  updateById
};