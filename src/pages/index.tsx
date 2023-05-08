import MainWorld from "../components/MainWorld";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky, useTexture, Environment} from "@react-three/drei";
import Pixel from "../components/Pixel";


export default function Home(props) {
  // const model= useLoader(GLTFLoader,"./modals/pixel.glb");
  return (
    <div>
      {props.user ? (
        <>
          <MainWorld signedInAs={props.user.email} logout={props.signOut} />
        </>
      ) : (<>
      <div id="signin" className="nes-container">
        
        <div>
        <i  id="cartoon" className="nes-kirby"></i>
          <p id="heading">Welcome to PiXeL PLotS</p><br />
        
        <div className="nes-field">
          <b><label >Username</label></b>
          <input
          type="text"  className="nes-input"
          ></input><br />
          </div>
          <div className="nes-field">
          <b><label >Password</label></b>
          <input
          type="text"  className="nes-input"
          ></input><br />
          </div>
          <button id="boxx" className="nes-btn is-success" >Log In</button> <br /><br />
          <button id="boxx2" className="nes-btn is-primary" onClick={props.signIn}>Sign In</button>
        </div>
        </div>
      
      
        
        </>
      )}
    </div>
  );
}