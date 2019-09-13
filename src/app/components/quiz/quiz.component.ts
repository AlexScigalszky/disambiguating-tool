import { Component, OnInit, OnDestroy } from "@angular/core";
import { ItemsService } from "src/app/services/items.service";
import { Item } from "src/app/models/item";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ConsoleService } from "src/app/services/console.service";
import { CategoriesService } from "src/app/services/categories.service";
import { Category } from "src/app/models/category";
import { environment } from "src/environments/environment";
import { ActivatedRoute } from "@angular/router";
import { AnswersService } from 'src/app/services/answers.service';
import { Answer } from 'src/app/models/answer';

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.css"]
})
export class QuizComponent implements OnInit, OnDestroy {
  CATEGORY = "category";
  FINISH_MESSAGE = "Congratulations! You has finish all sentences";
  RATE = "rate";
  item: Item = null;
  form: FormGroup;
  categoriesAvaliables: Category[];
  loading = true;
  finished = false;

  constructor(
    private formBuilder: FormBuilder,
    private items: ItemsService,
    private categories: CategoriesService,
    private console: ConsoleService,
    private route: ActivatedRoute,
    private answers: AnswersService
  ) {
    this.buildForm();
    this.followSegments();
  }

  buildForm() {
    this.form = this.formBuilder.group({});
    this.form.addControl(this.CATEGORY, this.formBuilder.control(null, Validators.required));
    this.form.addControl(this.RATE, this.formBuilder.control(null, Validators.required));
  }

  followSegments() {
    this.route.fragment.subscribe(f => {
      const element = document.querySelector("#" + f);
      this.console.debug('scrol?', element);
      if (element) element.scrollIntoView(true);
    });
  }

  ngOnInit() {
    this.item = null;
    this.next();
  }

  ngOnDestroy(){
    this.console.error('on destroy');
  }

  next(): void {
    this.item = this.items.next();
    if (this.item == null) {
      this.console.info('Not found item, trying again');
      setTimeout(() => {
        this.next();
      }, 100);
    } else if (this.item.word == environment.WORD_END_OF_ITEMS) {
      this.console.info("End of items");
      this.finished = true;
    } else {
      this.console.info("Next item", this.item);
      this.fetchCategories();
    }
  }

  fetchCategories() {
    this.categoriesAvaliables = this.categories.findByWord(this.item.word);
    this.console.info("Categories avaliables", this.categoriesAvaliables);
    this.loading = false;
  }

  onSubmit() {
    if (this.form.invalid){
      this.console.info('Invalid form', this.form.value);
      return;
    }
    this.loading = true;
    this.console.info("submit data", this.form.value);
    const answer: Answer = {
      id: null,
      category: this.form.get(this.CATEGORY).value,
      itemid: this.item.id,
      rate: this.form.get(this.RATE).value,
      userid: this.items.userid
    };
    this.answers.add(answer)
    this.clearForm();
    this.next();
  }

  skip() {
    this.loading = true;
    this.console.info("Skip item", this.item);
    this.clearForm();
    this.next();
  }

  clearForm() {
    this.form.get(this.CATEGORY).setValue(null);
    this.form.get(this.RATE).setValue(null);
    this.console.info("Form clean");
  }
}
