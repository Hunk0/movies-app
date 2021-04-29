import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './img')
    },
    filename: function(req, file, cb){
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
});

export const upload = multer({ //multer settings
    storage: storage,
    fileFilter: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return cb(new Error('Solo se permite usar imagenes'))
        }
        cb(null, true)
    },
});
