import { getRepository } from "typeorm";
import { compare } from "bcryptjs"
import User from "../models/User";

interface Request {
    email: string;
    password: string;
}

class AuthUserService{
    public async execute({email, password}: Request): Promise<User> {
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

        return user;
    }
}

export default AuthUserService;