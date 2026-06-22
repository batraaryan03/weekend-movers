/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.Mesh;
  };
  materials: {};
};

export function TruckModel(props: React.JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/truck-special-model.glb"
  ) as unknown as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_0.geometry}
        material={nodes.mesh_0.material}
      />
    </group>
  );
}

useGLTF.preload("/truck-special-model.glb");
