import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ScoreBoardComponent extends Component {

  @service router;

  // read the id passed to the component
  id = this.args.id;
  response = this.read();
  @tracked scores1 = [];
  @tracked scores2 = [];
  @tracked started = false;
  @tracked over_score1;
  @tracked over_score2;
  get GameOver() {
    if (this.Status === "3")
      return true;
    return false;
  }
  @tracked Status = "";


  over_score(scores) {
    var ret = []
    var len = scores.length;
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
      if (!isNaN(scores[i]) && scores[i]) {
        if (scores[i] === -1)
          scores[i] = "out";
        else
          sum = parseInt(sum) + parseInt(scores[i]);
      }
      if (i < len)
        ret[cur_ovr] = [...ret[cur_ovr], scores[i]];
      else
        ret[cur_ovr] = [...ret[cur_ovr], ' '];
    }
    ret[cur_ovr] = [...ret[cur_ovr], sum.toString()];
    return ret;
  }

  // use ajax and get method to fetch the scores from the path '/servlet/match/'
  // and pass the id as a data attribute
  read() {
    return $.get(`/servlet/match`, { id: this.id }).then(response => {
      // log the response
      console.log("response for the scores");
      this.scores1 = response.scores1;
      this.scores2 = response.scores2;
      this.Status = response.status;
      this.started = response.Started;
      // log the values
      console.log(this.scores1);
      console.log(this.scores2);
      console.log(this.Status);
      console.log(this.started);
      this.over_score1 = this.over_score(this.scores1);
      this.over_score2 = this.over_score(this.scores2);
      console.log(this.over_score(this.scores1));
      setTimeout(this.read(), 7000);
      console.log(this.over_score1);
    });
  }



}
