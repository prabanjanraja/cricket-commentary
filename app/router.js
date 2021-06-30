import EmberRouter from '@ember/routing/router';
import config from 'cricket-commentary/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('schedule');
  this.route('new-match');
});
