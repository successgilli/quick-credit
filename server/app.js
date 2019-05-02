import express from 'express';
import routes from './routes/auth';

const app = express();
app.use('/api/v1', routes);
const port = 3000;
const server = app.listen(port || process.env.PORT, () => {
  console.log(`listening on port ${port}`);
});
export default server;
