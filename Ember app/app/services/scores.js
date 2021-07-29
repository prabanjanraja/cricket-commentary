import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ScoresService extends Service {
  @tracked response = this.read();
  @tracked scores = [];
  @tracked started=false;


  // use ajax and get method to fetch the scores from the path '/servlet/match/'
  // and pass the id as a data attribute
    get read() {
    return $.get(`/servlet/match`,  { id: id } ).then(response => {
      // log the response
      console.log("response for the scores");
      this.scores = response.scores;
      this.started = response.Started === 'true';
      console.log(this.started);
      return response.scores;
    });
    }

  // create a method to call the read function every 5 seconds

}
