import React, { useMemo } from 'react';

/**
 * Pure CSS/HTML star field background.
 *
 * Unlike a Three.js canvas, CSS transform animations run on the browser's
 * compositor thread — they are 100% immune to JavaScript main-thread blocking
 * caused by heavy GLTF parsing in Map.tsx.
 */
const CosmicBackground: React.FC = () => {
    const stars = useMemo(() => {
        const layers: React.ReactNode[] = [];

        // Three layers of stars with different sizes and animation speeds
        // to create a parallax depth effect
        const layerConfigs = [
            { count: 200, sizeMin: 0.5, sizeMax: 1.5, duration: 120, opacity: 0.9 },
            { count: 150, sizeMin: 1.0, sizeMax: 2.5, duration: 180, opacity: 0.7 },
            { count: 80, sizeMin: 1.5, sizeMax: 3.0, duration: 240, opacity: 0.5 },
        ];

        layerConfigs.forEach((layer, layerIdx) => {
            const starDots: React.ReactNode[] = [];
            for (let i = 0; i < layer.count; i++) {
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                const size = layer.sizeMin + Math.random() * (layer.sizeMax - layer.sizeMin);

                // Random color: mostly white, some cyan, some purple
                const rand = Math.random();
                let color = 'rgba(255,255,255,';
                if (rand > 0.7) color = 'rgba(0,255,235,';
                else if (rand > 0.5) color = 'rgba(170,0,255,';

                const twinkleDelay = Math.random() * 3;

                starDots.push(
                    <div
                        key={`star-${layerIdx}-${i}`}
                        style={{
                            position: 'absolute',
                            left: `${x}%`,
                            top: `${y}%`,
                            width: `${size}px`,
                            height: `${size}px`,
                            borderRadius: '50%',
                            background: `${color}${layer.opacity})`,
                            boxShadow: `0 0 ${size * 2}px ${color}0.6)`,
                            animation: `cosmic-twinkle ${2 + Math.random() * 3}s ease-in-out ${twinkleDelay}s infinite alternate`,
                            willChange: 'opacity',
                        }}
                    />
                );
            }

            layers.push(
                <div
                    key={`layer-${layerIdx}`}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        animation: `cosmic-rotate ${layer.duration}s linear infinite`,
                        willChange: 'transform',
                    }}
                >
                    {starDots}
                </div>
            );
        });

        return layers;
    }, []);

    return (
        <div
            className="cosmic-background"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
                overflow: 'hidden',
            }}
        >
            {stars}
        </div>
    );
};

export default CosmicBackground;
