import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';


export default class SelectTeamComponent extends Component {
  @service('team-names') teamNames;
  @tracked teamnames = this.teamNames.teams;

  get team_names() {
    return this.teamnames;
  }

  @action
  print({ target }) {
    try {
      // execute the function passed over to set the team name
      this.args.function(target.value);
    } catch (error) {
      // reset the dropdown
      target.value = null;
      alert("The team names can't be same")
    }
  }
}
