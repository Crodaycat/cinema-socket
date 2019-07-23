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

export async function postMovies(movie: IMovie): Promise<void | IMovie> {
  const connection = await getConnection();

  const bindVars = {
    name: movie.name,
    cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
  };

  return connection
    .execute('BEGIN P_INS_MOVIE(:name, :cursor); END;', bindVars, {
      outFormat: oracledb.OBJECT
    })
    .then(async result => {
      const movie = await result.outBinds['cursor'].getRow();
      console.log('Movie: ', movie);
      return mapMovieFromResult(movie);
    })
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
