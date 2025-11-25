import {
    getAllTasksHandler,
    createTaskHandler,
    completionTaskHandler,
    getCompletedTasksHandler,
    deleteTaskHandler
} from '../../../src/controllers/taskController'
import express from 'express';

const taskRouter = express.Router();

taskRouter.get('/', getAllTasksHandler);
taskRouter.get('/completed', getCompletedTasksHandler);
taskRouter.post('/', createTaskHandler);
taskRouter.put('/:id', completionTaskHandler);
taskRouter.delete('/:id', deleteTaskHandler);

export default taskRouter;