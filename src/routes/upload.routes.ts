import express from 'express';
import { testUpload, uploadFile } from '../controllers/upload.controller';
import { checkFileSize } from '../middleware/uploadHandler';
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('file'), checkFileSize, uploadFile);

router.post('/test', testUpload);

export default router;
