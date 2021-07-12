import path from 'path';
import App from './app';
import { AuthRoute, ImageRoute, DefaultRoute } from './routes';

require('dotenv').config({ path: path.resolve(`${__dirname}/../.env`) });

const app = new App([new AuthRoute(), new ImageRoute(), new DefaultRoute()]);

app.listen();
