import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCuitFormat]'
})
export class CuitFormatDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    let inputVal = event.target.value.replace(/\D/g, ''); // Elimina caracteres no numéricos
    if (inputVal.length > 2) {
      inputVal = inputVal.substring(0, 2) + '-' + inputVal.substring(2);
    }
    if (inputVal.length > 11) {
      inputVal = inputVal.substring(0, 11) + '-' + inputVal.substring(11, 12);
    }
    this.el.nativeElement.value = inputVal;
  }
}