const express = require('express');
const port = process.env.PORT || 5055;
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();


const app = express()
app.use(cors());
app.use(bodyParser.json());

const addData = (url,collection) => {
  app.post(`/${url}` ,(req, res) => {
    const addData = req.body;
    collection.insertOne(addData)
    .then(result=>{
      console.log("successfully inseterd for ",result.insertedCount);
      res.send(result.insertedCount>0)
    })
    .catch(e=>{
      console.log("data could not be inserted for \n",e);
    })
  })
}


const jobsDatabseURL = `mongodb+srv://${process.env.databaseUser}:${process.env.databasePassword}@hay-store-cluster-01.coi91.mongodb.net/${process.env.courseDatabase}?retryWrites=true&w=majority`
const jobsClient = new MongoClient(jobsDatabseURL, { useNewUrlParser: true, useUnifiedTopology: true });

jobsClient.connect((err) => {
  const courseCollection = jobsClient.db(process.env.jobsDatabase).collection("dummy-jobs");
  app.get('/jobs', (req, res) => {
    courseCollection.find()
      .toArray()
      .then(items =>{
        res.send(items);
      })
  })
  
  addData('addJobs' , courseCollection);
  
  app.delete('/deleteJob/:id' , (req,res) =>{
    courseCollection.deleteOne({_id: ObjectID(req.params.id)})
    .then(result=>{
      console.log('removed successully');
    })
    .catch(e=>[
      console.log('could not be removed')
    ])
  })

})


const users = `mongodb+srv://${process.env.databaseUser}:${process.env.databasePassword}@hay-store-cluster-01.coi91.mongodb.net/${process.env.courseDatabase}?retryWrites=true&w=majority`
const usersClient = new MongoClient(users, { useNewUrlParser: true, useUnifiedTopology: true });

usersClient.connect((err) => {
  const courseCollection = usersClient.db(process.env.usersDatabase).collection("users");
  app.get('/users', (req, res) => {
    courseCollection.find()
      .toArray()
      .then(items =>{
        res.send(items);
      })
  })
  
  addData('addJobs' , courseCollection);
  
  app.delete('/deleteUser/:id' , (req,res) =>{
    courseCollection.deleteOne({_id: ObjectID(req.params.id)})
    .then(result=>{
      console.log('removed successully');
    })
    .catch(e=>[
      console.log('could not be removed')
    ])
  })

})

const mainJobsDatabseURL = `mongodb+srv://${process.env.databaseUser}:${process.env.databasePassword}@hay-store-cluster-01.coi91.mongodb.net/${process.env.courseDatabase}?retryWrites=true&w=majority`
const mainJobsClient = new MongoClient(mainJobsDatabseURL, { useNewUrlParser: true, useUnifiedTopology: true });

mainJobsClient.connect((err) => {
  const courseCollection = mainJobsClient.db(process.env.mainJobsDatabase).collection("main-jobs");
  app.get('/main-jobs', (req, res) => {
    courseCollection.find()
      .toArray()
      .then(items =>{
        res.send(items);
      })
  })
  
  addData('addMainJobs' , courseCollection);
  
  app.delete('/deleteMainJob/:id' , (req,res) =>{
    courseCollection.deleteOne({_id: ObjectID(req.params.id)})
    .then(result=>{
      console.log('removed successully');
    })
    .catch(e=>[
      console.log('could not be removed')
    ])
  })

})

const userDatabaseURI = `mongodb+srv://${process.env.databaseUser}:${process.env.databasePassword}@hay-store-cluster-01.coi91.mongodb.net/${process.env.userDatabase}?retryWrites=true&w=majority`
const userClient = new MongoClient(userDatabaseURI, { useNewUrlParser: true, useUnifiedTopology: true });

userClient.connect((err) => {
  console.log('err khaise mongo hayre' , err);
  const userCollection = userClient.db(process.env.userDatabase).collection("user");
  app.get('/users', (req, res) => {
    userCollection.find()
      .toArray()
      .then(items =>{
        res.send(items);
      })
  })
  addData('addUsers' , userCollection);
})


const adminDatabaseURI = `mongodb+srv://${process.env.databaseUser}:${process.env.databasePassword}@hay-store-cluster-01.coi91.mongodb.net/${process.env.adminDatabase}?retryWrites=true&w=majority`
const adminClient = new MongoClient(adminDatabaseURI, { useNewUrlParser: true, useUnifiedTopology: true });

adminClient.connect((err) => {
  console.log('err khaise mongo hayre' , err);
  const adminCollection = adminClient.db(process.env.adminDatabase).collection("admins");
  app.get('/admins', (req, res) => {
    adminCollection.find()
      .toArray()
      .then(items =>{
        res.send(items);
      })
  })
  addData('addAdmins' , adminCollection);
  app.delete('/deleteAdmin/:id' , (req,res) =>{
    adminCollection.deleteOne({_id: ObjectID(req.params.id)})
    .then(result=>{
      console.log('removed successully');
    })
    .catch(e=>[
      console.log('could not be removed')
    ])
  })
  
})


const teachersDatabaseURI = `mongodb+srv://${process.env.databaseUser}:${process.env.databasePassword}@hay-store-cluster-01.coi91.mongodb.net/${process.env.teachersDatabase}?retryWrites=true&w=majority`
const teachersClient = new MongoClient(teachersDatabaseURI, { useNewUrlParser: true, useUnifiedTopology: true });

teachersClient.connect((err) => {
  console.log('err khaise mongo hayre' , err);
  const teachersCollection = teachersClient.db(process.env.teachersDatabase).collection("teachers");
  app.get('/teachers', (req, res) => {
    teachersCollection.find()
      .toArray()
      .then(items =>{
        res.send(items);
      })
  })
  
  addData('addTeachers' , teachersCollection);
})


const userFeedbackDatabaseURI = `mongodb+srv://${process.env.databaseUser}:${process.env.databasePassword}@hay-store-cluster-01.coi91.mongodb.net/${process.env.userFeedbackDatabase}?retryWrites=true&w=majority`
const userFeedbackClient = new MongoClient(userFeedbackDatabaseURI, { useNewUrlParser: true, useUnifiedTopology: true });

userFeedbackClient.connect((err) => {
  console.log('err khaise mongo hayre' , err);
  const userFeedbackCollection = userFeedbackClient.db(process.env.userFeedbackDatabase).collection("feedbacks");
  app.get('/feedbacks', (req, res) => {
    userFeedbackCollection.find()
      .toArray()
      .then(items =>{
        res.send(items);
      })
  })
  
  addData('addUserFeedback' , userFeedbackCollection);
})



const courseDatabaseURI = `mongodb+srv://${process.env.databaseUser}:${process.env.databasePassword}@hay-store-cluster-01.coi91.mongodb.net/${process.env.courseDatabase}?retryWrites=true&w=majority`
const courseClient = new MongoClient(courseDatabaseURI, { useNewUrlParser: true, useUnifiedTopology: true });

courseClient.connect((err) => {
  console.log('err khaise mongo hayre' , err);
  const courseCollection = courseClient.db(process.env.courseDatabase).collection("courses");
  app.get('/courses', (req, res) => {
    courseCollection.find()
      .toArray()
      .then(items =>{
        res.send(items);
      })
  })
  
  addData('addCourse' , courseCollection);
  
  app.delete('/deleteCourse/:id' , (req,res) =>{
    courseCollection.deleteOne({_id: ObjectID(req.params.id)})
    .then(result=>{
      console.log('removed successully');
    })
    .catch(e=>[
      console.log('could not be removed')
    ])
  })

})



const reviewsDtabaseURI = `mongodb+srv://${process.env.databaseUser}:${process.env.databasePassword}@hay-store-cluster-01.coi91.mongodb.net/${process.env.reviewsDtabase}?retryWrites=true&w=majority`
const reviewsClient = new MongoClient(reviewsDtabaseURI, { useNewUrlParser: true, useUnifiedTopology: true });

reviewsClient.connect((err) => {
  console.log('err khaise mongo hayre' , err);
  const reviewsCollection = reviewsClient.db(process.env.reviewsDtabase).collection("reviews");
  app.get('/reviews', (req, res) => {
    reviewsCollection.find()
      .toArray()
      .then(items =>{
        res.send(items);
      })
  })
  
  addData('addReview' , reviewsCollection);
})




const serviceDatabaseURI = `mongodb+srv://${process.env.databaseUser}:${process.env.databasePassword}@hay-store-cluster-01.coi91.mongodb.net/${process.env.serviceDatabase}?retryWrites=true&w=majority`
const serviceClient = new MongoClient(serviceDatabaseURI, { useNewUrlParser: true, useUnifiedTopology: true });


serviceClient.connect((err) => {
  console.log('err khaise mongo hayre' , err);
  const serviceCollection = serviceClient.db(process.env.serviceDatabase).collection("services");
  app.get('/services', (req, res) => {
    serviceCollection.find()
      .toArray()
      .then(items =>{
        res.send(items);
      })
  })
  
  addData('addServices' , serviceCollection);
  app.delete('/deleteCService/:id' , (req,res) =>{
    serviceCollection.deleteOne({_id: ObjectID(req.params.id)})
    .then(result=>{
      console.log('removed successully');
    })
    .catch(e=>[
      console.log('could not be removed')
    ])
  })

})





const userOrdersListDatabaseURI = `mongodb+srv://${process.env.databaseUser}:${process.env.databasePassword}@hay-store-cluster-01.coi91.mongodb.net/${process.env.userOrdersListDatabase}?retryWrites=true&w=majority`
const userOrdersListClient = new MongoClient(userOrdersListDatabaseURI, { useNewUrlParser: true, useUnifiedTopology: true });


userOrdersListClient.connect((err) => {
  console.log('err khaise mongo hayre' , err);
  const userOrdersListCollection = userOrdersListClient.db(process.env.userOrdersListDatabase).collection("orders-list");
  app.get('/orders-list', (req, res) => {
    userOrdersListCollection.find()
      .toArray()
      .then(items =>{
        res.send(items);
      })
  })
  addData('addOrders-list' , userOrdersListCollection);
})


app.get('/', (req, res) => {
  res.send('Shikkhok Server Site Locally Connected')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
