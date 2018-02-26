export class CerMap {

  attached() {
    this.doMap();
  }

  doMap() {
    let data = [
      ['hr', 2],
      ['tr', 1],
      ['si', 2],
      ['ba', 2],
      ['at', 2],
      ['sk', 2],
      ['hu', 2],
      ['pl', 2],
      ['mk', 1],
      ['cz', 2]
    ];

    let data2 = [
      {
        name: 'Dresden',
        lat: 51.0769658,
        lon: 13.632504
      },
      {
        name: 'Munich',
        lat: 48.155004,
        lon: 11.4717963
      },
      {
        name: 'Jena',
        lat: 50.9226456,
        lon: 11.445892
      }
    ];

    Highcharts.mapChart('cer-map-element', {
      chart: {
        map: 'custom/europe',
        margin: 0
      },

      xAxis: {
        min: 3000,
        max: 9500
      },

      yAxis: {
        min: -5000,
        max: 900
      },

      title: {
        text: ''
      },

      mapNavigation: {
        enabled: false,
        buttonOptions: {
          verticalAlign: 'bottom'
        }
      },

      colorAxis: {
        min: 1,
        minColor: '#f38f99',
        maxColor: '#ff323d',
        showInLegend: false
      },

      tooltip: {
        hideDelay: 0,
        backgroundColor: 'white',
        borderColor: '#00000030',
        useHTML: true,
        headerFormat: '',
        pointFormat: `
          <div style="white-space:nowrap;">
            <img style="width:22px;margin-right:7px" src="resources/images/flags/{point.name}.png">
            <span style="display:inline-block;vertical-align:middle;">{point.name}</span>
          </div>
          `
      },

      series: [{
        data: data,
        name: 'Random data',
        borderColor: '#00000015',
        borderWidth: 1,
        nullColor: '#f5f5f5'
      }, {
        type: 'mappoint',
        color: '#f38f99',
        data: data2,
        showInLegend: false,
        marker: {
          radius: 6
        },
        dataLabels: {
          format: ''
        }
      }]

    });
  }

}
