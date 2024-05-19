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
    this.numberInput = number
    window.open(`https://wa.me/55${number}`, '_blank')
  }

  sanitizeNumber(): string {
    let numbersOnly = this.numberInput.replace(/\D/g, '')
    numbersOnly = numbersOnly.replace(/^0+/, '') // removing leading zeroes
    
    // there is a region on RS that uses 55 as DDD, 
    // so we must also validate length before assuming 55 is a country code
    if (numbersOnly.length >= 12 && numbersOnly.startsWith('55')) { 
      numbersOnly = numbersOnly.slice(2)
    }

    return Number(numbersOnly).toString()
  }

  get isInputValid() {
    const validPattern = /^\d{10,11}$/
    const numbersOnly = this.sanitizeNumber()
    console.log(`numbersOnly: ${numbersOnly}`)
    if (!validPattern.test(numbersOnly)) {
      return false
    }
    return true
  }
}
