import 'reflect-metadata'
import { plainToInstance } from 'class-transformer'
import { IsNumber, IsString, validateSync } from 'class-validator'
import * as dotenv from 'dotenv'

dotenv.config()

class EnvConfig {
  @IsString()
  TOKEN_SECRET!: string

  @IsNumber()
  SERVER_PORT!: number

  @IsString()
  DATABASE_URL!: string

  @IsString()
  INTERNAL_SERVICE_TOKEN_SECRET!: string
}

const envConfig = plainToInstance(EnvConfig, process.env, {
  enableImplicitConversion: true,
})

const errors = validateSync(envConfig)

if (errors.length > 0) {
  throw new Error(`Config validation error: ${errors.map((err) => JSON.stringify(err.constraints)).join(', ')}`)
}

export const CONFIG: EnvConfig = {
  TOKEN_SECRET: envConfig.TOKEN_SECRET,
  SERVER_PORT: envConfig.SERVER_PORT,
  DATABASE_URL: envConfig.DATABASE_URL,
  INTERNAL_SERVICE_TOKEN_SECRET: envConfig.INTERNAL_SERVICE_TOKEN_SECRET,
}
