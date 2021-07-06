import Route from '@ember/routing/route';

export default class ScheduleRoute extends Route {
  async model() {
    let response = await fetch('api/schedule.json');
    let { data } = await response.json();
    let result = data.map((schedule) => {
      let { attributes } = schedule;
      let title = attributes.teamA + ' VS ' + attributes.teamB;
      let id = 'CSK_VS_MI';
      return { id, title, ...attributes };
    });
    console.log(result);
    return result;
  }
}
