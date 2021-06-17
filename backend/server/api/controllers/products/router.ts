import express from 'express';
import controller from './controller';
export default express
  .Router()
  .post('/', controller.create)
  .post('/summary', controller.summary)
  .get('/', controller.all)
  .get('/:id', controller.byId);
