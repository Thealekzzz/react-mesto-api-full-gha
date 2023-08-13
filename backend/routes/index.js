const indexRouter = require('express').Router();

const cardRouter = require('./card');
const signRouter = require('./sign');
const userRouter = require('./user');

const { pathNotFound } = require('../consts/errorMessages');
const NotFoundError = require('../errors/NotFoundError');
const crashRouter = require('./crash');

indexRouter.use('/', signRouter);
indexRouter.use('/', crashRouter);
indexRouter.use('/users', userRouter);
indexRouter.use('/cards', cardRouter);

indexRouter.all('/*', (req, res, next) => next(new NotFoundError(pathNotFound)));

module.exports = indexRouter;
