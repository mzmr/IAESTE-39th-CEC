import { inject } from 'aurelia-framework';
import { DataSource } from '../../data/data-source';

@inject(DataSource)
export class Workshops {
  title = 'Workshops';
  building = 'images/wawel.png';
  workshops = [{}, {}];
  isReady = false;

  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  created() {
    this.dataSource.getData('page_content/workshops.json').then(wsList => {
      this.workshops[0] = { type: 'Half day', list: this.filterWorkshops('half', wsList) };
      this.workshops[1] = { type: 'Full day', list: this.filterWorkshops('full', wsList) };
      this.isReady = true;
    });
  }

  filterWorkshops(type, list) {
    return list.filter(w => w.type === type);
  }
}
