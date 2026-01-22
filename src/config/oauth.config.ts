import { ENV } from './env.js';

export const oauthConfig = {
    google: {
        clientId: ENV.GOOGLE_OAUTH.CLIENT_ID,
        clientSecret: ENV.GOOGLE_OAUTH.CLIENT_SECRET,
        callbackURL: ENV.GOOGLE_OAUTH.CALLBACK_URI
    }
}