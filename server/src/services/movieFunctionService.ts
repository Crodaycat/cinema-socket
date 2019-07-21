import oracledb = require('oracledb');

import { getConnection } from '../utils';
import IMovieFunction from '../models/movieFunction';

export async function getMovieFunctions(): Promise<void | IMovieFunction[]> {
  const connection = await getConnection();

  return connection
    .execute(
      'select id, movie_id, function_date, function_time from movie_functions',
      [],
      { outFormat: oracledb.OBJECT }
    )
    .then(result => result.rows.map(value => mapMovieFunctionFromResult(value)))
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      connection.close();
    });
}

function mapMovieFunctionFromResult(data: Record<string, any>): IMovieFunction {
  return {
    id: data['ID'],
    movieId: data['MOVIE_ID'],
    functionDate: data['FUNCTION_DATE'],
    functionTime: data['FUNCTION_TIME']
  };
}
