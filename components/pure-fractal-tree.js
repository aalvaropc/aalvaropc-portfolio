import React, { useEffect, useRef } from 'react'
import { Box, Center } from '@chakra-ui/react'

const PureFractalTree = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let frameCount = 0
    let isRunning = true

    const animate = () => {
      if (!isRunning) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.save()
      ctx.translate(canvas.width / 2, canvas.height - 20)

      const baseAngle = Math.sin(frameCount * 0.005) * 0.1 + Math.PI / 6
      const windEffect = Math.sin(frameCount * 0.002) * 0.05

      const drawBranch = (length, depth, thickness) => {
        if (depth === 0 || length < 3) {
          return
        }

        ctx.lineWidth = Math.max(0.5, thickness)

        const hue = 35 + Math.sin(frameCount * 0.005 + depth) * 5
        const saturation = 60 + depth * 2
        const lightness = 40 + depth * 4
        ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`

        const curve = Math.sin(frameCount * 0.005 + depth) * 0.02

        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        ctx.beginPath()
        ctx.moveTo(0, 0)

        const segments = Math.max(3, Math.floor(length / 8))
        for (let i = 1; i <= segments; i++) {
          const t = i / segments
          const x = Math.sin(curve * length * t) * (t * 2)
          const y = -length * t
          ctx.lineTo(x, y)
        }
        ctx.stroke()

        ctx.translate(Math.sin(curve * length) * 2, -length)

        const numBranches = 2
        const angleVariation = baseAngle + windEffect * 0.9

        for (let i = 0; i < numBranches; i++) {
          ctx.save()

          const branchAngle = i === 0 ? -angleVariation : angleVariation

          ctx.rotate(branchAngle)

          const scaleReduction = 0.8
          const newLength = length * scaleReduction
          const newThickness = thickness * 0.8

          drawBranch(newLength, depth - 1, newThickness)
          ctx.restore()
        }
      }

      drawBranch(85, 9, 4)

      ctx.restore()

      frameCount++
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      isRunning = false
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <Center height="44vh">
      <Box position="relative">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          style={{
            background: 'transparent',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={e => {
            e.target.style.transform = 'scale(1.05)'
          }}
          onMouseLeave={e => {
            e.target.style.transform = 'scale(1)'
          }}
        />
      </Box>
    </Center>
  )
}

PureFractalTree.displayName = 'PureFractalTree'

export default React.memo(PureFractalTree)
