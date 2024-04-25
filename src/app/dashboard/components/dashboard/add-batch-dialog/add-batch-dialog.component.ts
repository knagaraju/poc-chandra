import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonService } from 'src/app/dashboard-new/core/common.service';

@Component({
  selector: 'app-add-batch-dialog',
  templateUrl: './add-batch-dialog.component.html',
  styleUrls: ['./add-batch-dialog.component.scss']
})
export class AddBatchDialogComponent {
  formDataModel: any = {};
  constructor(public dialogRef: MatDialogRef<AddBatchDialogComponent>,
    private commonService: CommonService){

  }

  onSubmit(formData: NgForm){
    console.log("formDataModel", this.formDataModel);
  }

  closeDialog(){
    this.dialogRef.close()
  }
}
