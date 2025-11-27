import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { MatDialogRef, MatDialogClose, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { MatInput, MatInputModule } from "@angular/material/input";
import { MatAnchor, MatButtonModule } from "@angular/material/button";
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-price-alert-dialog',
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './price-alert-dialog.html',
  styleUrl: './price-alert-dialog.scss',
})
export class PriceAlertDialog {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<PriceAlertDialog>);
  private authService = inject(AuthService);

  alertForm: FormGroup = this.fb.group({
    productName: ['', Validators.required],
    targetPrice: [null, [Validators.required, Validators.min(0.1)]],
    userEmail: ['', [Validators.required, Validators.email]]
  });

  constructor() {
    this.authService.user$.subscribe(user => {
      if (user?.email) {
        this.alertForm.patchValue({ userEmail: user.email });
      }
    });
  }

  save() {
    if (this.alertForm.valid) {
      this.dialogRef.close(this.alertForm.value);
    }
  }
}
