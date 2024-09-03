'use client'

import { Float, Line, Sphere, Stars, Trail } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

import { LoaderStar } from './loader/loader'
import { useAnimReactEllipse } from '@/hooks/useAnimReactEllipse'

export interface IThreeReactEllipse {
  height: string
}

export default function ThreeReactEllipse({ height }: IThreeReactEllipse) {
  const [loading, setLoading] = useState(true)
  const [saturation, setSaturation] = useState(500)
  const [rotation, setRotation] = useState(1)

  const modelRef = useRef<HTMLDivElement>(null)
  useAnimReactEllipse({modelRef, saturation, setSaturation, setRotation, rotation})
  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return <LoaderStar height={height} />
  }

  return (
    <div style={{ height: height }} className='model' ref={modelRef}>
      <Canvas camera={{ position: [10, 0, 10] }}>
        <color attach='background' args={['black']} />
        <Float speed={2} rotationIntensity={rotation} floatIntensity={1}>
          <Atom />
        </Float>
        <Stars depth={saturation} saturation={1} count={500} speed={0.5} />
        <EffectComposer>
          <Bloom mipmapBlur luminanceThreshold={1} radius={0.7} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

function Atom() {
  const points = useMemo(
    () =>
      new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(
        100
      ),
    []
  )

  return (
    <group>
      <Line worldUnits points={points} color='turquoise' lineWidth={0.3} />
      <Line
        worldUnits
        points={points}
        color='turquoise'
        lineWidth={0.3}
        rotation={[0, 0, 1]}
      />
      <Line
        worldUnits
        points={points}
        color='turquoise'
        lineWidth={0.3}
        rotation={[0, 0, -1]}
      />
      <Electron position={[0, 0, 0.5]} speed={6} />
      <Electron
        position={[0, 0, 0.5]}
        rotation={[0, 0, Math.PI / 3]}
        speed={6.5}
      />
      <Electron
        position={[0, 0, 0.5]}
        rotation={[0, 0, -Math.PI / 3]}
        speed={7}
      />
      <Sphere args={[0.55, 64, 64]}>
        <meshBasicMaterial color={[6, 0.5, 2]} toneMapped={false} />
      </Sphere>
    </group>
  )
}

function Electron({ radius = 2.75, speed = 6, ...props }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(state => {
    const t = state.clock.getElapsedTime() * speed
    if (ref.current) {
      ref.current.position.set(
        Math.sin(t) * radius,
        (Math.cos(t) * radius * Math.atan(t)) / Math.PI / 1.25,
        0
      )
    }
  })
  return (
    <group {...props}>
      <Trail
        local
        width={5}
        length={6}
        color={new THREE.Color(2, 1, 10)}
        attenuation={t => t * t}
      >
        <mesh ref={ref}>
          <sphereGeometry args={[0.25]} />
          <meshBasicMaterial color={[10, 1, 10]} toneMapped={false} />
        </mesh>
      </Trail>
    </group>
  )
}
