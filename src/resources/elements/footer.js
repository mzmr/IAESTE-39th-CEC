import { DataSource } from '../../data/data-source';
import { inject } from 'aurelia-framework';

@inject(DataSource)
export class Footer {
  sponsors = [];
  isReady = false;

  constructor(dataSource) {
    this.dataSource = dataSource;
    this.dataSource.getData('page_content/sponsors.json').then(result => {
      this.sponsors = result;
      this.isReady = true;
    });
  }
}
