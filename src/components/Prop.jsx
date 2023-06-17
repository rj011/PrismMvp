import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

export default function Box()
{
   const meshref = useRef();

    useFrame(() =>
    {
      if(!meshref.current)
      {
        return;
      }
        meshref.current.rotation.x += 0.05;
        meshref.current.rotation.y += 0.05;

    });

  return(
    <mesh ref={meshref}>
      <boxBufferGeometry args={[1,1,1]} />
      <meshStandardMaterial color='white'/>
    </mesh>

  )
}