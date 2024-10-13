import { Router } from "express";
const userRouter = Router()
import { signup, login } from "../controllers/userLogin.js";
import { userAuth } from "../authentication.js/userAuth.js";
import { addPost, getPost, userPosts , blogData, deleteBlog, editBlog } from "../controllers/postController.js";
import upload from "../config/multer.js";

userRouter.post('/signup',(req,res)=>signup(req,res))
userRouter.post('/login',(req,res)=>login(req,res))
userRouter.post('/addPost',userAuth,(req,res)=>addPost(req,res))
userRouter.get('/getBlog',userAuth, (req,res)=>getPost(req,res))
userRouter.get('/userPosts',userAuth, (req,res)=>userPosts(req,res))
userRouter.get('/blogData',userAuth, (req,res)=>blogData(req,res))
userRouter.delete('/deleteBlog',userAuth, (req,res)=>deleteBlog(req,res))
userRouter.post('/editPost',userAuth ,(req,res)=>editBlog(req,res))


export default userRouter