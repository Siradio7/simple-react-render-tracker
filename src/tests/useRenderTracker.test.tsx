import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { TrackerProvider } from '../context/TrackerContext';
import { useRenderTracker } from '../hooks/useRenderTracker';

describe('useRenderTracker', () => {
  it('should track renders correctly', () => {
    const notify = vi.fn();
    const TestComponent = ({ value }: { value: string }) => {
      useRenderTracker('TestComponent', { value });
      return <div>{value}</div>;
    };

    const { rerender } = render(
      <TrackerProvider options={{ threshold: 2, notify }}>
        <TestComponent value="initial" />
      </TrackerProvider>
    );

    // First render
    expect(notify).not.toHaveBeenCalled();

    // Second render
    rerender(
      <TrackerProvider options={{ threshold: 2, notify }}>
        <TestComponent value="updated" />
      </TrackerProvider>
    );
    expect(notify).not.toHaveBeenCalled();

    // Third render (exceeds threshold)
    rerender(
      <TrackerProvider options={{ threshold: 2, notify }}>
        <TestComponent value="final" />
      </TrackerProvider>
    );
    expect(notify).toHaveBeenCalledWith(expect.stringContaining('TestComponent'));
  });
});