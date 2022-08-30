
import { Canvas } from "@react-three/fiber";

const OrbitVisualisation = () => {

  return (
    <div style={{
      width: '100%',
      height: '100%'
    }}>
      <Canvas
        shadows={true}
        style={{
          background: '#ffffffff'
        }}
        camera={{
          position: [-6, 7, 7],
        }}
      >

      </Canvas>
    </div>
  )
}

export default OrbitVisualisation