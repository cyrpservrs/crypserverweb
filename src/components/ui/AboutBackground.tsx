"use client";

import { useEffect, useRef } from "react";

/**
 * Clean About-section background — same family as the hero shader
 * (diagonal metallic beams), but quieter: slower, fewer beams,
 * no grid squares, metallic green-gray tint, stronger vignette.
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
#define T (time*.55)
#define MN min(R.x,R.y)

float beam(vec2 uv, float offset) {
  uv.x += offset;
  // animated wobble along the beam
  uv.x += sin(T*(.35)+uv.y*.9)*.04;
  uv.x += sin(T*(.55)+uv.y*1.4)*.02;
  float core = .0045 / abs(uv.x);
  float halo = .035 * exp(-uv.x*uv.x*8.0);
  return core + halo;
}

vec3 scene(vec2 uv) {
  vec3 col = vec3(0);
  float a = radians(-48.0);
  uv = mat2(cos(a), -sin(a), sin(a), cos(a)) * uv;
  // drifting motion along the beam direction
  uv.y += T * .07;

  for (float i = .0; i < 3.; i++) {
    int k = int(mod(i, 3.));
    // each beam drifts slightly differently
    float drift = sin(T * (.4 + i * .15) + i) * .04;
    col[k] += beam(uv, (i - 1.) * .24 + drift);
  }
  return col;
}

vec3 greenTint(vec3 c) {
  float l = c.r + c.g + c.b;
  // match home page beam colors
  vec3 deep   = vec3(0.02, 0.35, 0.12);
  vec3 bright = vec3(0.29, 1.00, 0.478);  // #4AFF7A
  vec3 pale   = vec3(0.714, 1.00, 0.80);  // #B6FFCC
  vec3 g = mix(deep, bright, clamp(l, 0.0, 1.0));
  g = mix(g, pale, clamp(l - 1.0, 0.0, 1.0));
  return g * l * 0.7;
}

void main() {
  vec2 uv = (FC - .5 * R) / MN;
  vec3 col = scene(uv);
  col = greenTint(col);

  // soft vignette — keeps section clean / readable
  vec2 q = FC / R;
  q *= 1. - q.yx;
  float vig = pow(q.x * q.y * 18., .55);
  col *= vig;

  O = vec4(col, 1);
}`;

export default function AboutBackground() {
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
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50" />

      {/* Soft ambient wash — metallic green, fades fully into black */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 42%, rgba(143,170,146,0.07) 0%, transparent 68%)",
        }}
      />

      {/* Readability + endless edge dissolve into pure black */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 75% at 50% 45%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 55%, #000000 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-40 md:h-56"
        style={{
          background:
            "linear-gradient(to bottom, #000000 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.4) 65%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-48 md:h-72"
        style={{
          background:
            "linear-gradient(to top, #000000 0%, rgba(0,0,0,0.9) 28%, rgba(0,0,0,0.5) 55%, transparent 100%)",
        }}
      />
    </div>
  );
}
