module.exports = {
  name: 'SysPar',
  //mongoose schema, see mongoosejs.com for more info
  schema: {
    key: {type: String, index: true, unique: true},
    val: String
  }

}