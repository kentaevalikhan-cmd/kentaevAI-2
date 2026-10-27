/**
 * 3D Particle Target Shapes Generator for KentaevAI
 * Generates coordinate buffers for 26,000 particles across 9 distinct stages
 */

export interface StageData {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  valueKeyword: string;
  metrics: { label: string; value: string }[];
  primaryColor: string;
  secondaryColor: string;
  ambientHex: string;
}

export const STAGES: StageData[] = [
  {
    id: 'hero',
    number: '00',
    title: 'We power the minds of the future',
    tagline: 'Discover the quantum neural architecture behind KentaevAI',
    description: 'An autonomous, sovereign intelligence engine engineered for real-time multimodal reasoning, instant synthesis, and zero-latency execution.',
    valueKeyword: 'THE QUANTUM HORIZON',
    metrics: [
      { label: 'Token Speed', value: '185 t/s' },
      { label: 'Cold Latency', value: '42ms' },
      { label: 'Context Horizon', value: '2.0M' }
    ],
    primaryColor: '#00f0ff',
    secondaryColor: '#0077b6',
    ambientHex: 'rgba(0, 240, 255, 0.18)'
  },
  {
    id: 'synapse',
    number: '01',
    title: 'The Unified Neural Synapse',
    tagline: 'Deep cross-modal cognition without fragmented adapters',
    description: 'Text, vision, code, and spatial telemetry run on a singular coherent tensor backbone, eliminating context dilution and translation loss.',
    valueKeyword: 'WE VALUE · COHERENCE',
    metrics: [
      { label: 'Modalities', value: 'Vision · Audio · Code' },
      { label: 'Tensor Alignment', value: '99.98%' },
      { label: 'Entropy Shift', value: '-38%' }
    ],
    primaryColor: '#38bdf8',
    secondaryColor: '#6366f1',
    ambientHex: 'rgba(56, 189, 248, 0.18)'
  },
  {
    id: 'precision',
    number: '02',
    title: 'The Hunger for Deterministic Precision',
    tagline: 'Beyond statistical guessing: verified mathematical rigor',
    description: 'Integrated verification passes, formal logic proofing, and self-auditing inference pipelines guarantee factual precision across mission-critical workflows.',
    valueKeyword: 'WE VALUE · PRECISION',
    metrics: [
      { label: 'Hallucination Rate', value: '< 0.04%' },
      { label: 'Proof Accuracy', value: '99.4%' },
      { label: 'Verification Passes', value: '4x Parallel' }
    ],
    primaryColor: '#10b981',
    secondaryColor: '#06b6d4',
    ambientHex: 'rgba(16, 185, 129, 0.18)'
  },
  {
    id: 'mastery',
    number: '03',
    title: 'The Reps That Led to Pure Mastery',
    tagline: 'Trained on high-entropy reasoning benchmarks & real codebases',
    description: 'Not merely summarizing the web—KentaevAI was forged across millions of synthetic adversarial dilemmas, refactoring real architectures, and solving non-trivial edge cases.',
    valueKeyword: 'WE VALUE · MASTERY',
    metrics: [
      { label: 'Pre-Training FLOPs', value: '2.4e25' },
      { label: 'Reasoning Benchmark', value: '94.8 MMLU' },
      { label: 'Code Synthesis', value: '92.6 HumanEval' }
    ],
    primaryColor: '#ec4899',
    secondaryColor: '#8b5cf6',
    ambientHex: 'rgba(236, 72, 153, 0.18)'
  },
  {
    id: 'horizon',
    number: '04',
    title: 'The Infinite Context Horizon',
    tagline: 'Persistent memory vectors that never forget your architectural rules',
    description: 'Retain entire multi-repository codebases, complete customer histories, and multi-hour voice transcriptions without context truncation.',
    valueKeyword: 'WE VALUE · MEMORY',
    metrics: [
      { label: 'Working Window', value: '2,000,000' },
      { label: 'Recall Accuracy', value: '100% at Needle' },
      { label: 'Vector Cache', value: 'Sub-1ms Query' }
    ],
    primaryColor: '#f59e0b',
    secondaryColor: '#ef4444',
    ambientHex: 'rgba(245, 158, 11, 0.18)'
  },
  {
    id: 'reasoning',
    number: '05',
    title: 'The Independent Cognitive Core',
    tagline: 'Autonomous decomposition of ambiguous real-world intent',
    description: 'Ask for the impossible: KentaevAI generates multi-stage plans, tests hypotheses, validates boundary cases, and produces battle-tested deliverables.',
    valueKeyword: 'WE VALUE · INDEPENDENCE',
    metrics: [
      { label: 'Autonomous Depth', value: '64 Steps' },
      { label: 'Self-Correction', value: '99.1%' },
      { label: 'Tool Dispatch', value: 'Zero Drop' }
    ],
    primaryColor: '#14b8a6',
    secondaryColor: '#0284c7',
    ambientHex: 'rgba(20, 184, 166, 0.18)'
  },
  {
    id: 'simplification',
    number: '06',
    title: 'The Capacity to Simplify',
    tagline: 'Compressing extreme complexity into crystalline elegance',
    description: 'Where others leave you with 5,000 unmaintainable lines of bloat, KentaevAI distills the essential core. Clean, readable, modular architecture with zero fluff.',
    valueKeyword: 'WE VALUE · SIMPLICITY',
    metrics: [
      { label: 'Code Conciseness', value: '-65% Slop' },
      { label: 'Instruction Adherence', value: '99.9%' },
      { label: 'Execution Overhead', value: '0.0ms' }
    ],
    primaryColor: '#ffffff',
    secondaryColor: '#00f0ff',
    ambientHex: 'rgba(255, 255, 255, 0.22)'
  },
  {
    id: 'sovereignty',
    number: '07',
    title: 'The Drive for Zero External Dependencies',
    tagline: 'Full data sovereignty and standalone deployment',
    description: 'No telemetry leaks. Run completely private in your secure cloud, on-prem cluster, or local workstation with ironclad boundary enforcement.',
    valueKeyword: 'WE VALUE · SOVEREIGNTY',
    metrics: [
      { label: 'Telemetry Exfiltration', value: '0.00' },
      { label: 'Local Deployment', value: 'Docker & Bare' },
      { label: 'Air-Gapped Ready', value: '100%' }
    ],
    primaryColor: '#a855f7',
    secondaryColor: '#4f46e5',
    ambientHex: 'rgba(168, 85, 247, 0.18)'
  },
  {
    id: 'finale',
    number: '08',
    title: 'We power you, relentlessly, to win',
    tagline: 'Build the products of tomorrow with KentaevAI today',
    description: 'Step beyond legacy models. Experience quantum-fast reasoning, continuous multimodal perception, and fluid creative agency.',
    valueKeyword: 'THE FUTURE STARTS HERE',
    metrics: [
      { label: 'Active Users', value: '140,000+' },
      { label: 'Queries Solved', value: '82,000,000' },
      { label: 'Avg Rating', value: '4.98 / 5.0' }
    ],
    primaryColor: '#00f0ff',
    secondaryColor: '#3b82f6',
    ambientHex: 'rgba(0, 240, 255, 0.25)'
  }
];

export const PARTICLE_COUNT = 24000;

/**
 * Generate 3D vertex positions (Float32Array of length PARTICLE_COUNT * 3) for each stage
 */
export function generateStagePositions(count: number): Float32Array[] {
  const stages: Float32Array[] = [];

  // 0. Hero: Vast undulating wave terrain
  const p0 = new Float32Array(count * 3);
  const gridSize = Math.ceil(Math.sqrt(count));
  const spacing = 160 / gridSize;
  let idx = 0;
  for (let i = 0; i < gridSize && idx < count; i++) {
    for (let j = 0; j < gridSize && idx < count; j++) {
      const x = (i - gridSize / 2) * spacing;
      const z = (j - gridSize / 2) * spacing - 10;
      const dist = Math.sqrt(x * x + z * z);
      const y = Math.sin(x * 0.08) * 4.5 + Math.cos(z * 0.08) * 3.5 - (dist * 0.04);
      p0[idx * 3] = x;
      p0[idx * 3 + 1] = y - 4;
      p0[idx * 3 + 2] = z;
      idx++;
    }
  }
  stages.push(p0);

  // 1. Synapse / Helix: Double helix & interconnected synapse chain
  const p1 = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const isBridge = (i % 8) === 0;
    const t = (i / count) * Math.PI * 14;
    const strand = (i % 2 === 0) ? 1 : -1;
    const radius = 18;
    const height = ((i / count) - 0.5) * 85;

    if (isBridge) {
      const bridgeT = Math.random();
      const angle1 = t;
      const angle2 = t + Math.PI;
      const x1 = Math.cos(angle1) * radius;
      const z1 = Math.sin(angle1) * radius;
      const x2 = Math.cos(angle2) * radius;
      const z2 = Math.sin(angle2) * radius;
      p1[i * 3] = x1 + (x2 - x1) * bridgeT + (Math.random() - 0.5) * 2;
      p1[i * 3 + 1] = height + (Math.random() - 0.5) * 2;
      p1[i * 3 + 2] = z1 + (z2 - z1) * bridgeT + (Math.random() - 0.5) * 2;
    } else {
      const angle = strand === 1 ? t : t + Math.PI;
      const spread = (Math.random() - 0.5) * 4.5;
      p1[i * 3] = Math.cos(angle) * (radius + spread);
      p1[i * 3 + 1] = height + spread;
      p1[i * 3 + 2] = Math.sin(angle) * (radius + spread);
    }
  }
  stages.push(p1);

  // 2. Gateway / Neural Arch: High parabolic arch of light
  const p2 = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = (i / count) * 2 - 1; // -1 to 1
    const archAngle = u * Math.PI * 0.85;
    const archRadius = 26 + (Math.random() - 0.5) * 6;
    const x = Math.sin(archAngle) * archRadius;
    const y = Math.cos(archAngle) * (archRadius * 1.15) - 10;
    const z = (Math.random() - 0.5) * 28;
    p2[i * 3] = x + (Math.random() - 0.5) * 2;
    p2[i * 3 + 1] = y + (Math.random() - 0.5) * 2;
    p2[i * 3 + 2] = z;
  }
  stages.push(p2);

  // 3. Nuclei / Twin Orbiting Spheres (Dual Mastery)
  const p3 = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const isSphere1 = i % 2 === 0;
    const centerX = isSphere1 ? -22 : 22;
    const centerY = isSphere1 ? 2 : -2;
    const centerZ = 0;

    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = Math.cbrt(Math.random()) * 16;
    const sinPhi = Math.sin(phi);

    // Orbiting thread between them for 15% of particles
    if (i % 7 === 0) {
      const threadT = Math.random();
      p3[i * 3] = -22 + threadT * 44 + (Math.random() - 0.5) * 5;
      p3[i * 3 + 1] = Math.sin(threadT * Math.PI) * 8 + (Math.random() - 0.5) * 4;
      p3[i * 3 + 2] = Math.cos(threadT * Math.PI * 2) * 6 + (Math.random() - 0.5) * 4;
    } else {
      p3[i * 3] = centerX + r * sinPhi * Math.cos(theta);
      p3[i * 3 + 1] = centerY + r * sinPhi * Math.sin(theta);
      p3[i * 3 + 2] = centerZ + r * Math.cos(phi);
    }
  }
  stages.push(p3);

  // 4. Ribbon / S-Curve Golden Flow (Infinite Horizon)
  const p4 = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = (i / count) * 4 - 2; // -2 to 2
    const x = t * 38;
    const y = Math.sin(t * 2.2) * 14 + (Math.random() - 0.5) * 5;
    const z = Math.cos(t * 1.8) * 22 + (Math.random() - 0.5) * 12;
    p4[i * 3] = x;
    p4[i * 3 + 1] = y;
    p4[i * 3 + 2] = z;
  }
  stages.push(p4);

  // 5. Vortex / Swirling Conical Tornado (Independent Reasoning)
  const p5 = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const fraction = i / count;
    const height = (fraction - 0.5) * 70;
    const radius = 3 + fraction * 32;
    const angle = fraction * Math.PI * 24;
    p5[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 4;
    p5[i * 3 + 1] = height;
    p5[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 4;
  }
  stages.push(p5);

  // 6. Laser / Singularity (Capacity to Simplify)
  const p6 = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const x = ((i / count) - 0.5) * 130;
    // Central core tightly bounded, outer halo gently vibrating
    const isCore = i % 3 === 0;
    const yVariance = isCore ? 0.35 : Math.sin(x * 0.15) * 1.8 + (Math.random() - 0.5) * 1.2;
    const zVariance = isCore ? 0.35 : (Math.random() - 0.5) * 3;
    p6[i * 3] = x;
    p6[i * 3 + 1] = yVariance;
    p6[i * 3 + 2] = zVariance;
  }
  stages.push(p6);

  // 7. Crystalline Cage / Polyhedron (Zero Dependencies)
  const p7 = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const isCore = i % 5 === 0;
    if (isCore) {
      // Inner glowing nucleus
      const r = Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      p7[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p7[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p7[i * 3 + 2] = r * Math.cos(phi);
    } else {
      // Geodesic shell ribs
      const radius = 24;
      const theta = (i / count) * Math.PI * 16;
      const phi = ((i % 30) / 30) * Math.PI;
      const x = radius * Math.sin(phi) * Math.cos(theta) + (Math.random() - 0.5) * 2;
      const y = radius * Math.sin(phi) * Math.sin(theta) + (Math.random() - 0.5) * 2;
      const z = radius * Math.cos(phi) + (Math.random() - 0.5) * 2;
      p7[i * 3] = x;
      p7[i * 3 + 1] = y;
      p7[i * 3 + 2] = z;
    }
  }
  stages.push(p7);

  // 8. Finale / Frontier Horizon
  const p8 = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.pow(Math.random(), 0.5) * 65;
    const x = Math.cos(angle) * dist;
    const z = Math.sin(angle) * dist - 15;
    const y = Math.sin(dist * 0.15) * 6 - 5 + (Math.random() - 0.5) * 3;
    p8[i * 3] = x;
    p8[i * 3 + 1] = y;
    p8[i * 3 + 2] = z;
  }
  stages.push(p8);

  return stages;
}
