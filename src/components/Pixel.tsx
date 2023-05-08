import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky, useTexture, Environment} from "@react-three/drei";


  const Pixel = () => {
 const model= useLoader(GLTFLoader,"/modals/pixel.glb");

 
  return(
    <div>
      <Canvas><primitive castShadow object={model.scene}  />
      <ambientLight intensity={0.5} />
      <directionalLight position={[1,1,0]}/>
      <OrbitControls
          minDistance={0}
          maxDistance={50}
          minPolarAngle={Math.PI * -0.4}
          maxPolarAngle={Math.PI * 0.4}
        />
      
      </Canvas>
      </div>
  )
  }

  export default Pixel;