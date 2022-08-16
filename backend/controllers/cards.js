const Cards = require('../models/card');
const ErrorData = require('../errors/ErrorData');
const NotFoundError = require('../errors/NotFoundError');
const WrongAction = require('../errors/WrongAction');

module.exports.getCards = (req, res, next) => {
  Cards.find({})
    .populate('owner')
    .then((cards) => res.send(cards))
    .catch((error) => next(error));
};

module.exports.postCard = (req, res, next) => {
  const { name, link } = req.body;
  return Cards.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ErrorData('Переданы неккоректные данные'));
        return;
      }
      next(error);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Cards.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      } else if (!card.owner.equals(req.user._id)) {
        throw new WrongAction('Чужая карточка');
      } else {
        return card.remove().then(() => res.status(200).send(card));
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ErrorData('Переданы неккоректные данные'));
        return;
      }
      return next(error);
    });
};

module.exports.likeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    return res.send(card);
  })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ErrorData('Переданы неккоректные данные'));
        return;
      }
      return next(error);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    return res.send(card);
  })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ErrorData('Переданы неккоректные данные'));
        return;
      }
     return next(error);
    });
};
