import { DataTypes, Model } from 'https://deno.land/x/denodb/mod.ts';

export class Task extends Model {
    static table = 'task';
    static timestamps = true;
  
    static fields = {
      id: { primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      points: DataTypes.FLOAT,
    };
  
    static defaults = {
      points: 0,
    };
  }