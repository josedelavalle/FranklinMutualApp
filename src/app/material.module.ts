import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatDividerModule, MatSliderModule, MatProgressBarModule, MatInputModule, MatTooltipModule, MatSnackBarModule, MatSelectModule, MatCheckboxModule } from '@angular/material';

@NgModule({
  imports: [MatGridListModule, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatDividerModule, MatSliderModule, MatProgressBarModule, MatInputModule, MatTooltipModule, MatSnackBarModule, MatSelectModule, MatCheckboxModule],
  exports: [MatGridListModule, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatDividerModule, MatSliderModule, MatProgressBarModule, MatInputModule, MatTooltipModule, MatSnackBarModule, MatSelectModule, MatCheckboxModule],
})
export class MaterialModule { }