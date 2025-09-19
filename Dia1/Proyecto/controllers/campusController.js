
import { CamperModel } from "../models/campusModel.js";
import jwt from "jsonwebtoken";

const camperModel = new CamperModel();

export class CamperController {
  register = async (req, res) => {
    try {
      const { username, password, nombre, cedula, role } = req.body;
      if (!username || !password || !nombre || !cedula) {
        return res.status(400).json({ message: "Faltan datos" });
      }

      const newCamper = await camperModel.register({
        username,
        password,
        nombre,
        cedula,
        role: role || "camper" // por defecto es camper
      });

      const token = jwt.sign(
        { id: newCamper._id, username: newCamper.username, role: newCamper.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(201).json({ message: "Camper registrado", token, camper: newCamper });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Login
  login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const camper = await camperModel.login(username, password);
      const token = jwt.sign(
        { id: camper._id, username: camper.username, role: camper.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({ message: "Login exitoso", token, camper });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // CRUD
  getCampers = async (req, res) => {
    try {
      const campers = await camperModel.getCampers();
      res.json(campers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  createCamper = async (req, res) => {
    try {
      const camper = req.body;
      const newCamper = await camperModel.addCamper(camper);
      res.status(201).json(newCamper);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  removeCamper = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await camperModel.deleteCamper(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  updateCamper = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await camperModel.updateCamper(id, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  searchCamperById = async (req, res) => {
    try {
      const { id } = req.params;
      const camper = await camperModel.searchCamperById(id);
      res.json(camper);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
