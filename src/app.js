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
        route: ['', 'home'], name: 'home',
        nav: true,
        moduleId: './pages/home/home', title: 'Home'
      },
      {
        route: 'about', name: 'about',
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
        route: 'registration', name: 'registration',
        nav: true,
        moduleId: './pages/registration/registration', title: 'Registration'
      },
      {
        route: 'contact', name: 'contact',
        nav: true,
        moduleId: './pages/contact/contact', title: 'Contact'
      }
    ]);

    this.router = router;
  }

  attached() {
    this.ea.subscribe('router:navigation:complete', payload => window.scrollTo(0, 0));
  }
}
