const multer = require('multer');
const path = require('path');

// Configuração do Multer para armazenar as imagens no diretório 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); // Diretório onde as imagens serão armazenadas
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Extensão do arquivo
    cb(null, Date.now() + ext); // Nome do arquivo gerado com o timestamp
  }
});

// Configuração do Multer
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Somente arquivos JPEG, JPG e PNG são permitidos.'));
  }
});

module.exports = upload;
