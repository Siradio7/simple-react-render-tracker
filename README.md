# React Render Tracker

A powerful and lightweight tool for tracking and debugging React component renders. Monitor render counts, visualize render frequency with heatmaps, and get notifications for excessive renders.

## Features

- 🔍 Track component render counts
- 📊 Visual heatmap of render frequency
- ⚡ Performance impact warnings
- 🎯 Configurable thresholds
- 🪝 Hooks and HOC APIs
- 📱 Production-ready with zero impact when disabled

## Installation

```bash
npm install react-render-tracker
# or
yarn add react-render-tracker
# or
pnpm add react-render-tracker
```

## Quick Start

1. Wrap your app with the TrackerProvider:

```jsx
import { TrackerProvider } from 'react-render-tracker';

function App() {
  return (
    <TrackerProvider options={{ threshold: 10, showHeatmap: true }}>
      <YourApp />
    </TrackerProvider>
  );
}
```

2. Track renders using either the hook or HOC:

```jsx
// Using the hook
import { useRenderTracker } from 'react-render-tracker';

function MyComponent(props) {
  useRenderTracker('MyComponent', props);
  return <div>{props.content}</div>;
}

// Using the HOC
import { withRenderTracker } from 'react-render-tracker';

function MyComponent(props) {
  return <div>{props.content}</div>;
}

export default withRenderTracker(MyComponent);
```

3. Add the heatmap visualization (optional):

```jsx
import { RenderHeatmap } from 'react-render-tracker';

function App() {
  return (
    <TrackerProvider options={{ showHeatmap: true }}>
      <YourApp />
      <RenderHeatmap />
    </TrackerProvider>
  );
}
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| threshold | number | 10 | Maximum renders before triggering a warning |
| showHeatmap | boolean | false | Show/hide the render heatmap |
| notify | function | console.warn | Custom notification handler |

```jsx
const options = {
  threshold: 15,
  showHeatmap: true,
  notify: (message) => toast.warning(message),
};

<TrackerProvider options={options}>
  <App />
</TrackerProvider>
```

## API Reference

### useRenderTracker

```jsx
useRenderTracker(componentName: string, props: object)
```

A hook to track renders in functional components.

### withRenderTracker

```jsx
withRenderTracker(Component: React.ComponentType, componentName?: string)
```

A Higher-Order Component (HOC) to track renders in class or functional components.

### RenderHeatmap

A component that visualizes render frequency using a color-coded heatmap.

### TrackerProvider

The context provider that manages render tracking state and configuration.

## Best Practices

1. **Development Only**: Disable tracking in production
```jsx
const showTracker = process.env.NODE_ENV === 'development';

function App() {
  if (!showTracker) return <YourApp />;
  
  return (
    <TrackerProvider>
      <YourApp />
    </TrackerProvider>
  );
}
```

2. **Custom Notifications**: Integrate with your notification system
```jsx
const options = {
  notify: (message) => {
    // Send to error tracking service
    errorTracker.log(message);
    // Show in UI
    toast.warning(message);
  },
};
```

3. **Selective Tracking**: Only track components you're investigating
```jsx
// Track only specific components
const needsTracking = ['Header', 'UserProfile', 'Dashboard'];

function MyComponent({ name, ...props }) {
  if (needsTracking.includes(name)) {
    useRenderTracker(name, props);
  }
  // ... rest of component
}
```

## License

MIT © Mamadou Siradiou Diallo