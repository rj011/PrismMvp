import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

export default function Atom()
{
   const meshref = useRef();

    useFrame(() =>
    {
      if(!meshref.current)
      {
        return;
      }
        meshref.current.rotation.x += 0.01;
        meshref.current.rotation.y += 0.01;

    });

  return(
    <mesh ref={meshref}>
       <octahedronBufferGeometry args={[3.0,1]}/>
      <meshStandardMaterial color='purple' wireframe/>
    </mesh>

  )
}