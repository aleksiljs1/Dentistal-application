import bcrypt from "bcryptjs";

export async function validatePassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}


