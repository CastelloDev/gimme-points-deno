import { Database, PostgresConnector } from 'https://deno.land/x/denodb/mod.ts';
import { Relationships } from 'https://deno.land/x/denodb/mod.ts';
import { Task, User } from './models/index.ts'
import { tasks } from './seedData/tasks.ts'
import { users } from './seedData/users.ts'

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

		Relationships.belongsTo(Task, User, { foreignKey: `createdById`});

		db.link([ User, Task ]);

		this.client = db;
	}

	async seed() {
		await this.client.sync({ drop: true });

		for await (const user of users) {
			await User.create(user);
		}

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
