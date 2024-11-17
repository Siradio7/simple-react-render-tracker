export interface RenderInfo {
  timestamp: number;
  props: Record<string, any>;
  renderCount: number;
}

export interface TrackerOptions {
  threshold: number;
  showHeatmap: boolean;
  notify: (message: string) => void;
}

export interface TrackerState {
  renders: Map<string, RenderInfo[]>;
  options: TrackerOptions;
}

export type TrackerAction =
  | {
      type: 'TRACK_RENDER';
      payload: {
        componentName: string;
        props: Record<string, any>;
        timestamp: number;
      };
    }
  | {
      type: 'UPDATE_OPTIONS';
      payload: Partial<TrackerOptions>;
    }
  | {
      type: 'RESET';
    };