import { Api } from "../axios-config";

interface IAuth {
  accessToken: string;
}

const auth = async (
  email: string,
  senha: string
): Promise<IAuth | Error> => {
  try {

    const data = {
      email,
      senha,
    };

    const response = await Api().post("/login", data);

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
