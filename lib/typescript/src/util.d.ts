import type { EventPlugin } from './plugin';
import type { Timeline } from './timeline';
export declare const chunk: (array: any[], size: number) => any[];
export declare const getAllPlugins: (timeline: Timeline) => import("./plugin").Plugin[];
export declare const getPluginsWithFlush: (timeline: Timeline) => EventPlugin[];
