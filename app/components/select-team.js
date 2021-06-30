import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

class match {
  @tracked teama = null;
  @tracked teamb = null;
  @tracked date = null;
  @tracked time = null;
}

export default class SelectTeamComponent extends Component {
  @service('team-names') teamNames;
  teamnames = this.teamNames.teams;

  @action
  print({ target }) {
    console.log(target.value);
    // this.teamnames.
  }
}
