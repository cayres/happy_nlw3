import { Request, response, Response } from 'express';
import { FindOneOptions, getRepository } from 'typeorm';
import { StatusCodes } from 'http-status-codes';
import * as Yup from 'yup';

import { Orphanage } from './models/orphanage';
import { Image } from './models/image';
import { render, renderMany } from './orphanagePresenter';
import { renderMany as renderImages } from './imagePresenter';

export async function create(request: Request, response: Response) {
  const orphanageRepository = getRepository(Orphanage);
  const { body: data } = request;

  await validateDataToCreateOrphanage(data);

  const orphanage = orphanageRepository.create(data as Orphanage);

  await orphanageRepository.save(orphanage);

  return response.status(StatusCodes.CREATED).json(render(orphanage));
}

async function validateDataToCreateOrphanage(data: any) {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
    about: Yup.string().required().max(300),
    instructions: Yup.string().required(),
    opening_hours: Yup.string().required(),
    open_on_weekends: Yup.boolean().required(),
  });

  await schema.validate(data, {
    abortEarly: false,
  });
}

export async function index(_: Request, response: Response) {
  const orphanageRepository = getRepository(Orphanage);

  const orphanages = await orphanageRepository.find();

  return response.json(renderMany(orphanages));
}

export async function show(request: Request, response: Response) {
  const orphanageRepository = getRepository(Orphanage);

  const { id } = request.params;
  const options: FindOneOptions = {
    relations: ['images'],
  };

  const orphanage = await orphanageRepository.findOneOrFail(id, options);
  return response.json(render(orphanage));
}

export async function createImages(request: Request, response: Response) {
  const orphanageRepository = getRepository(Orphanage);
  const imageRepository = getRepository(Image);

  const { id } = request.params;
  const orphanage = await orphanageRepository.findOneOrFail(id);
  const files = request.files as Array<Express.Multer.File>;

  const images: Array<Image> = files.map((file) => {
    return imageRepository.create({
      orphanage,
      path: file.filename,
    });
  });
  await imageRepository.save(images);
  return response.status(StatusCodes.CREATED).json(renderImages(images));
}
