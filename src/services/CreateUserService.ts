import { getRepository } from "typeorm";
import User from "../models/User";

interface Request{
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({name, email, password}: Request): Promise<User>{
        const userRepo = getRepository(User);
        const checkUserEmailExist = await userRepo.findOne({
            where: {email}
        })

        if (checkUserEmailExist){
            throw "User e-mail already exist!"
        }

        const user = userRepo.create({
            name,
            email,
            password
        })

        await userRepo.save(user);

        return user;
    }
}

export default CreateUserService;