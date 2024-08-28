'use client'

import { Float, Line, Sphere, Stars, Trail } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import * as THREE from 'three'

import { LoaderStar } from './loader/loader'

export interface IThreeReactEllipse {
  height: string
}

export default function ThreeReactEllipse({ height }: IThreeReactEllipse) {
  const [loading, setLoading] = useState(true)
  const [saturation, setSaturation] = useState(500)
  const [rotation, setRotation] = useState(1)

  useEffect(() => {
    setLoading(false)
  }, [])

  const modelRef = useRef<HTMLDivElement>(null)

  // const starRef = useRef(null)
  // useEffect(() => {
  //   if (!starRef.current || !modelRef.current) return
  //   const ctx = gsap.context(() => {
  //     gsap.registerPlugin(ScrollTrigger) 
  //     gsap.to(starRef.current, {
  //       scrollTrigger: {
  //         trigger: modelRef.current,
  //         start: 'top top',
  //         end: 'bottom bottom',
  //         scrub: true,
  //         pin: true
  //       },
  //       scale: 10
  //     });
  //   },modelRef)
  // },[starRef.current, modelRef.current])

  useEffect(() => {
    const handleScroll = () => {
      if (modelRef.current) {
        const rect = modelRef.current.getBoundingClientRect()
        const start = rect.top
        const end = rect.bottom
        if (window.scrollY >= start && window.scrollY < end) {
            setSaturation(value => value - 20 )
            setRotation(value => value + 0.5)
        }
      }
    }

    // Добавление обработчика события
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [modelRef])

  useEffect(() => {
    if(saturation == -80) {
      setSaturation(500)
    }
  }, [saturation])

  useEffect(() => {
    if(rotation == 50) {
      setRotation(1)
    }
  }, [rotation])

  if (loading) {
    return <LoaderStar height={height} />
  }
  return (
    <div
      style={{ height: height }}
      className='model'
      ref={modelRef}
    >
      <Canvas camera={{ position: [10, 0, 10] }}>
        <color
          attach='background'
          args={['black']}
        />
        <Float
          speed={2}
          rotationIntensity={rotation}
          floatIntensity={1}
        >
          <Atom />
        </Float>
        <Stars
          depth={saturation}
          saturation={1}
          count={500}
          speed={0.5}
        />
        <EffectComposer>
          <Bloom
            mipmapBlur
            luminanceThreshold={1}
            radius={0.7}
          />
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
      <Line
        worldUnits
        points={points}
        color='turquoise'
        lineWidth={0.3}
      />
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
      <Electron
        position={[0, 0, 0.5]}
        speed={6}
      />
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
        <meshBasicMaterial
          color={[6, 0.5, 2]}
          toneMapped={false}
        />
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
          <meshBasicMaterial
            color={[10, 1, 10]}
            toneMapped={false}
          />
        </mesh>
      </Trail>
    </group>
  )
}
