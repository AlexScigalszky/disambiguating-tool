import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ItemsService } from "src/app/services/items.service";
import { CsvService } from "src/app/services/csv.service";

@Component({
  selector: "app-load-items",
  templateUrl: "./load-items.component.html",
  styleUrls: ["./load-items.component.css"]
})
export class LoadItemsComponent implements OnInit {
  static readonly DEFAULT_SEPARTOR = ",";
  static readonly MOCK_DATA = `sentence, word, users
  "había una vez", "había", "alex.scigalszky mariana.montes"
  "tres tristes tigres", "tres", "alex.scigalszky mariana.montes"
  "I want to beleave", "beleave", "alex.scigalszky mariana.montes"`;
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private items: ItemsService,
    private csv: CsvService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      data: [LoadItemsComponent.MOCK_DATA, Validators.required],
      separator: [LoadItemsComponent.DEFAULT_SEPARTOR, Validators.required]
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    // this.submitted = true;
    // if (this.form.invalid) {
    //   return;
    // }

    // const separator = this.form.get("separator").value;
    // const data = this.form.get("data").value;
    // const listOfItems = this.csv.csvToItems(data, separator);
    // this.loading = true;
    // this.items.addRange(listOfItems).then(
    //   data => {
    //     this.console.log("load successful");
    //   },
    //   error => {
    //     this.console.error(error);
    //     this.loading = false;
    //   }
    // );
  }
}
