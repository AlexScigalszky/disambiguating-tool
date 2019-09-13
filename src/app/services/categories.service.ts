import { Injectable } from "@angular/core";
import { Category } from "../models/category";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ConsoleService } from './console.service';

@Injectable({
  providedIn: "root"
})
export class CategoriesService {
  categories: Category[];

  constructor(private http: HttpClient, private console: ConsoleService) {
    this.categories = [];
    this.loadData();
  }

  loadData(): void {
    this.http.get<Category[]>(environment.PATH_CATEGORIES_FILE).subscribe((data: Category[]) => {
      this.categories = data;
      this.console.info("Categories loaded", this.categories);
    });
  }

  all(): Category[] {
    return this.categories;
  }

  findByWord(word: string): Category[] {
    this.console.info("Category of ", word);
    return this.categories.filter(c => c.word == word);
  }
}
