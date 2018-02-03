import { inject } from 'aurelia-framework';
import { DataSource } from '../../data/data-source';

@inject(DataSource)
export class GMap {
  isReady = false;
  myOptions = {};
  myMarkers = [{
    latitude: '49.890729',
    longitude: '19.490044',
    address: 'Wojska Polskiego 17, 34-100 Wadowice',
    title: 'Podhalanin',
    icon: 'resources/images/pointer.png',
    infoWindow: {
      content: `
      <div id="content">
        <div id="siteNotice"></div>
        <h4 id="firstHeading" class="firstHeading">Podhalanin</h4>
        <div id="bodyContent">
          <p>
            Wojska Polskiego 17<br>
            34-100 Wadowice
          </p>
        </div>
      </div>` }
  }];

  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  created() {
    this.dataSource.getData('resources/google-map/map_style_colored.json').then(s => {
      this.myOptions.styles = s;
      this.isReady = true;
    });
  }

}
