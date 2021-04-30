const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,   // for trimming spaces before and after value
    },
    age: {
        type: Number,
        required: true,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            } else if (value < 18) {
                throw new Error('You are not allowed to enter as less than 18')
            }
        }
    },
    email: {
        type: String,
        unique: true,
        trim: true,   // for trimming spaces before and after value
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is not valid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        // validate(value){
        //     if(value.length < 6){
        //         throw new Error('Password is too short. Try a new password with length more than 6')
        //     }else if(value.includes("password")){
        //         throw new Error('Your password is predictabale. Try something new')
        //     }
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true,

        }
    }],
    avatar: {
        type: Buffer
    }
}
    , {
        timestamps: true,
    })

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

// methods -> acessible on instances model
// this method is binded that's why we cannot use arrow function here
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)  // to provide our payload

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token

}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

// statics -> accessible on model methods 
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error("Unable to find account registered with this email")
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error("Password incorrect")
    }
    return user
}

// hash the plain text password
userSchema.pre('save', async function (next) {
    // this.password
    // console.log('just before saving')

    // hashing password if either password is modified or a new user is created
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()  // program will hang if next never called
})

// deletes user tasks when user is deleted

userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User;