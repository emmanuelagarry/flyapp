import { Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { BookFacade } from 'src/app/facades/book/facade.book'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  fireState$: Observable<any>
  constructor(private modal: ModalController, private bookFacade: BookFacade) {}

  ngOnInit() {
    this.fireState$ = this.bookFacade.state$
  }

  closeModal() {
    this.modal.dismiss()
  }
}
