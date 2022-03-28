import { getRepository } from "typeorm";
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken";
import User from "../models/User";

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthUserService{
    public async execute({email, password}: Request): Promise<Response> {
        const userRepo = getRepository(User);
        const user = await userRepo.findOne({
            where: { email }
        })

        if (!user){
            throw "Incorrect e-mail/password"
        }
        
        const passwordMatched = await compare(password, user.password!)

        if (!passwordMatched){
            throw "Incorrect e-mail/password"
        }

        const token = sign({ }, '63b7604b965e432f756913b1e7e5527e', {
            subject: user.id,
            expiresIn: '1d',
        });
        
        delete user.password;

        return {
            user,
            token
        };
    }
}

export default AuthUserService;