import oracledb = require('oracledb');

import IReservation from '../models/reservation';
import { getConnection } from '../utils';

export async function getReservations(): Promise<void | IReservation[]> {
  const connection = await getConnection();

  return connection
    .execute(
      'select id, movie_function_id, reservation_row, reservation_chair from reservations',
      [],
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

function mapReservationFromResult(data: Record<string, any>): IReservation {
  return {
    id: data['ID'],
    movieFunctionId: data['MOVIE_FUNCTION_ID'],
    reservationRow: data['RESERVATION_ROW'],
    reservationChair: data['RESERVATION_CHAIR']
  };
}
