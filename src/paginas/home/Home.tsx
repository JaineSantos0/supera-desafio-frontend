/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";
import { Grid, Box, Input, InputLabel, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TableContainer, Table, TableHead, TableRow, TableBody, TableCell } from "@mui/material";
import getTransferenciasByInicioFimOperador from "../../service/Service";
import { Transferencia } from "../../models/Transferencia";
import dayjs from "dayjs";
import "./Home.css";

function Home() {

  const [dataInicio, setDataInicio] = React.useState<Date | undefined>();
  const [dataFim, setDataFim] = React.useState<Date | undefined>();
  const [opTransacionado, setOpTransacionado] = useState("");
  const [transferencias, setTransferencias] = useState<Transferencia[]>([]);

  async function pesquisar() {
    try {
      const resultado = await getTransferenciasByInicioFimOperador(
        dataInicio ? dataInicio.toISOString() : "",
        dataFim ? dataFim.toISOString() : "",
        opTransacionado
      );
      setTransferencias(resultado);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box sx={{ width: "100%" }} className="caixa-padding">
      <Grid className="caixa">
        <Grid item xs={12} className="caixa" >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid item xs={4}>
              <InputLabel htmlFor="data-inicio">Data de Inicio</InputLabel>
              <DatePicker
                className="border-total largura-input margem-right"
                value={dataInicio || null}
                onChange={(newValue: Date | null) =>
                  setDataInicio(newValue ?? undefined)
                }
              />
            </Grid>
            <Grid item xs={4}>
              <InputLabel htmlFor="data-fim">Data de Fim</InputLabel>
              <DatePicker
                className="border-total largura-input"
                value={dataFim || null}
                onChange={(newValue: Date | null) =>
                  setDataFim(newValue ?? undefined)
                }
              />
            </Grid>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={4}>
          <InputLabel htmlFor="nome-transacionado">
            Nome do Operador Transacionado
          </InputLabel>
          <TextField
            className="border-total largura-input"
            id="nome-transacionado"
            value={opTransacionado}
            onChange={(event) => setOpTransacionado(event.target.value)}
          >
            <Input />
          </TextField>
        </Grid>
      </Grid>

      <Box className="button-padding">
        <button onClick={pesquisar}>Pesquisar</button>
      </Box>
      <Grid item xs={12}>
        <TableContainer>
          <Table className="border-left-top largura-tabela">
            <TableHead>
              <TableRow className="border-bottom">
                <th className="divisor-coluna">Data</th>
                <th className="divisor-coluna">Valor</th>
                <th className="divisor-coluna">Tipo</th>
                <th className="divisor-coluna">Nome do Transacionado</th>
              </TableRow>
            </TableHead>
            <TableBody>
              {transferencias.map((transferencia) => (
                <TableRow className="border-bottom" key={transferencia.id}>
                  <TableCell className="divisor-coluna">
                    {dayjs(transferencia.dataTransferencia).format(
                      "DD/MM/YYYY"
                    )}
                  </TableCell>
                  <TableCell className="divisor-coluna">
                    {transferencia.valor}
                  </TableCell>
                  <TableCell className="divisor-coluna">
                    {transferencia.tipo}
                  </TableCell>
                  <TableCell className="divisor-coluna">
                    {transferencia.nomeOperadorTransacao}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Box>
  );
}

export default Home;