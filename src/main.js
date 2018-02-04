import environment from './environment';
import { GoogleMapsApi } from 'GoogleMapsApi';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources');

  window.gmap = new GoogleMapsApi();

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
