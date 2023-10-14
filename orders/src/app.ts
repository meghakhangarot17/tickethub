import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser} from '@metickethub/common';

import { newOrderRouter } from './routes/new';
import { deleteOrderRouter } from './routes/delete';
import { showOrderRouter } from './routes/show';
import { indexOrderRouter } from './routes';

const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(
    cookieSession({
        signed: false,     //disable encryption
        secure: process.env.NODE_ENV !== 'test'  //cookies will only be used if user is visiting our application over HTTPS connection
    })
);

app.use(currentUser);
app.use(deleteOrderRouter);
app.use(indexOrderRouter);
app.use(newOrderRouter);
app.use(showOrderRouter);


app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };

// app.get('/api/users/currentuser', (req,res) => {
//     res.send("Hi there!");
// });