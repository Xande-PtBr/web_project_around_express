const Users = require("../models/user");

//---- busca todos os usuarios
const getUsers = (req, res) => {
  Users.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      res.status(500).send({ menssage: "Erro interno do servidor" });
    });
};

//---- busca um usuario pelo Id
const getUserById = (req, res) => {
  Users.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(404)
          .send({ message: "ID do usuário não encontrado" });
      }
      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID do usuário inválido" });
      }
      console.error("Erro ao buscar usuario", err);
      return res.status(500).send({ message: "Erro interno do servidor" });
    });
};

//------- cria um novo usuario
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  Users.create({ name, about, avatar })
    .then((newUser) => res.status(201).send(newUser))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: "Dados inválidos", details: err.menssage });
      }
      console.error("Erro ao criar usuario", err);
      return res.status(500).send({ message: "Erro interno do servidor" });
    });
};

//----------------------- atualiza um usuario

const updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  Users.findByIdAndUpdate(userId, { name, about }, { new: true })
    .orFail()
    .then((updatedUser) => res.status(200).send(updatedUser))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(404)
          .send({ message: "ID do usuário não encontrado" });
      }
      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID do usuário inválido" });
      }
      console.error("Erro ao buscar usuario", err);
      return res.status(500).send({ message: "Erro interno do servidor" });
    });
};

const updateAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  Users.findByIdAndUpdate(userId, { avatar }, { new: true })
    .orFail()
    .then((updatedUser) => res.status(200).send(updatedUser))
    .catch((err) => {
      if (err.avatar === "DocumentNotFoundError") {
        return res
          .status(404)
          .send({ message: "ID do usuário não encontrado" });
      }
      if (err.avatar === "CastError") {
        return res.status(400).send({ message: "ID do usuário inválido" });
      }
      console.error("Erro ao buscar usuario", err);
      return res.status(500).send({ message: "Erro interno do servidor" });
    });
};

const deleteUser = (req, res) => {
  Users.findByIdAndDelete(req.params.userId)
    .orFail()
    .then(() => res.status(200).send("Usuario removido com sucesso"))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(404)
          .send({ message: "ID do usuário não encontrado" });
      }
      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID do usuário inválido" });
      }
      console.error("Erro ao buscar usuario", err);
      return res
        .status(500)
        .send({ message: "Erro interno do servidor ao remover usuario" });
    });
};
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  deleteUser,
};
