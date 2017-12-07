// import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';
import { DataSource } from '../../data/data-source';

@inject(DataSource)
export class Program {
  title = 'Program';
  building = 'images/wawel.png';
  isReady = false;
  days = [];
  selectedDayName = '';

  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  created() {
    this.dataSource.getData('page_content/program.json').then(result => {
      this.days = result;
      this.selectedDayName = this.days[0].name;
      this.isReady = true;
    });
  }

  configureRouter(config, router) {
    config.title = 'Program';
    config.options.root = 'program';
    config.map([
      {
        route: '', redirect: 'friday', name: 'default-day'
      },
      {
        route: ':day', name: 'selected-day',
        moduleId: '../../resources/elements/program-day-events', title: 'Program Day'
      }
    ]);

    this.router = router;
  }

  select(day) {
    this.selectedDayName = day.name;
    return true;
  }
}
