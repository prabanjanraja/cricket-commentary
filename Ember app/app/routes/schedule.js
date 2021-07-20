import Route from '@ember/routing/route';

export default class ScheduleRoute extends Route {
  async model() {
    let response = await fetch('/servlet/schedule');
    console.log(response);
    let { data } = await response.json();
    let result = data.map((schedule) => {
      let { attributes } = schedule;
      let title = attributes.teamA + ' VS ' + attributes.teamB;
      return { title, ...attributes };
    });
    console.log(result);
    return result;
  }
}
