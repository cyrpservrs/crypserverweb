"use client";

import { useEffect, useRef } from "react";

/**
 * WebGL2 shader background.
 * Fragment shader adapted from a CodePen by Matthias Hurrle (@atzedent),
 * re-tinted to the Crypserver green palette (#4AFF7A / #B6FFCC).
 */

const VERTEX_SHADER = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `#version 300 es
/*********
* made by Matthias Hurrle (@atzedent)
* green-tinted for Crypserver
*/
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;
#define FC gl_FragCoord.xy
#define R resolution
#define T (time*.6)
#define S smoothstep
#define MN min(R.x,R.y)
#define SE(v,s) S(s+1./MN,s-1./MN,v)
float pattern(vec2 uv) {
  float d=.0;
  for (float i=.0; i<3.; i++) {
    // gentle wobble so the beams breathe, but stay straight
    uv.x+=sin(T*(.25+i*.15)+uv.y*.8)*.05;
    d+=.005/abs(uv.x);          // sharp bright core line
    d+=.04*exp(-uv.x*uv.x*6.0); // soft blurred halo around it
  }
  return d;
}
vec3 scene(vec2 uv) {
  vec3 col=vec3(0);
  // linear diagonal beams instead of the spiral tunnel
  float a=radians(-52.0);
  uv=mat2(cos(a),-sin(a),sin(a),cos(a))*uv;
  uv.y+=T*.08; // slow drift along the beam direction
  for (float i=.0; i<3.; i++) {
    int k=int(mod(i,3.));
    col[k]+=pattern(uv+vec2((i-1.)*.22,0.));
  }
  return col;
}
vec3 greenTint(vec3 c) {
  float l = c.r + c.g + c.b;
  vec3 deep   = vec3(0.02, 0.35, 0.12);   // dark green
  vec3 bright = vec3(0.29, 1.00, 0.478);  // #4AFF7A
  vec3 pale   = vec3(0.714, 1.00, 0.80);  // #B6FFCC
  vec3 g = mix(deep, bright, clamp(l, 0.0, 1.0));
  g = mix(g, pale, clamp(l - 1.0, 0.0, 1.0));
  return g * l * 0.7; // 30% darker
}
void main() {
  vec2 uv=(FC-.5*R)/MN;
  vec3 col=vec3(0);
  float s=12., e=9e-4;
  col+=e/(sin(uv.x*s)*cos(uv.y*s));
  uv.y+=R.x>R.y?.5:.5*(R.y/R.x);
  col+=scene(uv);
  O=vec4(greenTint(col),1);
}`;

export default function ShaderBackground() {
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

    // Fullscreen triangle
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

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
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

    // Pause rendering when the canvas is off-screen (performance)
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
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
