import { Transform } from 'class-transformer'

export function ParseNumber() {
  return Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
}
