import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// API routes
app.use('/api/auth', require('./services/auth').default);
app.use('/api/resize', require('./services/resizer').default);

app.listen(port, () => console.log(`Server running on port ${port}.`));

export default app;
