import { inject } from 'aurelia-framework';
import { DataSource } from '../../data/data-source';

@inject(DataSource)
export class CecLocationMap {
  isReady = false;
  hotel = { lat: 49.890931, lng: 19.490064 };
  busStation = { lat: 49.884698, lng: 19.499763 };

  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  created() {
    this.dataSource.getData('resources/google-map/map_style_colored.json').then(s => {
      this.showMap(s);
    });
  }

  showMap(s) {
    gmap.load().then(() => {
      this.map = new google.maps.Map(document.getElementById('cec-location'), {
        zoom: 17,
        center: this.hotel,
        styles: s
      });

      this.directionsDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: true
      });
      this.directionsDisplay.setMap(this.map);

      let hotelMarker = new google.maps.Marker({
        position: this.hotel,
        map: this.map,
        icon: 'resources/images/pointer_hotel.png',
        title: 'Podhalanin'
      });

      let stationMarker = new google.maps.Marker({
        position: this.busStation,
        map: this.map,
        icon: 'resources/images/pointer_bus.png',
        title: 'Bus station'
      });

      let hotelInfo = `
        <h4><strong>Podhalanin</strong></h4>
        <p style="font-size:16px">
          Address:<br>
          Wojska Polskiego 17
        <p>
      `;

      let stationInfo = `
        <h4><strong>Bus station</strong></h4>
        <p style="font-size:16px">
          Address:<br>
          marsz. Józefa Piłsudskiego
        <p>
      `;

      let info = new google.maps.InfoWindow();

      hotelMarker.addListener('click', function() {
        info.setContent(hotelInfo);
        info.open(this.map, hotelMarker);
      });

      stationMarker.addListener('click', function() {
        info.setContent(stationInfo);
        info.open(this.map, stationMarker);
      });

      this.calcRoute();
    });
  }

  calcRoute() {
    let bounds = new google.maps.LatLngBounds();

    bounds.extend(this.busStation);
    bounds.extend(this.hotel);
    this.map.fitBounds(bounds);

    let request = {
      origin: this.busStation,
      // {
      //   location: start,
      //   placeId: 'ChIJzUYUZMOIFkcR1CuEfzzMkaE'
      // },
      destination: this.hotel,
      // {
      //   location: end
      //   placeId: 'fa788a1867bcbbcdf83a102b510088b4275574b7'
      // },
      travelMode: google.maps.TravelMode.WALKING
    };

    let directionsService = new google.maps.DirectionsService();

    directionsService.route(request, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
        // this.directionsDisplay.setMap(this.map);
      }
    });
  }

}
