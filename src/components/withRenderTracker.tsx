import React from 'react';
import { useRenderTracker } from '../hooks/useRenderTracker';

export function withRenderTracker<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName = WrappedComponent.displayName || WrappedComponent.name
) {
  return function TrackedComponent(props: P) {
    useRenderTracker(componentName, props);
    return <WrappedComponent {...props} />;
  };
}