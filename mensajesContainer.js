
module.exports = class ContenedorMensajes {
  constructor(knex, tableName) {
    this.knex = knex;
    this.tableName = tableName;
  }

  async save(objeto) {
    try {
      await this.knex.schema.hasTable(this.tableName).then(async (exists) => {
        if (!exists) {
          await this.knex.schema.createTable(this.tableName, (table) => {
            table.increments("id").unique();
            table.string("mensaje").notNullable();
            table.string("mail").notNullable();
            table.timestamp("fechaYHora").notNullable();
          });
          
        } 
        return await this.knex(this.tableName).insert(objeto);
      });

      console.log(`Se agregó el mensaje: ${objeto.mensaje}`);
    } catch (error) {
      return error;
    }
  }
  async getAllMessages() {
    try {
      let allMessages = await this.knex.from(this.tableName).select("*");
      return allMessages;
    } catch (error) {
      return error;
    }
  }
};
