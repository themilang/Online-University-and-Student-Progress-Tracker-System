import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,

    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        
    },

    roles:{
        type: String,
        enum:['student','instructer','admin'], //roles defined
        default:'student'

 
    },
    jwt:{

    },

    fcm:{

    }
})
const User = mongoose.model('User',userSchema);

export default User;