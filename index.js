//dotenv config
require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
// const personRoutes = require('./src/routes/personRoutes.js')
const DishItem = require('./src/models/DishItem.models.js');
const database = require('./src/db/database.js');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Welcome to my Hotel-World.')
});

app.post('/dishitem', async(req, res) => {
  try {
  const data = req.body
  const newDishItem = new DishItem(data);
  const response = await newDishItem.save();
  console.log('data saved');
  res.status(200).json(response);
} catch(error) {
  console.log(error);
  res.status(504).json({error: 'Gateway Timeout'})
}
})

const personRoutes = require('./src/routes/personRoutes.js');
// const personRoutes = require('./src/routes/personRoutes.js')

// use the routers
app.use('/person', personRoutes);

const menuItemRoutes = require('./src/routes/menuItemRoutes.js');

// use the routers
app.use('/menuitem', menuItemRoutes);


app.listen(PORT, () => {
  console.log(`Server run at port 3000`);
})

