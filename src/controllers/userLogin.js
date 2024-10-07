import User from "../model/user.js";
import { EncryptPassword, comparePassword } from "../config/bcryptPassword.js";
import { generateToken } from "../config/JWT.js";

export const signup = async (req, res) => {
    try {
        const { name, password, phone, email } = req.body;
        console.log('signup', req.body);
        const existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).json({ 
                success: false,
                message : 'User already exists'
            })
        }else{
            const hashedPassword = await EncryptPassword(password)
            const newUser = new User({
                userName : name,
                email,
                phone,
                password: hashedPassword,
                is_verified: true,

            })
            await newUser.save();
            const { userName, email: userEmail, phone: userPhone, profilePicture } = newUser;
            const token = generateToken(newUser._id, 'user')
            res.status(200).json({
                success: true,
                message: 'signup successfully',
                token,
                data: {
                    userName,
                email: userEmail,
                phone: userPhone,
                profilePicture,
                _id: newUser._id,
                }
            })
        }
        
    }catch(error){
        console.log(error)
        res.status(400).json({ message: 'Server error' });

    }
}


export const login = async(req,res)  => {
    try {
        console.log('here',req.body);
        const { email, password} = req.body
        const userExist = await User.findOne({email})
        if(!userExist){
            return res.status(400).json({
                message: 'User not exists',
                success: false
            })
        }else{
            const compare = await comparePassword(password, userExist.password)
            if(!compare){
                return res.status(400).json({
                    message: 'wrong password',
                    success: false
                }) 
            }else{
                const { userName, email, phone, profilePicture, _id } = userExist;
                const token = generateToken(userExist._id, 'user')

                return res.status(200).json({
                    message: 'Login success',
                    success: true,
                    token,
                    data: {
                        userName,
                        email,
                        phone,
                        profilePicture,
                        _id
                    }
                })
            }
        }
    } catch (error) {
        console.log(error);
        
    }
}

