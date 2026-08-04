"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Lightweight rotating 3D placeholder (G-Force–inspired housing block).
 * Real CAD/GLB models can replace this later without changing the workshop shell.
 */
export function ConfiguratorStage3D({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 640;
    const height = mount.clientHeight || 400;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a2028);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(2.4, 1.5, 3.2);
    camera.lookAt(0, 0.15, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xffffff, 1.05);
    key.position.set(4, 6, 3);
    key.castShadow = true;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x88aaff, 0.35);
    fill.position.set(-3, 2, -2);
    scene.add(fill);

    const group = new THREE.Group();
    scene.add(group);

    // Main housing (blue)
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x1e4d9c,
      metalness: 0.35,
      roughness: 0.45,
    });
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.95, 1.15),
      bodyMat,
    );
    body.position.set(0.15, 0.2, 0);
    body.castShadow = true;
    group.add(body);

    // Rear housing (dark)
    const rearMat = new THREE.MeshStandardMaterial({
      color: 0x1a1d22,
      metalness: 0.4,
      roughness: 0.5,
    });
    const rear = new THREE.Mesh(
      new THREE.BoxGeometry(0.75, 1.05, 1.05),
      rearMat,
    );
    rear.position.set(-0.85, 0.15, 0);
    rear.castShadow = true;
    group.add(rear);

    // Suspension eye
    const eye = new THREE.Mesh(
      new THREE.TorusGeometry(0.14, 0.035, 12, 24),
      new THREE.MeshStandardMaterial({
        color: 0x9aa3b0,
        metalness: 0.8,
        roughness: 0.25,
      }),
    );
    eye.rotation.x = Math.PI / 2;
    eye.position.set(-0.85, 0.75, 0);
    group.add(eye);

    // Bottom drum
    const drum = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.22, 0.35, 24),
      new THREE.MeshStandardMaterial({
        color: 0x11141a,
        metalness: 0.5,
        roughness: 0.4,
      }),
    );
    drum.position.set(-0.55, -0.45, 0);
    group.add(drum);

    // Floor grid
    const grid = new THREE.GridHelper(8, 16, 0x3a4452, 0x2a323c);
    grid.position.y = -0.7;
    scene.add(grid);

    let frame = 0;
    let raf = 0;
    const animate = () => {
      frame += 0.008;
      group.rotation.y = frame;
      group.position.y = Math.sin(frame * 1.2) * 0.03;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.dispose();
      body.geometry.dispose();
      rear.geometry.dispose();
      eye.geometry.dispose();
      drum.geometry.dispose();
      bodyMat.dispose();
      rearMat.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={className} />;
}
