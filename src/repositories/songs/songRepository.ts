import connection from '../../database';
import { Song } from "../../repositories/songs/interfaces";


export async function checkSong(link:string): Promise<Song[]> {
    const response = await connection.query(`
        SELECT * FROM songs WHERE "youtubeLink" = $1
    `,[link])
    return response.rows
}

export async function createSong(name:string, link:string) {
    await connection.query(`
        INSERT INTO songs (name, "youtubeLink")
        VALUES ($1, $2)    
    `, [name, link]);   
}

export async function findSong(id:number): Promise<Song> {
    const response = await connection.query(`
        SELECT * FROM songs WHERE "id" = $1
    `,[id])
    return response.rows[0];
}


export async function deleteSong(id:number) {
    await connection.query(`
        DELETE FROM songs WHERE id = $1
    `, [id]);
};

export async function getSongs(amount:number): Promise<Song[]> {
    const musics = await connection.query(`
        SELECT * FROM songs
        ORDER BY score DESC
        LIMIT $1
    `, [amount])
    
    return musics.rows;
}