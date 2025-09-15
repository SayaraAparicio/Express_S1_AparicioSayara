import mongoose from "mongoose";

export class Database{
    constructor(uri){
        this.uri=uri;
    }
    async connect(){
        try{
            mongoose.set("strictQuery",true);
            await mongoose.connect(this.uri);
            console.log("MongoDB Conectado!");
        }
        catch(err){
            console.log("Error en MongoDB:"+err.message);
        }
    }

    async disconnect(){
        try{
            await mongoose.disconnect();
            console.log("Base de Datos Desconectada!");
        }
        catch(err){
            console.log("Error en MongoDB:"+err.message);
        }
    }
}