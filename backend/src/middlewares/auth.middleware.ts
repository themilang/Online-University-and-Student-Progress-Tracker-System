import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/users.model";

interface CustomRequest extends Request {
    user: {
        role: string
    };
}

interface CustomRequest2 extends Request {
    user: object;
}

export const authMiddleware = async (req: CustomRequest2, res: Response, next: NextFunction) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            const token: string = req.headers.authorization.split(" ")[1];
            const secretKey: string = process.env.JWT_SECRET_KEY ?? ""
            const validatedData: any = jwt.verify(token, secretKey);
            const user: any = await User.findOne({ email: validatedData.email });
            req.user = user;
            next();
        } else {
            return res.status(401).json({
                status: false,
                message: 'Unauthorized user'
            })
        }
    } catch (error) {
        console.log(error)
    }
}



export const authorize = (...roles: any) => async (req: CustomRequest, res: Response, next: NextFunction) => {
    if (roles.includes(req.user.role)) {
        next();
    } else {
        res.status(401).json({
            status: false,
            message: 'You are not a authorized user to access this resources'
        })
    }

}