"use client";

import { Canvas, ThreeEvent, useThree } from "@react-three/fiber";
import { OrbitControls, TransformControls, Grid, useGLTF } from "@react-three/drei";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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

const ROLE_COLORS: Record<Exclude<PartRole, "profile">, string> = {
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

function ProceduralPartMesh({
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
  const color =
    part.role === "profile"
      ? "#94a3b8"
      : (ROLE_COLORS[part.role as Exclude<PartRole, "profile">] ?? "#64748b");

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
          metalness={0.35}
          roughness={0.4}
          emissive={selected ? color : "#000000"}
          emissiveIntensity={selected ? 0.28 : 0}
        />
      </mesh>
      {selected ? (
        <mesh>
          {geometry}
          <meshBasicMaterial color="#f59e0b" wireframe transparent opacity={0.5} />
        </mesh>
      ) : null}
    </group>
  );
}

/**
 * GLB profile scaled along its longest axis to match lengthMm / baseLengthMm.
 */
function ProfileGlbMesh({
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
  const url = part.glbUrl!;
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);

  const prepared = useMemo(() => {
    const root = scene.clone(true);
    root.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.material) {
          const mats = Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material];
          mats.forEach((m) => {
            const mat = m as THREE.MeshStandardMaterial;
            if ("metalness" in mat) {
              mat.metalness = Math.min(0.85, (mat.metalness ?? 0.3) + 0.2);
              mat.roughness = Math.max(0.25, (mat.roughness ?? 0.5) - 0.1);
            }
          });
        }
      }
    });

    // Center geometry at origin
    const box = new THREE.Box3().setFromObject(root);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    root.position.sub(center);

    // Longest axis = extrusion length
    let axis: "x" | "y" | "z" = "x";
    if (size.y >= size.x && size.y >= size.z) axis = "y";
    else if (size.z >= size.x && size.z >= size.y) axis = "z";

    return { root, size, axis, baseLen: size[axis] || 1 };
  }, [scene]);

  const lengthMm = part.lengthMm ?? part.baseLengthMm ?? 3000;
  const baseMm = part.baseLengthMm ?? 3000;
  const scaleFactor = Math.max(0.05, lengthMm / baseMm);

  useLayoutEffect(() => {
    if (!groupRef.current) return;
    const { axis } = prepared;
    const s = groupRef.current.scale;
    s.set(1, 1, 1);
    if (axis === "x") s.x = scaleFactor;
    else if (axis === "y") s.y = scaleFactor;
    else s.z = scaleFactor;
  }, [prepared, scaleFactor]);

  return (
    <group
      ref={groupRef}
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
      <primitive object={prepared.root} />
      {selected ? (
        <mesh>
          <boxGeometry
            args={[
              prepared.axis === "x" ? prepared.baseLen * scaleFactor : prepared.size.x * 1.05,
              prepared.axis === "y" ? prepared.baseLen * scaleFactor : prepared.size.y * 1.05,
              prepared.axis === "z" ? prepared.baseLen * scaleFactor : prepared.size.z * 1.05,
            ]}
          />
          <meshBasicMaterial color="#f59e0b" wireframe transparent opacity={0.35} />
        </mesh>
      ) : null}
    </group>
  );
}

function PartNode({
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
  if (part.role === "profile" && part.glbUrl) {
    return (
      <ProfileGlbMesh
        part={part}
        selected={selected}
        position={position}
        onSelect={onSelect}
      />
    );
  }
  return (
    <ProceduralPartMesh
      part={part}
      selected={selected}
      position={position}
      onSelect={onSelect}
    />
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
  const { scene } = useThree();

  // Re-render after selection so TransformControls can attach
  const [, setTick] = useState(0);
  useEffect(() => {
    const t = requestAnimationFrame(() => setTick((n) => n + 1));
    return () => cancelAnimationFrame(t);
  }, [selectedPartId, parts, positions]);

  const selectedObject = selectedPartId
    ? scene.getObjectByName(selectedPartId) ?? null
    : null;

  return (
    <>
      <color attach="background" args={["#1a2028"]} />
      <ambientLight intensity={0.6} />
      <directionalLight
        castShadow
        intensity={1.2}
        position={[4, 7, 3]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight intensity={0.4} position={[-3, 2, -2]} color="#88aaff" />

      <Grid
        position={[0, -1.05, 0]}
        args={[16, 16]}
        cellSize={0.5}
        cellThickness={0.6}
        cellColor="#2a323c"
        sectionSize={2}
        sectionThickness={1}
        sectionColor="#3a4452"
        fadeDistance={22}
        infiniteGrid
      />

      {parts.map((part) => {
        const pos =
          positions[part.id] ??
          defaultRolePositions[part.role] ??
          ([0, 0, 0] as [number, number, number]);
        return (
          <PartNode
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
        minDistance={0.8}
        maxDistance={20}
        target={[0, 0.1, 0]}
      />
    </>
  );
}

export function ConfiguratorStage3D({
  className,
  parts,
  selectedPartId,
  positions,
  onSelectPart,
  onPositionChange,
}: Props) {
  // Preload known profile GLBs
  useEffect(() => {
    parts.forEach((p) => {
      if (p.glbUrl) {
        try {
          useGLTF.preload(p.glbUrl);
        } catch {
          /* ignore */
        }
      }
    });
  }, [parts]);

  return (
    <div className={className}>
      <Canvas
        shadows
        camera={{ position: [2.8, 1.8, 3.6], fov: 40, near: 0.1, far: 100 }}
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
