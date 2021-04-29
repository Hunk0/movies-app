import { Router } from 'express';
import { upload } from "../middlewares/fileUpload";
import PublicController from '../controllers/Public.controllers';

const router = Router();
router.post('/crear', [upload.single("caratula")], PublicController.crear);
router.get('/lista', PublicController.lista);
router.get('/novedades', PublicController.novedades);
router.get('/categorias', PublicController.categorias);
router.get('/img/:ref',  PublicController.getImg);
router.get('/peliculas/:pid/stats',  PublicController.puntuacion);
router.post('/peliculas/:pid/stats',  PublicController.calificar);

export default router;