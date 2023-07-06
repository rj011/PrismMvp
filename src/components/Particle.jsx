import React from 'react'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
function Particle() {
    const pointref = useRef();
    useFrame(() =>
    {
      if(!pointref.current)
      {
        return;
      }
        pointref.current.rotation.y += 0.002;
        

    });
  return (
    <points ref={pointref}>
        <sphereGeometry args={[3,60,60]} />
        <pointsMaterial size={0.015} sizeAttenuation />
    </points>
  )
}

export default Particle