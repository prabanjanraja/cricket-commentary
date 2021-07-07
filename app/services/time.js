import Service from '@ember/service';

export default class TimeService extends Service {

  get today() {
    let currentDate = new Date();
    let cDay = currentDate.getDate();
    if (cDay < 10) {
      cDay = '0' + cDay;
    }
    let cMonth = currentDate.getMonth() + 1;
    if (cMonth < 10) {
      cMonth = '0' + cMonth;
    }
    let cYear = currentDate.getFullYear();
    var today = cYear + '-' + cMonth + '-' + cDay;
    return today;
  }

  get now() {
    let currentDate = new Date();
    return currentDate.getHours() + ":" + currentDate.getMinutes();
  }

}
