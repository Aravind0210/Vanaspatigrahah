
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
  database: 'vanaspatigrahah',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};
const pool = new sql.ConnectionPool(config);
pool.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Error connecting to the database:', err));


// API Endpoint to fetch shop details by name
app.get("/api/shops", async (req, res) => {
  try {
    const { search } = req.query;
    const result = await pool
      .request()
      .input("search", sql.NVarChar, search + '%')  // Use correct wildcard
      .query(`SELECT * FROM mastervanasplants WHERE SHOP_NAME LIKE @search`);
  
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching shops:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
