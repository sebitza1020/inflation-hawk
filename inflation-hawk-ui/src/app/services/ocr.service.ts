import { Injectable } from '@angular/core';
import { createWorker } from 'tesseract.js';

@Injectable({
  providedIn: 'root',
})
export class OcrService {
  constructor() {}

  async recognizeText(imageFile: File): Promise<string> {
    const worker = await createWorker('ron');

    const ret = await worker.recognize(imageFile);

    await worker.terminate();
    return ret.data.text;
  }
}
