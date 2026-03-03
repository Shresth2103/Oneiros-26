import * as THREE from 'three';

export const createNeonGridMaterial = () => {
  return new THREE.ShaderMaterial({
    uniforms: {
      color1: { value: new THREE.Color(0x00ffec) },
      color2: { value: new THREE.Color(0xff00ff) },
      time: { value: 0 },
    },
    vertexShader: `
      varying vec3 vWorldPos;
      uniform float time;

      void main() {
        vec3 displaced = position;
        float wave = sin(position.x * 0.12 + time * 0.7) * 0.035
                   + cos(position.z * 0.10 + time * 0.55) * 0.03;
        displaced.y += wave;

        vec4 worldPosition = modelMatrix * vec4(displaced, 1.0);
        vWorldPos = worldPosition.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 color1;
      uniform vec3 color2;
      uniform float time;
      varying vec3 vWorldPos;

      void main() {
        vec2 coord = vWorldPos.xz * 0.5;
        vec2 camOffset = vWorldPos.xz - cameraPosition.xz;
        float distSq = dot(camOffset, camOffset);
        float fogFactor = clamp(exp(-distSq * 0.001225), 0.0, 1.0);

        vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
        float line = min(grid.x, grid.y);
        float core = clamp(1.2 - line, 0.0, 1.0);
        float glow = clamp(1.0 - line * 0.1666, 0.0, 1.0);
        float gridAlpha = core + (glow * 0.4);

        float pulse = 0.92 + sin(time * 0.7) * 0.08;
        float mixVal = sin(vWorldPos.x * 0.1 + time * 0.08) * cos(vWorldPos.z * 0.1 - time * 0.06) * 0.5 + 0.5;
        vec3 gridCol = mix(color1, color2, mixVal) * (2.4 * pulse);

        vec3 baseCol = vec3(0.018, 0.018, 0.028);
        vec3 finalCol = mix(vec3(0.0), mix(baseCol, gridCol, gridAlpha), fogFactor);
        gl_FragColor = vec4(finalCol, 1.0);
      }
    `,
    transparent: false,
    depthWrite: true,
  });
};
