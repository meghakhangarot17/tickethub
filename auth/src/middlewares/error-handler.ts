import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";
// import { RequestValidationError } from "../errors/request-validation-error";
// import { DatabaseConnectionError } from "../errors/database-connection-error";


export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError){

    // const formattedErrors = err.errors.map((error) => {
    //   if (error.type === 'field') {
    //     return { message: error.msg, field: error.path };
    //   }
    // });

    return res.status(err.statusCode).send({errors: err.serializeErrors() });
    // return res.status(400).send({ errors: formattedErrors });
    // console.log('Handling this error as a request validation error');
  }
  

  
  // if(err instanceof DatabaseConnectionError){
  //   return res.status(err.statusCode).send({errors: err.serializeErrors() });

    // return res.status(500).send({ errors: [{ message: err.reason }] });
    // console.log('Handling this error as a db connection error');
  // }
  // console.log("Something went wrong", err);

  res.status(400).send({
    errors: [{ message: 'Something went wrong! '}]
    // message: err.message,
  });
};
