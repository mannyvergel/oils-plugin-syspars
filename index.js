
module.exports = function basicPlugin(pluginConf, web, next) {
  pluginConf = web.utils.extend(require('./conf.js'), pluginConf);

  var SysPar = web.includeModel(pluginConf.sysParModel)
  web.syspars = new Object();
  web.syspars.get = function(key, cb) {
    return new Promise(function(resolve, reject) {
      SysPar.findOne({key: key}, function(err, syspar) {
        if (cb) {
          cb(err, syspar);
        }
        
        if (err) {
          reject(err);
          return;
        }

        resolve(syspar);
      })  
    });
    
  }

  web.syspars.set = function(key, value, cb) {
    return new Promise(function(resolve, reject) {
      SysPar.findOne({key: key}, function(err, syspar) {
        if (err) {
          if (cb) {
            cb(err);
          }
          reject(err);
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

          if (err) {
            reject(err);
            return;
          }

          resolve(syspar);
        })
        
      })
    });
    
  }
  
  next();
}