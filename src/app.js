export class App {
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
}
