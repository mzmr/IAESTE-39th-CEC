import { DataSource } from '../../data/data-source';
import { inject } from 'aurelia-framework';

@inject(DataSource)
export class EuropeMap {

  constructor(dataSource) {
    dataSource.getData('page_content/countries.json').then(result => {
      this.countries = result.core;
    });
  }

  attached() {
    google.charts.load('current', {
      'packages': ['geochart'],
      'mapsApiKey': 'AIzaSyDor7dD78pp2_iPfHH7MiW4lOYzCNEkDkY'
    });
    google.charts.setOnLoadCallback(this.drawRegionsMap.bind(this));
  }

  drawRegionsMap() {
    let data = new google.visualization.DataTable();
    data.addColumn('string', 'Country');
    data.addColumn({type: 'string', role: 'tooltip', p: {html: true}});
    data.addRows(
      this.countries.map(c => [
        {v: c.name, f: ''},
        '<div style="white-space:nowrap;">' +
        '<img src="resources/images/flags/' + c.code + '.png" ' +
        'style="margin-left:3px;margin-right:8px;display:inline-block;vertical-align:middle;"/>' +
        '<span style="font-family:robotoBold;display:inline-block;vertical-align:middle;">' +
        'IAESTE ' + c.name + '</span></div>'
      ])
    );

    let options = {
      allowHtml: true,
      region: '150',
      defaultColor: '#ff323d',
      legend: 'none',
      tooltip: {isHtml: true}
    };

    this.chart = new google.visualization.GeoChart(document.getElementById('europe-map'));
    this.chart.draw(data, options);

    google.visualization.events.addListener(this.chart, 'select', this.selectHandler.bind(this));
  }


  selectHandler(e) {
    let selection = this.chart.getSelection()['0'];

    if (selection) {
      let countryPage = this.countries[selection.row].www;
      window.location.href = countryPage;
    }
  }

}
