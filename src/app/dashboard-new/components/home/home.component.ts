import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadFileDialogComponent } from '../upload-file-dialog/upload-file-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private dialog: MatDialog) { }

  openFileUploadDialog() {
    const dialogRef = this.dialog.open(UploadFileDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
