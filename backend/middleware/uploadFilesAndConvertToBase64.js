const Busboy = require('busboy');

const uploadFilesAndConvertToBase64 = (req, res, next) => {
  console.log("busboy");
  if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
    const busboy = Busboy({ headers: req.headers });
    
    req.body = {};
    req.files = []; 

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      const chunks = [];
      file.on('data', (data) => {
        chunks.push(data);
      });

      file.on('end', () => {
        const fileBuffer = Buffer.concat(chunks);
        const base64 = fileBuffer.toString('base64');
        req.files.push({ fieldname, filename, encoding, mimetype, base64 });
        // console.log(`File [${fieldname}] uploaded: ${filename}`);
      });
    });

    busboy.on('field', (fieldname, val) => {
      req.body[fieldname] = val;
      // console.log(`Field [${fieldname}]: value: ${val}`);
    });

    busboy.on('finish', () => {
      req.body.images = req.files.map(file => file.base64);
      // console.log('Form parsing finished.');
      // console.log('Request body:', req.body);
      next();
    });

    req.pipe(busboy);
  } else {
    next();
  }
};

module.exports = uploadFilesAndConvertToBase64;
