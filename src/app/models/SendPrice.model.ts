import { SendType } from './sentType.model';

export class SendPrice {
  id: number;
  cityName: string;
  stateName: string;
  sendType: SendType[];
}
