import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', router);
app.use('/', (req, res) => {
  res.status(404).json({ 
    status: 404,
    error: 'route does not exist. check the route'
  });
})
const port = 8080;
const server = app.listen(process.env.PORT || port, () => {
  console.log(`listening on port ${port}`);
});
export default server;
