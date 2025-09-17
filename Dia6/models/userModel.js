import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

export default class UserModel {
    constructor() {
        this.client = new MongoClient(process.env.MONGO_URI);
        this.dbName = process.env.MONGO_DB
    }




    async connect() {
        if (db) return db; //Retorna la variable si tiene alguna conexión
        await this.client.connect(); //Abre la conexión
        db = this.client.db(this.dbName);//Selecciona y anida la BBDD
        return db.collection("users"); // Retorna la conexión anidada a la BBDD con la coleccion users
    }
    async createUser(userData){
        const collection = await this.connect();
        return await collection.insertOne(userData);
    }
    async findUserByEmail(email){
        const collection = await this.connect();
        return await collection.findOne({email});
    }

    async updateUser(id,newData){
        const collection = await this.connect();
        return await collection.updateOne({
            _id: new ObjectId(id)
        },{$set:newData})
    };


}