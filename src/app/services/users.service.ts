import { Injectable } from "@angular/core";
import { ConsoleService } from "./console.service";
import { UserItemsService } from "./user-items.service";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  static readonly KEY_ID = "key.identification";
  public isUserLoggedIn;
  public userIdentification: string;

  constructor(private console: ConsoleService, private userItems: UserItemsService) {
    this.isUserLoggedIn = false;
    const currentId = localStorage.getItem(UsersService.KEY_ID);
    this.console.debug(UsersService.KEY_ID, currentId);
    this.setID(currentId);
  }

  setID(identification: string): Promise<boolean> {
    this.console.log("setID:", identification);
    if (identification && identification.length > 0) {
      this.isUserLoggedIn = true;
      this.userIdentification = identification;
      localStorage.setItem(UsersService.KEY_ID, this.userIdentification);
      this.console.info("Logged");
      this.userItems.loadItems(this.userIdentification);
      return Promise.resolve(true);
    } else {
      this.isUserLoggedIn = false;
      this.userIdentification = null;
      localStorage.removeItem(UsersService.KEY_ID);
      this.console.info("Not logged");
      this.userItems.clearItems();
      return Promise.resolve(false);
    }
  }

}
