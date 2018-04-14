import { inject } from 'aurelia-framework';
import { DataSource } from '../../data/data-source';
import { addBackgrounds } from 'utils';

@inject(DataSource)
export class Workshops {
  title = 'Workshops';
  workshops = [{}, {}];
  isReady = false;
  selectedWS = null;

  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  attached() {
    addBackgrounds();
  }

  created() {
    this.dataSource.getData('page_content/workshops.json').then(wsList => {
      this.workshops[0] = { part: 'Morning', list: this.setImagePaths(this.filterByPart('first', wsList)) };
      this.workshops[1] = { part: 'Afternoon', list: this.setImagePaths(this.filterByPart('second', wsList)) };
      this.workshops[2] = { part: 'All day', list: this.setImagePaths(this.filterByPart('both', wsList)) };
      this.isReady = true;
    });
  }

  filterByPart(part, list) {
    return list.filter(w => w.part === part);
  }

  setImagePaths(wsList) {
    return wsList.map(ws => {
      ws.imagex = {
        normal: 'resources/images/ws-presenters/' + ws.image + '/normal.jpg',
        blurred: 'resources/images/ws-presenters/' + ws.image + '/blurred.jpg'
      };
      return ws;
    });
  }

  select(ws) {
    this.selectedWS = ws;
    setTimeout(() => this.scrollToWS(ws.id), 400);
    return true;
  }

  scrollToWS(id) {
    $('html, body').animate({
        scrollTop: $('#' + id).offset().top - 65
    }, 400);
  }

}
