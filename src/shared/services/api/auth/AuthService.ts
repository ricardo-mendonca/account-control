import { Api } from "../axios-config";

interface IAuth {
  accessToken: string;
}

const auth = async (
  ds_email: string,
  ds_senha: string
): Promise<IAuth | Error> => {
  try {
    console.log("tentei 2");
    console.log(ds_senha);
    console.log(ds_email);

    const data = {
      ds_email,
      ds_senha,
    };

    const response = await Api().post("/v1/login", data);

    console.log("tentei 2");
    console.log(ds_senha);
    console.log(ds_email);
    
    if (response) {
      return response.data;
    }

    return new Error("Erro no login.");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro no login."
    );
  }
};

export const AuthService = {
  auth,
};
