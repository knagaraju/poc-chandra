import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { MatTableDataSource } from '@angular/material/table';
// import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  selectedCSVFileName = "";
  isCSV_Valid = false;
  EmpData: any[] = [];
  dataSource = new MatTableDataSource(this.EmpData);
  csvTableHeader1 = [];
  csvTableData1: any[] = [];
  customResults: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;
  constructor(private papa: Papa, private cdr: ChangeDetectorRef, private _liveAnnouncer: LiveAnnouncer) {
    const csvData = '"Hello","World!"';
    this.papa.parse(csvData,{
        complete: (result) => {
            console.log('Parsed: ', result);
        }
    });
    
}

ngAfterViewInit() {
  this.customResults.paginator = this.paginator  
  this.customResults.sort = this.sort;
  this.cdr.detectChanges();
}

  ngOnInit() {
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  fileChangeListener($event: any): void {

    const files = $event.srcElement.files;

    if (files !== null && files !== undefined && files.length > 0) {
      this.selectedCSVFileName = files[0].name;

      const reader: FileReader = new FileReader();
      reader.readAsText(files[0]);
      reader.onload = e => {

        const csv = reader.result;
        const results = this.papa.parse(csv as string, { header: false });

        // VALIDATE PARSED CSV FILE
        if (results !== null && results !== undefined && results.data !== null &&
          results.data !== undefined && results.data.length > 0 && results.errors.length === 0) {
          this.isCSV_Valid = true;

          // PERFORM OPERATIONS ON PARSED CSV
          let csvTableHeader = results.data[0];
          this.csvTableHeader1 = csvTableHeader;

          let csvTableData = [...results.data.slice(1, results.data.length)];
          this.csvTableData1 = csvTableData;
          // this.customResults = this.transformEmployeeData(results.data);

          this.csvTableData1.forEach(item => {
            let tempResult: any = {};
            this.csvTableHeader1.forEach((key, i) => tempResult[key] = item[i]);
            console.log('testing', tempResult);
            this.customResults.push(tempResult);
          });

          console.log("test",this.customResults);
          // console.log("test-0",csvTableHeader);
          // console.log("test-1",csvTableData);

        } else {
          for (let i = 0; i < results.errors.length; i++) {
            console.log( 'Error Parsing CSV File: ',results.errors[i].message);
          }
        }
      };
    } else {
      console.log('No File Selected');
    }

  }

  transformEmployeeData(data: any) {
    var result = [];
    var key, value;
    for (var i = 0; i < data.length; i++) {
      var employee: any = {}; 
      for (var j = 0; j < data[i].length; j++) { 
        key = data[i][j][0]; 
        value = data[i][j][1];
        employee[key] = value; 
      }
      result.push(employee)
    }
    return result
    // return data.map(function(employee: any) {
    //   return employee.reduce(function(a: any, c: any) {
    //     a[c[0]] = c[1]
    //     return a
    //   }, {})
    // })
  }
}

