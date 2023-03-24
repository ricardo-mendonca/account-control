import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IListagemBanco {
    id: number;
    nome: string;
    ativo: string;
}

export interface IDetalheBanco {
    id: number;
    nome: string;
    ativo: string;
}

export interface ISubmitBanco {
    id: number;
    nome: string;
    ativo: string;
}

type TBancosComTotalCount = {
    data: IListagemBanco[];
    totalCount: number;
}



const get = async (page = 1, filter = '', id = 0): Promise<TBancosComTotalCount | Error> => {
    try {
        const urlRelativa = `/banco?page=${page}&limit=${Environment.LIMITE_DE_LINHAS}&filter=${filter}&id=${id}`;

        const { data, headers } = await Api().get(urlRelativa);
        console.log(data);
        if (data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
            }
        }
        return new Error('Erro ao listar os registros de bancos.');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao listar os registros de bancos.');
    }
};

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await Api().delete(`/banco/${id}`);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
    }
};

const getById = async (id: number): Promise<IDetalheBanco | Error> => {
    try {
        const { data } = await Api().get(`/banco/${id}`);

        if (data) {
            return data;
        }

        return new Error('Erro ao consultar o registro.');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
    }
};

const create = async (dados: Omit<IDetalheBanco, 'id'>): Promise<number | Error> => {
    try {
        const { data } = await Api().post<number>('/banco', dados);

        if (data) {
            return data;
        }

        return new Error('Erro ao criar o registro.');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
    }
};

const updateById = async (id: number, dados: ISubmitBanco): Promise<void | Error> => {
    try {

        await Api().put(`/banco/${id}`, dados);

    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
    }
};

export const BancosService = {
    get,
    create,
    getById,
    deleteById,
    updateById,
};