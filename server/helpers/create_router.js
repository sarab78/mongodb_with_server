const express = require('express');
const ObjectId = require('mongodb').ObjectId;


const createRouter = function (collection) {

  const router = express.Router();

  router.get('/', (req,res) => {
    // res.send("Hello World");
    collection
    .find() //find the data and send back the cursor object
    .toArray() //send it to array
    .then((docs) => res.json(docs)) //send document of array to convert into json
  })

  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection.findOne({_id: ObjectId(id)})
    .then((doc) => res.json(doc))
    .catch((err) => {
      console.err(err);
      res.status(500);
      res.json({status: 500, error: err});
    })

  })
  //create
    router.post('/', (req, res) => {
      const newData = req.body;
      collection
      .insertOne(newData)
      .then((result) => res.json(result.ops[0]))
      .catch((err) => {
        console.err(err);
        res.status(500);
        res.json({status: 500, error: err});
      })

    })
 //delete
router.delete('/:id', (req, res) => {
  const id =req.params.id;
  collection
  .deleteOne({_id: ObjectId(id)})
  .then(result => {
    res.json(result)
  })
    .catch((err) => {
      console.err(err);
      res.status(500);
      res.json({status: 500, error: err});
    })

//update
  })
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  collection
  .findOneAndUpdate(
    {_id: ObjectId(id)},
    {$set: updatedData},
    {returnOriginal: false}
  ).
  then((result) => {
    res.json(result.value)
  })
  .catch((err) => {
    console.err(err);
    res.status(500);
    res.json({status: 500, error: err});
  })
});


  return router;

};

module.exports = createRouter;
