import mongoose from 'mongoose';

const postSchema =  new mongoose.Schema({
    heading:{
        type: String,
        required:true
    },
    content:{
        type:String,
        required:true,
    },
    coverImage:{
        type:String,
         required:true,
    },
    optionalImage:{
        type:String,
         
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }   

},{ timestamps : true })


const Post = mongoose.model('Post',postSchema)
export default Post;