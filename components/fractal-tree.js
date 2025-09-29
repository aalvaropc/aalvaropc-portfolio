

import React, { useEffect, useRef, useState } from 'react';
import { Box, Center, Text } from '@chakra-ui/react';

const FractalTree = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let p5Instance = null;
    
    const loadP5 = async () => {
      try {
        // Deshabilitar la verificación de errores amigables de p5.js
        if (typeof window !== 'undefined') {
          window.p5disableFriendlyErrors = true;
        }
        
        // Cargar p5.js dinámicamente
        const p5 = (await import('p5')).default;
        
        const sketch = (p) => {
          let angle;

          p.disableFriendlyErrors = true; // Deshabilitar errores amigables
          
          p.setup = () => {
            try {
              const canvas = p.createCanvas(400, 300);
              if (canvasRef.current) {
                canvas.parent(canvasRef.current);
              }
              angle = p.PI / 4;
              p.stroke(171, 146, 94);
              p.strokeWeight(2);
              setIsLoaded(true);
            } catch (error) {
              console.error('Error in p5 setup:', error);
              drawFallbackTree();
            }
          };

          p.draw = () => {
            try {
              p.clear();
              p.translate(200, p.height);
              angle = p.map(p.sin(p.frameCount * 0.01), -1, 1, p.PI / 2, p.PI / 16);
              
              const branch = (len) => {
                p.line(0, 0, 0, -len);
                p.translate(0, -len);
                if (len > 4) {
                  p.push();
                  p.rotate(angle);
                  branch(len * 0.67);
                  p.pop();
                  p.push();
                  p.rotate(-angle);
                  branch(len * 0.67);
                  p.pop();
                }
              };
              
              branch(100);
            } catch (error) {
              console.error('Error in p5 draw:', error);
            }
          };

          p.windowResized = () => {
            try {
              p.resizeCanvas(400, 300);
            } catch (error) {
              console.error('Error in p5 resize:', error);
            }
          };
        };

        p5Instance = new p5(sketch);
      } catch (error) {
        console.error('Error loading p5.js:', error);
        // Fallback: usar canvas nativo
        drawFallbackTree();
      }
    };

    const drawFallbackTree = () => {
      setIsLoaded(true);
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 300;
      canvas.style.borderRadius = '12px';
      canvas.style.background = 'transparent';
      
      if (canvasRef.current) {
        // Limpiar el contenedor de forma segura
        while (canvasRef.current.firstChild) {
          canvasRef.current.removeChild(canvasRef.current.firstChild);
        }
        canvasRef.current.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        let angle = 0;

        const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.strokeStyle = '#AB926A';
          ctx.lineWidth = 2;
          
          ctx.save();
          ctx.translate(canvas.width / 2, canvas.height);
          
          const currentAngle = Math.sin(angle) * 0.3 + Math.PI / 6;
          
          const branch = (len, depth) => {
            if (depth === 0) return;
            
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -len);
            ctx.stroke();
            
            ctx.translate(0, -len);
            
            if (len > 4) {
              ctx.save();
              ctx.rotate(currentAngle);
              branch(len * 0.67, depth - 1);
              ctx.restore();
              
              ctx.save();
              ctx.rotate(-currentAngle);
              branch(len * 0.67, depth - 1);
              ctx.restore();
            }
          };
          
          branch(80, 8);
          ctx.restore();
          
          angle += 0.01;
          
          if (canvasRef.current && canvasRef.current.contains(canvas)) {
            animationRef.current = requestAnimationFrame(animate);
          }
        };

        animate();
      }
    };

    // Solo cargar p5 si estamos en el browser
    if (typeof window !== 'undefined') {
      loadP5();
    } else {
      setIsLoaded(true);
    }

    return () => {
      if (p5Instance) {
        try {
          p5Instance.remove();
        } catch (error) {
          console.error('Error removing p5 instance:', error);
        }
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <Center height="45vh">
      <Box position="relative">
        <Box
          ref={canvasRef}
          width={400}
          height={300}
          borderRadius="lg"
          overflow="hidden"
          css={{
            '& canvas': {
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.01)',
              }
            }
          }}
        />
        <Text
          position="absolute"
          bottom="-8"
          left="50%"
          transform="translateX(-50%)"
          fontSize="sm"
          color="gray.500"
          textAlign="center"
          opacity={isLoaded ? 1 : 0}
          transition="opacity 0.3s ease"
        >
          Árbol Fractal Animado
        </Text>
      </Box>
    </Center>
  );
};

export default FractalTree;