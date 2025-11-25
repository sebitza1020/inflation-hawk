import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-price-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './add-price-dialog.html',
  styleUrl: './add-price-dialog.scss',
})
export class AddPriceDialog {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AddPriceDialog>);

  priceForm: FormGroup = this.fb.group({
    productName: ['', Validators.required],
    price: [null, [Validators.required, Validators.min(0.01)]],
    storeName: ['', Validators.required],
    city: ['Bucuresti', Validators.required]
  });

  save() {
    if (this.priceForm.valid) {
      this.dialogRef.close(this.priceForm.value);
    }
  }
}
