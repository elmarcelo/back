import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { gradeRouter } from './routes/gradeRouter.js';
import { db } from './models/index.js';

(async () => {
  try {
    console.log(db.url);
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    process.exit();
  }
})();

const app = express();
//app.use(express.static('public'));
//console.log(gradeRouter);

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    //origin: 'http://localhost:8081',
    //origin: 'http://localhost:3000',
    origin: process.env.CONEXCORS,
  })
);
app.use('/grade', gradeRouter);

app.get('/', (req, res) => {
  console.log(req);
  res.send('API em execucao');
});

app.listen(process.env.PORT || 8081, () => {});