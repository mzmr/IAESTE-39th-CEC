// import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';
import { DataSource } from '../../data/data-source';

@inject(DataSource)
export class Program {
  title = 'Program';
  building = 'images/sukiennice.png';
  isReady = false;
  days = [];
  selectedDayName = '';

  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  setSelectedDay() {
    return new Promise((resolve, reject) => {
      this.dataSource.getData('page_content/program.json').then(result => {
        this.days = result;

        let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let now = new Date();
        let nowAsText = now.getDate() + ' ' + monthNames[now.getMonth()];

        let today = this.days.filter(day => day.date === nowAsText)[0];
        if (today) {
          this.selectedDayName = today.name;
          resolve(today.name);
        } else {
          this.selectedDayName = this.days[0].name;
          resolve(this.days[0].name);
        }

        this.isReady = true;
      });
    });
  }



  configureRouter(config, router) {
    config.title = 'Program';
    config.options.root = 'program';
    this.setSelectedDay().then(result => {
      config.map([
        {
          route: '', redirect: result, name: 'default-day'
        },
        {
          route: ':day', name: 'selected-day',
          moduleId: '../../resources/elements/program-day-events', title: 'Program Day'
        }
      ]);

      this.router = router;
    });
  }

  select(day) {
    this.selectedDayName = day.name;
    return true;
  }

  redirectDay() {
    return 'sunday';
  }
}
