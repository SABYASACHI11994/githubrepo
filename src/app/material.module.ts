import {MatButtonModule, MatCheckboxModule,MatFormFieldModule,MatInputModule,MatToolbarModule} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule,MatFormFieldModule,MatInputModule,MatToolbarModule],
  exports: [MatButtonModule, MatCheckboxModule,MatFormFieldModule,MatInputModule,MatToolbarModule],
})
export class MaterialModule { }