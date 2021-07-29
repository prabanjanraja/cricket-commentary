import Route from '@ember/routing/route';

export default class ScheduleRoute extends Route {
  async model() {
    let response = await fetch('/servlet/schedule');
    console.log(response);
    let { data } = await response.json();
    let result = data.map((schedule) => {
      let title = schedule.teamA + ' VS ' + schedule.teamB;
      return { title, ...schedule };
    });
    console.log(result);
    return result;
  }
}
