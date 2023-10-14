import express, {Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError } from '@metickethub/common';

import { User } from '../models/user';
// import { DatabaseConnectionError } from '../errors/database-connection-error';

const router = express.Router();

router.post('/api/users/signup',[
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters'),
],
validateRequest,

async (req: Request, res: Response) => {
  // const errors = validationResult(req);

  // if(!errors.isEmpty()){
  //   throw new RequestValidationError(errors.array());
  // }
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if(existingUser){
      throw new BadRequestError('Email in use');
      // console.log('Email in use');
      // return res.send({});
    }

    const user = User.build({ email, password});
    await user.save();

    //Generate a JSON web token(JWT)
    const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    },
    process.env.JWT_KEY!
    // 'asdf'
    );

    //Store it on session object
    req.session = {
      jwt: userJwt
    };


    res.status(201).send(user);



    //this is javascript (not ts)
    // const error = new Error('Inavlid email or password');
    // error.reasons = errors.array();
    // throw error;

    // throw new Error('Invalid email or password');
    // return res.status(400).send(errors.array());
  

  // const { email, password } = req.body;

  // console.log('Creating a user...');
  // throw new DatabaseConnectionError();
  // // throw new Error('Error connecting to database');


  // res.send({});

  // if(!email || typeof email !== 'string'){
  //   res.status(400).send('Provide a valid email');
  // }

  //new user({email, password})
}
);

export { router as signupRouter };