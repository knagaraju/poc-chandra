import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { MatTableDataSource } from '@angular/material/table';
// import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FileUploadService } from '../../services/file-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/dashboard-new/core/common.service';
import { MatDialog } from '@angular/material/dialog';
import { AddBatchDialogComponent } from './add-batch-dialog/add-batch-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  originalData: any[] = []
  dataSource: any[] = [];

  paginatedItems: any[] = []; 
  pageSize = 5; 
  currentPage = 1; 
  totalPages = 0; 
  pages: number[] = []; 

  sortByColumn: string = '';
  sortOrder: string = '';

  constructor(private commonService: CommonService, 
      private dialog: MatDialog
  ) {

  }


  ngOnInit() {
    this.dataSource = this.commonService.getDashboardData();
    this.originalData = this.commonService.getDashboardData();
    this.totalPages = Math.ceil(this.dataSource.length / this.pageSize);
    this.updatePageNumbers();
    this.updatePaginatedItems();
  }

  updatePageNumbers() {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  updatePaginatedItems() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.dataSource.length);
    this.paginatedItems = this.dataSource.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedItems();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedItems();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedItems();
    }
  }

  isPageVisible(page: number): boolean {
    if (this.totalPages <= 5) {
      return true; 
    } else {
      if (page === 1 || page === this.totalPages) {
        return true; 
      } else if (
        page === this.currentPage ||
        page === this.currentPage - 1 ||
        page === this.currentPage + 1
      ) {
        return true;
      } else if (
        this.currentPage <= 4 &&
        (page === 2 || page === 3 || page === 4)
      ) {
        return true; 
      } else if (
        this.currentPage >= this.totalPages - 3 &&
        (page === this.totalPages - 1 ||
          page === this.totalPages - 2 ||
          page === this.totalPages - 3)
      ) {
        return true; 
      } else if (
        Math.abs(page - this.currentPage) <= 2 &&
        Math.abs(page - this.currentPage) > 0
      ) {
        return true;
      } else {
        return false; 
      }
    }
  }
  
  getPageNumberText(page: number): string {
    if (page.toString() === '...') {
      return '...';
    } else {
      return page.toString();
    }
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }
  
  getEndIndex(): number {
    const endIndex = this.currentPage * this.pageSize;
    return Math.min(endIndex, this.dataSource.length);
  }

  sortBy(property: string) {
    if (this.sortByColumn === property) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortByColumn = property;
      this.sortOrder = 'asc';
    }

    this.dataSource.sort((a, b) => {
      const modifier = this.sortOrder === 'asc' ? 1 : -1;
      if (a[property] < b[property]) {
        return -1 * modifier;
      }
      if (a[property] > b[property]) {
        return 1 * modifier;
      }
      return 0;
    });
    this.updatePageNumbers();
    this.updatePaginatedItems();
  }

  search(searchText: string) {
    this.dataSource = this.originalData.filter(item => {
      // Perform case-insensitive search on item properties
      return Object.values(item).some((value:any) =>
        value.toString().toLowerCase().includes(searchText.toLowerCase())
      );
    });
    this.updatePageNumbers();
    this.updatePaginatedItems();
  }

  openAddbatch(){
    const dialogRef = this.dialog.open(AddBatchDialogComponent,{
      width: "700px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log("refresh the table data")
      }
    });
  }
}

