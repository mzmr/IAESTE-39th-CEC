import { DataSource } from '../../data/data-source';
import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';

@inject(DataSource)
export class CountryList {
  @bindable countrytype;

  countries = [];
  isReady = false;

  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  attached() {
    this.dataSource.getData('page_content/countries.json').then(result => {
      if (this.countrytype === 'edge') {
        this.countries = result.edge;
      } else {
        this.countries = result.core;
      }
      this.isReady = true;
    });
  }

  getFlag(c) {
    return 'background-image:url(resources/images/flags/' + c.code + '.png)';
  }

}
