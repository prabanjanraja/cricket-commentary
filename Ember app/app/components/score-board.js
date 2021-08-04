import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ScoreBoardComponent extends Component {

    @service router;

    teamA = "";
    teamB = "";

    @tracked display = true;

    // create a method to switch the flag to not flag so the team scores can be changed
    @action
    displayA() {
        this.display = true;
    }

    @action
    displayB() {
        this.display = false;
    }

    @tracked target1 = 0;
    @tracked target2 = 0;
    @tracked wickets1 = 0;
    @tracked wickets2 = 0;

    // read the id passed to the component
    id = this.args.id;
    response = this.read();
    @tracked scores1 = [];
    @tracked scores2 = [];
    @tracked teamA_score = [];
    @tracked teamB_score = [];
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
        let target = 0;
        let wickets = 0;
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
                if (scores[i] === -1) {
                    scores[i] = "out";
                    wickets += 1;
                } else {
                    sum = parseInt(sum) + parseInt(scores[i]);
                    target += parseInt(scores[i]);
                }

            }
            if (i < len)
                ret[cur_ovr] = [...ret[cur_ovr], scores[i]];
            else
                ret[cur_ovr] = [...ret[cur_ovr], ' '];
        }
        ret[cur_ovr] = [...ret[cur_ovr], sum.toString()];
        return [ret, target, wickets];
    }

    // use ajax and get method to fetch the scores from the path '/servlet/match/'
    // and pass the id as a data attribute
    read() {
        return $.get(`/servlet/match`, { id: this.id }).then(response => {
            this.scores1 = response.scores1;
            this.scores2 = response.scores2;
            this.Status = response.status;
            this.started = response.Started;
            this.teamA = response.teamA;
            this.teamB = response.teamB;
            let result1 = this.over_score(this.scores1);
            this.over_score1 = result1[0];
            this.target1 = result1[1];
            this.wickets1 = result1[2];
            let result2 = this.over_score(this.scores2);
            this.over_score2 = result2[0];
            this.target2 = result2[1];
            this.wickets2 = result2[2];
            this.teamA_score = this.toArray(response.teamA_score);
            this.teamB_score = this.toArray(response.teamB_score);
            if (!this.GameOver)
                setTimeout(this.read(), 7000);
        });
    }

    // create a method that takes a json array of format [{name:name,score:score},{name:name,score:score}]
    // to an array of [[name,score],[name,score]]
    toArray(json) {
        var arr = [];
        for (let val of json) {
            arr.push([val.name, val.score]);
        }
        return arr;
    }



}