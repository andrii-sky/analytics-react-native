function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { createStore } from '@segment/sovran-react-native';
import { getUUID } from '../uuid';
const INITIAL_VALUES = {
  isReady: true,
  events: [],
  eventsToRetry: [],
  context: {},
  settings: {},
  userInfo: {
    anonymousId: getUUID(),
    userId: undefined,
    traits: undefined
  }
};
export class SovranStorage {
  constructor(storeId) {
    _defineProperty(this, "storeId", void 0);

    _defineProperty(this, "contextStore", void 0);

    _defineProperty(this, "settingsStore", void 0);

    _defineProperty(this, "eventsStore", void 0);

    _defineProperty(this, "userInfoStore", void 0);

    _defineProperty(this, "fixAnonymousId", () => {
      const fixUnsubscribe = this.userInfoStore.subscribe(store => {
        if (store.userInfo.anonymousId === 'anonymousId') {
          this.userInfoStore.dispatch(state => {
            return {
              userInfo: { ...state.userInfo,
                anonymousId: getUUID()
              }
            };
          });
        }

        fixUnsubscribe();
      });
    });

    _defineProperty(this, "isReady", {
      get: () => true,
      onChange: _callback => {
        // No need to do anything since storage is always ready
        return () => {};
      }
    });

    _defineProperty(this, "context", {
      get: () => this.contextStore.getState().context,
      onChange: callback => this.contextStore.subscribe(store => callback(store.context)),
      set: value => {
        this.contextStore.dispatch(state => {
          return {
            context: { ...state.context,
              ...value
            }
          };
        });
      }
    });

    _defineProperty(this, "settings", {
      get: () => this.settingsStore.getState().settings,
      onChange: callback => this.settingsStore.subscribe(store => callback(store.settings)),
      set: value => {
        this.settingsStore.dispatch(state => {
          return {
            settings: { ...state.settings,
              ...value
            }
          };
        });
      },
      add: (key, value) => {
        this.settingsStore.dispatch(state => ({
          settings: { ...state.settings,
            [key]: value
          }
        }));
      }
    });

    _defineProperty(this, "events", {
      get: () => this.eventsStore.getState().events,
      onChange: callback => this.eventsStore.subscribe(store => callback(store.events)),
      add: event => {
        const eventsToAdd = Array.isArray(event) ? event : [event];
        this.eventsStore.dispatch(state => ({
          events: [...state.events, ...eventsToAdd]
        }));
      },
      remove: event => {
        this.eventsStore.dispatch(state => {
          const eventsToRemove = Array.isArray(event) ? event : [event];
          const setToRemove = new Set(eventsToRemove);
          const filteredEvents = state.events.filter(e => !setToRemove.has(e));
          return {
            events: filteredEvents
          };
        });
      }
    });

    _defineProperty(this, "userInfo", {
      get: () => this.userInfoStore.getState().userInfo,
      onChange: callback => this.userInfoStore.subscribe(store => callback(store.userInfo)),
      set: value => {
        this.userInfoStore.dispatch(state => ({
          userInfo: { ...state.userInfo,
            ...value
          }
        }));
      }
    });

    this.storeId = storeId;
    this.contextStore = createStore({
      context: INITIAL_VALUES.context
    }, {
      persist: {
        storeId: `${this.storeId}-context`
      }
    });
    this.settingsStore = createStore({
      settings: INITIAL_VALUES.settings
    }, {
      persist: {
        storeId: `${this.storeId}-settings`
      }
    });
    this.eventsStore = createStore({
      events: INITIAL_VALUES.events
    }, {
      persist: {
        storeId: `${this.storeId}-events`
      }
    });
    this.userInfoStore = createStore({
      userInfo: INITIAL_VALUES.userInfo
    }, {
      persist: {
        storeId: `${this.storeId}-userInfo`
      }
    });
    this.fixAnonymousId();
  }
  /**
   * This is a fix for users that have started the app with the anonymousId set to 'anonymousId' bug
   */


}
//# sourceMappingURL=sovranStorage.js.map