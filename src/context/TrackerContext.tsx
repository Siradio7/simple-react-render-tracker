import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { TrackerState, TrackerAction, RenderInfo } from '../types';

const initialState: TrackerState = {
  renders: new Map(),
  options: {
    threshold: 10,
    showHeatmap: false,
    notify: console.warn,
  },
};

const TrackerContext = createContext<{
  state: TrackerState;
  dispatch: React.Dispatch<TrackerAction>;
} | null>(null);

function trackerReducer(state: TrackerState, action: TrackerAction): TrackerState {
  switch (action.type) {
    case 'TRACK_RENDER': {
      const { componentName, props, timestamp } = action.payload;
      const componentRenders = state.renders.get(componentName) || [];
      const newRenderInfo: RenderInfo = {
        timestamp,
        props,
        renderCount: componentRenders.length + 1,
      };

      const newRenders = new Map(state.renders);
      newRenders.set(componentName, [...componentRenders, newRenderInfo]);

      if (newRenderInfo.renderCount > state.options.threshold) {
        state.options.notify(
          `⚠️ Excessive renders detected for <${componentName}>:\n` +
          `  - Render count: ${newRenderInfo.renderCount}\n` +
          `  - Props: ${JSON.stringify(props, null, 2)}`
        );
      }

      return {
        ...state,
        renders: newRenders,
      };
    }
    case 'UPDATE_OPTIONS':
      return {
        ...state,
        options: {
          ...state.options,
          ...action.payload,
        },
      };
    case 'RESET':
      return {
        ...state,
        renders: new Map(),
      };
    default:
      return state;
  }
}

export function TrackerProvider({ children, options = {} }: {
  children: ReactNode;
  options?: Partial<TrackerState['options']>;
}) {
  const [state, dispatch] = useReducer(trackerReducer, {
    ...initialState,
    options: { ...initialState.options, ...options },
  });

  return (
    <TrackerContext.Provider value={{ state, dispatch }}>
      {children}
    </TrackerContext.Provider>
  );
}

export function useTracker() {
  const context = useContext(TrackerContext);
  if (!context) {
    throw new Error('useTracker must be used within a TrackerProvider');
  }
  return context;
}