import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes';
import createTables from './model/migration';

const swaggerDocument = YAML.load('./server/docs/docs.yaml');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);
app.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: 'route does not exist. check the route, especially if the route param is of required type.',
  });
});
app.use((err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) {
    err.statusCode = 500;
    err.message = 'something went wrong';
  }
  res.status(err.statusCode).json({
    status: err.statusCode,
    error: err.message,
  });
});
const port = 8080;
createTables();
const server = app.listen(process.env.PORT || port, () => {
  console.log(`listening on port ${port}`);
});
export default server;
