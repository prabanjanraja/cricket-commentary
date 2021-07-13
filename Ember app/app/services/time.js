import Service from '@ember/service';

//  a service file to import today's date and current time.
export default class TimeService extends Service {

  //  a getter for the current date
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
    return cYear + '-' + cMonth + '-' + cDay;
  }

  // A getter for the current time.
  get now() {
    let currentDate = new Date();
    return currentDate.getHours() + ":" + currentDate.getMinutes();
  }

}
