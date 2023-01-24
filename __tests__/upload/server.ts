// an expressjs app to upload files to
import cors = require('cors');
import express = require('express');
import multer = require('multer');

const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./build/uploads/");
    },
    filename: (req, file, cb) => {
        console.log(new Date(), `upladed file ${file.originalname}`);
        cb(null, file.originalname);
    },
});

let upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
});

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.post(
    "/upload",
    upload.single("file"),
    async (req, res, next) => {
        try {
            if (req.file === undefined) {
                return res.status(400).send({ message: "Upload a file please!" });
            }

            res.status(200).send({
                message: "The following file was uploaded successfully: " + req.file.originalname,
            });
        } catch (err: any) { // error handling
            if (err?.code === "LIMIT_FILE_SIZE") {
                return res.status(500).send({
                    message: "File larger than 2MB cannot be uploaded!",
                });
            }
            res.status(500).send({
                message: `Unable to upload the file: ${req?.file?.originalname}. ${err}`,
            });
        }
    }
);
app.listen(8080, () => {
    console.log("Server is running on port 8080.");
});
