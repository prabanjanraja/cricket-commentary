import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
export default class MatchDetailedComponent extends Component {

  match = this.args.match;
  @service time;

  @action
  print() {
    // create a json object to represent this.match.id
    let matchId = {
      'match_id': this.match.id,
    };
    console.log(this.match);
    $.post("/servlet/schedule", matchId);
  }
}
