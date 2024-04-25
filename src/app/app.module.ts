import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './dashboard-new/components/home/home.component';
import { UploadFileDialogComponent } from './dashboard-new/components/upload-file-dialog/upload-file-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CsvTableComponent } from './dashboard-new/components/csv-table/csv-table.component';
import { AdjustRowHeightDirective } from './dashboard-new/core/adjust-row-height.directive';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UploadFileDialogComponent,
    CsvTableComponent,
    AdjustRowHeightDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
