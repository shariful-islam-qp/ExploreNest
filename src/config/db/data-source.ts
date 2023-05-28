import { DataSource, DataSourceOptions } from 'typeorm'

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'user',
  password: 'Password123',
  database: 'testDB',
  synchronize: true,
  logging: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
}

const dataSource = new DataSource(dataSourceOptions)

export default dataSource
