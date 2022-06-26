const mongoose = require('mongoose');
const config = require('./DBconfig/DBconfigMensajes');
const { ErrorCustom } = require('./errorCustom');

mongoose.connect(config.mongo.URL,config.mongo.options)

module.exports = class ContenedorMensajes {
  constructor(collectionName, schema) {
    this.collection = mongoose.model(collectionName, schema);
}

  
  async save(item) {
    try {
      item.timestamp= new Date();
        const newItem = await this.collection.create(item);
        if (newItem) {
            return newItem;
        }
        const err = new ErrorCustom(error, 500, "Error");
        throw err;
    } catch (error) {
        
      throw new Error(error)
        
    }
}
  async getAllMessages() {
    try {
        const allData = await this.collection.find({});
        return allData;
    } catch (error) {
        throw new Error(error)
    }
}
};
