"use client";

import { Canvas, ThreeEvent, useThree } from "@react-three/fiber";
import { OrbitControls, TransformControls, Grid } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { BomPart, PartRole } from "@/data/configurator-catalog";
import { defaultRolePositions } from "@/data/configurator-catalog";

export type PartPositions = Record<string, [number, number, number]>;

type Props = {
  className?: string;
  parts: BomPart[];
  selectedPartId: string | null;
  positions: PartPositions;
  onSelectPart: (id: string | null) => void;
  onPositionChange: (id: string, position: [number, number, number]) => void;
};

const ROLE_COLORS: Record<PartRole, string> = {
  housing: "#1e4d9c",
  rear: "#1a1d22",
  wra: "#6b7280",
  hdl: "#f59e0b",
  coil: "#38bdf8",
  swivel: "#a3a3a3",
  hw: "#78716c",
  pcb: "#22c55e",
  sensor: "#ef4444",
};

function PartMesh({
  part,
  selected,
  position,
  onSelect,
}: {
  part: BomPart;
  selected: boolean;
  position: [number, number, number];
  onSelect: (id: string) => void;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const color = ROLE_COLORS[part.role] ?? "#64748b";

  const geometry = useMemo(() => {
    switch (part.role) {
      case "housing":
        return <boxGeometry args={[1.55, 0.95, 1.15]} />;
      case "rear":
        return <boxGeometry args={[0.75, 1.05, 1.05]} />;
      case "wra":
        return <cylinderGeometry args={[0.2, 0.2, 0.4, 24]} />;
      case "hdl":
        return <boxGeometry args={[0.18, 0.55, 0.22]} />;
      case "coil":
        return <torusGeometry args={[0.16, 0.045, 12, 32]} />;
      case "swivel":
        return <cylinderGeometry args={[0.12, 0.12, 0.22, 16]} />;
      case "hw":
        return <boxGeometry args={[0.28, 0.18, 0.28]} />;
      case "pcb":
        return <boxGeometry args={[0.55, 0.06, 0.4]} />;
      case "sensor":
        return <sphereGeometry args={[0.12, 20, 20]} />;
      default:
        return <boxGeometry args={[0.3, 0.3, 0.3]} />;
    }
  }, [part.role]);

  return (
    <group
      ref={meshRef}
      position={position}
      name={part.id}
      userData={{ partId: part.id }}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onSelect(part.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
      }}
    >
      <mesh castShadow receiveShadow>
        {geometry}
        <meshStandardMaterial
          color={color}
          metalness={part.role === "housing" || part.role === "rear" ? 0.4 : 0.25}
          roughness={0.4}
          emissive={selected ? color : "#000000"}
          emissiveIntensity={selected ? 0.28 : 0}
        />
      </mesh>
      {selected ? (
        <mesh>
          {geometry}
          <meshBasicMaterial
            color="#f59e0b"
            wireframe
            transparent
            opacity={0.55}
          />
        </mesh>
      ) : null}
    </group>
  );
}

function SceneContent({
  parts,
  selectedPartId,
  positions,
  onSelectPart,
  onPositionChange,
}: Omit<Props, "className">) {
  const [dragging, setDragging] = useState(false);
  const selectedRef = useRef<THREE.Object3D | null>(null);
  const { scene } = useThree();

  // Resolve selected object for TransformControls
  useEffect(() => {
    if (!selectedPartId) {
      selectedRef.current = null;
      return;
    }
    const obj = scene.getObjectByName(selectedPartId) ?? null;
    selectedRef.current = obj;
  }, [selectedPartId, parts, positions, scene]);

  // Force TransformControls to attach after object exists
  const [, setTick] = useState(0);
  useEffect(() => {
    const t = requestAnimationFrame(() => setTick((n) => n + 1));
    return () => cancelAnimationFrame(t);
  }, [selectedPartId, parts]);

  const selectedObject = selectedPartId
    ? scene.getObjectByName(selectedPartId) ?? null
    : null;

  return (
    <>
      <color attach="background" args={["#1a2028"]} />
      <ambientLight intensity={0.55} />
      <directionalLight
        castShadow
        intensity={1.15}
        position={[4, 7, 3]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight intensity={0.35} position={[-3, 2, -2]} color="#88aaff" />

      <Grid
        position={[0, -1.05, 0]}
        args={[12, 12]}
        cellSize={0.5}
        cellThickness={0.6}
        cellColor="#2a323c"
        sectionSize={2}
        sectionThickness={1}
        sectionColor="#3a4452"
        fadeDistance={18}
        infiniteGrid
      />

      {parts.map((part) => {
        const pos =
          positions[part.id] ??
          defaultRolePositions[part.role] ??
          ([0, 0, 0] as [number, number, number]);
        return (
          <PartMesh
            key={part.id}
            part={part}
            selected={part.id === selectedPartId}
            position={pos}
            onSelect={onSelectPart}
          />
        );
      })}

      {selectedObject ? (
        <TransformControls
          object={selectedObject}
          mode="translate"
          size={0.75}
          onMouseDown={() => setDragging(true)}
          onMouseUp={() => {
            setDragging(false);
            if (selectedPartId && selectedObject) {
              const p = selectedObject.position;
              onPositionChange(selectedPartId, [
                Number(p.x.toFixed(3)),
                Number(p.y.toFixed(3)),
                Number(p.z.toFixed(3)),
              ]);
            }
          }}
          onObjectChange={() => {
            if (selectedPartId && selectedObject) {
              const p = selectedObject.position;
              onPositionChange(selectedPartId, [
                Number(p.x.toFixed(3)),
                Number(p.y.toFixed(3)),
                Number(p.z.toFixed(3)),
              ]);
            }
          }}
        />
      ) : null}

      <OrbitControls
        makeDefault
        enabled={!dragging}
        enableDamping
        dampingFactor={0.08}
        minDistance={1.2}
        maxDistance={12}
        target={[0, 0.1, 0]}
      />
    </>
  );
}

/**
 * Interactive 3D stage: orbit (rotate/zoom), part select, drag-move via TransformControls.
 * Parts missing from `parts` (deleted from Partlist) are not rendered.
 */
export function ConfiguratorStage3D({
  className,
  parts,
  selectedPartId,
  positions,
  onSelectPart,
  onPositionChange,
}: Props) {
  return (
    <div className={className}>
      <Canvas
        shadows
        camera={{ position: [2.6, 1.7, 3.4], fov: 40, near: 0.1, far: 80 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.75]}
        onPointerMissed={() => onSelectPart(null)}
      >
        <SceneContent
          parts={parts}
          selectedPartId={selectedPartId}
          positions={positions}
          onSelectPart={onSelectPart}
          onPositionChange={onPositionChange}
        />
      </Canvas>
    </div>
  );
}
