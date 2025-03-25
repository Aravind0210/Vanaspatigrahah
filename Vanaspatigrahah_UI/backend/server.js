
const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const xlsx = require('xlsx');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const config = {
  user: 'sa',
  password: '20p256',
  server: 'LAPTOP-RVD8BNNA\\SQLEXPRESS',
  database: 'cast_alloys',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};
const pool = new sql.ConnectionPool(config);
pool.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Error connecting to the database:', err));




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
