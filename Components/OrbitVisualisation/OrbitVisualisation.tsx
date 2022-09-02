
import { Canvas } from "@react-three/fiber";
import { useContext, useState } from "react";
import * as THREE from 'three'
import AppContext from "../../Contexts/AppContext";
import { GetOrbitStateVectors, Orbit } from "../../Orbits/Orbit";
import { MEDIUM_DARK_BLUE } from "../../styles/Colours";

import Controls from './OrbitControls';

const SCALING_FACTOR = 10_000_000;

/**
 * The central 3d visualisation of the orbital system
 * @see https://dev.to/hnicolus/how-to-use-threejs-in-react-nextjs-4120
 */

const GetOrbitOutlinePositionSet = (orbit: Orbit): THREE.Vector3[] => {
  const pointSet = Array.from(Array(360)).map((_, point) => {

    const { position } = GetOrbitStateVectors(
      1,
      {
        ...orbit,
        meanAnomaly: point
      },
      0
    )

    const scaledPosition = position.map(x => x / SCALING_FACTOR)

    return new THREE.Vector3( scaledPosition[0], scaledPosition[2], scaledPosition[1] )
  })

  pointSet.push(pointSet[0])

  return pointSet
}

const OrbitLine = (props: { orbit: Orbit }) => {
  
  const { orbit } = props;

  const outlinePoints = GetOrbitOutlinePositionSet(orbit)
  
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(outlinePoints)

  return (
    <line geometry={lineGeometry}>
      <bufferGeometry />
      <lineBasicMaterial color="white" linewidth={20}/>
    </line>
  )

}

const OrbitVisualisation = () => {

  const { centralMass, orbitList, time } = useContext(AppContext)

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
        <Controls/>

        <ambientLight color={"white"} intensity={0.3} />

        <mesh receiveShadow={true}>
          <boxBufferGeometry args={[1,1,1]} />
          <meshPhysicalMaterial color='yellow' />
        </mesh>

        {
          orbitList.map((o, i) => {
            const { orbit } = o;

            const { position } = GetOrbitStateVectors(
              centralMass.mass,
              orbit,
              time
            )            

            const p = position.map(x => x / SCALING_FACTOR)

            return (
              <>
                <mesh key={i} position={[ p[0], p[2], p[1] ]} receiveShadow={true}>

                  <boxBufferGeometry args={[1,1,1]} />
                  <meshPhysicalMaterial color='brown' />

                </mesh>

                <OrbitLine
                  orbit={orbit}
                />

              </>
            )
          })
        }

      </Canvas>
    </div>
  )
}

export default OrbitVisualisation