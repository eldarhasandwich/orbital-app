
import { Canvas } from "@react-three/fiber";
import { useContext } from "react";
import AppContext from "../../Contexts/AppContext";
import { GetOrbitStateVectors } from "../../Orbits/Orbit";
import { MEDIUM_DARK_BLUE } from "../../styles/Colours";

import Controls from './OrbitControls';

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
              <mesh key={i} position={[ p[0], p[2], p[1] ]} receiveShadow={true}>

                <boxBufferGeometry args={[1,1,1]} />
                <meshPhysicalMaterial color='brown' />

              </mesh>
            )
          })
        }

      </Canvas>
    </div>
  )
}

export default OrbitVisualisation