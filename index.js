
module.exports = function basicPlugin(pluginConf, web, next) {
  pluginConf = web.utils.extend(require('./conf.js'), pluginConf);

  var SysPar = web.includeModel(pluginConf.sysParModel)
  web.syspars = new Object();
  web.syspars.get = function(key, cb) {
    SysPar.findOne({key: key}, function(err, syspar) {
      cb(err, syspar);
    })
  }

  web.syspars.set = function(key, value, cb) {
    SysPar.findOne({key: key}, function(err, syspar) {
      if (err) {
        throw err;
      }

      if (!syspar) {
        syspar = new SysPar();
      }

      syspar.key = key;
      syspar.val = value;
      syspar.save(function(err) {
        if (cb) {
          cb(err, syspar);
        }
      })
      
    })
  }
  
  next();
}