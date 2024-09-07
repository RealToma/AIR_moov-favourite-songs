import mongoose from 'mongoose'

const MDL_SCHEMA = new mongoose.Schema({
  user_id: String,
  contributorid: String,
  productid: String,
  product_num: Number,
  contributors: Array,
})

const PRODUCT_SCHEMA = new mongoose.Schema({
  productid: String,
  product_title: String,
  product_image: String,
})

const ARTIST_SCHEMA = new mongoose.Schema({
  contributorid: String,
  artist_name: String,
  artist_image: String,
})

const USER_SCHEMA = new mongoose.Schema({
  netpassid: String,
  user_id: String,
})

module.exports = {
  MDL_SCHEMA,
  PRODUCT_SCHEMA,
  ARTIST_SCHEMA,
  USER_SCHEMA,
}