export class Contact {
  title = 'Contact';
  building = 'images/barbakan_kraw.png';
  isReady = false;

  myMarkers = [{
    latitude: '50.066578',
    longitude: '19.911658',
    address: 'Building U-5, Reymonta 21, 30-059 Cracow',
    title: 'IAESTE AGH',
    icon: 'images/pointer.png',
    infoWindow: {content: `
      <div id="content">
        <div id="siteNotice"></div>
        <h2 id="firstHeading" class="firstHeading">IAESTE CEC 2018</h2>
        <div id="bodyContent">
          <p>We're waiting for <b>you</b>!</p>
          <p><a href="http://iaeste.agh.edu.pl/cec">http://iaeste.agh.edu.pl/cec</a></p>
        </div>
      </div>`}
  }];
}
