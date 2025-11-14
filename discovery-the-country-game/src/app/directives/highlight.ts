import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class Highlight {

  @HostBinding('style.backgroundColor') bgColor: string = '';

  @HostListener('mouseenter')
  onMouseEnter() {
    this.bgColor = 'yellow';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.bgColor = '';
  }

}
