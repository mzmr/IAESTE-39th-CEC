import { inject } from 'aurelia-framework';
import { DataSource } from '../../data/data-source';

@inject(DataSource)
export class GMap {
  isReady = false;

  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  created() {
    this.dataSource.getData('resources/google-map/map_style_colored.json').then(s => {
      this.showMap(s);
      this.isReady = true;
    });
  }

  showMap(s) {
    gmap.load().then(() => {
      let hotel = {lat: 49.890729, lng: 19.490044};

      let map = new google.maps.Map(document.getElementById('cec-location'), {
        zoom: 17,
        center: hotel,
        styles: s
      });

      let marker = new google.maps.Marker({
        position: hotel,
        map: map,
        icon: 'resources/images/pointer.png',
        address: 'Wojska Polskiego 17, 34-100 Wadowice',
        title: 'Podhalanin'
        // place: {
        //   location: hotel,
        //   placeId: 'fa788a1867bcbbcdf83a102b510088b4275574b7'
        // }
      });

      let info = new google.maps.InfoWindow({content: `
      <h4><strong>Podhalanin</strong></h4>
      <p style="font-size:16px">
        Wojska Polskiego 17<br>
        34-100 Wadowice<br>
        Polska
      <p>
      `});
      marker.addListener('click', function() {
        info.open(map, marker);
      });
    });
  }

}
