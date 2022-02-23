"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEvents = void 0;

var _jsBase = require("js-base64");

var _constants = require("./constants");

const sendEvents = async _ref => {
  let {
    config,
    events
  } = _ref;
  const updatedEvents = events.map(event => ({ ...event,
    sentAt: new Date().toISOString()
  }));
  await fetch(_constants.batchApi, {
    method: 'POST',
    body: JSON.stringify({
      batch: updatedEvents
    }),
    headers: {
      'Authorization': `Basic ${_jsBase.Base64.encode(`${config.writeKey}:`)}`,
      'Content-Type': 'application/json'
    }
  });
};

exports.sendEvents = sendEvents;
//# sourceMappingURL=api.js.map