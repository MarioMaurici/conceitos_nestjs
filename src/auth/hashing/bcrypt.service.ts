import bcrypt from 'node_modules/bcryptjs';
import { HashingService } from './hashing.service';

export class BcryptService implements HashingService {
    async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(password, salt) //gera um hash da senha com o salt gerado
    }

    async compare(password: string, passwordHash: string): Promise<boolean> {
        return bcrypt.compare(password, passwordHash);
    }
}