import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(time: string): string {
    const hours = parseInt((time.split(':'))[0]);
    const minutes = parseInt((time.split(':'))[1]);
    const part = hours > 12 ? 'PM' : 'AM';

    const min = `${minutes}`.length == 1 ? `0${minutes}` : minutes;
    let hour: string | number = hours > 12 ? hours - 12 : hours;
    hour = `${hour}`.length == 1 ? `0${hour}` : hour;
    return `${hour}:${min} ${part}`;
  }

}
