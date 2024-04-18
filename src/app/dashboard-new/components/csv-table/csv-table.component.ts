import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UploadFileDialogComponent } from '../upload-file-dialog/upload-file-dialog.component';

@Component({
  selector: 'app-csv-table',
  templateUrl: './csv-table.component.html',
  styleUrls: ['./csv-table.component.scss']
})
export class CsvTableComponent {

  dataSource: any[] = []

  constructor(public dialogRef: MatDialogRef<CsvTableComponent>,
            @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.dataSource = this.data;
    console.log("this.data ->>", this.data);
  }


}
