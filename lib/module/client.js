import React, { createContext, useContext } from 'react';
import { defaultConfig } from './constants';
import { createLogger } from './logger';
import { SegmentClient } from './analytics';
import { SovranStorage } from './storage';
export const createClient = config => {
  const logger = createLogger();

  if (typeof (config === null || config === void 0 ? void 0 : config.debug) === 'boolean') {
    if (config.debug) {
      logger.enable();
    } else {
      logger.disable();
    }
  }

  const clientConfig = { ...defaultConfig,
    ...config
  };
  const segmentStore = new SovranStorage(config.writeKey);
  const client = new SegmentClient({
    config: clientConfig,
    logger,
    store: segmentStore
  });
  client.init();
  return client;
};
const Context = /*#__PURE__*/createContext(null);
export const AnalyticsProvider = _ref => {
  let {
    client,
    children
  } = _ref;

  if (!client) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Context.Provider, {
    value: client
  }, children);
};
export const useAnalytics = () => {
  const client = useContext(Context);

  if (!client) {
    console.error('Segment client not configured!', 'To use the useAnalytics() hook, pass an initialized Segment client into the AnalyticsProvider'); // @ts-ignore

    return {};
  }

  return {
    screen: function () {
      return client.screen(...arguments);
    },
    track: function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      console.log('PAPAPA', args);
      client.track(...args);
    },
    identify: function () {
      return client.identify(...arguments);
    },
    flush: () => client.flush(),
    group: function () {
      return client.group(...arguments);
    },
    alias: function () {
      return client.alias(...arguments);
    },
    reset: () => client.reset()
  };
};
//# sourceMappingURL=client.js.map