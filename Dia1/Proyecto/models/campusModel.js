import connectDB from "./db.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

const COLLECTION = "campers";

export class CamperModel {

  async registrar(camperData) {

    const db = await connectDB();
    const existing = await db.collection(COLLECTION).findOne({ username: camperData.username });
    if (existing) throw new Error("Username ya existe");

    camperData.password = await bcrypt.hash(camperData.password, 10);
    const result = await db.collection(COLLECTION).insertOne(camperData);
    return { ...camperData, _id: result.insertedId };
  }

  async login(username, password) {
    const db = await connectDB();
    const camper = await db.collection(COLLECTION).findOne({ username });
    if (!camper) throw new Error("Usuario no encontrado");

    const valid = await bcrypt.compare(password, camper.password);
    if (!valid) throw new Error("Contraseña incorrecta");

    return camper;
  }

  async getCampers() {
    const db = await connectDB();
    return db.collection(COLLECTION).find().toArray();
  }

  async addCamper(camper) {
   
    const db = await connectDB();
    const result = await db.collection(COLLECTION).insertOne(camper);
    return { ...camper, _id: result.insertedId };
  }

  async updateCamper(id, camper) {
   
    const db = await connectDB();
    await db.collection(COLLECTION).updateOne({ _id: new ObjectId(id) }, { $set: camper });
    return { ...camper, _id: id };
  }

  async deleteCamper(id) {
    const db = await connectDB();
    const result = await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 1) return { message: "Camper eliminado", id };
    else return { message: "Camper no encontrado", id };
  }

  async searchCamperById(id) {
    const db = await connectDB();
    return db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });
  }



  async findByUsername(username) {
    const db = await connectDB();
    return db.collection(COLLECTION).findOne({ username });
  }
}