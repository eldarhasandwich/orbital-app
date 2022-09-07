import { message } from 'antd'
import { Canvas, ThreeEvent } from "@react-three/fiber";
import { useContext, useRef, useLayoutEffect } from "react";
import * as THREE from 'three'

import AppContext, { AppContextType } from "../../Contexts/AppContext";
import { GetOrbitStateVectors, Orbit } from "../../Orbits/Orbit";
import { MEDIUM_DARK_BLUE } from "../../styles/Colours";

import Controls from './OrbitControls';

// divide position vectors by this number
const SCALING_FACTOR = 10_000_000;

const GetOrbitOutlinePositionSet = (orbit: Orbit): THREE.Vector3[] => {
  const pointSet = Array.from(Array(360)).map((_, point) => {

    const { position } = GetOrbitStateVectors(
      1,
      { ...orbit, meanAnomaly: point },
      0
    )

    const scaledPosition = position.map(x => x / SCALING_FACTOR)
    return new THREE.Vector3(scaledPosition[0], scaledPosition[2], scaledPosition[1])
  })

  pointSet.push(pointSet[0])
  return pointSet
}

type ThreeJsLineElementType = SVGLineElement & { geometry: { setFromPoints: (x: THREE.Vector3[]) => void } }

const OrbitLine = (props: { id: string, orbit: Orbit, appContext: AppContextType }) => {

  const { id, orbit, appContext } = props;
  const { selectedOrbitA, selectedOrbitB } = appContext;

  const outlinePoints = GetOrbitOutlinePositionSet(orbit)

  const ref = useRef<ThreeJsLineElementType>()
  useLayoutEffect(() => {
    if (!ref.current) return;

    ref.current.geometry.setFromPoints(outlinePoints);
  }, [outlinePoints])

  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color={selectedOrbitA === id || selectedOrbitB === id ? 'hotpink' : 'white'} linewidth={20} />
    </line>
  )
}

const PlanetOrbit = (props: { id: string, orbit: Orbit, appContext: AppContextType }) => {

  const { id, orbit, appContext } = props;
  const { 
    centralMass,
    time,
    selectOrbitInteraction,
    selectedOrbitA,
    selectedOrbitB
  } = appContext

  const { position } = GetOrbitStateVectors(
    centralMass.mass,
    orbit,
    time
  )

  const p = position.map(x => x / SCALING_FACTOR)

  const handleClick = (args: ThreeEvent<PointerEvent>) => {

    const isLeftClick = args['button'] === 0;
    const isRightClick = args['button'] === 2;

    if (isLeftClick) {
      selectOrbitInteraction(id, 'left')
    }

    if (isRightClick) {
      selectOrbitInteraction(id, 'right')
    }

  }

  return (
    <group>
      <mesh
        position={[p[0], p[2], p[1]]}
        receiveShadow={true}
        onPointerUp={handleClick}
      >

        <sphereGeometry attach="geometry" args={[1, 16, 16]} />
        <meshPhysicalMaterial color={selectedOrbitA === id || selectedOrbitB === id ? 'orange' : 'brown'} />

      </mesh>

      <OrbitLine
        id={id}
        orbit={orbit}
        appContext={appContext}
      />

    </group>
  )
}

/**
 * The central 3d visualisation of the orbital system
 * @see https://dev.to/hnicolus/how-to-use-threejs-in-react-nextjs-4120
 */

const OrbitVisualisation = () => {

  const appContext = useContext(AppContext)
  const { orbitList } = appContext;

  return (
    <div style={{
      width: '100%',
      height: '100%'
    }}>
      <Canvas
        shadows={true}
        style={{
          background: MEDIUM_DARK_BLUE
        }}
        camera={{
          position: [-6, 7, 7],
        }}
      >

        <Controls />
        <ambientLight color={"white"} intensity={0.5} />

        <mesh receiveShadow={true}>
          <sphereGeometry attach="geometry" args={[1, 16, 16]} />
          <meshPhysicalMaterial
            attach="material"
            color="yellow"
            transparent
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>

        {
          orbitList.map(o => {
            return (
              <PlanetOrbit
                key={o.orbit.name} 
                id={o.id} 
                orbit={o.orbit}
                appContext={appContext}
              />
            )
          })
        }

      </Canvas>
    </div>
  )
}

export default OrbitVisualisation