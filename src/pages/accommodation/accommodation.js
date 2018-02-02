import { addBackgrounds } from 'utils';

export class Accommodation {
  title = 'Accommodation';
  building = 'resources/images/buildings/mariacki.png';

  attached() {
    addBackgrounds();
  }
}
