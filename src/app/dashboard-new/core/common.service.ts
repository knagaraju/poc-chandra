import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import csvtojson from 'csvtojson';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  similairtyList = [
    {score: "90"},{score: "69"},{score: "40"},{score: "90"},{score: "69"},{score: "40"},{score: "90"},{score: "69"},{score: "40"},
    {score: "90"},{score: "69"},{score: "40"},{score: "90"},{score: "69"},{score: "40"},{score: "90"},{score: "69"},{score: "40"},
    {score: "90"},{score: "69"},{score: "40"},{score: "90"},{score: "69"},{score: "40"},{score: "90"},{score: "69"},{score: "40"},
    {score: "90"},{score: "69"},{score: "40"},{score: "90"},{score: "69"},{score: "40"},{score: "90"},{score: "69"},{score: "40"},
    {score: "90"},{score: "69"},{score: "40"},{score: "90"},{score: "69"},{score: "40"},{score: "90"},{score: "69"},{score: "40"},
    {score: "90"},{score: "69"},{score: "40"},{score: "90"},{score: "69"},{score: "40"},{score: "90"},{score: "69"},{score: "40"},
    {score: "90"},{score: "69"},{score: "40"},{score: "90"},{score: "69"},{score: "40"},{score: "90"},{score: "69"},{score: "40"},
    {score: "90"},{score: "69"},{score: "40"},{score: "90"},{score: "69"},{score: "40"},{score: "90"},{score: "69"},{score: "40"},
    {score: "90"},{score: "69"},{score: "40"},{score: "90"},{score: "69"},{score: "40"},{score: "90"},{score: "69"},{score: "40"},

  ];

  logicalModelList = [
    {class: 'student Demographics', attribute: 'student first name', description: "firstname of student is written on Id", comments: "Ok"},
    {class: 'student Demographics', attribute: 'student first name', description: "firstname of student is written on Id", comments: "Score is less than 70%"},
    {class: 'student Demographics', attribute: 'student first name', description: "firstname of student is written on Id", comments: "Score is less than 50%"},
    {class: 'student Demographics', attribute: 'student first name', description: "firstname of student is written on Id", comments: "Ok"},
    {class: 'student Demographics', attribute: 'student first name', description: "firstname of student is written on Id", comments: "Score is less than 70%"},
    {class: 'student Demographics', attribute: 'student first name', description: "firstname of student is written on Id", comments: "Score is less than 50%"},
    {class: 'student Demographics', attribute: 'student first name', description: "firstname of student is written on Id", comments: "Ok"},
    {class: 'student Demographics', attribute: 'student first name', description: "firstname of student is written on Id", comments: "Score is less than 70%"},
    {class: 'student Demographics', attribute: 'student first name', description: "firstname of student is written on Id", comments: "Score is less than 50%"},
    {class: 'student Demographics', attribute: 'student first name', description: "firstname of student is written on Id", comments: "Ok"},
    {class: 'student Demographics', attribute: 'student first name', description: "firstname of student is written on Id", comments: "Score is less than 70%"},
    {class: 'student Demographics', attribute: 'student first name', description: "firstname of student is written on Id", comments: "Score is less than 50%"},
    {class: 'student Demographics', attribute: 'student first name', description: "firstname of student is written on Id", comments: "Ok"},
    {class: 'student Demographics', attribute: 'student first name', description: "firstname of student is written on Id", comments: "Score is less than 70%"},
    {class: 'student Demographics', attribute: 'student first name', description: "firstname of student is written on Id", comments: "Score is less than 50%"},
    {class: 'student Demographics', attribute: 'student first name', description: "firstname of student is written on Id", comments: "Ok"},
    {class: 'student Demographics', attribute: 'student first name', description: "firstname of student is written on Id", comments: "Score is less than 70%"},
    {class: 'student Demographics', attribute: 'student first name', description: "firstname of student is written on Id", comments: "Score is less than 50%"},
    {class: 'student Demographics', attribute: 'student first name', description: "firstname of student is written on Id", comments: "Ok"},
    {class: 'student Demographics', attribute: 'student first name', description: "firstname of student is written on Id", comments: "Score is less than 70%"},
    {class: 'student Demographics', attribute: 'student first name', description: "firstname of student is written on Id", comments: "Score is less than 50%"}
  ]

  constructor(private http: HttpClient) { }

  async convertCsvToJson(csvData: string): Promise<any[]> {
    return await csvtojson().fromString(csvData);
  }

  getMatchedResponse(){
    return {
      logicalModelList: this.logicalModelList,
      similarityList: this.similairtyList
    }
  }
  
  getDashboardData(){
    let record = {
      batchId: "001", 
      description: "Sales Practice Project", 
      dateInitiated: "1/1/2023", 
      dateCompleted: "1/5/2023", 
      dataModname: "Data Modler Name",
      status: "Completed"
    }
    let response = []
    for(let i = 0; i < 50; i++){
      
      response.push({...record, batchId: `00${i+1}`, status: i % 2 === 0 ? "Completed" : "In Complete"});
    }
    return response;
  }

  loginApi(reqBody: any): Observable<any>{
    return this.http.post("https://dev-api-rsense.blunode.in/api/v1/auth/sign_in", reqBody);
    // if(reqBody.userName === "test@gmail.com" && reqBody.password === "test@123"){
    //   return {
    //     token: "dsfsdfdfsdfsdf2342342342"
    //   }
    // }else{
    //   return false;
    // }
  }
}
