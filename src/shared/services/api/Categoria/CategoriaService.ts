import { Api } from "../axios-config";

export interface IListagemCategoria {
    id: number;
    ds_descricao: string;
    id_usuario: number;
    fl_ativo: string;
    qtdTotal: number;
    }

export interface IDetalheCategoria {
    id: number;
    ds_descricao: string;
    id_usuario: number;
    fl_ativo: string;
    qtdTotal: number;
}

export interface ISubmitCategoria {
  id: number;
  ds_descricao: string;
  fl_ativo: string;
}


type TPessoasComTotalCount = {
  data: IListagemCategoria[];
  totalCount: number;
}

const get = async (page = 1, filter = ''): Promise<TPessoasComTotalCount | Error> => {
    try {
        const urlRelativa = `/v1/GetCategoria?page=${page}&descricao=${filter}`;

        const {data, headers } = await Api().get(urlRelativa);
        
        if (data) {
          return {
            data, 
            totalCount: data[0].qtdTotal
          }
        }
          return new Error('Erro ao listar os registros.');
        } catch (error) {
          console.error(error);
          return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
        }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api().delete(`/v1/DeleteCategoria/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
  }
};

const getById = async (id: number): Promise<IDetalheCategoria | Error> => {
  try {
    const { data } = await Api().get(`v1/GetCategoriaId/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

const create = async (dados: Omit<ISubmitCategoria, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api().post<ISubmitCategoria>('/v1/CreateCategoria', dados);

    if (data) {
      return data.id;
    }

    return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dados: ISubmitCategoria): Promise<void | Error> => {
  try {

    await Api().put(`/v1/UpdateCategoria/${id}`, dados);    

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