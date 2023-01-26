import { DataSource, DataSourceOptions } from 'typeorm'

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Password123!',
  database: 'nest_practice',
  synchronize: false,
  logging: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
}

const dataSource = new DataSource(dataSourceOptions)

export default dataSource
