import express, { response } from 'express';

const app = express();

const port = 3333;

app.get('/', (req, res) => {
  return res.json({ message: 'hello haha'})
})

app.listen(port, () => {
  console.log(`Escutando porta ${port}`)
})