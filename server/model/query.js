import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.NODE_ENV, ' cnnect');
let connect = process.env.DATABASE_URL;
if (process.env.NODE_ENV === 'test') {
  connect = process.env.DATABASE_TEST;
} else if (process.env.NODE_ENV === 'development') {
  connect = process.env.DATABASE_DEVELOP;
}
const pool = new Pool({ connectionString: connect });
function db(text, param) {
  return pool.query(text, param);
}
export default db;
