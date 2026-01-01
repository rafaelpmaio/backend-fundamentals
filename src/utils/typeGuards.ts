export const getValidatedId = (params: any): string => {
    const {id} = params;

    // Garante type safety para Typescript, garantindo que id sempre será string
    if (!id) {
        throw new Error('Id não encontrado - middleware de validação não foi aplicado');
    }

    return id;
}