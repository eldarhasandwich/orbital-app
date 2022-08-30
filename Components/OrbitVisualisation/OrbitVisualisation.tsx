
import { Canvas } from "@react-three/fiber";
import { useContext } from "react";
import AppContext from "../../Contexts/AppContext";
import { GetPositionOfBody } from "../../Orbits/Orbit";
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

            const position = GetPositionOfBody(
              centralMass.mass,
              orbit,
              time
            )

            console.log({
              n: orbit.name,
              position
            })

            return (
              <mesh position={[0, 0, (i*2) + 2]} receiveShadow={true}>

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