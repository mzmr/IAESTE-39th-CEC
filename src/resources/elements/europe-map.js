export class EuropeMap {

  constructor() {
    this.countries = [
      { name: 'Austria',
        title: 'IAESTE Austria',
        www: 'https://www.iaeste.at/en' },
      { name: 'Bosnia and Herzegovina',
        title: 'IAESTE Bosnia and Herzegovina',
        www: 'http://www.iaeste.ba' },
      { name: 'Croatia',
        title: 'IAESTE Croatia',
        www: 'http://www.iaeste.hr' },
      { name: 'Czech Republic',
        title: 'IAESTE Czech Republic',
        www: 'https://www.iaeste.cz' },
      { name: 'Hungary',
        title: 'IAESTE Hungary',
        www: 'http://iaeste.hu' },
      { name: 'Poland',
        title: 'IAESTE Poland',
        www: 'https://www.iaeste.pl' },
      { name: 'Slovakia',
        title: 'IAESTE Slovakia',
        www: 'https://iaeste.sk' },
      { name: 'Slovenia',
        title: 'IAESTE Slovenia',
        www: 'http://iaeste.si' }
    ];
  }

  attached() {
    // $('#regions_div').css('zoom', 1);

    google.charts.load('current', {
      'packages': ['geochart'],
      'mapsApiKey': 'AIzaSyDor7dD78pp2_iPfHH7MiW4lOYzCNEkDkY'
    });
    google.charts.setOnLoadCallback(this.drawRegionsMap.bind(this));
  }

  drawRegionsMap() {
    let data = google.visualization.arrayToDataTable(
      [['Country', 'Title']].concat(this.countries.map(c => [c.name, c.title]))
    );

    let options = {
      region: '150',
      defaultColor: '#ff323d',
      legend: 'none'
    };

    this.chart = new google.visualization.GeoChart(document.getElementById('europe-map'));
    this.chart.draw(data, options);

    google.visualization.events.addListener(this.chart, 'select', this.selectHandler.bind(this));
    // google.visualization.events.addListener(chart, 'ready', function() { $('#regions_div').css('zoom', 1.4); });
    // chart.draw(data, options);
  }


  selectHandler(e) {
    let selection = this.chart.getSelection()['0'];

    if (selection) {
      let countryPage = this.countries[selection.row].www;
      window.location.href = countryPage;
    }
  }

}
