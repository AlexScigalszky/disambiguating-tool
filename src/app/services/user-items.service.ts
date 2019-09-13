import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConsoleService } from "./console.service";
import { UserItem } from "../models/user-item";
import { environment } from "src/environments/environment";
import { ItemsService } from './items.service';

@Injectable({
  providedIn: "root"
})
export class UserItemsService {
  userItems: UserItem[];

  constructor(private http: HttpClient, private console: ConsoleService, private items: ItemsService) {}

  loadItems(username: string) {
    this.http.get<UserItem[]>(environment.PATH_USER_ITEMS_FILE).subscribe((data: UserItem[]) => {
      this.userItems = data.filter(ui => ui.username == username);
      this.console.info("Items for user loaded", this.userItems.length);
      this.items.loadData(this.userItems);
    });
  }

  clearItems() {
    this.userItems = [];
    this.items.clearItems();
  }

  getItems() {
    return this.userItems;
  }
}
