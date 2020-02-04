const multer = require('multer');
const path = require('path');

const fileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
     cb(null, 'images')
    },
    filename:(req,file,cb)=>{
      cb(null, file.originalname);
    }
  });

  const upload = multer({
      storage:fileStorage,
    limits:{
      fileSize:1024*1024*5*8
    },
    fileFilter:(req, file,cb)=>{
      const types = /jpeg|jpg|png|gif/
      const extName = types.test(path.extname(file.originalname).toLowerCase())
      const mimeType = types.test(file.mimetype)
      if(extName && mimeType){
        cb(null,true)
      }else{
        cb(new Error('only support images'))
      }
    }
   })

   module.exports = upload