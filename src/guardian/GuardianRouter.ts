import express from "express";
import { AppDataSource } from "../config/dataSource";
import GuardianDto from "./entity/GuardianDto";
import GuardianService from "./GuardianService";
import { GuardianController } from "./GuardianController";
import GuardianEntity from "./entity/GuardianEntity";
import { IRepository } from "../types/IRepository";
import GuardianRepository from "./GuardianRepository";
import AddressDto from "./address/AddressDto";

const guardianRepository: IRepository<GuardianEntity> = new GuardianRepository(
  AppDataSource.getRepository(GuardianEntity)
);
const addressDto = new AddressDto();
const guardianDto = new GuardianDto(addressDto);
const guardianService = new GuardianService(guardianRepository, guardianDto);
const guardianController = new GuardianController(guardianService);

const guardianRouter = express.Router();

guardianRouter.post("/", (req, res) => guardianController.create(req, res));
guardianRouter.get("/", (req, res) => guardianController.getAll(req, res));
guardianRouter.put("/:id", (req, res) => guardianController.update(req, res));
guardianRouter.put("/:id/address", (req, res) =>
  guardianController.updateAddress(req, res)
);
guardianRouter.delete("/:id", (req, res) =>
  guardianController.delete(req, res)
);

export default guardianRouter;
