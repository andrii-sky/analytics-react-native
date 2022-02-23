"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultConfig = exports.defaultApiHost = exports.batchApi = void 0;

var _reactNative = require("react-native");

const batchApi = _reactNative.Platform.select({
  ios: 'http://localhost:9091',
  android: 'http://10.0.2.2:9091'
});

exports.batchApi = batchApi;
const defaultApiHost = 'api.segment.io/v1';
exports.defaultApiHost = defaultApiHost;
const defaultConfig = {
  writeKey: '',
  flushAt: 20,
  flushInterval: 30,
  retryInterval: 60,
  maxBatchSize: 1000,
  maxEventsToRetry: 1000,
  trackDeepLinks: false,
  trackAppLifecycleEvents: false,
  autoAddSegmentDestination: true
};
exports.defaultConfig = defaultConfig;
//# sourceMappingURL=constants.e2e.mock.js.map