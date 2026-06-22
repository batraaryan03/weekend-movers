/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useContext, createContext } from "react";
import { useGLTF, Merged } from "@react-three/drei";

// Loosely typed GLB result for gltfjsx pattern
type AnyNodes = Record<string, any>;
type AnyMaterials = Record<string, any>;

// Context for merged mesh instances
const InstancesContext = createContext<any>(null);

// Merged instances for wheel parts (reused across multiple wheel positions)
export function TruckInstances({ children, ...props }: any) {
  const { nodes } = useGLTF("/truck.glb") as { nodes: AnyNodes; materials: AnyMaterials };

  const instances = useMemo(
    () => ({
      Plane5: nodes.Plane068,
      Plane6: nodes.Plane068_1,
      WheelFtL: nodes.WheelFtL,
      Plane7: nodes.Plane069,
      Plane8: nodes.Plane069_1,
    }),
    [nodes]
  );

  return (
    <Merged meshes={instances} {...props}>
      {(mergedInstances: any) => (
        <InstancesContext.Provider value={mergedInstances}>
          {children}
        </InstancesContext.Provider>
      )}
    </Merged>
  );
}

// Full truck model with per-object control
export function TruckModel(props: any) {
  const instances = useContext(InstancesContext);
  const { nodes, materials } = useGLTF("/truck.glb") as { nodes: AnyNodes; materials: AnyMaterials };

  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        {/* ── CARGO BOX ── */}
        <mesh
          name="CargoBox"
          castShadow
          receiveShadow
          geometry={nodes.CargoBox.geometry}
          material={materials.CargoWhite}
          position={[-0.006, -0.9, 7.851]}
          rotation={[Math.PI, -1.568, Math.PI]}
          scale={[3.57, 1.947, 1.984]}
          userData={{ name: "CargoBox" }}
        />

        {/* ── GOLD STRIPE ── */}
        <mesh
          name="GoldStripe2_L"
          castShadow
          receiveShadow
          geometry={nodes.GoldStripe2_L.geometry}
          material={materials.GoldAccent}
          position={[0.039, 1.771, -5.168]}
          rotation={[0, 1.566, 0]}
          scale={[3.638, 1, 1]}
          userData={{ name: "GoldStripe2_L" }}
        />

        {/* ── CAB BODY ── */}
        <group
          name="DEF-Body"
          position={[0, 2.472, 2.874]}
          rotation={[-Math.PI / 2, 0, 0]}
          userData={{ name: "DEF-Body" }}
        >
          <mesh
            name="Body001"
            castShadow
            receiveShadow
            geometry={nodes.Body001.geometry}
            material={materials.NavyCabPaint}
            position={[0, 0.435, -1.733]}
            rotation={[Math.PI / 2, 0, 0]}
            userData={{ name: "Body.001" }}
          />
          <mesh
            name="Body002"
            castShadow
            receiveShadow
            geometry={nodes.Body002.geometry}
            material={materials.Plastics}
            position={[0, -2.094, -0.442]}
            rotation={[Math.PI / 2, 0, 0]}
            userData={{ name: "Body.002" }}
          />
          <mesh
            name="Body008"
            castShadow
            receiveShadow
            geometry={nodes.Body008.geometry}
            material={materials.NavyCabDark}
            position={[0, 0.435, -1.733]}
            rotation={[Math.PI / 2, 0, 0]}
            userData={{ name: "Body.008" }}
          />
          <mesh
            name="Body033"
            castShadow
            receiveShadow
            geometry={nodes.Body033.geometry}
            material={materials.Rim}
            position={[0, 0.435, -1.733]}
            rotation={[Math.PI / 2, 0, 0]}
            userData={{ name: "Body.033" }}
          />
          <mesh
            name="Body038"
            castShadow
            receiveShadow
            geometry={nodes.Body038.geometry}
            material={materials.Mirror}
            position={[0, -1.212, -0.702]}
            rotation={[Math.PI / 2, 0, 0]}
            userData={{ name: "Body.038" }}
          />
          <mesh
            name="Circle"
            castShadow
            receiveShadow
            geometry={nodes.Circle.geometry}
            material={materials["Headlight Emission"]}
            position={[0.454, -4.05, 1.259]}
            rotation={[Math.PI / 2, 0, 0]}
            userData={{ name: "Circle" }}
          />
          <mesh
            name="Circle001"
            castShadow
            receiveShadow
            geometry={nodes.Circle001.geometry}
            material={materials["Glass Materia Clear"]}
            position={[0.454, -4.05, 1.259]}
            rotation={[Math.PI / 2, 0, 0]}
            userData={{ name: "Circle.001" }}
          />
          <mesh
            name="Circle003"
            castShadow
            receiveShadow
            geometry={nodes.Circle003.geometry}
            material={materials["Black Metals"]}
            position={[0, -1.013, -1.18]}
            rotation={[Math.PI / 2, 0, 0]}
            userData={{ name: "Circle.003" }}
          />
          <mesh
            name="Plane005"
            castShadow
            receiveShadow
            geometry={nodes.Plane005.geometry}
            material={materials["Orange Indicator"]}
            position={[0, -1.507, -2.472]}
            rotation={[Math.PI / 2, 0, 0]}
            userData={{ name: "Plane.005" }}
          />
          <mesh
            name="Plane024"
            castShadow
            receiveShadow
            geometry={nodes.Plane024.geometry}
            material={materials.Tyres}
            position={[0, -1.238, -2.472]}
            rotation={[Math.PI / 2, 0, 0]}
            userData={{ name: "Plane.024" }}
          />
          <mesh
            name="Plane030"
            castShadow
            receiveShadow
            geometry={nodes.Plane030.geometry}
            material={materials["Grey Metals"]}
            position={[0, -1.013, -1.18]}
            rotation={[Math.PI / 2, 0, 0]}
            userData={{ name: "Plane.030" }}
          />
          <mesh
            name="Plane055"
            castShadow
            receiveShadow
            geometry={nodes.Plane055.geometry}
            material={materials["Taillight Glossy Red"]}
            position={[0, -1.112, -0.697]}
            rotation={[Math.PI / 2, 0, 0]}
            userData={{ name: "Plane.055" }}
          />
          <mesh
            name="Plane057"
            castShadow
            receiveShadow
            geometry={nodes.Plane057.geometry}
            material={materials.Taillight}
            position={[0, -1.112, -0.697]}
            rotation={[Math.PI / 2, 0, 0]}
            userData={{ name: "Plane.057" }}
          />
          <mesh
            name="Seats"
            castShadow
            receiveShadow
            geometry={nodes.Seats.geometry}
            material={materials.Seats}
            position={[0, -1.212, -0.702]}
            rotation={[Math.PI / 2, 0, 0]}
            userData={{ name: "Seats" }}
          />
        </group>

        {/* ── FRONT LEFT WHEEL ── */}
        <group
          name="DEF-WheelFtL"
          position={[1.306, 0.549, 5.76]}
          rotation={[-Math.PI / 2, 0, 0]}
          userData={{ name: "DEF-Wheel.Ft.L" }}
        >
          <group
            name="Plane042"
            rotation={[Math.PI / 2, 0, 0]}
            userData={{ name: "Plane.042" }}
          >
            <instances.Plane5 name="Plane068" />
            <instances.Plane6 name="Plane068_1" />
          </group>
          <instances.WheelFtL
            name="WheelFtL"
            rotation={[Math.PI / 2, 0, 0]}
            userData={{ name: "Wheel.Ft.L" }}
          />
        </group>

        {/* ── FRONT RIGHT WHEEL ── */}
        <group
          name="DEF-WheelFtR"
          position={[-1.306, 0.549, 5.76]}
          rotation={[-Math.PI / 2, 0, 0]}
          userData={{ name: "DEF-Wheel.Ft.R" }}
        >
          <group
            name="Plane041"
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            userData={{ name: "Plane.041" }}
          >
            <instances.Plane5 name="Plane068" />
            <instances.Plane6 name="Plane068_1" />
          </group>
          <instances.WheelFtL
            name="WheelFtR"
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            userData={{ name: "Wheel.Ft.R" }}
          />
        </group>

        {/* ── BACK LEFT WHEEL (1) ── */}
        <group
          name="DEF-WheelBkL"
          position={[1.178, 0.546, 1.445]}
          rotation={[-Math.PI / 2, 0, 0]}
          userData={{ name: "DEF-Wheel.Bk.L" }}
        >
          <group
            name="Plane043"
            rotation={[Math.PI / 2, 0, 0]}
            userData={{ name: "Plane.043" }}
          >
            <instances.Plane7 name="Plane069" />
            <instances.Plane8 name="Plane069_1" />
          </group>
          <mesh
            name="WheelBkL"
            castShadow
            receiveShadow
            geometry={nodes.WheelBkL.geometry}
            material={materials.Tyres}
            rotation={[Math.PI / 2, 0, 0]}
            userData={{ name: "Wheel.Bk.L" }}
          />
        </group>

        {/* ── BACK LEFT WHEEL (2) ── */}
        <group
          name="DEF-WheelBkL001"
          position={[1.178, 0.545, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          userData={{ name: "DEF-Wheel.Bk.L.001" }}
        >
          <group
            name="Plane047"
            rotation={[Math.PI / 2, 0, 0]}
            userData={{ name: "Plane.047" }}
          >
            <instances.Plane7 name="Plane069" />
            <instances.Plane8 name="Plane069_1" />
          </group>
          <mesh
            name="WheelBkL001"
            castShadow
            receiveShadow
            geometry={nodes.WheelBkL001.geometry}
            material={materials.Tyres}
            rotation={[Math.PI / 2, 0, 0]}
            userData={{ name: "Wheel.Bk.L.001" }}
          />
        </group>

        {/* ── BACK RIGHT WHEEL (1) ── */}
        <group
          name="DEF-WheelBkR"
          position={[-1.178, 0.546, 1.445]}
          rotation={[-Math.PI / 2, 0, 0]}
          userData={{ name: "DEF-Wheel.Bk.R" }}
        >
          <group
            name="Plane034"
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            userData={{ name: "Plane.034" }}
          >
            <instances.Plane7 name="Plane069" />
            <instances.Plane8 name="Plane069_1" />
          </group>
          <mesh
            name="WheelBkL004"
            castShadow
            receiveShadow
            geometry={nodes.WheelBkL004.geometry}
            material={materials.Tyres}
            position={[0.368, 0, 0]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            userData={{ name: "Wheel.Bk.L.004" }}
          />
        </group>

        {/* ── BACK RIGHT WHEEL (2) ── */}
        <group
          name="DEF-WheelBkR001"
          position={[-1.178, 0.545, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          userData={{ name: "DEF-Wheel.Bk.R.001" }}
        >
          <group
            name="Plane044"
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            userData={{ name: "Plane.044" }}
          >
            <instances.Plane7 name="Plane069" />
            <instances.Plane8 name="Plane069_1" />
          </group>
          <mesh
            name="WheelBkL005"
            castShadow
            receiveShadow
            geometry={nodes.WheelBkL005.geometry}
            material={materials.Tyres}
            position={[0.368, 0, 0]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            userData={{ name: "Wheel.Bk.L.005" }}
          />
        </group>

        {/* ── RIGGING / SKELETON (hidden helpers) ── */}
        <group name="Root" rotation={[-Math.PI / 2, 0, 0]} userData={{ name: "Root" }}>
          <group name="SHP-Root" position={[0, -2.874, 0.01]} userData={{ name: "SHP-Root" }} />
          <group
            name="Drift"
            position={[0, -5.76, 0.545]}
            rotation={[-Math.PI, 0, 0]}
            userData={{ name: "Drift" }}
          >
            <group
              name="GroundSensorAxleBk"
              position={[0, -5.76, 0]}
              rotation={[-Math.PI, 0, 0]}
              userData={{ name: "GroundSensor.Axle.Bk" }}
            >
              <group name="SHP-GroundSensorAxleBk" position={[0, 0, -0.544]} userData={{ name: "SHP-GroundSensor.Axle.Bk" }} />
              <group name="MCH-RootAxleBk" position={[0, 0, -0.545]} userData={{ name: "MCH-Root.Axle.Bk" }}>
                <group name="SHP-Drift" position={[0, 2.534, 0.545]} userData={{ name: "SHP-Drift" }} />
                <group name="GroundSensorFtL" position={[1.277, -5.76, 0.549]} userData={{ name: "GroundSensor.Ft.L" }}>
                  <group name="SHP-GroundSensorFtL" position={[0, 0, -0.548]} userData={{ name: "SHP-GroundSensor.Ft.L" }} />
                  <group name="MCH-WheelFtL" position={[0.029, 0, 0]} userData={{ name: "MCH-Wheel.Ft.L" }}>
                    <group name="WheelBrakeFtL" position={[0.2, 0, 0]} userData={{ name: "WheelBrake.Ft.L" }} />
                  </group>
                  <group name="WheelFtL_1" position={[0.229, 0, 0]} userData={{ name: "Wheel.Ft.L" }} />
                  <group name="WheelDamperFtL" position={[0.312, 0, 0.274]} userData={{ name: "WheelDamper.Ft.L" }}>
                    <group name="MCH-WheelDamperFtL" position={[-0.283, 0, -0.274]} userData={{ name: "MCH-WheelDamper.Ft.L" }} />
                  </group>
                </group>
                <group name="GroundSensorFtR" position={[-1.277, -5.76, 0.549]} userData={{ name: "GroundSensor.Ft.R" }}>
                  <group name="SHP-GroundSensorFtR" position={[0, 0, -0.548]} userData={{ name: "SHP-GroundSensor.Ft.R" }} />
                  <group name="MCH-WheelFtR" position={[-0.029, 0, 0]} userData={{ name: "MCH-Wheel.Ft.R" }} />
                  <group name="WheelFtR_1" position={[-0.229, 0, 0]} userData={{ name: "Wheel.Ft.R" }} />
                  <group name="WheelDamperFtR" position={[-0.312, 0, 0.274]} userData={{ name: "WheelDamper.Ft.R" }}>
                    <group name="MCH-WheelDamperFtR" position={[0.283, 0, -0.274]} userData={{ name: "MCH-WheelDamper.Ft.R" }} />
                  </group>
                </group>
                <group name="GroundSensorBkL" position={[0.963, -1.445, 0.546]} userData={{ name: "GroundSensor.Bk.L" }}>
                  <group name="SHP-GroundSensorBkL" position={[0, 0, -0.545]} userData={{ name: "SHP-GroundSensor.Bk.L" }} />
                  <group name="MCH-WheelBkL" position={[0.214, 0, 0]} userData={{ name: "MCH-Wheel.Bk.L" }}>
                    <group name="WheelBrakeBkL" position={[0.2, 0, 0]} userData={{ name: "WheelBrake.Bk.L" }} />
                  </group>
                  <group name="WheelBkL_1" position={[0.414, 0, 0]} userData={{ name: "Wheel.Bk.L" }} />
                </group>
                <group name="GroundSensorBkL001" position={[0.963, 0, 0.545]} userData={{ name: "GroundSensor.Bk.L.001" }}>
                  <group name="SHP-GroundSensorBkL001" position={[0, 0, -0.544]} userData={{ name: "SHP-GroundSensor.Bk.L.001" }} />
                  <group name="MCH-WheelBkL001" position={[0.214, 0, 0]} userData={{ name: "MCH-Wheel.Bk.L.001" }} />
                  <group name="WheelBkL001_1" position={[0.414, 0, 0]} userData={{ name: "Wheel.Bk.L.001" }} />
                </group>
                <group name="MCH-GroundSensorBkL" position={[1.178, -0.722, 0]} userData={{ name: "MCH-GroundSensor.Bk.L" }}>
                  <group name="WheelDamperBkL" position={[0.282, 0, 0.818]} userData={{ name: "WheelDamper.Bk.L" }}>
                    <group name="MCH-WheelDamperBkL" position={[-0.282, 0, -0.273]} userData={{ name: "MCH-WheelDamper.Bk.L" }} />
                  </group>
                </group>
                <group name="GroundSensorBkR" position={[-0.965, -1.444, 0.546]} userData={{ name: "GroundSensor.Bk.R" }}>
                  <group name="SHP-GroundSensorBkR" position={[0, 0, -0.545]} userData={{ name: "SHP-GroundSensor.Bk.R" }} />
                  <group name="MCH-WheelBkR" position={[-0.213, 0, 0]} userData={{ name: "MCH-Wheel.Bk.R" }} />
                  <group name="WheelBkR" position={[-0.413, 0, 0]} userData={{ name: "Wheel.Bk.R" }} />
                </group>
                <group name="GroundSensorBkR001" position={[-0.965, 0, 0.545]} userData={{ name: "GroundSensor.Bk.R.001" }}>
                  <group name="SHP-GroundSensorBkR001" position={[0, 0, -0.544]} userData={{ name: "SHP-GroundSensor.Bk.R.001" }} />
                  <group name="MCH-WheelBkR001" position={[-0.213, 0, 0]} userData={{ name: "MCH-Wheel.Bk.R.001" }} />
                  <group name="WheelBkR001" position={[-0.413, 0, 0]} userData={{ name: "Wheel.Bk.R.001" }} />
                </group>
                <group name="MCH-GroundSensorBkR" position={[-1.178, -0.722, 0]} userData={{ name: "MCH-GroundSensor.Bk.R" }}>
                  <group name="WheelDamperBkR" position={[-0.282, 0, 0.818]} userData={{ name: "WheelDamper.Bk.R" }}>
                    <group name="MCH-WheelDamperBkR" position={[0.282, 0, -0.273]} userData={{ name: "MCH-WheelDamper.Bk.R" }} />
                  </group>
                </group>
                <group name="MCH-AxisFt" position={[-1.306, -5.76, 0.549]} rotation={[0, 0, -Math.PI / 2]} userData={{ name: "MCH-Axis.Ft" }} />
                <group name="MCH-AxisBk" position={[-1.178, -1.445, 0.546]} rotation={[0, 0, -Math.PI / 2]} userData={{ name: "MCH-Axis.Bk" }} />
                <group name="MCH-SuspensionBk" position={[0, -0.722, 0.545]} userData={{ name: "MCH-Suspension.Bk" }} />
                <group
                  name="MCH-SuspensionFt"
                  position={[0, -5.76, 0.549]}
                  rotation={[-0.001, 0, 0]}
                  userData={{ name: "MCH-Suspension.Ft" }}
                >
                  <group name="MCH-Axis" userData={{ name: "MCH-Axis" }}>
                    <group name="MCH-Body" position={[0, 2.885, 1.926]} rotation={[0.001, 0, 0]} userData={{ name: "MCH-Body" }} />
                    <group name="Suspension" position={[0, 2.883, 4.717]} rotation={[0.001, 0, 0]} userData={{ name: "Suspension" }} />
                  </group>
                </group>
              </group>
            </group>
          </group>
          <group name="GroundSensorAxleFt" position={[0, -5.76, 0.549]} userData={{ name: "GroundSensor.Axle.Ft" }}>
            <group name="SHP-GroundSensorAxleFt" position={[0, 0, -0.548]} userData={{ name: "SHP-GroundSensor.Axle.Ft" }} />
            <group name="MCH-RootAxleFt" position={[0, 0, -0.548]} userData={{ name: "MCH-Root.Axle.Ft" }} />
            <group name="MCH-Steering" userData={{ name: "MCH-Steering" }} />
          </group>
        </group>

        {/* ── WHEEL ROTATION MARKERS ── */}
        <group name="MCH-WheelrotationFtL" position={[1.306, 0.549, 5.76]} rotation={[-Math.PI / 2, 0, 0]} userData={{ name: "MCH-Wheel.rotation.Ft.L" }} />
        <group name="MCH-WheelrotationFtR" position={[-1.306, 0.549, 5.76]} rotation={[-Math.PI / 2, 0, 0]} userData={{ name: "MCH-Wheel.rotation.Ft.R" }} />
        <group name="MCH-WheelrotationBkL" position={[1.178, 0.546, 1.445]} rotation={[-Math.PI / 2, 0, 0]} userData={{ name: "MCH-Wheel.rotation.Bk.L" }} />
        <group name="MCH-WheelrotationBkL001" position={[1.178, 0.545, 0]} rotation={[-Math.PI / 2, 0, 0]} userData={{ name: "MCH-Wheel.rotation.Bk.L.001" }} />
        <group name="MCH-WheelrotationBkR" position={[-1.178, 0.546, 1.445]} rotation={[-Math.PI / 2, 0, 0]} userData={{ name: "MCH-Wheel.rotation.Bk.R" }} />
        <group name="MCH-WheelrotationBkR001" position={[-1.178, 0.545, 0]} rotation={[-Math.PI / 2, 0, 0]} userData={{ name: "MCH-Wheel.rotation.Bk.R.001" }} />

        {/* ── STEERING ── */}
        <group
          name="MCH-Steeringrotation"
          position={[0, 0.549, 5.76]}
          rotation={[-Math.PI / 2, 0, 0]}
          userData={{ name: "MCH-Steering.rotation" }}
        >
          <group name="Steering" position={[0, -4.056, 0]} rotation={[0, 0, -Math.PI]} userData={{ name: "Steering" }} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/truck.glb");
