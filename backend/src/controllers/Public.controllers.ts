import {
    Categoria,
    Feedback,
    Pelicula
} from "../models/Index";
import { Request, Response } from "express";

import path from "path";

export default class PublicController {  
    static crear = async ( req:Request, res:Response ) : Promise<Response> => {
        try {
            const data = JSON.parse(req.body.pelicula);
            const pelicula = new Pelicula(data);
            pelicula.setCaratula(req.file.filename);
            const results = await pelicula.add();
            await pelicula.setCategorias(data.categorias);

            return res.json(results);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static lista = async ( req:Request, res:Response ) : Promise<Response> => {
        try {
            const pelicula = new Pelicula();

            const query = JSON.parse(JSON.stringify(req.query));
            const titulo: string | undefined = query.titulo;
            const categorias: string[] | undefined = query.categorias?.split(",") || undefined;

            const results = await pelicula.getList(titulo, categorias);
            return res.json(results);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static novedades = async ( req:Request, res:Response ) : Promise<Response> => {
        try {
            const pelicula = new Pelicula();
            const results = await pelicula.getNewer();
            return res.json(results);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static categorias = async ( req:Request, res:Response ) : Promise<Response> => {
        try {
            const categoria = new Categoria();
            const results = await categoria.getAll();
            return res.json(results);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static getImg = async ( req:Request, res:Response ) => {
        res.sendFile(path.join(__dirname, `../../img/${req.params["ref"]}`));
    }

    static puntuacion = async ( req:Request, res:Response ) : Promise<Response> => {
        try {
            const puntuacion = new Feedback({peliculaId: Number(req.params.pid)});
            const results = await puntuacion.getPuntuacion();
            return res.json(results);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static calificar = async ( req:Request, res:Response ) : Promise<Response> => {
        try {
            const puntuacion = new Feedback(req.body);
            puntuacion.setPeliculaId(Number(req.params.pid));

            const results = await puntuacion.addFeedback();
            return res.json(results);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}