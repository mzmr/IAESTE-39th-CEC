export class About {
  title = 'About';
  building = 'resources/images/buildings/sukiennice.png';

  attached() {
    $(document).ready(function() {
      $('#anthem-media-line button').click(function(event) {
        $('#anthem-lyrics').collapse('toggle');
      });
    });
  }
}
