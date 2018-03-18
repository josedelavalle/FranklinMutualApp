import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatDividerModule, MatSliderModule, MatProgressBarModule, MatInputModule } from '@angular/material';

@NgModule({
  imports: [MatGridListModule, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatDividerModule, MatSliderModule, MatProgressBarModule, MatInputModule],
  exports: [MatGridListModule, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatDividerModule, MatSliderModule, MatProgressBarModule, MatInputModule],
})
export class MaterialModule { }