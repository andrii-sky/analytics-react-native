import { Base64 } from 'js-base64';
import { batchApi } from './constants';
export const sendEvents = async _ref => {
  let {
    config,
    events
  } = _ref;
  const updatedEvents = events.map(event => ({ ...event,
    sentAt: new Date().toISOString()
  }));
  await fetch(batchApi, {
    method: 'POST',
    body: JSON.stringify({
      batch: updatedEvents
    }),
    headers: {
      'Authorization': `Basic ${Base64.encode(`${config.writeKey}:`)}`,
      'Content-Type': 'application/json'
    }
  });
};
//# sourceMappingURL=api.js.map