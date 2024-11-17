import { useEffect, useRef } from 'react';
import { useTracker } from '../context/TrackerContext';

export function useRenderTracker(componentName: string, props: Record<string, any>) {
  const { dispatch } = useTracker();
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    dispatch({
      type: 'TRACK_RENDER',
      payload: {
        componentName,
        props,
        timestamp: Date.now(),
      },
    });
  }, [componentName, props, dispatch]);

  return renderCount.current;
}