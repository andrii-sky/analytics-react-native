import { DestinationPlugin } from '../plugin';
import { PluginType, SegmentAPISettings, SegmentEvent, UpdateType } from '../types';
export declare class SegmentDestination extends DestinationPlugin {
    type: PluginType;
    key: string;
    update(_: SegmentAPISettings, __: UpdateType): void;
    execute(event: SegmentEvent): SegmentEvent;
    flush(): Promise<void>;
}
