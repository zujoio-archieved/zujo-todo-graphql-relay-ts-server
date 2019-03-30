import { join } from 'path';
import { Request, Response } from 'express';
const fs = require('fs');
const imagepath = join(__dirname, `../../../src/Upload/`);
 const uploadFiles = (req: Request, res: Response) => {
    const uploadFile: any = req.files.selectedFile;
    console.log(uploadFile,"UPLOADFILE")
    uploadFile.mv(imagepath + uploadFile.name, err => {
      if (err) return res.status(500).send(err);
      console.log('upload Success');
    });
};
export default uploadFiles;