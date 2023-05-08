import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";


type Props = {
    house:[number, number, number];
    houseposition:[number, number, number];
  };

  const House: React.FC<Props> = (props) => {
 const model= useLoader(GLTFLoader,"/modals/smallhouse.glb");
 const baseObject = model.scene.clone();
 
  return(
    <primitive castShadow object={baseObject.clone()} position={props.houseposition} scale={props.house} />
  )
  }

  export default House;
