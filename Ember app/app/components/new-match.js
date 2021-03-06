import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

class Match {
  @tracked teama = null;
  @tracked teamb = null;
  @tracked date = null;
  @tracked time = null;
  @tracked overs = null;
}
export default class NewMatchComponent extends Component {
  @service('team-names') teamNames;
  @service time;
  @service router;
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
    // if overs is not set then choose the current overs as 5
    if (match.overs === null) {
      match.overs = 5;
    }
  }

  // create an action to set the number of overs
  @action
  set_overs({ target }) {
    this.curr_match.overs = target.value;
  }

  // post the curr_match to the database
  @action
  create_match() {
    try {
      // check if the current match is valid.
      this.is_valid(this.curr_match);
    } catch (error) {
    }
    console.log(this.curr_match);


    // send curr_match to "/servlet/welcome" using ajax.
    $.post("/servlet/welcome", this.curr_match);

    this.router.transitionTo('schedule');

  }
}
