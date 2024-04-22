import React, { useState, useRef, useEffect } from 'react';
import rough from 'roughjs';

function Canvas() {
  const canvasRef = useRef(null);
  const [shapes, setShapes] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);
  const [mode, setMode] = useState('draw');
  const [fillStyle, setFillStyle] = useState('solid'); // Default fill style


  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const roughCanvas = rough.canvas(canvas);

    function drawShapes() {
      console.log(fillStyle);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      shapes.forEach(shape => {
        if (shape.type === 'line') {
          roughCanvas.rectangle(shape.startX, shape.startY, shape.endX - shape.startX, shape.endY - shape.startY, {
            fill: shape.fillStyle!=="none" && shape.stroke, // Fill color
        fillStyle: shape.fillStyle, // Fill style dynamically set
        hachureGap: 10,
          });
        }
      });
      roughCanvas
    }

    drawShapes();
  }, [shapes]);

  
  // rc.rectangle(220, 15, 80, 80, {
  //   fill: 'red',
  //   hachureAngle: 60, // angle of hachure,
  //   hachureGap: 8
  // });

  function handleDrawingMouseDown(event) {
    const mouseX = event.clientX - canvasRef.current.getBoundingClientRect().left;
    const mouseY = event.clientY - canvasRef.current.getBoundingClientRect().top;

    if (mode === 'draw') {
      setShapes(prevShapes => [...prevShapes, { type: 'line', startX: mouseX, startY: mouseY, endX: mouseX, endY: mouseY, roughness: 1.5, stroke: 'black', fillStyle:fillStyle}]);
    }
  }

  function handleMovingMouseDown(event) {
    const mouseX = event.clientX - canvasRef.current.getBoundingClientRect().left;
    const mouseY = event.clientY - canvasRef.current.getBoundingClientRect().top;

    if (mode === 'move') {
      for (let i = shapes.length - 1; i >= 0; i--) {
        const shape = shapes[i];
        if (mouseX >= shape.startX && mouseX <= shape.endX && mouseY >= shape.startY && mouseY <= shape.endY) {
          setSelectedShape({ shape, mouseStartX: mouseX, mouseStartY: mouseY, index: i });
          break;
        }
      }
    }
  }

  function handleMouseMove(event) {
    const mouseX = event.clientX - canvasRef.current.getBoundingClientRect().left;
    const mouseY = event.clientY - canvasRef.current.getBoundingClientRect().top;

    if (mode === 'draw') {
      if (event.buttons === 1) {
        setShapes(prevShapes => {
          const updatedShapes = [...prevShapes];
          updatedShapes[prevShapes.length - 1].endX = mouseX;
          updatedShapes[prevShapes.length - 1].endY = mouseY;
          return updatedShapes;
        });
      }
    } else if (mode === 'move' && selectedShape) {
      const dx = mouseX - selectedShape.mouseStartX;
      const dy = mouseY - selectedShape.mouseStartY;

      setShapes(prevShapes => {
        const updatedShapes = [...prevShapes];
        updatedShapes[selectedShape.index] = {
          ...selectedShape.shape,
          startX: selectedShape.shape.startX + dx,
          startY: selectedShape.shape.startY + dy,
          endX: selectedShape.shape.endX + dx,
          endY: selectedShape.shape.endY + dy,
        };
        console.log(updatedShapes,'updatedShapes')
        console.log(updatedShapes[selectedShape.index],'updatedShapes[selectedShape]')
        console.log(selectedShape,'selectedShape');
        return updatedShapes;
      });
    }
  }

  function handleMouseUp() {
    setSelectedShape(null);
  }

  function toggleMode(newMode) {
    setMode(newMode);
  }

  const handleFillStyleChange = (event) => {
    setFillStyle(event.target.value);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={mode === 'draw' ? handleDrawingMouseDown : handleMovingMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ border: '1px solid black', cursor: mode === 'draw' ? 'crosshair' : 'move' }}
      />
      <button onClick={() => toggleMode('draw')}>Draw</button>
      <button onClick={() => toggleMode('move')}>Move</button>
      <select value={fillStyle} onChange={handleFillStyleChange}>
        <option value="none">No Fill</option>
        <option value="solid">Solid</option>
        <option value="zigzag">Zigzag</option>
        <option value="cross-hatch">Cross-hatch</option>
        <option value="dots">Dots</option>
        <option value="dashed">Dashed</option>
        {/* Add more options as needed */}
      </select>
    </div>
  );
}

export default Canvas;
