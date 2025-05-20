import express from "express";
import petRouter from "./pet/PetRouter";
import guardianRouter from "./guardian/GuardianRouter";

const router = (app: express.Router) => {
  app.use("/pets", petRouter);
  app.use("/guardians", guardianRouter);
};

export default router;
