import { Component } from '@angular/core';
import { CommonService } from '../../core/common.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CsvTableComponent } from '../csv-table/csv-table.component';

@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.scss']
})
export class UploadFileDialogComponent {

  constructor(private commonService: CommonService,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<UploadFileDialogComponent>,
  ){
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.uploadFile(file);
  }

  uploadFile(file:any){
    if (file && file.type === 'text/csv') {
      const fileReader: FileReader = new FileReader();
      fileReader.onload = async (e: any) => {
        const csvData: string = e.target.result;
        await this.convertCsvToJsonObject(csvData);
      };
      fileReader.readAsText(file);
    } else {
      alert("please upload proper csv file")
    }
  }

  async convertCsvToJsonObject(csvData: string) {
    try {
      const jsonData = await this.commonService.convertCsvToJson(csvData);
      this.openCsvTableDialog(jsonData);
      this.dialogRef.close();
      console.log('Converted JSON:', jsonData);
    } catch (error) {
      console.error('Error converting CSV to JSON:', error);
    }
  }

  onDrop(event: any) {
    event.preventDefault();
    const file: File = event.dataTransfer.files[0];
    this.uploadFile(file);
  }

  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    event.target.classList.add('dragover');
  }

  onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    event.target.classList.remove('dragover');
  }

  openCsvTableDialog(jsonData: any){
    const dialogRef = this.dialog.open(CsvTableComponent,{
      width: "900px",
      data: jsonData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
