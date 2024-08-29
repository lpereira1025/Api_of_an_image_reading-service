import { GoogleGenerativeAI } from '@google/generative-ai';
import { Storage } from '@google-cloud/storage';
import { UploadResponse } from '../models/ResponseTypes';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not defined');
}

const storage = new Storage();
const bucketName = 'your-bucket-name';
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const geminiService = {
  async processImage(imagePath: string): Promise<UploadResponse> {
  
    const fileName = `images/${Date.now()}_${imagePath}`;
    await storage.bucket(bucketName).upload(imagePath, {
      destination: fileName,
      contentType: 'image/jpeg',
    });

    const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: 'image/jpeg',
          fileUri: publicUrl,
        },
      },
      { text: 'Extract the meter reading from this image.' },
    ]);

    return {
      image_url: publicUrl,
      measure_value: parseInt(result.response.text(), 10),
      measure_uuid: fileName,
    };
  },
};
