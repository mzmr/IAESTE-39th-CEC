import { inject } from 'aurelia-framework';
import { DataSource } from '../../data/data-source';
import { addBackgrounds } from 'utils';

@inject(DataSource)
export class Workshops {
  title = 'Workshops';
  workshops = [{}, {}];
  isReady = false;

  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  attached() {
    addBackgrounds();

    gmap.load().then(() => {
      let uluru = {lat: -25.363, lng: 131.044};
      let map = new google.maps.Map(document.getElementById('mapp'), {
        zoom: 4,
        center: uluru
      });
      let marker = new google.maps.Marker({
        position: uluru,
        map: map
      });
    });
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
