/**
 * 
 */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    descripcion: { type: String, unique: true, required: [true, 'Descripcion Obligaoria'] },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
});

// categoriaSchema.methods.toJSON = function() {

//     let category = this;
//     let categoryObject = category.toObject();

//     return categoryObject;
// }

categoriaSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Categoria', categoriaSchema);