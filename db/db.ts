import { Database, PostgresConnector } from 'https://deno.land/x/denodb/mod.ts';
import { Task } from './models/index.ts'

export const initAndSeed = async () => {

	const connection = new PostgresConnector({
	host: 'localhost',
	username: 'postgres',
	password: 'password',
	database: 'gimme_points_db',
	port: 5433
	});

	const db = new Database(connection);

	// class Flight extends Model {
	//   static table = 'flights';
	//   static timestamps = true;

	//   static fields = {
	//     id: { primaryKey: true, autoIncrement: true },
	//     departure: DataTypes.STRING,
	//     destination: DataTypes.STRING,
	//     flightDuration: DataTypes.FLOAT,
	//   };

	//   static defaults = {
	//     flightDuration: 2.5,
	//   };
	// }

	db.link([Task]);

	await db.sync({ drop: true });

	await Task.create({
	name: 'Wash dishes',
	description: 'Has to be full sink',
	points: 1
	});

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
