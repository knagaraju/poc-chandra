import { Injectable } from '@angular/core';
import csvtojson from 'csvtojson';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  similairtyList = [
    {score: "90"},{score: "69"},{score: "40"}
  ];

  logicalModelList = [
    {class: 'student Demographics', attribute: 'student first name', description: "firstname of student is written on Id", comments: "Ok"},
    {class: 'student Demographics', attribute: 'student first name', description: "firstname of student is written on Id", comments: "Score is less than 70%"},
    {class: 'student Demographics', attribute: 'student first name', description: "firstname of student is written on Id", comments: "Score is less than 50%"}
  ]

  constructor() { }

  async convertCsvToJson(csvData: string): Promise<any[]> {
    return await csvtojson().fromString(csvData);
  }

  getMatchedResponse(){
    return {
      logicalModelList: this.logicalModelList,
      similarityList: this.similairtyList
    }
  }
  
}
