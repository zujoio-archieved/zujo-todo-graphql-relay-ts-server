"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs = require('fs');
const imagepath = path_1.join(__dirname, `../../../src/Upload/`);
const uploadFiles = (req, res) => {
    const uploadFile = req.files.selectedFile;
    console.log(uploadFile, "UPLOADFILE");
    uploadFile.mv(imagepath + uploadFile.name, err => {
        if (err)
            return res.status(500).send(err);
        console.log('upload Success');
    });
};
exports.default = uploadFiles;
//# sourceMappingURL=uploadfile.js.map