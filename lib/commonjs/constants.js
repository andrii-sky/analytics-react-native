"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultConfig = exports.defaultApiHost = exports.batchApi = void 0;
const batchApi = 'https://api.segment.io/v1/batch';
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
//# sourceMappingURL=constants.js.map