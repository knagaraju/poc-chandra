import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoaderComponent } from './components/loader/loader.component';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loaderDialogRef!: MatDialogRef<LoaderComponent>;

  private loading: boolean = false;

  constructor(private dialog: MatDialog) { }

  showLoader(){
    this.loaderDialogRef = this.dialog.open(LoaderComponent, {
      disableClose: true,
      hasBackdrop: false,
      panelClass: 'overlay-backdrop' // Apply custom overlay styles
    });
  }

  hideLoader(){
    setTimeout(() => {
      this.loaderDialogRef.close();
    }, 100000);
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  getLoading(): boolean {
    return this.loading;
  }
}
