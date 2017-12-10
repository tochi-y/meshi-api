import * as line from '@line/bot-sdk';
import config from './config';
import Meshi from '../server/models/meshi.model';

// For Line notification
const lineConfig = {
  channelAccessToken: config.line.channelAccessToken,
  channelSecret: config.line.channelSecret
};
const linetClient = new line.Client(lineConfig);
const lineNotificationToId = config.line.notificationToId;

const notifyByLine = () => {
  Meshi.random()
    .then(meshi => (
      linetClient.pushMessage(lineNotificationToId, {
        type: 'text',
        text: `${meshi[0].name}がいいんじゃない？`
      })
    ))
    .catch((err) => {
      console.error('Line notification error'); // eslint-disable-line no-console
      console.error(err); // eslint-disable-line no-console
    });
};

const notify = (type) => {
  if (type === 'line') {
    return notifyByLine;
  }
  throw new Error('Not implemented.');
};

export default notify;
