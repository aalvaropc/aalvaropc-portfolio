import React, { useEffect, useRef } from 'react';
import { Box, Center } from '@chakra-ui/react';

const PureFractalTree = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let frameCount = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Posicionar en la base del canvas
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height - 20);
      
      // Ángulos más sutiles para elegancia
      const baseAngle = Math.sin(frameCount * 0.005) * 0.1 + Math.PI / 6; // Menos movimiento, ángulo más cerrado
      const windEffect = Math.sin(frameCount * 0.002) * 0.05; // Viento muy sutil
      
      // Función recursiva mejorada para dibujar ramas
      const drawBranch = (length, depth, thickness) => {
        if (depth === 0 || length < 3) {
          // Sin hojas, solo las ramas elegantes
          return;
        }
        
        // Configurar grosor de línea basado en la profundidad
        ctx.lineWidth = Math.max(0.5, thickness);
        
        // Color dorado/marrón elegante que varía con la profundidad
        const hue = 35 + Math.sin(frameCount * 0.005 + depth) * 5; // Entre 30-40 (dorado/marrón)
        const saturation = 60 + depth * 2; // Más saturado
        const lightness = 40 + depth * 4; // Varía de oscuro a claro
        ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        
        // Añadir ligera curvatura natural
        const curve = Math.sin(frameCount * 0.005 + depth) * 0.02;
        
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Dibujar la rama con curvatura
        ctx.beginPath();
        ctx.moveTo(0, 0);
        
        const segments = Math.max(3, Math.floor(length / 8));
        for (let i = 1; i <= segments; i++) {
          const t = i / segments;
          const x = Math.sin(curve * length * t) * (t * 2);
          const y = -length * t;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
        
        // Mover al final de la rama
        ctx.translate(Math.sin(curve * length) * 2, -length);
        
        // Crear dos ramas simétricas como en la imagen de referencia
        const numBranches = 2;
        const angleVariation = baseAngle + windEffect * 0.9; // Menos movimiento para más elegancia
        
        for (let i = 0; i < numBranches; i++) {
          ctx.save();
          
          // Ángulos simétricos para ramas izquierda y derecha
          const branchAngle = i === 0 ? -angleVariation : angleVariation;
          
          ctx.rotate(branchAngle);
          
          // Escalado consistente y elegante
          const scaleReduction = 0.80; // Más consistente
          const newLength = length * scaleReduction;
          const newThickness = thickness * 0.8;
          
          drawBranch(newLength, depth - 1, newThickness);
          ctx.restore();
        }
      };
      
      // Dibujar el árbol elegante y minimalista
      drawBranch(85, 9, 4); // Más alto, profundidad media, líneas más finas
      
      ctx.restore();
      
      frameCount++;
      animationRef.current = requestAnimationFrame(animate);
    };

    // Iniciar animación
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <Center height="50vh">
      <Box position="relative">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          style={{
            background: 'transparent',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        />
      </Box>
    </Center>
  );
};

export default PureFractalTree;