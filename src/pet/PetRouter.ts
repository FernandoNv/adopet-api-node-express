import express from "express";
import PetController from "./PetController";
import { IRepository } from "../types/IRepository";
import PetRepository from "./PetRepository";
import PetService from "./PetService";
import PetDTO from "./entity/PetDTO";
import PetEntity from "./entity/PetEntity";
import { AppDataSource } from "../config/dataSource";

const petRepository: IRepository<PetEntity> = new PetRepository(
  AppDataSource.getRepository(PetEntity)
);
const petDto = new PetDTO();
const petService = new PetService(petRepository, petDto);
const petController = new PetController(petService);

const petRouter = express.Router();

petRouter.get("/", (req, res) => petController.getAll(req, res));
petRouter.post("/", (req, res) => petController.create(req, res));
petRouter.put("/:id", (req, res) => petController.update(req, res));
petRouter.delete("/:id", (req, res) => petController.delete(req, res));

export default petRouter;
