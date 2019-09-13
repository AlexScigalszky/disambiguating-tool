import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ConsoleService } from './services/console.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username = '';

  constructor(private users: UsersService, private console:ConsoleService, private router: Router){
    this.refeshUsername();
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).forEach(e => {
      this.refeshUsername();
    });
  }

  refeshUsername(){
    this.username = this.users.userIdentification;
  }

  logout(){
    this.users.setID(null).then(
      (data: boolean) => {
        this.router.navigate(['/']);
      },
      error => {
        this.console.error(error);
      }
    );
  }

  
}
