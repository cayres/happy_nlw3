import { ErrorRequestHandler, Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { ValidationError } from 'yup';

export const errorHandler: ErrorRequestHandler = (
  error,
  request,
  response,
  next
) => {
  console.log(error);

  if (error instanceof EntityNotFoundError) {
    handleNotFoundError(response);
    return;
  }

  if (error instanceof ValidationError) {
    handleValidationError(error, response);
    return;
  }

  handleUnknowError(response);
};

function handleUnknowError(response: Response) {
  response
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
}

function handleNotFoundError(response: Response) {
  response
    .status(StatusCodes.NOT_FOUND)
    .json({ message: `Could not find orphanage.` });
}

function handleValidationError(error: ValidationError, response: Response) {
  const result = { message: error.message };

  if (error.errors.length > 1) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ ...result, details: error.errors });
    return;
  }

  response.status(StatusCodes.BAD_REQUEST).json(result);
}
