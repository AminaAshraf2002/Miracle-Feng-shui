import { NextRequest } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { apiResponse } from '../utils/apiResponse';
import { ApiError } from '../utils/ApiError';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
  'image/avif': 'avif',
};


export const uploadController = {
  async handleUpload(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof Blob)) {
      throw ApiError.badRequest('No valid image file provided');
    }

    if (file.size > MAX_FILE_SIZE) {
      throw ApiError.badRequest('File size exceeds the 5MB maximum limit');
    }

    const mimeType = file.type;
    const extension = ALLOWED_MIME_TYPES[mimeType];
    if (!extension) {
      throw ApiError.badRequest(
        `Invalid file format (${mimeType}). Only PNG, JPEG, and WEBP images are supported.`
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const randomHex = crypto.randomBytes(6).toString('hex');
    const filename = `mfs_${Date.now()}_${randomHex}.${extension}`;

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    const filePath = path.join(uploadsDir, filename);
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;
    return apiResponse.ok({ url: publicUrl, filename, size: file.size }, 201);
  },
};
