import express from 'express';
import * as line from '@line/bot-sdk';
import config from './config';
import Meshi from '../server/models/meshi.model';

const router = express.Router(); // eslint-disable-line new-cap

// set Line notification settings
const lineConfig = {
  channelAccessToken: config.line.channelAccessToken,
  channelSecret: config.line.channelSecret
};
const linetClient = new line.Client(lineConfig);

function handleEvent(event) {
  console.log(JSON.stringify(event, null, 2));
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }
  const { text } = event.message;
  if (text.includes('飯') || text.includes('めし')) {
    return Meshi
      .random()
      .then(meshi => (
        linetClient.replyMessage(event.replyToken, {
          type: 'text',
          text: `${meshi.name}がいいんじゃない？`
        })
      ));
  }
  return null;
}

// mount line webhook route on /line/webhook
router.post('/', line.middleware(lineConfig), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then(result => res.json(result));
});

export default router;

