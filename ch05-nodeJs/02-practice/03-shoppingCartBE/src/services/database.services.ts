import e from 'express'
import { Collection, Db, MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import User from '~/models/User.schema'
import RefreshToken from '~/models/RefreshToken.schema'
dotenv.config() // ket noi voi file env de sd bien trong env

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@shoppingcartprojectclus.mgzhdl9.mongodb.net/?appName=shoppingCartProjectCluster`

class DatabaseServices {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }

  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  // method kết nối collection users
  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
    //.env dùng bộ mã hóa để tách ra để ngta ko tahays đc nên ở đây nó thực sự ko bt đây có thực sự ko undefine ko
    // cách là chấn án nó , sure với nó as string là được nha
  }
  
  // mongo nếu ch có thì nó sẽ tạo còn có rồi thì nó lấy thôi
  get refreshTokens(): Collection<RefreshToken> {
    return this.db.collection(process.env.DB_REFRESH_TOKENS_COLLECTION as string)
  }
}

//dependency injection pattern
let databaseServices = new DatabaseServices()
// databaseServices.users.insertOne()
// databaseServices.getUsers() trả ra Collection<Document> nếu ko định nghĩa nó
// gây ra mk ko spam code được , nó ko hiện các thuộc tính của User , của 1 hàng á
export default databaseServices



