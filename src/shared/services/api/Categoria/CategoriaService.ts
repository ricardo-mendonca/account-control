import { Api } from "../axios-config";

export interface IListagemCategoria {
    id: number;
    ds_descricao: string;
    id_usuario: number;
    fl_ativo: string;
    }

export interface IDetalheCategoria {
    id: number;
    ds_descricao: string;
    id_usuario: number;
    fl_ativo: string;
}


const get = async (): Promise< Error> => {
    try {
        const {data, headers } = await Api.get('/v1/GetCategoria');
        if (data) {
          return data
        }
          return new Error('Erro ao listar os registros.');
        } catch (error) {
          console.error(error);
          return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
        }
};

export const CategoriaService = {
get,
};