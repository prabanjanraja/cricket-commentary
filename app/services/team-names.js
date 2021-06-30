import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
export default class TeamNamesService extends Service {

  @tracked
  teams = [
    'India',
    'Indonesia',
    'Pakistan',
    'Sri Lanka',
    'South Africa',
    'New Zealand',
    'Australia',
  ];
}
