import express from 'express';
import * as line from '@line/bot-sdk';
import config from './config';

const router = express.Router(); // eslint-disable-line new-cap

// set Line notification settings
const lineConfig = {
  channelAccessToken: config.line.channelAccessToken,
  channelSecret: config.line.channelSecret
};
const linetClient = new line.Client(lineConfig);

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }
  return linetClient.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text
  });
}

// mount line webhook route on /line/webhook
router.post('/', line.middleware(lineConfig), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then(result => res.json(result));
});

export default router;

