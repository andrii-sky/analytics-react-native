function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { PluginType, UpdateType } from './types';
import { getAllPlugins } from './util';
/*
type TimelinePlugins = {
    before?: Plugin[] | undefined;
    enrichment?: Plugin[] | undefined;
    destination?: Plugin[] | undefined;
    after?: Plugin[] | undefined;
    utility?: Plugin[] | undefined;
}
 */

export class Timeline {
  constructor() {
    _defineProperty(this, "plugins", {});
  }

  add(plugin) {
    var _plugin$analytics;

    const {
      type
    } = plugin;

    if (this.plugins[type]) {
      var _this$plugins$type;

      (_this$plugins$type = this.plugins[type]) === null || _this$plugins$type === void 0 ? void 0 : _this$plugins$type.push(plugin);
    } else {
      this.plugins[type] = [plugin];
    }

    const settings = (_plugin$analytics = plugin.analytics) === null || _plugin$analytics === void 0 ? void 0 : _plugin$analytics.settings.get();

    if (settings) {
      plugin.update({
        integrations: settings
      }, UpdateType.initial);
    }
  }

  remove(plugin) {
    const plugins = this.plugins[plugin.type];

    if (plugins) {
      const index = plugins.findIndex(f => f === plugin);

      if (index > -1) {
        plugins.splice(index, 1);
      }
    }
  }

  apply(closure) {
    getAllPlugins(this).forEach(plugin => closure(plugin));
  }

  process(incomingEvent) {
    // apply .before and .enrichment types first ...
    const beforeResult = this.applyPlugins({
      type: PluginType.before,
      event: incomingEvent
    });

    if (beforeResult === undefined) {
      return;
    } // .enrichment here is akin to source middleware in the old analytics-ios.


    const enrichmentResult = this.applyPlugins({
      type: PluginType.enrichment,
      event: beforeResult
    }); // once the event enters a destination, we don't want
    // to know about changes that happen there. those changes
    // are to only be received by the destination.

    this.applyPlugins({
      type: PluginType.destination,
      event: enrichmentResult
    }); // apply .after plugins ...

    let afterResult = this.applyPlugins({
      type: PluginType.after,
      event: enrichmentResult
    });
    return afterResult;
  }

  applyPlugins(_ref) {
    let {
      type,
      event
    } = _ref;
    let result = event;
    const plugins = this.plugins[type];

    if (plugins) {
      plugins.forEach(plugin => {
        if (result) {
          result = plugin.execute(result);
        }
      });
    }

    return result;
  }

}
//# sourceMappingURL=timeline.js.map