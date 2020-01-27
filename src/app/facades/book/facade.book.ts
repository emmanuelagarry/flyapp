import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

interface Sta {
  state: boolean
}

@Injectable({ providedIn: 'root' })
export class BookFacade {
  constructor(private afs: AngularFirestore) {}
  state$: Observable<any> = this.afs
    .doc<Sta>('fake/q5FYyjDJnlbDxD51t3D8')
    .valueChanges()
    .pipe(map(item => item))

  buychow() {
    this.afs.doc<Sta>('fake/q5FYyjDJnlbDxD51t3D8').update({ state: true })
  }
}
