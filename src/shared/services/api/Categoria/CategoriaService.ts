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

type TPessoasComTotalCount = {
  data: IListagemCategoria[];
  totalCount: number;
}

const get = async (page = 1, filter = ''): Promise<TPessoasComTotalCount | Error> => {
    try {
        const urlRelativa = `/v1/GetCategoria?page=${page}&descricao=${filter}`;
        const {data, headers } = await Api.get(urlRelativa);
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
    await Api.delete(`/v1/DeleteCategoria/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
  }
};

export const CategoriaService = {
  get,
  deleteById,
};