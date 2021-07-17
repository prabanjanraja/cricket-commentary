import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

class Match {
  @tracked teama = null;
  @tracked teamb = null;
  @tracked date = null;
  @tracked time = null;
}
export default class NewMatchComponent extends Component {
  @service('team-names') teamNames;
  @service time;
  @tracked teamnames = this.teamNames.teams;

  curr_match = new Match();

  // a function to check both team names are not the same.
  check = () => {
    if (this.curr_match.teama === this.curr_match.teamb) {
      return error;
    }
  }
  // a function to set the team name that needs to be passed over to the component
  teamA = (value) => {
    this.curr_match.teama = value;
    this.check();
  };

  teamB = (value) => {
    this.curr_match.teamb = value;
    this.check();
  };

  @action
  date({ target }) {
    this.curr_match.date = target.value;
  }

  @action
  set_time({ target }) {
    this.curr_match.time = target.value;
  }


  is_valid = (match) => {
    console.log("is_valid");
    if (match.teama === null || match.teamb === null) {
      alert("Set the team names");
      return error
    }
    // if date value is not set then choose the current date
    if (match.date === null) {
      match.date = this.time.today;
    }
    // if time is not set then choose the current time.
    if (match.time === null) {
      match.time = this.time.now;
    }
  }

  // post the curr_match to the database
  @action
  create_match() {
    var match = this.curr_match;
    try {
      // check if the current match is valid.
      this.is_valid(match);
    } catch (error) {
      console.log(this.curr_match);
    }
    // send curr_match to "/servlet/welcome" using ajax.

    $.post("/servlet/welcome", this.curr_match);


    // send curr_match as string to "/servlet/welcome" using fetch api.
    console.log("Success");
  }
}
