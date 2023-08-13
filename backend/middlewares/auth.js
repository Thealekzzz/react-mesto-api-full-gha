const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, PRIVATE_KEY } = process.env;

function auth(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? PRIVATE_KEY : '4a952aade591adfb64a57f228cb6c039');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }

  req.user = payload;

  next();
}

module.exports = auth;
