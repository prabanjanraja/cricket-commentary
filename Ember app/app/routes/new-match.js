import Route from '@ember/routing/route';

export default class NewMatchRoute extends Route {

  // create a method to redirect to schedule route
  redirectToSchedule() {
    this.transitionTo('schedule');
  }
}
