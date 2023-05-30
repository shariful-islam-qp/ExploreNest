import { DataSource, DataSourceOptions } from 'typeorm'

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3307,
  username: process.env.DB_USERNAME || 'user',
  password: process.env.DB_PASSWORD || 'Password123',
  database: process.env.DATABASE || 'testDB',
  synchronize: true,
  logging: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource
