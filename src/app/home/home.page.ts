import { Component, EventEmitter } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { ToastController, ModalController } from '@ionic/angular'
import { BookFacade } from '../facades/book/facade.book'
import { BookComponent } from './book/book.component'
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  AbstractControl,
  FormControl,
  Validators,
} from '@angular/forms'

export function noWhiteSpace(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isWhitespace = control.value.trim().length === 0
    return isWhitespace ? { whitespace: 'value is only whitespace' } : null
  }
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  cities = ['Lagos', 'Abuja', 'warsaw']

  private flights = [
    {
      time: '1:25 - 6:30',
      price: 90000,
    },
    {
      time: '9:14 - 9:58',
      price: 3000,
    },
    {
      time: '2:44 - 5:58',
      price: 40000,
    },
    {
      time: '7:04 - 9:22',
      price: 22000,
    },
    {
      time: '2:14 - 3:07',
      price: 5000,
    },
    {
      time: '7:30 - 10:00',
      price: 16000,
    },
  ]

  private flightSubject$ = new BehaviorSubject(null)

  searchForm: FormGroup
  flights$ = this.flightSubject$.asObservable()
  constructor(
    public modalController: ModalController,
    private toast: ToastController,
    private bookFacade: BookFacade,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      depart: [null, Validators.compose([Validators.required, noWhiteSpace])],
      arrive: [null, Validators.compose([Validators.required, noWhiteSpace])],
      departDate: [null, Validators.required],
      arriveDate: [null, Validators.required],
    })
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: BookComponent,
    })
    return await modal.present()
  }

  searchFlights() {
    this.flightSubject$.next([])
    setTimeout(() => {
      this.flightSubject$.next(this.flights)
    }, 600)
  }

  async book() {
    const confam = confirm(
      'Would you like to buy some food now? Food will be more expensive during the flight!'
    )

    if (confam === true) {
      this.bookFacade.buychow()
      this.presentModal()
      const openLink = window.open(
        'https://foodapjj-prod.firebaseapp.com/tabs/tab1'
      )

      openLink.onerror = event => {
        console.log(event)
      }
      console.log('blacc')
      // console.log(openLink)
      // 'agarry://emmanuel.com'
      // openLink.onerror = () => {
      //   window.open('https://foodapjj-prod.firebaseapp.com/tabs/tab1')
      // }
    } else {
      const toast = await this.toast.create({
        message: 'Thank you for trying our services',
        duration: 2000,
      })
      toast.present()
    }
  }

  addPost(form) {
    console.log(form)
  }
}
