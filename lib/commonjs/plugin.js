"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UtilityPlugin = exports.Plugin = exports.PlatformPlugin = exports.EventPlugin = exports.DestinationPlugin = void 0;

var _timeline = require("./timeline");

var _types = require("./types");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Plugin {
  constructor() {
    _defineProperty(this, "type", _types.PluginType.utility);

    _defineProperty(this, "analytics", undefined);
  }

  configure(analytics) {
    this.analytics = analytics;
  } // @ts-ignore


  update(settings, type) {// do nothing by default, user can override.
  }

  execute(event) {
    // do nothing.
    return event;
  }

  shutdown() {// do nothing by default, user can override.
  }

}

exports.Plugin = Plugin;

class EventPlugin extends Plugin {
  execute(event) {
    if (event === undefined) {
      return event;
    }

    let result = event;

    switch (result.type) {
      case _types.EventType.IdentifyEvent:
        result = this.identify(result);
        break;

      case _types.EventType.TrackEvent:
        result = this.track(result);
        break;

      case _types.EventType.ScreenEvent:
        result = this.screen(result);
        break;

      case _types.EventType.AliasEvent:
        result = this.alias(result);
        break;

      case _types.EventType.GroupEvent:
        result = this.group(result);
        break;
    }

    return result;
  } // Default implementations that forward the event. This gives plugin
  // implementors the chance to interject on an event.


  identify(event) {
    return event;
  }

  track(event) {
    return event;
  }

  screen(event) {
    return event;
  }

  alias(event) {
    return event;
  }

  group(event) {
    return event;
  }

  flush() {}

  reset() {}

}

exports.EventPlugin = EventPlugin;

class DestinationPlugin extends EventPlugin {
  constructor() {
    super(...arguments);

    _defineProperty(this, "type", _types.PluginType.destination);

    _defineProperty(this, "key", '');

    _defineProperty(this, "timeline", new _timeline.Timeline());
  }

  /**
     Adds a new plugin to the currently loaded set.
      - Parameter plugin: The plugin to be added.
     - Returns: Returns the name of the supplied plugin.
  */
  add(plugin) {
    const analytics = this.analytics;

    if (analytics) {
      plugin.configure(analytics);
    }

    this.timeline.add(plugin);
    return plugin;
  }
  /**
     Applies the supplied closure to the currently loaded set of plugins.
      - Parameter closure: A closure that takes an plugin to be operated on as a parameter.
  */


  apply(closure) {
    this.timeline.apply(closure);
  }

  configure(analytics) {
    this.analytics = analytics;
    this.apply(plugin => {
      plugin.configure(analytics);
    });
  }
  /**
     Removes and unloads plugins with a matching name from the system.
      - Parameter pluginName: An plugin name.
  */


  remove(plugin) {
    this.timeline.remove(plugin);
  } // find(pluginType: PluginType) {
  //   // return this.timeline.find(pluginType);
  // }


}

exports.DestinationPlugin = DestinationPlugin;

class UtilityPlugin extends EventPlugin {} // For internal platform-specific bits


exports.UtilityPlugin = UtilityPlugin;

class PlatformPlugin extends Plugin {}

exports.PlatformPlugin = PlatformPlugin;
//# sourceMappingURL=plugin.js.map