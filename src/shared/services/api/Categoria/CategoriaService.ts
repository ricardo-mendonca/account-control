import { Api } from "../axios-config";

interface IListagemCategoria {
    id: number;
    ds_descricao: string;
    id_usuario: number;
    fl_ativo: string;
    }

interface IDetalheCategoria {
    id: number;
    ds_descricao: string;
    id_usuario: number;
    fl_ativo: string;
}


const get = async (): Promise<IListagemCategoria | Error > => {
    try {
        const {data}=await Api.get('/v1/GetCategoria');
        if (data) {
            return data;
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