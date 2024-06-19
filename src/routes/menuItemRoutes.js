const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem.models.js');


router.post('/', async(req, res) => {
    try {
     const data = req.body
     const newMenuItem = new MenuItem(data);

     const response = await newMenuItem.save();
     console.log('data saved');
     res.status(200).json(response);
    } catch (error) {
     console.log(error);
     res.status(502).json({error: 'Internal Server Error'});
    }
});

router.get('/',  async (req, res) => {
 try {
   const data = await MenuItem.find();
   console.log('data fetched');
   res.status(200).json(data);
 } catch (error) {
   console.log(error)
   res.status(505).json({error: 'HTTP Version Not Supported'})
 }
})


router.get('/:taste', async(req, res) => {
  try {
    const taste = req.params.taste;
    if (taste == "sweet" || taste ==  "spicy" || taste == "sour") {
      const response = await MenuItem.find({taste:taste});
      console.log('response fetched');
      res.status(200).json(response);
    } else {
      res.status(404).json({error: 'Not Found'});
    }
  } catch (error) {
    console.log(error)
    res.status(503).json({error: 'Service Unavailable'})
  }
})


router.put('/:id', async(req, res) => {
  try {
    const menuitemId = req.params.id;
    const updatedMenuItemData = req.body;
    const response = await MenuItem.findByIdAndUpdate(menuitemId, updatedMenuItemData, {
      new:true,
      runValidators: true,
    })

    if(!response) {
      return res.status(400).json({error: "MenuItem not Found"});
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch(error) {
    console.log(error);
    res.status(500).json({error: "Invalid Server"});
  }

})

module.exports = router;