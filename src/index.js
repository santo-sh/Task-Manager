const express = require('express');
require('./db/mongoose');   // only making connection to db
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const app = express();
const port = process.env.PORT;

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

// without middleware ---  new request -> run route handler
// with middlware --- new request -> do something -> run route handler


app.listen(port,()=>{
    console.log(`Server is listening to port: ${port}`)
});


// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () =>{
// //     const task = await Task.findById('608952c0e294d7b642f35a78')
// //     await task.populate('owner').execPopulate()  // populating properties from one task to user as they have relationship 
// //     console.log(task.owner)
// // }
//         const user = await User.findById('608950ad3d5357b3b35a9f1e')
//         await user.populate('tasks').execPopulate()
//         console.log(user.tasks)
// }

// main()

// patch :
// put :  

// hashing algorithm : B correct
// encyption can be decrypted but hashing algo cannot be done in same way.
// middleware is a way to custome the mongoose model


// const jwt = require('jsonwebtoken')
// const myFunction = async () =>{
//     const token  = await jwt.sign({_id:'abc123'},'thisismynewcourse',{expiresIn: '1 second'})
//     console.log(token)

//     const data = jwt.verify(token, 'thisismynewcourse')  // return payload
//     console.log(data)

// }

// myFunction()

// sub documents are also having ids of their own




