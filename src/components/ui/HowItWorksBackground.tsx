"use client";

import { useEffect, useRef } from "react";

/**
 * How It Works background — ambient green atmosphere (no beams/lines).
 * Soft drifting orbs + haze, quiet vignette, readable over content.
 */

const VERTEX_SHADER = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;
#define FC gl_FragCoord.xy
#define R resolution
#define T (time * .28)

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.05;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = FC / R;
  vec2 p = (FC - .5 * R) / min(R.x, R.y);

  // drifting fog field
  vec2 fogUv = p * 1.6 + vec2(T * .12, -T * .08);
  float fog = fbm(fogUv);
  fog = smoothstep(0.25, 0.85, fog);

  // soft orbs (no hard edges / no beams)
  float orb1 = exp(-length(p - vec2(sin(T * .4) * .35, cos(T * .3) * .25)) * 2.8);
  float orb2 = exp(-length(p - vec2(-.4 + cos(T * .25) * .15, .15 + sin(T * .35) * .2)) * 3.4);
  float orb3 = exp(-length(p - vec2(.25, -.35 + sin(T * .2) * .12)) * 2.2);
  float orbs = orb1 * .55 + orb2 * .4 + orb3 * .35;

  // gentle breath pulse at center
  float breath = 0.5 + 0.5 * sin(T * 1.1);
  float center = exp(-dot(p, p) * 1.8) * (0.18 + breath * 0.06);

  float glow = fog * 0.35 + orbs + center;

  vec3 deep   = vec3(0.01, 0.04, 0.02);
  vec3 mid    = vec3(0.04, 0.22, 0.10);
  vec3 bright = vec3(0.18, 0.72, 0.38);   // softened #4AFF7A
  vec3 pale   = vec3(0.45, 0.85, 0.62);

  vec3 col = mix(deep, mid, clamp(glow, 0.0, 1.0));
  col = mix(col, bright, clamp(glow - 0.45, 0.0, 1.0) * 0.55);
  col = mix(col, pale, clamp(orbs - 0.35, 0.0, 1.0) * 0.25);

  // tiny grain so it doesn’t feel flat
  col += (hash(FC + T) - 0.5) * 0.018;

  // vignette — keep edges dark / clean
  vec2 q = uv * (1.0 - uv.yx);
  float vig = pow(q.x * q.y * 14.0, 0.55);
  col *= mix(0.35, 1.0, vig);

  // force pure black at the top (uv.y = 1 at top)
  float topFade = smoothstep(1.0, 0.72, uv.y);
  col *= topFade;

  O = vec4(col, 1.0);
}`;

export default function HowItWorksBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, "time");
    const resolutionLoc = gl.getUniformLocation(program, "resolution");

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let running = true;
    const start = performance.now();

    const render = () => {
      if (!running) return;
      gl.uniform1f(timeLoc, (performance.now() - start) / 1000);
      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(render);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    raf = requestAnimationFrame(render);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-55" />

      {/* Soft readability veil — no grid, no lines */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 65% at 50% 55%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.72) 100%)",
        }}
      />

      {/* Start at pure black — seamless handoff from About */}
      <div
        className="absolute inset-x-0 top-0 h-48 md:h-72"
        style={{
          background:
            "linear-gradient(to bottom, #000000 0%, #000000 28%, rgba(0,0,0,0.85) 52%, rgba(0,0,0,0.4) 75%, transparent 100%)",
        }}
      />
    </div>
  );
}
