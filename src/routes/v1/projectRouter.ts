import {  } from '../../../src/controllers/projectController'
import express from 'express';

const projectRouter = express.Router();

projectRouter.post('/:id', (req, res) => {
  res.send(`update user id: ${req.params.id}`);
});

projectRouter.get('/', (req, res) => {
  res.send('all users');
});

projectRouter.get('/:id', (req, res) => {
  res.send(`user id: ${req.params.id}`);
});

projectRouter.put('/:id', (req, res) => {
  res.send(`update user id: ${req.params.id}`);
});

projectRouter.delete('/:id', (req, res) => {
  res.send(`delete user id: ${req.params.id}`);
});

export default projectRouter;