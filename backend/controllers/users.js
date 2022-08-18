const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NODE_ENV, JWT_SECRET } = process.env;

const Conflict = require('../errors/Conflict');
const ErrorData = require('../errors/ErrorData');
const WrongData = require('../errors/WrongData');
const NotFoundError = require('../errors/NotFoundError');

module.exports.postUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  return bcrypt.hash(password, 10).then((hash) => User.create({
    name, about, avatar, email, password: hash,
  }))
    .then(() => res.status(200)
      .send({
          name, about, avatar, email,
      }))
    .catch((error) => {
        if (error.code === 11000) {
            next(new Conflict('Пользователь с таким email уже создан'));
            return;
        }
      if (error.name === 'ValidationError') {
        next(new ErrorData('Переданы неккоректные данные'));
        return;
      }
      next(error);
    });
};

module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => {
      next(new WrongData('Передан неправильный email или пароль'));
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  const id = req.user._id;
  User.findById(id).then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    return res.send(user);
  }).catch((error) => {
    if (error.name === 'CastError') {
      next(new ErrorData('Неправильный id'));
      return;
    }
    next(error);
  });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send( user ))
    .catch((error) => next(error));
};

module.exports.searchUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(new ErrorData('Переданы неккоректные данные'));
      }
      next(error);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
        return;
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ErrorData('Переданы некорректные данные'));
        return;
      }
      next(error);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
       throw new NotFoundError('Пользователь не найден');
      }
      return res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ErrorData('Переданы некорректные данные'));
        return;
      }
      next(error);
    });
};
