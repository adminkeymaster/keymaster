const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  var upload = multer({ storage: storage , filefilter: function(req, file, callback) {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg") {
          callback(null, true)
      } else {
          console.log('only jgp and png')
          callback(null, false)
      }
  }})

  module.exports = upload;