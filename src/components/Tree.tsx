import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { useEffect, useState } from "react";

type treeType ={
  position:{x:number; z:number};
  box:number;
}

type props={
  boundary:number;
  count:number;
}

  const Tree: React.FC<props> = ({boundary,count}) => {
 const model= useLoader(GLTFLoader,"/modals/tree.glb");
 const [trees, setTrees] = useState<treeType[]>([]);
 const baseObject = model.scene.clone();
 
 const updatePosition = (treeArray:treeType[], boundary:number)=>{
  treeArray.forEach((tree,index)=>{
    tree.position.x=Math.random()*100;
    tree.position.z=Math.random()*100;
  });
  setTrees(treeArray);
 }

 useEffect(()=>{
 const tempTrees:treeType[]=[];
 for(let i=0;i<count;i++){
  tempTrees.push({position:{x:0,z:0}, box:2});
 }
 console.log(tempTrees);
 updatePosition(tempTrees, boundary);
 },[boundary,count]);

  return(
    <group>
    {trees.map((tree,index)=>{
    return(
      
      <object3D key={index} position={[tree.position.x, 0, tree.position.z]}>
    
    <primitive object={baseObject.clone()}  scale={[0.3,0.3,0.3]} />
    </object3D> 
    );
  })}
    </group>
  )
  }

  export default Tree;
