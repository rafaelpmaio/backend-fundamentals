export const rateLimitConfig = {
    auth: {
        windowMs: 15 * 60 * 1000, // Janela de tempo para contagem de tentativas (15 minutos)
        max: 5, // Nº máx de requisições permitidas na janela
        message: 'Muitas tentativas de login. Tente novamente mais tarde'

    },
    api: {
        windowMs: 15 * 60 * 1000, // Janela de tempo para utilização da API (15 minutos)
        max: 100,  // Máx de requisições permitidas na API
        message: 'Muitas requisições. Tente novamente mais tarde'
    }
};