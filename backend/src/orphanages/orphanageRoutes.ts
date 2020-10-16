import express from 'express';
import multer from 'multer';
import 'express-async-errors';

import { errorHandler } from './orphanageErrorHandler';

import uploadConfig from '../config/upload';
import { create, createImages, index, show } from './orphanageController';

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get('/', index);

routes.get('/:id', show);

routes.post('/', create);

routes.post('/:id/images', upload.array('image'), createImages);

routes.use(errorHandler);

export default routes;
