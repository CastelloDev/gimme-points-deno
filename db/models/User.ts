import { DataTypes, Model } from 'https://deno.land/x/denodb/mod.ts';
import { Task } from './Task.ts'

export class User extends Model {
    static table = 'user';
    static timestamps = true;
  
    static fields = {
      id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      token: DataTypes.STRING, //for use if i integrate with google auth
      points: DataTypes.FLOAT,
    };
  
    static defaults = {
      token: "",
      points: 0
    };

    static createdTasks() {
      return this.hasMany(Task);
    }
  }