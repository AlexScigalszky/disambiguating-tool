import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ToolSnapshot } from '../models/tool-snapshot';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConsoleService } from './console.service';

@Injectable({
  providedIn: 'root'
})
export class ToolSnapshotService {
  static readonly COLLECTION_SNAPSHOTS = "snapshots";
  clientesCollection: AngularFirestoreCollection<ToolSnapshot>;
  snapshots: Observable<ToolSnapshot[]>;
  snapshotDoc: AngularFirestoreDocument<ToolSnapshot>;

  constructor(public afs: AngularFirestore, private console: ConsoleService) {
    this.clientesCollection = this.afs.collection<ToolSnapshot>(ToolSnapshotService.COLLECTION_SNAPSHOTS);
  }
  
  getSnapshots(): Observable<ToolSnapshot[]> {
    this.snapshots = this.afs
      .collection(ToolSnapshotService.COLLECTION_SNAPSHOTS)
      .snapshotChanges()
      .pipe(
        map(
          changes => {
            return changes.map(a => {
              const p = a.payload.doc.data() as ToolSnapshot;
              p.id = a.payload.doc.id;
              return p;
            });
          },
          err => this.console.error(err)
        )
      );
    return this.snapshots;
  }

  update(snapshot: ToolSnapshot) {
    this.snapshotDoc = this.afs.doc(ToolSnapshotService.COLLECTION_SNAPSHOTS +'/'+snapshot.id);
    return this.snapshotDoc.update(snapshot);
  }
}
