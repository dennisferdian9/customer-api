const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config(); 

const app = express();

app.use(cors()); 

const PORT = process.env.PORT || 5000;

app.use(express.json());

connectDB(); 
app.use('/api/customers', require('./routes/customer'));

app.get('/', (req, res) => {
  res.send('Hello from Express + MongoDB!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
