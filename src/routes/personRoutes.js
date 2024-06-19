const express = require('express');
const router = express.Router();
const Person = require('../models/Person.models.js');

// post for save & send
router.post('/', async (req, res) => {
    try {
     const data = req.body // Assuming the request body contains the person data
 
     // Create a new Person document using the Mongoose model
     const newPerson = new Person(data);
    
     //save the new person to the database
     const response = await newPerson.save();
     console.log('data saved');
     res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({error: 'Internal Server Error'});
    }
 });

 // get method to get the person
 // using get to fetch the data  
router.get('/', async (req, res) => {
    try {
       const data = await Person.find();
       console.log('data fetched');
       res.status(200).json(data);
    } catch (error) {
      console.log(error)
      res.status(500).json({error: 'Internal Server Error'})
    }
  })


  router.get('/:workType', async (req, res) => {
    try{
    const workType = req.params.workType;
    if(workType == "softwareengineer" || workType == "waiter" || workType == "manager"){
     
      const response = await Person.find({work: workType});
      console.log('response fetched');
      res.status(200).json(response);
    }else {
      res.status(404).json({error: 'Invalid work type'});
    }
  }catch(error) {
     console.log(error);
     res.status(500).json({error: 'Internal Server Error'});
  }
  })

  // update data so use put & patch
  router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract the id from the URL parameter
        const updatedPersonData = req.body; // updated data for the person
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // return the updated document
            runValidators: true, // Run mongoose validation
        })

        if(!response) {
            return res.status(404).json({error : "Person not found"});
        }
        console.log('data updated');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Invalid Server"});
    }
  })
   
  // delete & remove the Person 
  router.delete('/:id', async(req, res) => {
    try {
        // person id
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);
        if(!response) {
            return res.status(404).json({error : "Person not deleted"});
        }
        console.log('data deleted');  
        res.status(200).json({message: "Person delete Successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Delete Response is not success"});
    }
  })

  module.exports = router;
  