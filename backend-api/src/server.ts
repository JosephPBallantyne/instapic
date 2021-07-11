import path from 'path';
import App from './app';
import { AuthRoute, ImageRoute } from './routes';

require('dotenv').config({ path: path.resolve(`${__dirname}/../.env`) });

const app = new App([new AuthRoute(), new ImageRoute()]);

app.listen();
