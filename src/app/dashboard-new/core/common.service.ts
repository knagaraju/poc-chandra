import { Injectable } from '@angular/core';
import csvtojson from 'csvtojson';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  async convertCsvToJson(csvData: string): Promise<any[]> {
    return await csvtojson().fromString(csvData);
  }
  
}
