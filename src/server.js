/** @module src/server */

/** Import express and passport dependencies. */
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import morgan from 'morgan';

/** Define express variable. */
const app = express();
/** Define environment port variable. */
const port = process.env.PORT || 5000;

/** Have express use middleware. */
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

/** Import and use passport config. */
import useJwt from './config/passport';
useJwt(passport);

/** Define API routes. */
app.use('/api/auth', require('./services/auth').default);
app.use('/api/resize', require('./services/resizer').default);
app.use('/api/jsonpatch', require('./services/jsonpatch').default);

/** Server listen to port. */
app.listen(port, () => console.log(`Server running on port ${port}.`));

export default app;
