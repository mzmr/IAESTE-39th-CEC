import { inject } from 'aurelia-framework';
import { DataSource } from '../../data/data-source';

@inject(DataSource)
export class ProgramDayEvents {
  isReady = false;

  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;
    this.dataSource.getData('page_content/program.json').then(result => {
      this.day = result.filter(x => x.name === params.day)[0];
      this.isReady = true;
    });
  }

  getDayDetails(name) {
    return new Promise(resolve => {
      let found = this.days.filter(x => x.name === name)[0];
      resolve(JSON.parse(JSON.stringify(found)));
    });
  }
}
