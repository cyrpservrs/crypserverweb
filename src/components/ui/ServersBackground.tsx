"use client";

import { useEffect, useRef } from "react";

/**
 * Pricing / Servers background — clean, simple, lightly animated.
 * Soft drifting green wash + gentle breath pulse. No busy grid/hex.
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
#define T (time * .22)

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  vec2 uv = FC / R;
  vec2 p = (FC - .5 * R) / min(R.x, R.y);

  // slow drifting soft orbs
  float o1 = exp(-length(p - vec2(sin(T * .35) * .25, cos(T * .28) * .18)) * 2.2);
  float o2 = exp(-length(p - vec2(-.35 + cos(T * .22) * .12, .2 + sin(T * .3) * .1)) * 2.6);
  float o3 = exp(-length(p - vec2(.3, -.28 + sin(T * .18) * .08)) * 2.0);

  // gentle center breath
  float breath = 0.5 + 0.5 * sin(T * 0.9);
  float center = exp(-dot(p * vec2(1.1, 1.35), p * vec2(1.1, 1.35)) * 1.4) * (0.14 + breath * 0.05);

  float glow = o1 * .35 + o2 * .28 + o3 * .22 + center;

  vec3 deep = vec3(0.0, 0.0, 0.0);
  vec3 mid  = vec3(0.05, 0.10, 0.07);
  vec3 soft = vec3(0.12, 0.22, 0.15);
  vec3 tip  = vec3(0.18, 0.45, 0.28);

  vec3 col = mix(deep, mid, clamp(glow * 1.4, 0.0, 1.0));
  col = mix(col, soft, smoothstep(0.15, 0.55, glow) * 0.7);
  col = mix(col, tip, smoothstep(0.35, 0.8, glow) * 0.35);

  // very light grain
  col += (hash(FC + fract(T)) - 0.5) * 0.012;

  // soft vignette
  vec2 q = uv * (1.0 - uv.yx);
  float vig = pow(q.x * q.y * 14.0, 0.55);
  col *= mix(0.45, 1.0, vig);

  // force pure black at the top of the section (uv.y = 1 at top)
  float topFade = smoothstep(1.0, 0.72, uv.y);
  col *= topFade;

  O = vec4(col, 1.0);
}`;

export default function ServersBackground() {
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

      {/* Clean readability veil */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 65% at 50% 55%, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Start at pure black — long dissolve downward so no green seam */}
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
