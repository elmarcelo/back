import { db } from '../models/index.js';
import { logger } from '../config/logger.js';

const Grade = db.grade;

const create = async (req, res) => {
  //const dados = new db.grade(req.body);
  const nome = req.body.name;
  const subject = req.body.subject;
  const type = req.body.type;
  const value = req.body.value;

  const dados = new db.grade({
    name: nome,
    subject: subject,
    type: type,
    value: value,
  });
  try {
    //Grade.insertOne({});
    await dados.save();
    res.send({ message: 'Grade inserido com sucesso' });
    logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  /*var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};
*/
  try {
    //const result = await Grade.find({});
    const result = await Grade.find({
      name: { $regex: new RegExp(name), $options: 'i' },

      //name: { $regex: name, $options: '$i' },
    }).sort({ name: 1 });
    res.send(result);
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Grade.findOne({ _id: id }, { __v: 0 });
    res.send(result);
    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  const nome = req.body.name;
  const subject = req.body.subject;
  const type = req.body.type;
  const value = req.body.value;
  const data = new Date();

  const query = { _id: id };
  const update = {
    name: nome,
    subject: subject,
    type: type,
    value: value,
    lastModified: data,
  };
  const options = {
    projection: { _id: 0, lastModified: 0 },
    new: true,
  };
  try {
    const result = await Grade.findOneAndUpdate(query, update, options);
    /* await Grade.updateOne(
      { name: 'Ana Maria Silva' },
      {
        lastModified: data,
        //$currentDate: { lastModified: true, timestamp: { $tipe: 'timestamp' } },
      }
    );*/
    res.send(result);
    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Grade.findOneAndDelete(
      { _id: id },
      { _id: 0, name: 1 }
    );
    res.send(`${result.name} excluido!!!`);
    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    //const result = await Grade.deleteMany(req.body);
    const result = await Grade.remove({});
    res.send(`${result.n} item(ns) removido(s)!!!`);
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
