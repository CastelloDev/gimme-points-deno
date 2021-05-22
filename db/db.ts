import { Database, PostgresConnector } from 'https://deno.land/x/denodb/mod.ts';
import { Task } from './models/index.ts'
import { tasks } from './seedData/tasks.ts'

export const initAndSeed = async () => {

	const connection = new PostgresConnector({
	host: 'localhost',
	username: 'postgres',
	password: 'password',
	database: 'gimme_points_db',
	port: 5433
	});

	const db = new Database(connection);

	db.link([Task]);

	await db.sync({ drop: true });
	// await db.sync({ drop: false });

	for await (const task of tasks) {
		await Task.create(task);
	}

	// or

	// const flight = new Task();
	// flight.departure = 'London';
	// flight.destination = 'San Francisco';
	// await flight.save();

	await Task.select('name').all();
	// [ { destination: "Tokyo" }, { destination: "San Francisco" } ]

	// await Task.where('destination', 'Tokyo').delete();

	// const sfFlight = await Task.select('destination').find(2);
	// { destination: "San Francisco" }

	// await Task.count();
	// 1

	// await Task.select('id', 'destination').orderBy('id').get();
	// [ { id: "2", destination: "San Francisco" } ]

	// await sfFlight.delete();

	await db.close();
}

class DB {
	public client: Database;

	constructor(public dbName: string, public url: string, public port: number, public username: string, public password: string) {
		this.dbName = dbName;
		this.url = url;
		this.port = port;
		this.url = url;
		this.username = username;
		this.password = password;
		this.client = {} as Database;
	}

	connect() {

		const connection = new PostgresConnector({
			host: this.url,
			username: this.username,
			password: this.password,
			database: this.dbName,
			port: this.port
		});
		const db = new Database(connection);
		db.link([Task]);

		this.client = db;
	}

	async seed() {
		await this.client.sync({ drop: true });
		for await (const task of tasks) {
			await Task.create(task);
		}
	}

	get getDatabase() {
		return this.client;
	}
}

const dbName = Deno.env.get("DB_NAME") || "gimme_points_db";
const dbUrl = Deno.env.get("DB_URL") || "localhost";
const dbPort = parseInt(Deno.env.get("DB_PORT") || "5433");
const dbUsername = Deno.env.get("DB_USERNAME") || "postgres";
const dbPassword = Deno.env.get("DB_PASSWORD") || "password";
console.log(dbName, dbUrl)
const db = new DB(dbName, dbUrl, dbPort, dbUsername, dbPassword);
db.connect();
export default db;
