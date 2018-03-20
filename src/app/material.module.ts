import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatDividerModule, MatSliderModule, MatProgressBarModule, MatInputModule, MatTooltipModule, MatSnackBarModule } from '@angular/material';

@NgModule({
  imports: [MatGridListModule, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatDividerModule, MatSliderModule, MatProgressBarModule, MatInputModule, MatTooltipModule, MatSnackBarModule],
  exports: [MatGridListModule, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatDividerModule, MatSliderModule, MatProgressBarModule, MatInputModule, MatTooltipModule, MatSnackBarModule],
})
export class MaterialModule { }