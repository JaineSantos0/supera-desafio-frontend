export interface Transferencia {
    id: number,
    dataTransferencia: Date,
    valor: number,
    tipo: string,
    nomeOperadorTransacao: string,
    contaId: number;
}