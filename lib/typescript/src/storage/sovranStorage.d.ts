import type { SegmentAPIIntegrations, IntegrationSettings, SegmentEvent, DeepPartial, Context, UserInfoState } from '..';
import type { Storage } from './types';
export declare class SovranStorage implements Storage {
    private storeId;
    private contextStore;
    private settingsStore;
    private eventsStore;
    private userInfoStore;
    constructor(storeId: string);
    /**
     * This is a fix for users that have started the app with the anonymousId set to 'anonymousId' bug
     */
    private fixAnonymousId;
    readonly isReady: {
        get: () => boolean;
        onChange: (_callback: (value: boolean) => void) => () => void;
    };
    readonly context: {
        get: () => DeepPartial<Context>;
        onChange: (callback: (value?: DeepPartial<Context> | undefined) => void) => import("@segment/sovran-react-native").Unsubscribe;
        set: (value: DeepPartial<Context>) => void;
    };
    readonly settings: {
        get: () => SegmentAPIIntegrations;
        onChange: (callback: (value?: SegmentAPIIntegrations | undefined) => void) => import("@segment/sovran-react-native").Unsubscribe;
        set: (value: SegmentAPIIntegrations) => void;
        add: (key: string, value: IntegrationSettings) => void;
    };
    readonly events: {
        get: () => SegmentEvent[];
        onChange: (callback: (value: SegmentEvent[]) => void) => import("@segment/sovran-react-native").Unsubscribe;
        add: (event: SegmentEvent | SegmentEvent[]) => void;
        remove: (event: SegmentEvent | SegmentEvent[]) => void;
    };
    readonly userInfo: {
        get: () => UserInfoState;
        onChange: (callback: (value: UserInfoState) => void) => import("@segment/sovran-react-native").Unsubscribe;
        set: (value: UserInfoState) => void;
    };
}
