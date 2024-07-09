import { validate } from 'class-validator'
import { ClassConstructor, ClassTransformOptions, plainToInstance } from 'class-transformer'

export const objectToClassInstance = async <T>(classToMakeInstanceFrom: ClassConstructor<T>, object: any, options?: ClassTransformOptions) => {
  const safeUser = plainToInstance(classToMakeInstanceFrom, object, options)
  const errors = await validate(safeUser as any, { whitelist: true })
  if (errors.length > 0) {
    throw new Error(errors.map((err) => err.toString()).join(','))
  }
  return safeUser
}
