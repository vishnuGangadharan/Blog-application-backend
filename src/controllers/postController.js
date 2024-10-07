import Post from "../model/blog.js";

export const addPost = async(req,res) => {
    try {
        console.log('user',req.userId);
        let userId = req.userId;
        console.log('post',req.body);
        console.log('post',req.files);
        const { heading, content } = req.body;
        const coverPic = req.files.coverImage[0]?.filename; 
    const optionalPic = req.files.optionalImage ? req.files.optionalImage[0]?.filename : null;
    console.log(coverPic,optionalPic);
    const newPost = new Post({
        heading,
        content,
        coverImage:coverPic,
        optionalImage: optionalPic ,
        userId
      });
      await newPost.save();
      res.status(200).json({
        success: true,
        message: 'Post added successfully',
        data: newPost,
      });
        
    } catch (error) {
        console.log(error);
        
    }
}


export const getPost = async(req,res) => {
    try {
        const posts = await Post.find()
        res.status(200).json({
            success: true,
            message: 'Post fetched successfully',
            data: posts,
          });

    } catch (error) {
        console.log(error);

    }
}

export const userPosts = async(req,res) =>{
    try {
        console.log('user',req.userId);
        const post = await Post.find({userId: req.userId})
        res.status(200).json({
            success: true,
            message: 'Post fetched successfully',
            data: post,
          });
        
    } catch (error) {
        console.log(error);
        
    }
}

export const blogData = async(req,res) => {
    try {
        
        const { id } = req.query;
        const post = await Post.findById(id)
        res.status(200).json({
            success: true,
            message: 'Post fetched successfully',
            data: post,
          });

    } catch (error) {
        console.log(error);

    }
}

export const deleteBlog = async(req,res) => {
    try {
        const { id } = req.query;
        const deletePost = await Post.findByIdAndDelete(id)
        const post = await Post.find({userId: req.userId})      
        return  res.status(200).json({
            success: true,
            message: 'Post deleted successfully',
            data: post,
          });
        

    } catch (error) {
        console.log(error);

    }
}


export const editBlog = async(req,res) => {
    try {

        const { id } = req.query; 
        const { heading, content } = req.body; 
        const coverPic = req.files?.coverImage ? req.files.coverImage[0]?.filename : null;
        const optionalPic = req.files?.optionalImage ? req.files.optionalImage[0]?.filename : null;
    
        const updateFields = {};
    
        if (heading) updateFields.heading = heading;
    
        if (content) updateFields.content = content;
    
        if (coverPic) updateFields.coverImage = coverPic;

            if (optionalPic) updateFields.optionalImage = optionalPic;
            const updatedPost = await Post.findByIdAndUpdate(
          id,
          { $set: updateFields },
          { new: true } 
        )
        res.status(200).json({
            success: true,
            message: 'Post updated successfully',
            data: updatedPost,
          });
    } catch (error) {
        console.log(error);

    }
}