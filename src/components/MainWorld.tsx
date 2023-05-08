import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky, useTexture, Environment} from "@react-three/drei";
import Plot from "./Plot";
import { useState } from "react";
import InfoBox from "./InfoBox";
import OwnerBox from "./OwnerBox";
import House from "./House";
import Tree from "./Tree";

import { NearestFilter, RepeatWrapping } from "three";
import { ethers } from "ethers";
let data = require("../../alksc.json");


const MyPlane = () => {
  const map = useTexture("/textures/glass.png");
  
  map.magFilter = NearestFilter;
  map.wrapS = map.wrapT= RepeatWrapping;
  map.wrapT = RepeatWrapping;
  map.repeat.set(100,100);
  
  
  // const displacementMap = useTexture("/textures/ground/cobblestone_large_01_disp_2k.png");
  // const normalMap = useTexture("/textures/ground/cobblestone_large_01_nor_gl_2k.png");
  // const roughnessMap = useTexture("/textures/ground/cobblestone_large_01_rough_2k.png");

  return (
    <>
    <mesh rotation-x={Math.PI * -0.5}>
    <planeBufferGeometry args={[57, 57]} />
    <meshStandardMaterial attach='material' color="#8A9A5B" map={map}/>
  </mesh>
  </>
  
    );
}


export default function MainWorld(props) {
  const [landId, setLandId] = useState("");
  const [status, setStatus] = useState("");
  const [landName, setLandName] = useState("");
  const [landPrice, setLandPrice] = useState("");
  const [owner, setOwner] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [infobox, setInfobox] = useState(false);
  const [currBid, setCurrBid] = useState([]);
  const [currBidAmt, setCurrBidAmt] = useState("");
  const [account,setAccount]= useState("");
  

  const connectHandler=async()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]) ;
    console.log(account);
  }
  

  return (
    <>
    <div id="navbar" className="nes-container">
      <div className="containerr">
      <p className="logo-head">PiXeL-PLotS</p>
      <button 
      onClick={connectHandler}
      type="button" id="connect" className="nes-btn is-success">Wallet Address:<b>{account.slice(0,5)+'...'+account.slice(38,42)}</b> </button>
      <button onClick={props.logout} id="account" type="button" className="nes-btn is-error">Sign Out</button>
      <div className="signer">Signed In As:{props.signedInAs}</div>
      </div>
      </div>
    
    <div className="container">
      <Canvas className="canvas">
        {/* <Sky  
          sunPosition={[0, 100, 10]}
        /> */}
        <ambientLight intensity={0.5} />
      <directionalLight position={[1,1,0]}/>
      <MyPlane/>
      
      
      <Tree boundary={10} count={30} />
 

        
        {data.map(
          (box: {
            id: string;
            name: string;
            position: [number, number, number];
            dimension: [number, number, number];
            price: string;
            house:[number, number, number];
            houseposition:[number, number, number]
          }) => {
            return (
              <>
              <Plot
                key={box.id+33}
                uid={box.id}
                name={box.name}
                position={box.position}
                dimensions={box.dimension}
                price={box.price}
                setLandId={setLandId}
                setStatus={setStatus}
                setLandName={setLandName}
                setLandPrice={setLandPrice}
                setInfobox={setInfobox}
                setOwner={setOwner}
                setIsOwner={setIsOwner}
                setCurrBid={setCurrBid}
                setCurrBidAmt={setCurrBidAmt}
                cancel={false}
              />
              {<House 
                key={box.id}
                house={box.house}
                houseposition={box.houseposition}  
                />} 
                
              </>
            );
          }
        )}

        <OrbitControls
          minDistance={0}
          maxDistance={50}
          minPolarAngle={Math.PI * -0.4}
          maxPolarAngle={Math.PI * 0.4}
        />
      </Canvas>

      {infobox && !isOwner && (
        <InfoBox
          id={landId}
          name={landName}
          price={landPrice}
          status={status}
          setInfobox={setInfobox}
          currBidAmt={currBidAmt}
          cancel={false}
        />
      )}
      {infobox && isOwner && (
        <OwnerBox
          id={landId}
          name={landName}
          price={landPrice}
          status={status}
          currBidAmt={currBidAmt}
          setInfobox={setInfobox}
        />
      )}
    </div>
    </>
  );
}
