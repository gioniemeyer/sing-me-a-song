/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import connection from "../../database";

export async function checkGenre(name: string) {
	const response = await connection.query(`
        SELECT * FROM genres WHERE name = $1   
    `, [name]);

	return response.rows[0];
}

export async function create(name:string) {
	await connection.query(`
        INSERT INTO genres (name) VALUES ($1)    
    `, [name]);
}

export async function getGenresByName() {
	const genres = await connection.query(`
        SELECT * FROM genres ORDER BY name ASC   
    `);
	return genres.rows;
}