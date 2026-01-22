import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';;
import bcrypt from 'bcrypt';
import { userRepository } from '../repositories/user.repository.js';
import type { User } from '../types/user.types.js';

//Configura LocalStrategy
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                // Busca usuário pelo e-mail
                const user: User | undefined = await userRepository.findByEmail(email);

                if (!user) {
                    return done(null, false, { message: 'Email ou senha incorretos' });
                }

                // Verifica se usuário tem senha cadastrada
                if (!user.password) {
                    return done(null, false, { message: 'Usuário sem senha cadastrada' });
                }

                // Compara senha fornecida com hash armazenada
                const isPasswordValid: boolean = await bcrypt.compare(password, user.password);

                if (!isPasswordValid) {
                    return done(null, false, { message: 'Email ou senha incorretos' });
                }

                // Autenticação bem-sucedida
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, (user as User).id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user: User | undefined = await userRepository.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export default passport;
