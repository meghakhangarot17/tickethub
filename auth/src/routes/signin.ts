import express , { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError } from '@metickethub/common';

import { User } from '../models/user';
import { Password } from './services/password';


const router = express.Router();

router.post('/api/users/signin',
[
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('You must supply a password')

],
validateRequest,
async (req:Request, res:Response) => {
  const { email, password} = req.body;

  const existingUser = await User.findOne({email});
  if(!existingUser){
    throw new BadRequestError('Invalid Credentials');
  }

  const passwordMatch = await Password.compare(existingUser.password, password);

  if(!passwordMatch){
    throw new BadRequestError('Invalid Credentials');
  }

  //Generate a JSON web token(JWT)
  const userJwt = jwt.sign({
    id: existingUser.id,
    email: existingUser.email
  },
  process.env.JWT_KEY!
  // 'asdf'
  );

  //Store it on session object
  req.session = {
    jwt: userJwt
  };


  res.status(200).send(existingUser);

  // const errors = validationResult(req);

  // if(!errors.isEmpty()){
  //   throw new RequestValidationError(errors.array());
  // }

});

export { router as signinRouter };
