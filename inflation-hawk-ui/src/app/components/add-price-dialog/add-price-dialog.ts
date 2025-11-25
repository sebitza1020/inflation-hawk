import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { OcrService } from '../../services/ocr.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-price-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './add-price-dialog.html',
  styleUrl: './add-price-dialog.scss',
})
export class AddPriceDialog {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AddPriceDialog>);
  private ocrService = inject(OcrService);

  isScanning = false;

  priceForm: FormGroup = this.fb.group({
    productName: ['', Validators.required],
    price: [null, [Validators.required, Validators.min(0.01)]],
    storeName: ['', Validators.required],
    city: ['Bucuresti', Validators.required]
  });
  
  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.isScanning = true;
    try {
      const text = await this.ocrService.recognizeText(file);
      console.log("Text scanat: " + text);

      const priceRegex = /(\d+[.,]\d{2})\s*(RON|LEI|lei)?/i;
      const match = text.match(priceRegex);

      if (match) {
        const priceVal = parseFloat(match[1].replace(',', '.'));
        this.priceForm.patchValue({ price: priceVal });
      }

      if (text.toLowerCase().includes('lidl')) this.priceForm.patchValue({ storeName: 'Lidl' });
      if (text.toLowerCase().includes('kaufland')) this.priceForm.patchValue({ storeName: 'Kaufland' });
      if (text.toLowerCase().includes('mega')) this.priceForm.patchValue({ storeName: 'Mega Image' });
    } catch (err) {
      console.error(err);
      alert("Nu am putut citi imaginea.");
    } finally {
      this.isScanning = false;
    }
  }

  save() {
    if (this.priceForm.valid) {
      this.dialogRef.close(this.priceForm.value);
    }
  }
}
