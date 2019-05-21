import bcrypt from 'bcrypt';
import db from '../model/query';

const saltRounds = 10;
const password = 'admingilli';

const seedAdmin = async () => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password.trim(), salt);
  const param = [
    'Gilbert',
    'success',
    'Ajao estate',
    'successgilli22@gmail.com',
    hash,
    'portharcourt',
    'andela',
    12345678901,
    'fidelity',
    6173035366,
    20000,
    true
  ];
  const { rows } = await db('SELECT * FROM users WHERE userr=$1', ['successgilli22@gmail.com']);
  if (rows.length === 0) {
    const text = `INSERT INTO users (
      firstname,
      lastname,
      address,
      userr,
      password,
      companyaddress,
      companyname,
      bvn,
      bankname,
      accountnumber,
      monthlyincome,
      isadmin
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *;`;
    try {
      await db(text, param);
      console.log('admin seeded');
    } catch (e) {
      console.log(e.message)
    }
  }
}

export default seedAdmin;