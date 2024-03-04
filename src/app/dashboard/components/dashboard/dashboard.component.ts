import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { MatTableDataSource } from '@angular/material/table';
// import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  selectedCSVFileName = "";
  isCSV_Valid = false;
  EmpData: any[] = [];
  csvTableHeader1 = [];
  csvTableData1: any[] = [];
  customResults: any = [];

  constructor(private papa: Papa) {
    const csvData = '"Hello","World!"';
    this.papa.parse(csvData, {
      complete: (result: any) => {
        console.log('Parsed: ', result);
      }
    });



  }

  ngAfterViewInit() {

  }

  ngOnInit() {

  }
  
  fileChangeListener($event: any): void {

    const files = $event.srcElement.files;

    if (files !== null && files !== undefined && files.length > 0) {
      this.selectedCSVFileName = files[0].name;

      const reader: FileReader = new FileReader();
      reader.readAsText(files[0]);
      reader.onload = e => {

        const csv = reader.result;
        let results = this.papa.parse(csv as string, { header: false });

        // VALIDATE PARSED CSV FILE
        if (results !== null && results !== undefined && results.data !== null &&
          results.data !== undefined && results.data.length > 0 && results.errors.length === 0) {
          this.isCSV_Valid = true;

          // PERFORM OPERATIONS ON PARSED CSV
          let csvTableHeader = results.data[0];
          this.csvTableHeader1 = csvTableHeader;

          let csvTableData = [...results.data.slice(1, results.data.length)];
          this.csvTableData1 = csvTableData;
          this.csvTableData1.forEach(item => {
            let tempResult: any = {};
            this.csvTableHeader1.forEach((key, i) => tempResult[key] = item[i]);
            console.log('testing', tempResult);
            this.customResults.push(tempResult);
          });
        } else {
          for (let i = 0; i < results.errors.length; i++) {
            console.log('Error Parsing CSV File: ', results.errors[i].message);
          }
        }
      };

    } else {
      console.log('No File Selected');
    }
  }

}

