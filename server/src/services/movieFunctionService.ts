import oracledb = require('oracledb');

import {
  getConnection,
  dateToOracleCharDate,
  dateToTimeString
} from '../utils';
import IMovieFunction from '../models/movieFunction';

export async function getMovieFunctions(
  movieId,
  date
): Promise<void | IMovieFunction[]> {
  const connection = await getConnection();

  return connection
    .execute(
      'SELECT id, movie_id, function_date, function_time FROM movie_functions WHERE movie_id = :movieId AND TO_CHAR(function_date) = :functionDate',
      [movieId, dateToOracleCharDate(new Date(date))],
      { outFormat: oracledb.OBJECT }
    )
    .then(result => {
      return result.rows.map(value => mapMovieFunctionFromResult(value));
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      connection.close();
    });
}

export async function postMovieFunction(
  movieFunction: IMovieFunction
): Promise<void | IMovieFunction> {
  const connection = await getConnection();

  const bindVars = {
    movieId: movieFunction.movieId,
    functionDate: {
      type: oracledb.DATE,
      dir: oracledb.BIND_IN,
      val: new Date(movieFunction.functionDate)
    },
    functionTime: dateToTimeString(new Date(movieFunction.functionTime)),
    cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
  };

  return connection
    .execute(
      'BEGIN P_INS_MOVIE_FUNCTIONS(:movieId, :functionDate, :functionTime,:cursor); END;',
      bindVars,
      {
        outFormat: oracledb.OBJECT
      }
    )
    .then(async result => {
      const movie = await result.outBinds['cursor'].getRow();
      return mapMovieFunctionFromResult(movie);
    })
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
