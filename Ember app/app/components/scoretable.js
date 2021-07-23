import Component from '@glimmer/component';
// import action
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ScoretableComponent extends Component {

  // read the id passed to the component
  id = this.args.id;
  response = this.get();
  @tracked scores = [];
  @tracked started=false;


  // use ajax and get method to fetch the scores from the path '/servlet/match/'
  // and pass the id as a data attribute
    get() {
    return $.get(`/servlet/match`,  { id: this.id } ).then(response => {
      // log the response
      console.log("response for the scores");
      this.scores = response.scores;
      console.log(this.scores);
      console.log(response.Started);
      console.log(response.Started === 'true');
      this.started = response.Started === 'true';
      console.log(this.started);
      return response.scores;
    });
    }

    get over_score() {
    var ret = []
    var len = this.scores.length;
    var cur_ovr = -1;
    var sum = 0;
    for (var i = 0; i < len + 5 - ((len - 1) % 6); i++) {
      if (i % 6 === 0) {
        if (i !== 0)
          ret[cur_ovr] = [...ret[cur_ovr], sum.toString()];
        cur_ovr += 1;
        ret = [...ret, [(cur_ovr + 1)]];
        sum = 0;
      }
      if (i < len)
        ret[cur_ovr] = [...ret[cur_ovr], this.scores[i]];
      else
        ret[cur_ovr] = [...ret[cur_ovr], ' '];
      if (!isNaN(this.scores[i]) && this.scores[i]) {
        sum = parseInt(sum) + parseInt(this.scores[i]);
      }
    }
    ret[cur_ovr] = [...ret[cur_ovr], sum.toString()];
    return ret;
  }


}
