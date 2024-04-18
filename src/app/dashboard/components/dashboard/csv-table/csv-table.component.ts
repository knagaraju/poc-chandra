import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-csv-table',
  templateUrl: './csv-table.component.html',
  styleUrls: ['./csv-table.component.scss']
})
export class CsvTableComponent implements AfterViewInit, OnInit, OnChanges {

  dataSource: any = [];
  @Input() customResults!: any[];
  @Input() csvTableHeader1!: any[];
  @Input() csvTableData1!: any[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  flag = false;

  constructor(private _liveAnnouncer: LiveAnnouncer) {
  }

  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges) {
    this.csvTableHeader1 = this.csvTableHeader1;
    this.csvTableData1 = this.csvTableData1;
    const ELEMENT_DATA = this.customResults;
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.flag =true;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.ngOnInit();
  }
  ngAfterViewInit() {
     
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
