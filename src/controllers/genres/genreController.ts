/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {Request, Response} from "express";
import * as genreService from "../../services/genres/genreService";

export async function create(req:Request, res: Response) {
	try {
		const {name} = req.body;

		if(!name) return res.sendStatus(403);
        
		const genreAdd = await genreService.checkGenre(name);
    
		if (!genreAdd) {
			return res.sendStatus(401);
		} else {
			return res.sendStatus(201);
		}    
	} catch(err) {
		console.log(err);
		return res.status(500).send(err);
	}
}

export async function getGenres(req:Request, res: Response) {
	try {
		const genres = await genreService.orderGenre();
    
		if(!genres) return res.sendStatus(401);
		return res.status(200).send(genres);
	} catch(err) {
		console.log(err);
		return res.status(500).send(err);
	}
}