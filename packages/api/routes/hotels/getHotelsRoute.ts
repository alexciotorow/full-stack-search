import express from "express";
import { getLocationController } from "../../controllers/hotels/getLocationController";


const router = express.Router();
router.get("/hotels", getLocationController);


export default router;