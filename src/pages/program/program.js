import { inject } from 'aurelia-framework';
import { DataSource } from '../../data/data-source';
import { addBackgrounds } from 'utils';

@inject(DataSource)
export class Program {
  title = 'Program';
  isReady = false;
  days = [];
  selectedDay = null;
  isToday = null;

  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  attached() {
    addBackgrounds();
  }

  created() {
    this.getCurrentDay().then(currentDayResult => {
      this.selectedDay = currentDayResult[0];
      this.isToday = currentDayResult[1];
      this.isReady = true;
    });
  }

  getCurrentDay() {
    return new Promise((resolve, reject) => {
      this.dataSource.getData('page_content/program.json').then(result => {
        this.days = result;
        let today = this.findToday();

        if (today) {
          resolve([today, true]);
        } else {
          resolve([this.days[0], false]);
        }
      });
    });
  }

  findToday() {
    let nowAsText = this.getNowAsText();
    return this.days.filter(day => day.date === nowAsText)[0];
  }

  getNowAsText() {
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let now = new Date();
    return now.getDate() + ' ' + monthNames[now.getMonth()];
  }

  select(day) {
    this.isToday = day.date === this.getNowAsText();
    this.selectedDay = day;
    return true;
  }

  getWeekDay(day) {
    let dayNames = ['Sunday', 'Monday', 'Tuesday', 'Thursday', 'Wednesday', 'Friday', 'Saturday'];
    let dayNumber = new Date(day.date + ' ' + new Date().getFullYear()).getDay();
    return dayNames[dayNumber];
  }
}
