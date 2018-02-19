import { addBackgrounds } from 'utils';

export class Home {
  title = 'Home';

  attached() {
    addBackgrounds();
  }

}
