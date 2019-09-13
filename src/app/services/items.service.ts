import { Injectable } from "@angular/core";
import { Item } from "../models/item";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ConsoleService } from "./console.service";
import { UserItem } from "../models/user-item";

@Injectable({
  providedIn: "root"
})
export class ItemsService {
  allItems: Item[];
  items: Item[];
  hasData = false;
  public userid: number = null;

  constructor(private http: HttpClient, private console: ConsoleService) {
    this.allItems = [];
    this.items = [];
    this.loadAllData();
  }

  loadAllData(): void {
    this.http.get<Item[]>(environment.PATH_ITEMS_FILE).subscribe((data: Item[]) => {
      this.allItems = data;
      this.console.info("All items loaded", this.allItems.length);
    });
  }

  loadData(userItems: UserItem[]): void {
    for (let i = 0; i < userItems.length; i++) {
      const ui = userItems[i];
      this.userid = ui.userid;
      const alex = this.allItems.filter(i => i.id === ui.itemid);
      this.items = this.items.concat(alex);
    }

    this.console.info("Items loaded", this.items.length);
    
    setTimeout(() => {
      this.hasData = true;
    });
  }

  clearItems(){
    this.console.info("Clear loaded items");
    this.hasData = false;
    this.items = [];
  }

  all(): Item[] {
    return this.items;
  }

  next(): Item {
    if (!this.hasData) return null;

    const randomItem = this.items[Math.floor(Math.random() * this.items.length)];
    this.items = this.items.filter(word => word !== randomItem);

    this.console.info("Next random item", randomItem);

    if ((randomItem === null || randomItem === undefined) && this.hasData) {
      this.console.info("Items list is empty. It´s the end");
      return {
        word: environment.WORD_END_OF_ITEMS,
        id: null,
        responses: null,
        sentence: null
      };
    }

    return randomItem;
  }

  /***************************************************************************/
  /***************************************************************************/
  /**********************FROM FIRESTORE****************************************/
  /***************************************************************************/
  /***************************************************************************/
  // static readonly COLLECTION_ITEMS = "items";
  // clientesCollection: AngularFirestoreCollection<Item>;
  // items: Observable<Item[]>;

  // constructor(public afs: AngularFirestore) {
  //   this.clientesCollection = this.afs.collection<Item>(ItemsService.COLLECTION_ITEMS);
  // }

  // addRange(listOfItems: Item[]): Promise<any> {
  //   const promises = []
  //   for (let i = 0; i < listOfItems.length; i++) {
  //     promises.push(this.add(listOfItems[i]));
  //   }
  //   return Promise.all(promises);
  // }

  // add(item: Item): Promise<any> {
  //   this.console.log(item);
  //   return this.clientesCollection.add(JSON.parse(JSON.stringify(item)));
  // }

  // getItems(): Observable<Item[]> {
  //   this.items = this.afs
  //     .collection(ItemsService.COLLECTION_ITEMS)
  //     .snapshotChanges()
  //     .pipe(
  //       map(
  //         changes => {
  //           return changes.map(a => {
  //             const p = a.payload.doc.data() as Item;
  //             p.id = a.payload.doc.id;
  //             return p;
  //           });
  //         },
  //         err => this.console.error(err)
  //       )
  //     );
  //   return this.items;
  // }
}

/*
sentence, word, users
"había una vez", "había"
"tres tristes tigres", "tres"
"I want to beleave", "beleave"
*/
