import { Injectable } from "@angular/core";
import { Item } from '../models/item';

@Injectable({
  providedIn: "root"
})
export class CsvService {
static readonly BREAKLINE = '\n';

  constructor() {}

  csvToItems(data: any, separator: any) {

    const arr = data.split(CsvService.BREAKLINE);
    var listOfItems: Item[] = [];
    var headers = arr[0].split(separator);
    for (var i = 1; i < arr.length; i++) {
      var data = arr[i].split(separator);
      const obj: Item = new Item();
      for (var j = 0; j < data.length; j++) {
        obj[headers[j].trim()] = data[j].trim();
      }
      listOfItems.push(obj);
    }
    return listOfItems;
  }
  
}

