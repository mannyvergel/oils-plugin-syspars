'use strict';

module.exports = {
  name: 'SysPar',
  //mongoose schema, see mongoosejs.com for more info
  schema: {
    key: {type: String, index: true, unique: true},
    val: String,
    createDt: {type: Date}
  },

  initSchema: function(mySchema) {
  	mySchema.pre('save', function(next) {
  		//the problem with using "default" is that even when it's empty
  		//mongoose is returning the value as Date.now
  		if (!this.createDt) {
  			this.createDt = new Date();
  		}

  		next();
  	});
  }

}