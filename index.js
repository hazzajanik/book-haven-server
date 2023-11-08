const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const app = express();
const port = process.env.PORT || 5000;

// middleware

app.use(cors());
app.use(express.json());

// tNMOfMeXRpYLK4DG
// bookhaven

// mongobd start 


const uri = "mongodb+srv://bookhaven:tNMOfMeXRpYLK4DG@cluster0.grsw8p5.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const bookDataCollection = client.db('bookStore').collection('bookData');
    const bookCollection = client.db('bookStore').collection('book');
    const bookBorrowCollection = client.db('bookStore').collection('borrowBook');


    app.get('/bookData',async(req,res)=>{
      const data = bookDataCollection.find();
      const result =  await data.toArray();
      res.send(result)
    })

    app.get('/book',async(req,res)=>{
      const cursor = bookCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })


    app.get('/books/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await bookCollection.findOne(query);
      res.send(result)
    })

    app.post('/book',async(req,res)=>{
      const newBook = req.body;
      const result = await bookCollection.insertOne(newBook);
      res.send(result) 
    })

    app.post('/borrowBook',async(req,res)=>{
      const borrowBook = req.body;
      const result = await bookBorrowCollection.insertOne(borrowBook);
      res.send(result)
    })

    app.get('/borrowBook',async(req,res)=>{
      const cursor = bookBorrowCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    // (delete/return) book
    app.get('/borrowBook/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await bookBorrowCollection.findOne(query);
      res.send(result); 
    })

    app.delete('/borrowBook/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await bookBorrowCollection.deleteOne(query);
      res.send(result);
    })


    // update book

  app.put('/books/:id',async(req,res)=>{
      const id = req.params.id;
      const data = req.body;
      const filter = { _id : new ObjectId(id) };
      const options = { upsert: true };
      const updatedBook = {
        $set: {
          bookname : data.bookname,
          image : data.image,
          category : data.category,
          ratting : data.ratting,
          authorname : data.authorname,
        },
      };
      const result = await bookCollection.updateOne(filter,updatedBook,options);
      res.send(result);
  });


    




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);








app.get("/", (req, res) => {
    res.send("Crud is running...");
  });
  
  app.listen(port, () => {
    console.log(`Simple Crud is Running on port ${port}`);
  });

  
    
