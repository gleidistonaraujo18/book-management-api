import HttpError from "./Error";
export class ValidationFields {

    /**
     * Valida os campos obrigatórios no objeto fornecido.
     * @param fields Um objeto contendo os campos a serem validados.
     * @throws {Error} Lança uma exceção se algum campo obrigatório estiver faltando.
     */
    public static validateRequiredFields(fields: { [key: string]: any }): void {
        const missingFields = Object.keys(fields).filter(field => !fields[field]);

        if (missingFields.length > 0) {
            throw new HttpError(400, `Please fill in all required fields: ${missingFields.join(', ')}`)
        }
    }
}
