
import { Canvas } from "@react-three/fiber";
import { useContext } from "react";
import AppContext from "../../Contexts/AppContext";
import { GetOrbitStateVectors } from "../../Orbits/Orbit";
import { MEDIUM_DARK_BLUE } from "../../styles/Colours";

import Controls from './OrbitControls';

const SCALING_FACTOR = 10_000_000;

/**
 * The central 3d visualisation of the orbital system
 * @see https://dev.to/hnicolus/how-to-use-threejs-in-react-nextjs-4120
 */

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

            const { position, velocity } = GetOrbitStateVectors(
              centralMass.mass,
              orbit,
              time
            )

            console.log({
              n: orbit.name,
              position,
              velocity
            })

            const p = position.map(x => x/10_000_000)

            return (
              <>
                <mesh key={i} position={[ p[0], p[2], p[1] ]} receiveShadow={true}>

                  <boxBufferGeometry args={[1,1,1]} />
                  <meshPhysicalMaterial color='brown' />

                </mesh>

                {
                  Array.from(Array(360)).map((_, point) => {

                    const { position: pointPosition } = GetOrbitStateVectors(
                      centralMass.mass,
                      {
                        ...orbit,
                        meanAnomaly: point
                      },
                      0
                    )

                    const pp = pointPosition.map(x => x/10_000_000)

                    return (
                      <mesh key={`${i}_${point}`} position={[ pp[0], pp[2], pp[1] ]} receiveShadow={true}>

                        <boxBufferGeometry args={[0.1,0.1,0.1]} />
                        <meshPhysicalMaterial color='white' />

                      </mesh>
                    )
                  })
                }

              </>
            )
          })
        }

      </Canvas>
    </div>
  )
}

export default OrbitVisualisation