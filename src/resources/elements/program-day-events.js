import {bindable} from 'aurelia-framework';

export class ProgramDayEvents {
  @bindable day;
  @bindable today;

  isItNow(event) {
    if (!this.today) {
      return false;
    }

    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let currentTime = (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes;

    if (event.startHour > currentTime) {
      return false;
    }

    if (event.endHour < currentTime) {
      return false;
    }

    return true;
  }

  startHour(event) {
    if (event.startHour) {
      return event.startHour;
    }

    return '-∞';
  }

  endHour(event) {
    if (event.endHour) {
      return event.endHour;
    }

    return '∞';
  }
}
