const mongoose= require('mongoose');
const { model, Schema}= mongoose;

const cineSchema=new Schema({
  title: String,
  director: String,
  image: String,
  description:String,

  },
  {
    timestamps: true
}
);

module.exports = model('Cine', cineSchema);
