import { Injectable } from "@angular/core";
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Answer } from '../models/answer';
import { environment } from 'src/environments/environment';
import { ConsoleService } from './console.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class AnswersService {
  
  answersCollection: AngularFirestoreCollection<Answer>;
  answers: Observable<Answer[]>;

  constructor(public afs: AngularFirestore, private console: ConsoleService) {
    this.answersCollection = this.afs.collection<Answer>(environment.COLLECTION_ANSWERS);
  }

  public add(answer: Answer): Promise<any> {
    this.console.log(answer);
    return this.answersCollection.add(JSON.parse(JSON.stringify(answer)));
  }

  getAnswers(): Observable<Answer[]> {
    this.answers = this.afs
      .collection(environment.COLLECTION_ANSWERS)
      .snapshotChanges()
      .pipe(
        map(
          changes => {
            return changes.map(a => {
              const p = a.payload.doc.data() as Answer;
              p.id = a.payload.doc.id;
              return p;
            });
          },
          err => this.console.error(err)
        )
      );
    return this.answers;
  }
}
