import { addBackgrounds } from 'utils';

export class About {
  title = 'About';
  building = 'resources/images/buildings/sukiennice.png';

  attached() {
    addBackgrounds();

    $(document).ready(function() {
      $('#anthem-media-line button').click(function(event) {
        $('#anthem-lyrics').collapse('toggle');
      });
    });
  }
}
