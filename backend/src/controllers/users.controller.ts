import { Request, Response } from "express"
import User from "../models/users.model";
import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        const currentUser = await User.findOne({ email });

        if (!currentUser) {
            const user = new User(req.body);
            await user.save();

            res.status(200).json({
                status: true,
                message: 'User created successfully',
                data: user
            })
        } else {
            return res.status(400).json({
                status: false,
                message: 'User is already registered',

            })
        }

    } catch (error) {
        console.log(error)
    }
}

export const signin = async (req: Request, res: Response) => {
    try {
        const { email, password, fcm } = req.body;

        const user: any = await User.findOne({ email });



        if (!user) {
            return res.status(401).json({
                status: false,
                message: 'Invalid user or password',
            })
        } else {
            const matchPass = await user.matchPassword(password);

            if (matchPass) {
                const secretKey: string = process.env.JWT_SECRET_KEY ?? '';
                const token = jwt.sign({ email: user.email }, secretKey, {
                    expiresIn: '3d'
                })

                const updatedUser: any = await User.findOneAndUpdate({
                    _id: user._id
                },
                    {
                        $set: {
                            jwt: token,
                            fcm
                        }
                    },
                    {
                        new: true
                    })

                return res.status(200).json({
                    status: true,
                    message: 'User logged in successfully',
                    data: {
                        jwt: updatedUser.jwt,
                        role: updatedUser.roles
                    }
                })
            } else {
                return res.status(401).json({
                    status: false,
                    message: 'Invalid user or password',
                })
            }
        }


    } catch (error) {
        console.log(error)
    }
}

export const getInfo = async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            status: true,
            data: req.user
        });

    } catch (error) {
        console.log(error)
    }
}