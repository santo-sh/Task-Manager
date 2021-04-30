const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})



// __v => stores the version of the data
// data sanitization : It allows us to modify the data before saving it
// npm validator library allow us to validate our data

// REST api : Representational state transfer api30