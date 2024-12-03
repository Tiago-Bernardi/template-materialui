import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';

import CriarTarefa from './CriarTarefa';
import EditarTarefa from './EditarTarefa';


//A função abaixo é usada para criar o array contendo os dados iniciais da listagem de tarefas.
function createData(
  idTarefa: number,
  tituloTarefa: string,
  descricaoTarefa: string,
  inicioTarefa: string,
  fimTarefa: string,
  statusTarefa: string,
  recursoTarefa: string,
) {
  return { idTarefa, tituloTarefa, descricaoTarefa, inicioTarefa, fimTarefa, statusTarefa, recursoTarefa };
}

//Definição do array contendo os dados iniciais da listagem de tarefas
const initialRows = [
  createData(1, 'Tarefa 01', 'Descrição da Tarefa 01', '01/01/2024', '31/12/2024', 'Concluída XD', 'Recurso 1'),
  createData(2, 'Tarefa 02', 'Descrição da Tarefa 02', '01/01/2024', '31/12/2024', 'Concluída XD', 'Recurso 2'),
  createData(3, 'Tarefa 03', 'Descrição da Tarefa 03', '01/01/2024', '31/12/2024', 'Está indo :-)', 'Recurso 3'),
  createData(4, 'Tarefa 04', 'Descrição da Tarefa 04', '01/01/2024', '31/12/2024', 'Está indo :-)', 'Recurso 4'),
  createData(5, 'Tarefa 05', 'Descrição da Tarefa 05', '01/01/2024', '31/12/2024', 'Nem comecei :-(', 'Recurso 5'),
];

//Componente ListarTarefa
const ListarTarefa = () => {
  const [open, setOpen] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState();
  const [idTarefaSelecionada, setIdTarefaSelecionada] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEditar = () => setOpenEditar(true);
  const handleCloseEditar = () => setOpenEditar(false);

  //O array definido acima é setado como conteúdo do state Tarefas na renderização inicial do componente.
  useEffect(() => {
    setTarefas(initialRows);
  },[]);

  const handleEditar = (id) => {
    setIdTarefaSelecionada(id);

    //Objeto local para armazenamento da tarefa filtrada de acordo com a seleção do usuário
    let tarefaParaEditar = tarefas.filter(obj => {
      return obj.idTarefa === id;
    })[0];

    //Atribuição do Objeto local, setado acima, ao state Tarefa
    setTarefa(tarefaParaEditar);

    //Seta como true o state responsável pela exibição do Model de Editar Tarefa
    setOpenEditar(true)
  };

  const handleDeletar = (id) => {
    setTarefas(current =>
      current.filter(tarefa => {
        return tarefa.idTarefa !== id;
      }),
    );
  };

    return(
    <>
   <Card>
  <CardHeader
     title={
      <div
        style={{
          backgroundColor: "black", // Fundo preto
          textAlign: "center",
          display: "inline-block", // Ajusta o tamanho do fundo para o conteúdo
          padding: "5px 10px", // Adiciona espaçamento interno
          borderRadius: "5px", // (Opcional) Adiciona cantos arredondados
        }}
      >
        <span style={{ color: "yellow" }}>Tarefas para serem feitas</span>
      </div>
    }
    subheader="Listagem de todas as tarefas"
    sx={{
      textAlign: "center", // Centraliza o conteúdo no CardHeader
      '& .MuiCardHeader-subheader': {
        marginTop: '10px', // Adiciona o espaço entre o título e o subtítulo
      }
    }}
  />
  <CardContent>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Qual é o título da tarefa?</TableCell>
            <TableCell align="right">O que deve ser feito amigão?</TableCell>
            <TableCell align="right">Quando começa?</TableCell>
            <TableCell align="right">Quando termina?</TableCell>
            <TableCell align="right">Qual é o status?</TableCell>
            <TableCell align="right">Qual o recurso?</TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tarefas.map((row, indice) => (
            <TableRow
              key={indice}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.idTarefa}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.tituloTarefa}
              </TableCell>
              <TableCell align="right">{row.descricaoTarefa}</TableCell>
              <TableCell align="right">{row.inicioTarefa}</TableCell>
              <TableCell align="right">{row.fimTarefa}</TableCell>
              <TableCell align="right">{row.statusTarefa}</TableCell>
              <TableCell align="right">{row.recursoTarefa}</TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleEditar(row.idTarefa)}
                >
                  <EditIcon fontSize="small" />
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeletar(row.idTarefa)}
                >
                  <DeleteIcon fontSize="small" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </CardContent>
  <CardActions>
    <Button size="small" variant="contained" onClick={handleOpen}>
      Criar Tarefa
    </Button>
    <Button size="small" variant="outlined">
      Cancelar
    </Button>
    <Button size="small" variant="outlined">
      Socorro Deus me ajuda
    </Button>
  </CardActions>
</Card>;

    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <CriarTarefa handleClose={handleClose} tarefas={tarefas} setTarefas={setTarefas} />
        </div>
      </Modal>  
    </div>
    <div>
      <Modal
        open={openEditar}
        onClose={handleCloseEditar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <EditarTarefa handleCloseEditar={handleCloseEditar} idTarefaSelecionada={idTarefaSelecionada} tarefas={tarefas} tarefa={tarefa} setTarefas={setTarefas} />
        </div>
      </Modal>  
    </div>
  </>    
 );
};
 
export default ListarTarefa;