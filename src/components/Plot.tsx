import { useTexture, Wireframe } from "@react-three/drei";
import { ethers } from "ethers";
import { useState } from "react";
import {
  getOwnerDetails,
  getStatus,
  getPrice,
  getBidDetails,
} from "../components/ethersHelper";
import THREE, { NearestFilter, RepeatWrapping } from "three";

type Props = {
  uid: string;
  name: string;
  position: [number, number, number];
  dimensions: [number, number, number];
  price: string;
  setLandId: (val: string) => void;
  setStatus: (val: string) => void;
  setLandName: (val: string) => void;
  setLandPrice: (val: string) => void;
  setOwner: (val: string) => void;
  setIsOwner: (val: boolean) => void;
  setInfobox: (val: boolean) => void;
  setCurrBid: (val: []) => void;
  setCurrBidAmt: (val: string) => void;
  cancel:boolean;
};



const Plot: React.FC<Props> = (props) => {

  const [clicked, setClicked] = useState(props.cancel);
  const onClickHandler = async () => {
    
    // setClicked(!clicked);
    
    props.setInfobox(true);
    props.setLandId(props.uid);
    props.setLandName(props.name);
    props.setLandPrice(props.price);
    let details = await getOwnerDetails(props.uid);
    if (details[1] == true) {
      props.setIsOwner(true);
    } else props.setIsOwner(false);
    props.setOwner(details[0]);
    console.log(details[0]);
    console.log(details[1]);
    let status = await getStatus(props.uid);
    status = status.toString();
    console.log(status);
    props.setStatus(status);
    let price;
    await getPrice(props.uid)
      .then((k) => {
        price = k;
        // console.log(k);
      })
      .catch((error) => {
        console.log("errorrrr");
        console.error(error);
      });
    if (price != 0) {
      price = price.toString();
      // price = ethers.utils.parseUnits(price, "ether");
      props.setLandPrice(price);
    }
    let bidDetails;
    await getBidDetails(props.uid).then((k) => {
      bidDetails = k;
      // console.log(k);
    });
    const bidd=bidDetails[1].toString().slice(0,1);
    props.setCurrBidAmt(bidd);
  };

  const map = useTexture("/textures/grass.jpg");
  
  map.magFilter = NearestFilter;
  map.wrapS = map.wrapT= RepeatWrapping;
  map.wrapT = RepeatWrapping;
  map.repeat.set(7,7); 

  return (
    <>
    
      <mesh
        position={props.position}
        onClick={onClickHandler}
        onPointerEnter={()=>{setClicked(true)}}
        onPointerLeave={()=>{ setClicked(false)}}
        scale={props.dimensions}
      >
        <boxBufferGeometry/>
        <meshStandardMaterial color="lightgreen"  map={map}/>
        {
          clicked ? <Wireframe stroke={"white"} simplify={true} thickness={0.1} />:<Wireframe stroke={"darkgreen"} simplify={true} thickness={0.1} />
        }
        
      </mesh>
      
    </>
  );
};

export default Plot;
