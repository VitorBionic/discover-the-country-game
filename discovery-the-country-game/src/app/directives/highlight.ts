import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class Highlight {

  @HostBinding('style.transition')
  transition = 'transform 0.15s ease, box-shadow 0.15s ease';

  @HostBinding('style.transform')
  scale = 'scale(1)';

  @HostBinding('style.boxShadow')
  shadow = 'none';

  @HostListener('mouseenter')
  onEnter() {
    this.scale = 'scale(1.07)';
    this.shadow = '0px 4px 12px rgba(0,0,0,0.25)';
  }

  @HostListener('mouseleave')
  onLeave() {
    this.scale = 'scale(1)';
    this.shadow = 'none';
  }

  @HostListener('mousedown')
  onPress() {
    this.scale = 'scale(0.95)';
    this.shadow = '0px 2px 6px rgba(0,0,0,0.15)';
  }

  @HostListener('mouseup')
  onRelease() {
    this.scale = 'scale(1.07)';
    this.shadow = '0px 4px 12px rgba(0,0,0,0.25)';
  }

}
