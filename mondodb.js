
// connecting using navtive mongodb Driver

const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID} = require('mongodb');

const id = new ObjectID();
console.log(id);


const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';


MongoClient.connect(connectionURL,{useNewUrlParser: true,},(error, client)=>{
    if(error){
        return console.log("Unable to connection to database");
    }
    console.log("Connected Successfully")

    const db = client.db(databaseName);


    // inserting one value to mongodb

    // db.collection('users').insertOne({
    //     name: 'Santosh',
    //     age: 27
    // }, (error, result)=>{
    //     if(error){
    //         return console.log("Unable to insert desired data.")
    //     }
    //     console.log('Inserted Successfully');
    //     console.log(result.ops);
    // });

    // inserting more values to mongodb

    // db.collection('users').insertMany([
    //     {
    //         name: 'Maria',
    //         age: 17
    //     },{
    //         name: 'Julia',
    //         age: 20
    //     }
    // ],(error, result)=>{
    //     if(error){
    //         return console.log("Unable to insert data to Database")
    //     }

    //     console.log("Inserted Successfully");

    //     console.log(result.ops);
        
    // })




    // id in mongodb indicates to GUIDd
    // It is a 12-byte Oject value 



    // Querying from mondoDB

    // querying using condition

    db.collection("users").find({name: "Santosh"},(error, result)=>{
        if(error){
            return console.log("Unable to find data from Database")
        }
        console.log();
    });
    
    // Finding data using ObjectID

    // db.collection("users").findOne({ _id: new ObjectID("607d8d30dc3d052a78b5e3e8")},(error, result)=>{
    //     if(error){
    //         return console.log("Unable to find data from Database")
    //     }
    //     console.log(result);
    // });


    // finding multiple data using single criteria 
    
    db.collection("users").find({name: "Santosh"}).toArray((error, users)=>{
        if(error){
            return console.log("Unable to find data from Database")
        }
        console.log(users);
    });


    // counting multiple data fetchd


    db.collection("users").find({name: "Santosh"}).count((error, count)=>{
        if(error){
            return console.log("Unable to find data from Database")
        }
        console.log(count);
    });


    // Upadation in mongoDB

    // UpdateOne  -- Updating in only one  data piece

    // const updatePromise = db.collection("users").updateOne({ 
    //     _id: new ObjectID("607d8d30dc3d052a78b5e3e8")
    // }, {
    //     $set:{
    //         name : 'Verra'
    //     }
    // })

    // updatePromise.then((result) => {
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })


    // we use mondoDB update operators for performing different operations with update

    db.collection("users").updateOne({ 
            _id: new ObjectID("607d8d30dc3d052a78b5e3e8")
        }, {
            // $set:{
            //     name : 'Verra'
            // }

            $inc:{
                age: 2
            }
        }).then((result) => {
            console.log(result)
        }).catch((error)=>{
            console.log(error)
        })
    
    
    // UpdateMany  --- Updating multiple pieces of data



})