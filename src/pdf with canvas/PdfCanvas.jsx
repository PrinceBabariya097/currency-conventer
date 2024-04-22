import React, { useRef, useEffect, useState } from 'react';

const PdfCanvas = ({ pdfUrl }) => {
  const canvasRef = useRef();
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDrawing, setIsDrawing] = useState(false);
  const [pdfImage, setPdfImage] = useState(null);
  let context
  if(canvasRef){
    context = canvasRef.current.getcontext('2d')
    }
  useEffect(() => {
    
    

    const startDrawing = (e) => {
      setIsDrawing(true);
      const x = e.clientX - canvas.offsetLeft;
      const y = e.clientY - canvas.offsetTop;
      context.beginPath();
      context.moveTo(x, y);
    };

    const draw = (e) => {
      if (!isDrawing) return;
      const x = e.clientX - canvas.offsetLeft;
      const y = e.clientY - canvas.offsetTop;
      context.lineTo(x, y);
      context.stroke();
    };

    const stopDrawing = () => {
      setIsDrawing(false);
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
    };
  }, [isDrawing]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const image = new Image();
    image.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
    image.src = pdfUrl;
    setPdfImage(image);
  }, [pdfUrl]);

  return (
    <div>
      {pdfImage && (
        <canvas
          ref={canvasRef}
          width={pdfImage.width}
          height={pdfImage.height}
          style={{ border: '1px solid black' }}
        />
      )}
    </div>
  );
};

export default PdfCanvas;
