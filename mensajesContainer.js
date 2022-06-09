const fs = require("fs");
const knex = require("knex");
module.exports = class ContenedorMensajes {
    constructor(knexOptions, tableName) {
        this.knexOptions = knexOptions;
        this.tableName = tableName;
    }
   // knexCompleto = knex.knex(this.knexOptions)

    async save(objeto) {
        try {
            //drop table if exist + crea table + guarda el mensaje
            await knex.knex(this.knexOptions)
                .schema.hasTable(this.tableName)
                .then(async (exists) => {
                    if (!exists) {
                        await knex.knex(this.knexOptions).schema.createTable(this.tableName, (table) => {
                            table.increments("id");
                            table.string("mensaje").notNullable().unique();
                            table.string("mail").notNullable();
                            table.timestamp("fechaYHora").notNullable();
                        });
                        await knex.knex(this.tableName).insert(objeto);
                    }
                });

            console.log(`Se agregó el mensaje: ${objeto.id}`);
            return objeto.id;
        } catch (error) {
            return error;
        }
    }
    async getAllMessages() {
        try {

            let allMessages = await this.knexCompleto.from(this.tableName).select('*')
            return allMessages;
        } catch (error) {
            return error;
        }
    }
};
