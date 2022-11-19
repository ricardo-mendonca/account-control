import { Api } from "../axios-config";

export interface IListagemPessoa {
    Id: number;
    ds_nome: string;
    ds_email: string;
    ds_senha: string;
    ds_telefone: string;
    dt_nascimento: string;
    fl_status : string;
    cd_rg : string;
    cd_cpf: string;
    cd_cep: string;
    ds_endereco: string;
    ds_complemento : string;
    nr_endereco : string;
    ds_bairro : string;
    ds_cidade : string;
    cd_uf : string;
    }
interface IDetalhePessoa {
    Id: number;
    ds_nome: string;
    ds_email: string;
    ds_senha: string;
    ds_telefone: string;
    dt_nascimento: string;
    fl_status : string;
    cd_rg : string;
    cd_cpf: string;
    cd_cep: string;
    ds_endereco: string;
    ds_complemento : string;
    nr_endereco : string;
    ds_bairro : string;
    ds_cidade : string;
    cd_uf : string;
}


const login = async (): Promise<any> => {
    try {
        const{ data } = await Api().post('v1/login');
    } catch (error) {
        return new Error((error as {message: string}).message || 'Erro ao listar os Registros.');
    }
};

const getAll = async (): Promise<any> => {
    try {
        const {data}=await Api().get('/pessoas?_page=1&_limit=10');
    } catch (error) {
        
    }
};

export const PessoasService = {
login,
getAll,
};