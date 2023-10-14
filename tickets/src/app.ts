import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser} from '@metickethub/common';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes';
import { updateTicketRouter } from './routes/update';


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
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);


app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };

// app.get('/api/users/currentuser', (req,res) => {
//     res.send("Hi there!");
// });