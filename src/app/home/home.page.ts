import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  numberInput: string = ''
  constructor() {}

  openWhatsapp() {
    let number = this.sanitizeNumber()
    window.open(`https://wa.me/55${number}`, '_blank')
  }

  sanitizeNumber() {
    this.numberInput = this.numberInput.replace(/\D/g, '')
    return Number(this.numberInput).toString()
  }

  get isInputValid() {
    const validPattern = /^\d{10,15}$/
    const numbersOnly = this.sanitizeNumber()
    
    if (!validPattern.test(numbersOnly)) {
      return false
    }
    return true
  }
}
