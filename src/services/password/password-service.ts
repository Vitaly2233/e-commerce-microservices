import bcrypt from 'bcrypt'

export class PasswordService {
  async checkPassword(password: string, passwordConfirm: string) {
    const passwordMatch = await bcrypt.compare(password, passwordConfirm)

    if (!passwordMatch) throw new Error("Password doesn't match")
  }
}
