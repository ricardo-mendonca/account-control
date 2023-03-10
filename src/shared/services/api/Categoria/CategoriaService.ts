import { AxiosError } from 'axios';

import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IListagemCategoria {
    id: number;
    descricao: string;
    ativo: string;
    }

export interface IDetalheCategoria {
  id: number;
  descricao: string;
  ativo: string;
}

export interface ISubmitCategoria {
  id: number;
  descricao: string;
  ativo: string;
}


type TPessoasComTotalCount = {
  data: IListagemCategoria[];
  totalCount: number;
}

const get = async (page = 1, filter = '', id = 0): Promise<TPessoasComTotalCount | Error> => {
    try {
        const urlRelativa = `/categoria?page=${page}&limit=${Environment.LIMITE_DE_LINHAS}&filter=${filter}&id=${id}`;

        const { data, headers } = await Api().get(urlRelativa);
        console.log(data);
        if (data) {
          return {
            data, 
            totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
          }
        }
          return new Error('Erro ao listar os registros.');
        } catch (error) {
          console.error(error);
          return new Error((error as { message: string }).message  || 'Erro ao listar os registros.');
        }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api().delete(`/categoria/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
  }
};

const getById = async (id: number): Promise<IDetalheCategoria | Error> => {
  try {
    const { data } = await Api().get(`/categoria/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

const create = async (dados: Omit<IDetalheCategoria, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api().post<number>('/categoria', dados);

    if (data) {
      return data;
    }

    return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dados: ISubmitCategoria): Promise<void | Error> => {
  try {

    await Api().put(`/categoria/${id}`, dados);    

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
  }
};



export const CategoriaService = {
  get,
  create,
  getById,
  deleteById,
  updateById,
};