import oracledb = require('oracledb');

import IMovie from '../models/movie';
import { getConnection } from '../utils';

export async function getMovies(): Promise<void | IMovie[]> {
  const connection = await getConnection();

  return connection
    .execute('select id, name, picture from movies', [], {
      outFormat: oracledb.OBJECT
    })
    .then(result => result.rows.map(value => mapMovieFromResult(value)))
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      connection.close();
    });
}

function mapMovieFromResult(data: Record<string, any>): IMovie {
  return {
    id: data['ID'],
    name: data['NAME'],
    picture: data['PICTURE']
  };
}
