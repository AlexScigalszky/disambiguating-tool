import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ConsoleService } from "src/app/services/console.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private console: ConsoleService,
    private users: UsersService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/quiz";
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.users.setID(this.f.username.value).then(
      (data: boolean) => {
        this.console.debug('login response:', data);
        if (data) {
          this.console.info('User ' + this.f.username.value + ' logged');
          this.router.navigate([this.returnUrl]);
        }
      },
      error => {
        this.console.error(error);
        this.loading = false;
      }
    );
  }
}
