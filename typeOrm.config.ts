import { DataSource } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'

config()

const configService = new ConfigService()

export default new DataSource({
  type: 'postgres',
  url: configService.get('POSTGRES_DSN'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  logging: true,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migration/**/*.ts']
})
