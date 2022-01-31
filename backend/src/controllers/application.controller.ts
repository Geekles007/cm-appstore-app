import { Request, Response } from 'express';
import {
  ApplicationData,
  ApplicationListData,
  CreateApplicationInput,
  GenericResponse,
  UpdateApplicationInput,
} from '../types/request';
import { Category } from '../types/model';
import prisma, { Prisma } from '../core/db/client';
import { APPLICATION_ALREADY_EXIST, APPLICATION_DELETED, RESOURCE_NOT_FOUND } from '../utils/constants';

const findApplicationCategory = async (category: CreateApplicationInput['category']): Promise<Category | null> => {
  if (category.id) {
    return prisma.category.findFirst({ where: { id: category.id } });
  }

  if (category.name) {
    return prisma.category.create({ data: { name: category.name } });
  }

  return null;
};

export const create = async (req: Request, res: Response): Promise<Response<ApplicationData | GenericResponse>> => {
  const { category, ...applicationInput }: CreateApplicationInput = req.body;

  const application = await prisma.application.findFirst({
    where: {
      name: { equals: applicationInput.name },
    },
  });

  if (application) {
    return res.status(400).json({ message: APPLICATION_ALREADY_EXIST(applicationInput.name) });
  }

  if (!category.name && !category.id) {
    return res.status(422).json({ message: '' });
  }

  const applicationCategory = await findApplicationCategory(category);

  if (!applicationCategory) {
    return res.status(422).json({ message: RESOURCE_NOT_FOUND('Category', category.id || '') });
  }

  const genre = await prisma.genre.findFirst({ where: { id: applicationInput.genreId } });

  if (!genre) {
    return res.status(422).json({ message: RESOURCE_NOT_FOUND('Genre', applicationInput.genreId) });
  }

  const input: Prisma.ApplicationUncheckedCreateInput = {
    ...applicationInput,
    categoryId: applicationCategory.id,
    othersUrl: JSON.stringify(applicationInput.othersUrl),
    tags: JSON.stringify(applicationInput.tags),
  };

  const createdApplication = await prisma.application.create({ data: input });

  return res.json({ data: createdApplication });
};

export const update = async (req: Request, res: Response): Promise<Response<ApplicationData | GenericResponse>> => {
  const { id } = req.params;
  const { categoryId, genreId, ...applicationInput }: UpdateApplicationInput = req.body;

  if (applicationInput.name) {
    const application = await prisma.application.findFirst({
      where: {
        id: { not: { equals: id } },
        name: { equals: applicationInput.name },
      },
    });

    if (application) {
      return res.status(400).json({ message: APPLICATION_ALREADY_EXIST(applicationInput.name) });
    }
  }

  if (categoryId) {
    const category = await prisma.category.findFirst({ where: { id: categoryId } });

    if (!category) {
      return res.status(422).json({ message: RESOURCE_NOT_FOUND('Category', categoryId) });
    }
  }

  if (genreId) {
    const genre = await prisma.genre.findFirst({ where: { id: genreId } });

    if (!genre) {
      return res.status(422).json({ message: RESOURCE_NOT_FOUND('Genre', genreId) });
    }
  }

  const updateInput: Prisma.ApplicationUncheckedUpdateInput = {
    ...applicationInput,
    categoryId,
    genreId,
    othersUrl: applicationInput.othersUrl ? JSON.stringify(applicationInput.othersUrl) : undefined,
    tags: applicationInput.tags ? JSON.stringify(applicationInput.tags) : undefined,
  };

  const updatedApplication = await prisma.application.update({ data: updateInput, where: { id } });

  return res.json({ data: updatedApplication });
};

export const remove = async (req: Request, res: Response): Promise<Response<GenericResponse>> => {
  const { id } = req.params;

  await prisma.application.delete({ where: { id } });

  return res.json({ message: APPLICATION_DELETED });
};

export const retrieveById = async (
  req: Request,
  res: Response,
): Promise<Response<ApplicationData | GenericResponse>> => {
  const { id } = req.params;

  const application = await prisma.application.findFirst({ where: { id } });

  if (!application) {
    return res.status(404).json({ message: RESOURCE_NOT_FOUND('Application', id) });
  }

  return res.json({ data: application });
};

export const retrieveAll = async (req: Request, res: Response): Promise<Response<ApplicationListData>> => {
  const applications = await prisma.application.findMany();

  return res.json({ data: applications });
};
