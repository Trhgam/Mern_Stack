import User from "~/models/User.schema";
import databaseServices from "./database.services";

class UserServices{
    async register(payLoad : { email: string ; password : string }){
        const result = await databaseServices.users.insertOne(
            new User({
                ...payLoad
            })
        )
        return result;
    }

    async checkEmaiExist(email:string){
        //promise ở đây 

        const user = await databaseServices.users.findOne({email})
        return Boolean(user)
    }
}
const usersServices = new UserServices()
export default usersServices
//What Why How When
