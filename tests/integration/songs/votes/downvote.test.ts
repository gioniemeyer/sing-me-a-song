import supertest from "supertest";
import app from "../../../../src/app";
import connection from "../../../../src/database";

import {Body} from "../../../factories/bodies"; 
import { clearDatabase, endConnection } from "../../../utils/database";

beforeEach(async() => {
	await clearDatabase();
});

afterAll(() => {
	endConnection();
});

describe("POST /recommendation/:id/downvote", () => {
	it("should return 201 when song is correctly downvoted", async () => {
		await supertest(app).post("/recommendations").send(Body);
		const music = await connection.query(`
            SELECT * FROM songs
        `);
		const id = music.rows[0].id;
		const result = await supertest(app).post(`/recommendations/${id}/downvote`);
		expect(result.status).toBe(201);
	});

	it("should return 404 when music id does not exist", async () => {
		const result = await supertest(app).post("/recommendations/1/downvote");
		expect(result.status).toBe(404);

	});

	it("should return 403 when req.params.id is not a number", async () => {
		const result = await supertest(app).post("/recommendations/id_sting/downvote");
		expect(result.status).toBe(403);
	});

	it("should return 201 when a song is scored under -5", async () => {
		await supertest(app).post("/recommendations").send(Body);
		const music = await connection.query(`
            SELECT * FROM songs
        `);
		const id = music.rows[0].id;

		for(let i = 0; i < 5; i++) {
			await supertest(app).post(`/recommendations/${id}/downvote`);
		}
        
		const result = await supertest(app).post(`/recommendations/${id}/downvote`);
		expect(result.status).toBe(201);
	});
});