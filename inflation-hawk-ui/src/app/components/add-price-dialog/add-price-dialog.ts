import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { OcrService } from '../../services/ocr.service';
import { ProductLookupService } from '../../services/product-lookup.service';

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
    MatIconModule,
    ZXingScannerModule
  ],
  templateUrl: './add-price-dialog.html',
  styleUrl: './add-price-dialog.scss',
})
export class AddPriceDialog {
  currentDevice: MediaDeviceInfo | undefined;
  availableDevices: MediaDeviceInfo[] = [];

  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AddPriceDialog>);
  private ocrService = inject(OcrService);
  private productLookupService = inject(ProductLookupService);

  isScanning = false; // OCR
  isBarcodeScanning = false; // Barcode

  allowedFormats = [
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_E
  ];

  priceForm: FormGroup = this.fb.group({
    productName: ['', Validators.required],
    price: [null, [Validators.required, Validators.min(0.01)]],
    storeName: ['', Validators.required],
    city: ['Bucuresti', Validators.required]
  });

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    console.log('Camere gasite:', devices);

    const backCamera = devices.find(d=> d.label.toLowerCase().includes('back') || d.label.toLowerCase().includes('spate'));

    const realCamera = devices.find(d => 
      !d.label.toLowerCase().includes('obs') && 
      !d.label.toLowerCase().includes('virtual')
    );

    if (backCamera) {
      this.currentDevice = backCamera;
      console.log('Am ales camera din spate:', backCamera.label);
    } else if (realCamera) {
      this.currentDevice = realCamera;
      console.log('Am ales webcam-ul real:', realCamera.label);
    } else if (devices.length > 0) {
      this.currentDevice = devices[0];
      console.log('Am ales prima cameră disponibilă:', devices[0].label);
    }
  }

  onDeviceSelectChange(event: any) {
    const selectedDeviceId = event.target.value;
    const device = this.availableDevices.find(d => d.deviceId === selectedDeviceId);
    if (device) {
      this.currentDevice = device;
      console.log("Utilizatorul a schimbat manual camera pe:", device.label);
    }
  }

  toggleBarcodeScanner() {
    this.isBarcodeScanning = !this.isBarcodeScanning;
  }

  onCodeResult(resultString: string) {
    console.log('Barcode scanat:', resultString);
    this.isBarcodeScanning = false;
    this.isScanning = true;

    this.productLookupService.getProductByBarcode(resultString).subscribe(info => {
      this.isScanning = false;

      if (info.found) {
        const fullName = `${info.brand} ${info.name}`.trim();
        this.priceForm.patchValue({ productName: fullName });
        alert(`Am gasit: ${fullName}`);
      } else {
        alert('Produsul nu a fost găsit în baza de date OpenFoodFacts. Poți introduce numele manual.');
      }
    });
  }
  
  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    this.isScanning = true;
    try {
      const text = await this.ocrService.recognizeText(file);
      const priceMatch = text.match(/(\d+[.,]\d{2})\s*(RON|LEI|lei|A|B)/);
      if (priceMatch) {
        let priceStr = priceMatch[1].replace(',', '.');
        this.priceForm.patchValue({ price: parseFloat(priceStr) });
      }
      const lowerText = text.toLowerCase();
      if (lowerText.includes('lidl')) this.priceForm.patchValue({ storeName: 'Lidl' });
      if (lowerText.includes('kaufland')) this.priceForm.patchValue({ storeName: 'Kaufland' });
      if (lowerText.includes('mega')) this.priceForm.patchValue({ storeName: 'Mega Image' });
    } catch (err) {
      console.error(err);
      alert("Nu am putut citi bonul.");
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
