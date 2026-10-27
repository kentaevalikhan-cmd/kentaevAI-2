import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { generateStagePositions, PARTICLE_COUNT, STAGES } from '../utils/particleShapes';

interface ParticleCanvasProps {
  currentStage: number;
  onPointerInteraction?: () => void;
  speedMultiplier?: number;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({
  currentStage,
  onPointerInteraction,
  speedMultiplier = 1.0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef(currentStage);
  stageRef.current = currentStage;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.007);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 10, 68);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x050508, 1);
    container.appendChild(renderer.domElement);

    // --- Create Radial Glow Particle Texture ---
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.85)');
      gradient.addColorStop(0.55, 'rgba(255, 255, 255, 0.25)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    // --- Geometry & Targets ---
    const stagePositions = generateStagePositions(PARTICLE_COUNT);
    const geometry = new THREE.BufferGeometry();

    const currentPositions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const initialPos = stagePositions[0];

    // Initialize positions
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

    const material = new THREE.PointsMaterial({
      size: 1.85,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const pointCloud = new THREE.Points(geometry, material);
    scene.add(pointCloud);

    // --- Mouse & Interaction Tracking ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
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

      mouse.targetX = (clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(clientY / window.innerHeight) * 2 + 1;

      if (!hasInteracted && onPointerInteraction) {
        hasInteracted = true;
        onPointerInteraction();
      }
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });

    // --- Handle Resize ---
    const handleResize = () => {
      if (!renderer || !camera) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const currentColorObj1 = new THREE.Color(STAGES[0].primaryColor);
    const currentColorObj2 = new THREE.Color(STAGES[0].secondaryColor);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime() * speedMultiplier;

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Parallax camera tilt
      camera.position.x = mouse.x * 6;
      camera.position.y = 8 + mouse.y * 5;
      camera.lookAt(0, 0, 0);

      // Target positions for current active stage
      const activeStageIdx = Math.min(stageRef.current, stagePositions.length - 1);
      const targetPos = stagePositions[activeStageIdx];
      const stageMeta = STAGES[activeStageIdx];

      const targetCol1 = new THREE.Color(stageMeta.primaryColor);
      const targetCol2 = new THREE.Color(stageMeta.secondaryColor);
      currentColorObj1.lerp(targetCol1, 0.05);
      currentColorObj2.lerp(targetCol2, 0.05);

      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const colorAttr = geometry.attributes.color as THREE.BufferAttribute;
      const pArr = posAttr.array as Float32Array;
      const cArr = colorAttr.array as Float32Array;

      // Gentle morph interpolation factor
      const lerpSpeed = Math.min(0.065, delta * 3.5);

      // Mouse influence in 3D world space (approximate projection)
      const mouseWorldX = mouse.x * 35;
      const mouseWorldY = mouse.y * 22;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const tx = targetPos[i3];
        const ty = targetPos[i3 + 1];
        const tz = targetPos[i3 + 2];

        // Smoothly approach target shape
        pArr[i3] += (tx - pArr[i3]) * lerpSpeed;
        pArr[i3 + 1] += (ty - pArr[i3 + 1]) * lerpSpeed;
        pArr[i3 + 2] += (tz - pArr[i3 + 2]) * lerpSpeed;

        // Subtle harmonic idle undulation
        const wave = Math.sin(time * 1.5 + tx * 0.05 + tz * 0.05) * 0.3;
        pArr[i3 + 1] += wave * 0.04;

        // Interactive mouse wake (particles gently move away from cursor)
        const dx = pArr[i3] - mouseWorldX;
        const dy = pArr[i3 + 1] - mouseWorldY;
        const distSq = dx * dx + dy * dy;
        if (distSq < 140) {
          const force = (1 - distSq / 140) * 0.45;
          pArr[i3] += dx * force * 0.08;
          pArr[i3 + 1] += dy * force * 0.08;
        }

        // Color interpolation
        const mix = (i % 100) / 100;
        const cr = currentColorObj1.r * (1 - mix) + currentColorObj2.r * mix;
        const cg = currentColorObj1.g * (1 - mix) + currentColorObj2.g * mix;
        const cb = currentColorObj1.b * (1 - mix) + currentColorObj2.b * mix;

        cArr[i3] += (cr - cArr[i3]) * 0.04;
        cArr[i3 + 1] += (cg - cArr[i3 + 1]) * 0.04;
        cArr[i3 + 2] += (cb - cArr[i3 + 2]) * 0.04;
      }

      posAttr.needsUpdate = true;
      colorAttr.needsUpdate = true;

      // Slow overall rotation for dimension
      pointCloud.rotation.y = time * 0.035;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-auto overflow-hidden bg-[#050508]"
    />
  );
};
