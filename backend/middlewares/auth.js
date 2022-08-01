const jwt = require('jsonwebtoken');
const WrongData = require('../errors/WrongData');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new WrongData('Необходима авторизация'));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new WrongData('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};
