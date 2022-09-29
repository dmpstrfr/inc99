const express = require('express');
const app = express();
const connectDB = require('./db');
connectDB();

const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const itemRoutes = require('./routes/itemRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const groupRoutes = require('./routes/groupsRoutes');
const tripRoutes = require('./routes/tripRoutes');

//-------------MIDDLEWARE----------
app.use(express.urlencoded());
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
//-------------MIDDLEWARE----------

app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/inventories', inventoryRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/trips', tripRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
