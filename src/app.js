import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';

@inject(EventAggregator)
export class App {

  constructor(ea) {
    this.ea = ea;
  }

  configureRouter(config, router) {
    config.title = 'CEC';
    config.options.root = '/';
    config.map([
      {
        route: ['', 'about'], name: 'about',
        nav: true,
        moduleId: './pages/about/about', title: 'About'
      },
      {
        route: 'program', name: 'program',
        nav: true,
        moduleId: './pages/program/program', title: 'Program'
      },
      {
        route: 'workshops', name: 'workshops',
        nav: true,
        moduleId: './pages/workshops/workshops', title: 'Workshops'
      },
      {
        route: 'accommodation', name: 'accommodation',
        nav: true,
        moduleId: './pages/accommodation/accommodation', title: 'Accommodation'
      },
      {
        route: 'registration', name: 'registration',
        nav: true,
        moduleId: './pages/registration/registration', title: 'Registration'
      },
      {
        route: 'contact', name: 'contact',
        nav: true,
        moduleId: './pages/contact/contact', title: 'Contact'
      },
      {
        route: 'anniversary', name: 'anniversary',
        nav: true,
        moduleId: './pages/anniversary/anniversary', title: '70th Anniversary', settings: { isSpecial: true }
      }
    ]);

    this.router = router;
  }

  attached() {
    this.ea.subscribe('router:navigation:complete', payload => window.scrollTo(0, 0));
  }
}
