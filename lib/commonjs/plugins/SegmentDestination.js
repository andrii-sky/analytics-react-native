"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SegmentDestination = void 0;

var _plugin = require("../plugin");

var _types = require("../types");

var _util = require("../util");

var _api = require("../api");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const MAX_EVENTS_PER_BATCH = 100;

class SegmentDestination extends _plugin.DestinationPlugin {
  constructor() {
    super(...arguments);

    _defineProperty(this, "type", _types.PluginType.destination);

    _defineProperty(this, "key", 'Segment.io');
  }

  update(_, __) {// this is where analytics-swift initalizes the HTTP client
    // no need to do this for React Native where we just use the fetch polyfill directly
    // see flush() below
  }

  execute(event) {
    var _this$analytics, _this$analytics2, _plugins$map, _this$analytics3;

    const pluginSettings = (_this$analytics = this.analytics) === null || _this$analytics === void 0 ? void 0 : _this$analytics.settings.get();
    const plugins = (_this$analytics2 = this.analytics) === null || _this$analytics2 === void 0 ? void 0 : _this$analytics2.getPlugins(_types.PluginType.destination); // Disable all destinations that have a device mode plugin

    const deviceModePlugins = (_plugins$map = plugins === null || plugins === void 0 ? void 0 : plugins.map(plugin => plugin.key)) !== null && _plugins$map !== void 0 ? _plugins$map : [];
    const cloudSettings = { ...pluginSettings
    };

    for (const key of deviceModePlugins) {
      if (key in cloudSettings) {
        cloudSettings[key] = false;
      }
    } // User/event defined integrations override the cloud/device mode merge


    const mergedEvent = { ...event,
      integrations: { ...cloudSettings,
        ...(event === null || event === void 0 ? void 0 : event.integrations)
      }
    };
    (_this$analytics3 = this.analytics) === null || _this$analytics3 === void 0 ? void 0 : _this$analytics3.queueEvent(mergedEvent);
    return mergedEvent;
  }

  async flush() {
    var _this$analytics$event, _this$analytics4, _this$analytics$getCo, _this$analytics5;

    const events = (_this$analytics$event = (_this$analytics4 = this.analytics) === null || _this$analytics4 === void 0 ? void 0 : _this$analytics4.events.get()) !== null && _this$analytics$event !== void 0 ? _this$analytics$event : [];
    const chunkedEvents = (0, _util.chunk)(events, (_this$analytics$getCo = (_this$analytics5 = this.analytics) === null || _this$analytics5 === void 0 ? void 0 : _this$analytics5.getConfig().maxBatchSize) !== null && _this$analytics$getCo !== void 0 ? _this$analytics$getCo : MAX_EVENTS_PER_BATCH);
    let sentEvents = [];
    let numFailedEvents = 0;
    await Promise.all(chunkedEvents.map(async batch => {
      try {
        var _this$analytics6;

        await (0, _api.sendEvents)({
          config: (_this$analytics6 = this.analytics) === null || _this$analytics6 === void 0 ? void 0 : _this$analytics6.getConfig(),
          events: batch
        });
        sentEvents = sentEvents.concat(batch);
      } catch (e) {
        console.warn(e);
        numFailedEvents += batch.length;
      } finally {
        var _this$analytics7;

        (_this$analytics7 = this.analytics) === null || _this$analytics7 === void 0 ? void 0 : _this$analytics7.removeEvents(sentEvents);
      }
    }));

    if (sentEvents.length) {
      var _this$analytics8;

      if ((_this$analytics8 = this.analytics) !== null && _this$analytics8 !== void 0 && _this$analytics8.getConfig().debug) {
        console.info(`Sent ${sentEvents.length} events`);
      }
    }

    if (numFailedEvents) {
      console.error(`Failed to send ${numFailedEvents} events.`);
    }
  }

}

exports.SegmentDestination = SegmentDestination;
//# sourceMappingURL=SegmentDestination.js.map