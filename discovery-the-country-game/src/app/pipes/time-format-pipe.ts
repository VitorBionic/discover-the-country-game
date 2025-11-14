import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value:number): string{
    if (value == null) return '';

    const minutes = Math.floor(value / 60);
    const seconds = value % 60;

    const textMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const textSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`

    return `${textMinutes}:${textSeconds}`;
  }

}
