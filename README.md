# Oneiros-26

Oneiros-26 is an immersive 3D festival web experience built with React, Vite, and Three.js.  
The project combines a cinematic real-time scene, adaptive quality scaling, and progressive loading to deliver a premium visual identity while maintaining strong performance across mobile and desktop devices.

## Overview

The application is designed around a full-screen interactive world:

- Neon retro-futuristic environment with animated shader floor and atmospheric depth
- 3D scene navigation and character-driven exploration
- Section-based content overlays (About, Events, Gallery, Schedule, Sponsors, Contact)
- Device-aware rendering quality profiles for stable cross-device experience

## Core Architecture

The codebase is intentionally modular and split by responsibility:

- **UI Layer (React):** App shell, navigation, overlays, preloader, and section components
- **3D Runtime (Three.js):** Scene creation, model loading, controls, effects, and animation loop
- **Scene Modules:** Isolated map systems for loading, markers, quality, atmosphere, post-processing, and enhancement logic

This separation enables rapid iteration on visuals without coupling scene logic to UI components.

## Rendering & Experience Pipeline

The 3D pipeline follows a staged initialization strategy:

1. Basic scene initialization and first paint
2. Deferred heavy module loading (post-processing + GLTF loader)
3. Parallel model asset loading
4. Runtime activation of enhanced effects based on device capability

Visual stack includes:

- Cinematic key/rim/fill lighting
- Exponential fog and ambient depth layers
- Starfield and lightweight particle systems
- Unreal Bloom + vignette post-processing
- Model-specific enhancement hooks for emissive flicker and subtle effects

## Adaptive Quality System

The runtime auto-selects **LOW / MEDIUM / HIGH** tiers using:

- Device type heuristics (UA + viewport)
- GPU renderer fingerprint (when available)
- Device memory and hardware concurrency

Quality profile controls:

- Pixel ratio cap
- Bloom enable/strength
- Particle density and visibility
- Shader usage fallback paths
- Dynamic light and shadow intensity

An FPS safety monitor automatically downgrades quality when sustained low frame rate is detected.

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **3D Engine:** Three.js
- **Styling:** Tailwind CSS + component-level CSS
- **Tooling:** ESLint, TypeScript build mode

## Project Structure

High-value directories and files:

- `src/App.tsx` — App shell and page routing overlays
- `src/components/Map.tsx` — Main scene orchestrator
- `src/components/map/` — Modular 3D systems (`quality`, `loading`, `postprocessing`, `atmosphere`, `markers`, `input`, `neon`, `sceneEnhancements`)
- `public/` — Static assets and GLTF/WebM resources

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Performance Strategy

The project prioritizes startup and runtime efficiency through:

- Progressive scene boot sequence
- Dynamic import code-splitting for heavy Three.js modules
- Parallelized asset loading flow
- Adaptive visual quality by device capability
- Controlled post-processing and particle budgets

This strategy keeps visual quality high on capable hardware while preserving usability on constrained devices.

## License

This repository is private and intended for the Oneiros-26 project team.
