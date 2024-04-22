import React, { useRef, useState, useEffect } from 'react';
import Rough from 'roughjs';

const MyComponent = () => {
  const canvasRef = useRef(null);
  const [fillStyle, setFillStyle] = useState('solid'); // Default fill style
  const roughCanvas = useRef(null); // Store rough canvas instance

  useEffect(() => {
    if (!roughCanvas.current) {
      roughCanvas.current = Rough.canvas(canvasRef.current);
    } else {
      roughCanvas.current.ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      roughCanvas.current.rectangle(10, 10, 200, 100, {
        fill: 'red', // Fill color
        fillStyle: fillStyle, // Fill style dynamically set
        hachureGap: 10, // Gap between cross-hatch lines (if applicable)
      });
    }
  }, [fillStyle]); // Re-run effect when fillStyle changes

  const handleFillStyleChange = (event) => {
    setFillStyle(event.target.value);
  };

  return (
    <div>
      <canvas ref={canvasRef} />
      <select value={fillStyle} onChange={handleFillStyleChange}>
        <option value="solid">Solid</option>
        <option value="zigzag">Zigzag</option>
        <option value="cross-hatch">Cross-hatch</option>
        <option value="dots">Dots</option>
        <option value="dashed">Dashed</option>
        {/* Add more options as needed */}
      </select>
    </div>
  );
};

export default MyComponent;
