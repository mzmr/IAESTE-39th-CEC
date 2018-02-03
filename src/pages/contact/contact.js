import { addBackgrounds } from 'utils';
import { DataSource } from '../../data/data-source';
import { inject } from 'aurelia-framework';

@inject(DataSource)
export class Contact {
  title = 'Contact';
  isReady = false;

  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  attached() {
    addBackgrounds();

    this.dataSource.getData('page_content/contacts.json').then(result => {
      this.contacts = result;
      this.isReady = true;
    });
  }
}
