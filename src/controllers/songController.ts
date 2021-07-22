import {Request, Response} from 'express';
import getYouTubeID from 'get-youtube-id';
import * as songService from '../services/songService';


export async function postSong(req: Request, res: Response) {
    try {
        const { name, link } = req.body;
       
        if(!name || !getYouTubeID(link)) {
            return res.sendStatus(403);
        }

        const newSong = await songService.createSong(name, link);
        
        if(!newSong) {
            return res.sendStatus(409) 
        } else {
            return res.sendStatus(201);
        }

    } catch(err) {
        return res.status(500).send(err);
    }
}

export async function getSong(req: Request, res: Response) {
    try {
        const amount = parseInt(req.params.amount);

        if(!amount || !(amount > 0)) return res.sendStatus(404);  
    
        const musics = await songService.filterSongs(amount);
    
        return res.status(200).send(musics);
    } catch(err) {
        return res.status(500).send(err);
    }
}