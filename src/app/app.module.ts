import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { LoadItemsComponent } from './components/load-items/load-items.component';
import { LoadUsersComponent } from './components/load-users/load-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuizComponent } from './components/quiz/quiz.component';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule, NgbRadioGroup} from '@ng-bootstrap/ng-bootstrap';
import { ConsoleService } from './services/console.service';
import { BoldWordPipe } from './pipes/bold-word.pipe';
import { LoginComponent } from './components/login/login.component';
import { AnswersComponent } from './components/answers/answers.component';
import { DataTablesModule } from 'angular-datatables';
import { AnswersService } from './services/answers.service';

var firebaseConfig = {
  apiKey: "AIzaSyBim5G-Z4OzIGwCK2P-PxhmvRlxrB3JOyM",
  authDomain: "disambiguating-tool.firebaseapp.com",
  databaseURL: "https://disambiguating-tool.firebaseio.com",
  projectId: "disambiguating-tool",
  storageBucket: "",
  messagingSenderId: "1079084709572",
  appId: "1:1079084709572:web:99cb7cb887d3eb117e3b91"
};

@NgModule({
  declarations: [
    AppComponent,
    LoadItemsComponent,
    LoadUsersComponent,
    QuizComponent,
    BoldWordPipe,
    LoginComponent,
    AnswersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule, 
    ReactiveFormsModule,
    NgbModule,
    DataTablesModule
  ],
  providers: [AngularFirestore, ConsoleService, NgbRadioGroup, AnswersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
