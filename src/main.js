import environment from './environment';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources');

  aurelia.use
    .plugin('aurelia-google-maps', config => {
      config.options({
        apiKey: 'AIzaSyDor7dD78pp2_iPfHH7MiW4lOYzCNEkDkY', // use `false` to disable the key
        apiLibraries: 'drawing,geometry', //get optional libraries like drawing, geometry, ... - comma seperated list
        options: { panControl: true, panControlOptions: { position: 9 } }, //add google.maps.MapOptions on construct (https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapOptions)
        language: '' | 'en', // default: uses browser configuration (recommended). Set this parameter to set another language (https://developers.google.com/maps/documentation/javascript/localization)
        region: '' | 'GB' // default: it applies a default bias for application behavior towards the United States. (https://developers.google.com/maps/documentation/javascript/localization)
      });
    });

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
