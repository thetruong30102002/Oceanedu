const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
const mongooseDelete  = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema({
  name: { type: String, maxLength: 255,required: true },
  description: { type: String, maxLength: 255 },
  videoID: { type: String, maxLength: 255 },
  image: { type: String, maxLength: 255 },
  slug: { type: String, slug:'name' , unique: true},
},{
  timestamps:true,
});

//Add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete,{ overrideMethods: 'all' ,deletedAt:true});


 module.exports = mongoose.model('Course', Course);