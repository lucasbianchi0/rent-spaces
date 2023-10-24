// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/uploads/');
//   },
//   filename: (req, file, cb) => {
//     try {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//       const extname = path.extname(file.originalname);
//       cb(null, file.fieldname + '-' + uniqueSuffix + extname);
//     } catch (error) {
//       cb(error);
//     }
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;



const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    try {
      const extname = path.extname(file.originalname);
      const uniqueFilename = uuidv4() + extname;
      cb(null, uniqueFilename);
    } catch (error) {
      cb(error);
    }
  },
});

const upload = multer({ storage });

module.exports = upload;
