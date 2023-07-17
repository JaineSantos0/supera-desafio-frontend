import axios, { AxiosResponse } from "axios";
import { Transferencia } from "../models/Transferencia";

export const api = axios.create({
    baseURL: 'http://localhost:8080'
});

async function getTransferenciasByInicioFimOperador(dataInicio: string, dataFim: string, nomeOperador: string) {
    
    try {
      const url = 'http://localhost:8080/transferencias';
  
      const params = {
        dataInicio: dataInicio,
        dataFim: dataFim,
        nomeOperador: nomeOperador
      };
  
      const response: AxiosResponse<Transferencia[]> = await axios.get(url, { params });

      console.log(response.data)
    return response.data;

    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  export default getTransferenciasByInicioFimOperador;
