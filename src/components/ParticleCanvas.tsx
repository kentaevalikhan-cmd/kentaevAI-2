import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { generateStagePositions, PARTICLE_COUNT, STAGES } from '../utils/particleShapes';

interface ParticleCanvasProps {
  currentStage: number;
  onPointerInteraction?: () => void;
  speedMultiplier?: number;
  interactionMode?: 'repel' | 'attract' | 'vortex';
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({
  currentStage,
  onPointerInteraction,
  speedMultiplier = 1.0,
  interactionMode = 'repel',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef(currentStage);
  stageRef.current = currentStage;
  const interactionModeRef = useRef(interactionMode);
  interactionModeRef.current = interactionMode;
  const speedRef = useRef(speedMultiplier);
  speedRef.current = speedMultiplier;
  const [useFallback2D, setUseFallback2D] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let geometry: THREE.BufferGeometry | null = null;
    let material: THREE.PointsMaterial | null = null;
    let particleTexture: THREE.CanvasTexture | null = null;
    let animationFrameId: number;

    try {
      const isMobile = window.innerWidth < 768 || window.innerWidth < window.innerHeight;

      // --- Scene Setup ---
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x050508, isMobile ? 0.005 : 0.007);

      camera = new THREE.PerspectiveCamera(
        isMobile ? 62 : 55,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, isMobile ? 6 : 10, isMobile ? 96 : 68);

      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: 'default',
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
      renderer.setClearColor(0x050508, 1);
      container.appendChild(renderer.domElement);

      // --- Create Radial Glow Particle Texture ---
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.25, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);
      }
      particleTexture = new THREE.CanvasTexture(canvas);

      // --- Geometry & Targets ---
      const stagePositions = generateStagePositions(PARTICLE_COUNT);
      geometry = new THREE.BufferGeometry();

      const currentPositions = new Float32Array(PARTICLE_COUNT * 3);
      const colors = new Float32Array(PARTICLE_COUNT * 3);
      const initialPos = stagePositions[0];

      for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
        currentPositions[i] = initialPos[i];
      }

      const c1 = new THREE.Color(STAGES[0].primaryColor);
      const c2 = new THREE.Color(STAGES[0].secondaryColor);
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const mixRatio = Math.random();
        const col = c1.clone().lerp(c2, mixRatio);
        colors[i * 3] = col.r;
        colors[i * 3 + 1] = col.g;
        colors[i * 3 + 2] = col.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      material = new THREE.PointsMaterial({
        size: isMobile ? 2.4 : 1.85,
        map: particleTexture,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      });

      const pointCloud = new THREE.Points(geometry, material);
      scene.add(pointCloud);

      // --- Pointer Tracking ---
      const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
      let hasInteracted = false;

      const onPointerMove = (e: MouseEvent | TouchEvent) => {
        let clientX = 0;
        let clientY = 0;
        if ('touches' in e && e.touches.length > 0) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else if ('clientX' in e) {
          clientX = e.clientX;
          clientY = e.clientY;
        }

        pointer.targetX = (clientX / window.innerWidth) * 2 - 1;
        pointer.targetY = -(clientY / window.innerHeight) * 2 + 1;

        if (!hasInteracted && onPointerInteraction) {
          hasInteracted = true;
          onPointerInteraction();
        }
      };

      window.addEventListener('mousemove', onPointerMove, { passive: true });
      window.addEventListener('touchmove', onPointerMove, { passive: true });
      window.addEventListener('touchstart', onPointerMove, { passive: true });

      const handleResize = () => {
        if (!renderer || !camera) return;
        const width = window.innerWidth;
        const height = window.innerHeight;
        const portrait = width < height || width < 768;

        camera.aspect = width / height;
        camera.fov = portrait ? 62 : 55;
        camera.position.z = portrait ? 96 : 68;
        camera.position.y = portrait ? 6 : 10;
        camera.updateProjectionMatrix();

        if (material) material.size = portrait ? 2.4 : 1.85;
        renderer.setSize(width, height);
      };

      window.addEventListener('resize', handleResize);
      window.addEventListener('orientationchange', handleResize);

      // --- Animation Loop ---
      const clock = new THREE.Clock();
      const currentColorObj1 = new THREE.Color(STAGES[0].primaryColor);
      const currentColorObj2 = new THREE.Color(STAGES[0].secondaryColor);

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        const delta = clock.getDelta();
        const time = clock.getElapsedTime() * speedRef.current;

        pointer.x += (pointer.targetX - pointer.x) * 0.05;
        pointer.y += (pointer.targetY - pointer.y) * 0.05;

        const isPort = window.innerWidth < window.innerHeight;
        if (camera) {
          camera.position.x = pointer.x * (isPort ? 4 : 6);
          camera.position.y = (isPort ? 6 : 8) + pointer.y * (isPort ? 3.5 : 5);
          camera.lookAt(0, 0, 0);
        }

        const activeStageIdx = Math.min(stageRef.current, stagePositions.length - 1);
        const targetPos = stagePositions[activeStageIdx];
        const stageMeta = STAGES[activeStageIdx];

        const targetCol1 = new THREE.Color(stageMeta.primaryColor);
        const targetCol2 = new THREE.Color(stageMeta.secondaryColor);
        currentColorObj1.lerp(targetCol1, 0.06);
        currentColorObj2.lerp(targetCol2, 0.06);

        if (geometry) {
          const posAttr = geometry.attributes.position as THREE.BufferAttribute;
          const colorAttr = geometry.attributes.color as THREE.BufferAttribute;
          const pArr = posAttr.array as Float32Array;
          const cArr = colorAttr.array as Float32Array;

          const lerpSpeed = Math.min(0.07, delta * 3.8);
          const pointerWorldX = pointer.x * (isPort ? 28 : 35);
          const pointerWorldY = pointer.y * (isPort ? 24 : 22);
          const repelRadius = isPort ? 160 : 140;
          const currentMode = interactionModeRef.current;

          for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3;
            const tx = targetPos[i3];
            const ty = targetPos[i3 + 1];
            const tz = targetPos[i3 + 2];

            pArr[i3] += (tx - pArr[i3]) * lerpSpeed;
            pArr[i3 + 1] += (ty - pArr[i3 + 1]) * lerpSpeed;
            pArr[i3 + 2] += (tz - pArr[i3 + 2]) * lerpSpeed;

            const wave = Math.sin(time * 1.5 + tx * 0.05 + tz * 0.05) * 0.3;
            pArr[i3 + 1] += wave * 0.04;

            const dx = pArr[i3] - pointerWorldX;
            const dy = pArr[i3 + 1] - pointerWorldY;
            const distSq = dx * dx + dy * dy;
            if (distSq < repelRadius) {
              const force = (1 - distSq / repelRadius) * 0.45;
              if (currentMode === 'attract') {
                pArr[i3] -= dx * force * 0.1;
                pArr[i3 + 1] -= dy * force * 0.1;
              } else if (currentMode === 'vortex') {
                pArr[i3] += -dy * force * 0.14;
                pArr[i3 + 1] += dx * force * 0.14;
              } else {
                pArr[i3] += dx * force * 0.08;
                pArr[i3 + 1] += dy * force * 0.08;
              }
            }

            const mix = (i % 100) / 100;
            const cr = currentColorObj1.r * (1 - mix) + currentColorObj2.r * mix;
            const cg = currentColorObj1.g * (1 - mix) + currentColorObj2.g * mix;
            const cb = currentColorObj1.b * (1 - mix) + currentColorObj2.b * mix;

            cArr[i3] += (cr - cArr[i3]) * 0.045;
            cArr[i3 + 1] += (cg - cArr[i3 + 1]) * 0.045;
            cArr[i3 + 2] += (cb - cArr[i3 + 2]) * 0.045;
          }

          posAttr.needsUpdate = true;
          colorAttr.needsUpdate = true;
        }

        if (pointCloud) {
          pointCloud.rotation.y = time * 0.035;
        }

        if (renderer && scene && camera) {
          renderer.render(scene, camera);
        }
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', onPointerMove);
        window.removeEventListener('touchmove', onPointerMove);
        window.removeEventListener('touchstart', onPointerMove);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleResize);
        renderer?.dispose();
        geometry?.dispose();
        material?.dispose();
        particleTexture?.dispose();
        if (renderer && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    } catch {
      // Fallback to 2D canvas if WebGL is unavailable
      setUseFallback2D(true);
    }
  }, [speedMultiplier, onPointerInteraction]);

  // Fallback 2D canvas particles if WebGL is not supported
  useEffect(() => {
    if (!useFallback2D) return;
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.className = 'w-full h-full';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];
    for (let i = 0; i < 400; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        r: Math.random() * 2 + 1,
        a: Math.random() * 0.6 + 0.2,
      });
    }

    let animId: number;
    const render2D = () => {
      animId = requestAnimationFrame(render2D);
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const stage = STAGES[stageRef.current] || STAGES[0];
      ctx.fillStyle = stage.primaryColor;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.globalAlpha = p.a;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    render2D();

    return () => {
      cancelAnimationFrame(animId);
      if (container.contains(canvas)) container.removeChild(canvas);
    };
  }, [useFallback2D]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-auto overflow-hidden bg-[#050508]"
    />
  );
};
