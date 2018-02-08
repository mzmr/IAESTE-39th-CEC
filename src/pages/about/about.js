import { addBackgrounds } from 'utils';

export class About {
  title = 'About';
  building = 'resources/images/buildings/sukiennice.png';

  attached() {
    addBackgrounds();

    let btn = $('#anthem-button');
    let show = 'Show lyrics translation';
    let hide = 'Hide lyrics translation';
    btn.text(show);

    $(document).ready(function() {
      btn.click(function(event) {
        $('#anthem-lyrics').collapse('toggle');
        btn.text(btn.text() === show ? hide : show);
      });
    });
  }
}
