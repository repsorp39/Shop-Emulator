const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination:(req ,file ,cb) => cb(null , path.join(
        __dirname , '..','public','data'
    )),
    filename:(req , file ,cb) => {
        const filename = `${Date.now()}_${file.originalname}`
        cb(null ,filename);
    }
})
const upload = multer({storage});
module.exports = upload.single('picture');
