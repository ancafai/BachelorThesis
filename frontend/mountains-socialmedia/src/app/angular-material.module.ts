import {MatButtonModule, MatCheckboxModule, MatNativeDateModule, MatSidenavModule} from '@angular/material';
import {MatSnackBarModule, MatSlideToggleModule, MatCardModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatSidenavModule, MatSnackBarModule, MatSlideToggleModule,
    MatCardModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule],
  exports: [MatButtonModule, MatCheckboxModule, MatSidenavModule, MatSnackBarModule, MatSlideToggleModule,
    MatCardModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule],
})
export class AngularMaterialModule { }
