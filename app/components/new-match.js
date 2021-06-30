import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

class Match {
  @tracked teama = false;
  @tracked teamb = null;
  @tracked date = null;
  @tracked time = null;
}
export default class NewMatchComponent extends Component {
  @service('team-names') teamNames;
  @tracked teamnames = this.teamNames.teams;

  curr_match = new Match();

  teamA = (value) => {
    this.curr_match.teama = value;
    if (this.curr_match.teama === this.curr_match.teamb) {
      return error;
    }
  };

  teamB = (value) => {
    this.curr_match.teamb = value;
    if (this.curr_match.teama === this.curr_match.teamb) {
      return error;
    }
  };

  get today() {
    let currentDate = new Date();
    console.log(currentDate);
    let cDay = currentDate.getDate();
    if (cDay < 10) {
      cDay = '0' + cDay;
    }
    let cMonth = currentDate.getMonth() + 1;
    if (cMonth < 10) {
      cMonth = '0' + cMonth;
    }
    let cYear = currentDate.getFullYear();
    var today = cYear + '-' + cMonth + '-' + cDay;
    this.curr_match.date = today;
    return today;
  }
  get team_names() {
    return this.teamnames;
  }
  // get currrent local time

  get now() {
    let currentDate = new Date();
    return currentDate.getHours() + ":" + currentDate.getMinutes();
  }

  @action
  date({ target }) {
    this.curr_match.date = target.value;
  }

  @action
  time({ target }) {
    this.curr_match.time = target.value;
  }

  @action
  create_match() {
    var match = this.curr_match;
    try {
      if (match.teama === match.teamb)
        error("same teams can't compete");
    } catch (error) {
      alert(error.text);
    }
    console.log(this.curr_match);
  }
}
