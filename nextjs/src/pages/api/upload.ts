import type { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';

const upload = multer({ dest: 'public/uploads/' });

export default async function handler(
  req: NextApiRequest | any,
  res: NextApiResponse | any
) {
  upload.single('file')(req, res, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    res.status(200).json({
      success: true,
      file: {
        name: req.file.originalname,
        size: req.file.size,
        path: req.file.path,
      },
    });
  });
}
