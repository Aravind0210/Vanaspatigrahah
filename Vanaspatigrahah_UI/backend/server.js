
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
  server: '192.168.43.44',
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

app.get('/api/fertilizers', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const searchTerm = req.query.search || ''; // Default to empty string if no search term

    let query = 'SELECT * FROM MASTERFERTILIZER';
    if (searchTerm) {
      query += ' WHERE Name LIKE @search';
    }

    const result = await pool
      .request()
      .input('search', sql.NVarChar, `%${searchTerm}%`) // Apply search term if available
      .query(query);

    res.json(result.recordset); // Send the fertilizers as JSON
  } catch (error) {
    console.error('Error fetching fertilizers:', error); // This will log the error
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/api/manure', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM dbo.manuremaster');
    res.json(result.recordset); // Send manure data as response
  } catch (err) {
    console.error('Error fetching manure data:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/pesticides', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM dbo.pestiside');
    res.json(result.recordset); // Send the pesticide data as response
  } catch (err) {
    console.error('Error fetching pesticide data:', err);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/api/shopsby/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .query(`SELECT * FROM mastervanasplants WHERE ID = @id`);

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Plant not found' });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    console.error('Error fetching plant details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
