import { Component, ElementRef, Inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UploadFileDialogComponent } from '../upload-file-dialog/upload-file-dialog.component';
import { CommonService } from '../../core/common.service';

@Component({
  selector: 'app-csv-table',
  templateUrl: './csv-table.component.html',
  styleUrls: ['./csv-table.component.scss']
})
export class CsvTableComponent {

  logicalModelList:any[] = [];
  similarityList: any[] = [];

  dataSource: any[] = []

  @ViewChildren('table, table1, table2') tables!: QueryList<ElementRef<HTMLTableElement>>;



  constructor(public dialogRef: MatDialogRef<CsvTableComponent>,
            @Inject(MAT_DIALOG_DATA) public data: any,
            private commonService: CommonService,
            private elementRef: ElementRef
  ){
    this.dataSource = this.data.map((ele:any, index:number) => {
      return {
        ...ele,
        isDuplicate: index %2 === 0 ? true : false
      }
    });
    console.log("this.data ->>", this.data);
  }

  handleMatch(){
    this.dialogRef.updateSize("1200px");
    const response = this.commonService.getMatchedResponse();
    this.logicalModelList = response.logicalModelList;
    this.similarityList = response.similarityList;
    setTimeout(() => {
      this.syncRowHeights()
    }, 500);
  }

  syncRowHeights() {
    // Initialize an array to store the maximum height of each row across all tables
    const maxRowHeights: number[] = [];

    // Iterate over each table
    this.tables.forEach(tableRef => {
      const table = tableRef.nativeElement;
      const rows = table.rows;

      // Iterate over each row in the table
      for (let i = 0; i < rows.length; i++) {
        const rowHeight = rows[i].offsetHeight;

        // Update the maximum height of the current row
        maxRowHeights[i] = Math.max(maxRowHeights[i] || 0, rowHeight);
      }
    });

    // Set the height of each row in all tables to the maximum height found for that row
    this.tables.forEach(tableRef => {
      const table = tableRef.nativeElement;
      const rows = table.rows;

      // Iterate over each row in the table
      for (let i = 0; i < rows.length; i++) {
        rows[i].style.height = maxRowHeights[i] + 'px';
      }
    });
  }
}
