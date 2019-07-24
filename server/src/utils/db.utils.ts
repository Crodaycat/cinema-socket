import oracledb from 'oracledb';

export async function getConnection(): Promise<oracledb.Connection> {
  return await oracledb.getConnection({
    user: 'CINEMASOCKET',
    password: 'CINEMASOCKET',
    connectString: 'localhost:1521/xe'
  });
}
