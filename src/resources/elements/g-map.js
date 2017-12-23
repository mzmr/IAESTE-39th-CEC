import { inject } from 'aurelia-framework';
import { DataSource } from '../../data/data-source';

@inject(DataSource)
export class GMap {
  isReady = false;
  myOptions = {};
  myMarkers = [{
    latitude: '50.066578',
    longitude: '19.911658',
    address: 'Building U-5, Reymonta 21, 30-059 Cracow',
    title: 'IAESTE AGH',
    icon: 'resources/images/pointer.png',
    infoWindow: { content: `
      <div id="content">
        <div id="siteNotice"></div>
        <h2 id="firstHeading" class="firstHeading">IAESTE CEC 2018</h2>
        <div id="bodyContent">
          <p>We're waiting for <b>you</b>!</p>
          <p><a href="http://iaeste.agh.edu.pl/cec">http://iaeste.agh.edu.pl/cec</a></p>
        </div>
      </div>` }
  }];

  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  created() {
    this.dataSource.getData('resources/google-map/map_style.json').then(s => {
      this.myOptions.styles = s;
      this.isReady = true;
    });
  }

}
