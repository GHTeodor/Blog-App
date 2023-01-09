import bcrypt from 'bcrypt';

import { ApiError } from '../errors';

class PasswordHelper {
    hashPassword = async (password: string, rounds: number = 10): Promise<string> => bcrypt.hash(password, rounds);

    async comparePasswords(password: string, hash: string) {
        const isPasswordSame = await bcrypt.compare(password, hash);

        if (!isPasswordSame) throw new ApiError('Wrong email or password', 404);
    }
}

export const passwordHelper = new PasswordHelper();
