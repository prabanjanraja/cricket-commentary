import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
export default class MatchDetailedComponent extends Component {

  match = this.args.match;
  @service time;

  @action
  print() {
    console.log(this.match);
    console.log(this.match.date);
    console.log(this.time.today);
    console.log(this.match.date >= this.time.today);
    console.log(this.match.date <= this.time.today);
  }

  // get

}
