import type { SegmentClient } from './analytics';
import { Timeline } from './timeline';
import { AliasEventType, GroupEventType, IdentifyEventType, PluginType, ScreenEventType, SegmentAPISettings, SegmentEvent, TrackEventType, UpdateType } from './types';
export declare class Plugin {
    type: PluginType;
    analytics?: SegmentClient;
    configure(analytics: SegmentClient): void;
    update(settings: SegmentAPISettings, type: UpdateType): void;
    execute(event: SegmentEvent): SegmentEvent | undefined;
    shutdown(): void;
}
export declare class EventPlugin extends Plugin {
    execute(event: SegmentEvent): SegmentEvent;
    identify(event: IdentifyEventType): IdentifyEventType;
    track(event: TrackEventType): TrackEventType;
    screen(event: ScreenEventType): ScreenEventType;
    alias(event: AliasEventType): AliasEventType;
    group(event: GroupEventType): GroupEventType;
    flush(): void;
    reset(): void;
}
export declare class DestinationPlugin extends EventPlugin {
    type: PluginType;
    key: string;
    timeline: Timeline;
    /**
       Adds a new plugin to the currently loaded set.
  
       - Parameter plugin: The plugin to be added.
       - Returns: Returns the name of the supplied plugin.
    */
    add(plugin: Plugin): Plugin;
    /**
       Applies the supplied closure to the currently loaded set of plugins.
  
       - Parameter closure: A closure that takes an plugin to be operated on as a parameter.
    */
    apply(closure: (plugin: Plugin) => void): void;
    configure(analytics: SegmentClient): void;
    /**
       Removes and unloads plugins with a matching name from the system.
  
       - Parameter pluginName: An plugin name.
    */
    remove(plugin: Plugin): void;
}
export declare class UtilityPlugin extends EventPlugin {
}
export declare class PlatformPlugin extends Plugin {
}
