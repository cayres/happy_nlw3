import multer from 'multer';
import { pathToFileURL } from 'url';
import path from 'path';

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: (_, file, next) => {
      const filename = `${Date.now()}-${file.originalname}`;
      next(null, filename);
    },
  }),
};
