import express, { response } from "express";
import { uuid } from "uuidv4";

const app = express();
app.use(express.json());

const port = 3333;

app.listen(port, () => {
  console.log(`Escutando porta ${port}`);
});

interface Iresponse {
  body: Ialuno;
  json?: any;
  params: {id : string};
}

interface Ialuno {
  nome: string;
  sala: string;
  id: string;
}

const alunos: Ialuno[] = [];

app.get("/aluno", (req, res) => {
  return res.json(alunos);
});

app.post("/aluno", (req: Iresponse, res) => {
  const { nome, sala } = req.body;
  const aluno: Ialuno = { id: uuid(), nome, sala };
  alunos.push(aluno);
  return res.json(aluno);
});

app.put("/aluno/:id", (req: Iresponse, res) => {
  const { id } = req.params;
  const { nome, sala } = req.body;
  const alunoIndex = alunos.findIndex((aluno) => aluno.id === id);
  if (alunoIndex < 0) {
    return res.status(400).json({ error: "Aluno não encontrado" });
  }
  const aluno: Ialuno = {
    nome,
    sala,
    id,
  };
  alunos[alunoIndex] = aluno;
  return res.json(aluno);
});

app.delete("/aluno/:id", (req: Iresponse, res) => {
  const { id } = req.params;
  const alunoIndex = alunos.findIndex((aluno) => aluno.id === id);
  if (alunoIndex < 0) {
    return res.status(400).json({ error: "Aluno não encontrado" });
  }
  alunos.splice(alunoIndex, 1)
  return res.status(204).send();
});
