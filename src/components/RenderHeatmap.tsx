import React from 'react';
import { useTracker } from '../context/TrackerContext';

export function RenderHeatmap() {
  const { state } = useTracker();
  const { renders, options } = state;

  if (!options.showHeatmap) return null;

  const getHeatColor = (renderCount: number) => {
    const ratio = Math.min(renderCount / options.threshold, 1);
    const red = Math.floor(255 * ratio);
    const green = Math.floor(255 * (1 - ratio));
    return `rgb(${red}, ${green}, 0)`;
  };

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white rounded-lg shadow-lg max-w-md max-h-96 overflow-auto">
      <h3 className="text-lg font-bold mb-2">Render Heatmap</h3>
      <div className="space-y-2">
        {Array.from(renders.entries()).map(([componentName, renderInfos]) => (
          <div
            key={componentName}
            className="p-2 rounded"
            style={{
              backgroundColor: getHeatColor(renderInfos.length),
              color: renderInfos.length > options.threshold ? 'white' : 'black',
            }}
          >
            <span className="font-medium">{componentName}</span>
            <span className="ml-2">({renderInfos.length} renders)</span>
          </div>
        ))}
      </div>
    </div>
  );
}