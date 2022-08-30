
import { Canvas } from "@react-three/fiber";
import { MEDIUM_DARK_BLUE } from "../../styles/Colours";

import Controls from './OrbitControls';

const OrbitVisualisation = () => {

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

        <mesh recieveShadow={true}>
          <boxBufferGeometry args={[1,1,1]} />
          <meshPhysicalMaterial color='yellow' />
        </mesh>

      </Canvas>
    </div>
  )
}

export default OrbitVisualisation