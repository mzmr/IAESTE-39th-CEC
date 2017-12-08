import {bindable} from 'aurelia-framework';

export class Menu {
  @bindable router = null;

  attached() {
    $('[data-spy="affix"]').each(function() {
      let $spy = $(this);
      let data = $spy.data();

      data.offset = data.offset || {};

      if (data.offsetBottom !== null) data.offset.bottom = data.offsetBottom;
      if (data.offsetTop    !== null) data.offset.top    = data.offsetTop;

      $spy.affix(data);
    });

    $(document).ready(function() {
      $('.navbar-nav li.trigger-collapse a').click(function(event) {
        $('.navbar-collapse').collapse('hide');
      });
    });
  }
}
