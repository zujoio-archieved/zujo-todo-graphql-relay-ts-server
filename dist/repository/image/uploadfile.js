"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const fs = require('fs');
const imagepath = path_1.join(__dirname, `../../../Upload/`);
exports.uploadFiles = (req, res) => {
    const uploadFile = req.files.selectedFile;
    console.log(uploadFile, "UPLOADFILE");
    uploadFile.mv(imagepath + uploadFile.name, err => {
        if (err)
            return res.status(500).send(err);
        console.log('upload Success');
    });
};
exports.storeUpload = (stream, filename) => new Promise((resolve, reject) => stream
    .pipe(fs_1.createWriteStream(imagepath + filename))
    .on("finish", () => resolve())
    .on("error", reject));
// const uploadDir = "./Upload"
// const storeUpload = async ({ stream, filename }): Promise<any> => {
//   const id = "123"
//   const path = `${uploadDir}/${id}-${filename}`
//   return new Promise((resolve, reject) =>
//     stream
//       .pipe(createWriteStream(path))
//       .on('finish', () => resolve({ id, path }))
//       .on('error', reject),
//   )
// }
//# sourceMappingURL=uploadfile.js.map