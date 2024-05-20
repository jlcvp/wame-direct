import { Component } from '@angular/core';
import { COUNTRIES } from './countries';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  countries = COUNTRIES
  numberInput: string = ''
  selectedCountry: string = 'BR'
  constructor() {}

  openWhatsapp() {
    let number = this.sanitizeNumber()
    this.numberInput = number
    let countryCode = this.countries.find(c => c.iso === this.selectedCountry)?.fone || '55'
    window.open(`https://wa.me/${countryCode}${number}`, '_blank')
  }

  sanitizeNumber(): string {
    let numbersOnly = this.numberInput.replace(/\D/g, '')
    numbersOnly = numbersOnly.replace(/^0+/, '') // removing leading zeroes
    
    if (this.selectedCountry === 'BR' && numbersOnly.length >= 12 && numbersOnly.startsWith('55')) { 
      // there is a region in RS state in Brazil that uses 55 as area code, 
      // so we must also validate length before assuming 55 is a country code
      numbersOnly = numbersOnly.slice(2)
    }

    return Number(numbersOnly).toString()
  }

  get isInputValid() {
    const numbersOnly = this.sanitizeNumber()
    if (this.selectedCountry === 'BR') {
      const validPattern = /^\d{10,11}$/
      console.log(`numbersOnly: ${numbersOnly}`)
      if (!validPattern.test(numbersOnly)) {
        return false
      }
    } else {
      const validPattern = /^\d{6,14}$/ // 6 to 14 digits for international numbers
      if (!validPattern.test(numbersOnly)) {
        return false
      }
    }
    return true
  }

  isCountrySelected(bCountry: string ,aCountry: string) {
    return bCountry === aCountry
  }

  handleCountryChange(ev: any) {
    this.selectedCountry = ev.detail.value
  }

  getFlagEmoji(countryCode: string) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char =>  127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }
  
}
