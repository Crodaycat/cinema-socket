import oracledb = require('oracledb');

import IReservation from '../models/reservation';
import { getConnection } from '../utils';

export async function getReservations(
  functionId: number
): Promise<void | IReservation[]> {
  const connection = await getConnection();

  return connection
    .execute(
      'select id, movie_function_id, reservation_row, reservation_chair from reservations WHERE movie_function_id = :functionId',
      [functionId],
      { outFormat: oracledb.OBJECT }
    )
    .then(result => result.rows.map(value => mapReservationFromResult(value)))
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      connection.close();
    });
}

export async function postReservation(
  reservation: IReservation
): Promise<void | IReservation> {
  const connection = await getConnection();

  const bindVars = {
    functionId: reservation.movieFunctionId,
    reservationRow: reservation.reservationRow,
    reservationChair: reservation.reservationChair,
    cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
  };

  return connection
    .execute(
      'BEGIN P_INS_RESERVATIONS(:functionId, :reservationRow, :reservationChair, :cursor); END;',
      bindVars,
      {
        outFormat: oracledb.OBJECT
      }
    )
    .then(async result => {
      const movie = await result.outBinds['cursor'].getRow();
      return mapReservationFromResult(movie);
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      connection.close();
    });
}

function mapReservationFromResult(data: Record<string, any>): IReservation {
  return {
    id: data['ID'],
    movieFunctionId: data['MOVIE_FUNCTION_ID'],
    reservationRow: data['RESERVATION_ROW'],
    reservationChair: data['RESERVATION_CHAIR']
  };
}
