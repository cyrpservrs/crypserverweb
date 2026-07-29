"use client";

import { useEffect, useRef } from "react";

/**
 * WebGL2 raymarched blocks background for the About section.
 * Fragment shader from a CodePen by Matthias Hurrle (@atzedent),
 * re-tinted metallic green for Crypserver.
 *
 * - Fixed straight camera (no yaw / tilt)
 * - Pulled ~50% further back for a distant look
 * - Reduced resolution + pauses when off-screen
 */

const VERTEX_SHADER = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

const FRAGMENT_SHADER = `#version 300 es
/*********
* made by Matthias Hurrle (@atzedent)
* green-tinted for Crypserver
*/
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;
uniform vec2 move;
uniform vec2 wheel;
#define FC gl_FragCoord.xy
#define R resolution
#define T (25.+time)
#define S smoothstep
#define N normalize
#define MN min(R.x,R.y)
#define rnd(p) fract(sin(dot(p,vec2(12.9898,78.233)))*345678.)
#define rot(a) mat2(cos((a)-vec4(0,11,33,0)))
float box(vec3 p, vec3 s, float r) {
	p=abs(p)-s+r;
	return length(max(p,.0))+min(.0,max(max(p.x,p.y),p.z))-r;
}
float map(vec3 p) {
	vec3 q=cos(p*1.8+5e2);
	float s=sign(p.y);
	p.y=abs(p.y)-2.5;
	vec2 id=floor(p.xz-s);
	if (mod(id.y,2.)==.0) {
		p.x-=T*.5;
		id.x=floor(p.x-s);
	}
	float f=1.-dot(abs(fract(p*42.)-.5)-.25,vec3(1))*.5;
	p.xz=fract(p.xz-s)-.5;
	return box(p,vec3(.1+.3*rnd(id),2.-.6*rnd(id),.2),f*f*.0125)-1e-3*f;
}
vec3 norm(vec3 p) {
	float h=1e-3; vec2 k=vec2(-1,1);
	return N(
		k.xyy*map(p+k.xyy*h)+
		k.yxy*map(p+k.yxy*h)+
		k.yyx*map(p+k.yyx*h)+
		k.xxx*map(p+k.xxx*h)
	);
}
bool march(inout vec3 p, vec3 rd, out float dd) {
	for (int i; i++<400;) {
		float d=map(p);
		if (abs(d)<1e-3) return true;
		if (dd>15.) return false;
		p+=rd*d*.5;
		dd+=d*.5;
	}
	return false;
}
float occ(vec3 p, vec3 n, float d) {
	return clamp(map(p+n*d)/d,.0,1.);
}
vec3 dir(vec2 uv, vec3 p, vec3 t, float z) {
	vec3 up=vec3(0,1,0),
	f=N(t-p),
	r=N(cross(up,f)),
	u=N(cross(f,r));
	return mat3(r,u,f)*N(vec3(uv,z));
}
vec3 render(vec2 uv) {
	vec3 col=vec3(0),
	// ~50% further back than original (-23.5 -> -35.25), slight z drift only
	p=vec3(0,-.15,-35.25-wheel.y/MN-50.*sin(T*5e-3));
	// look straight down the corridor — no yaw / degree rotation
	vec3 rd=dir(uv,p,vec3(0,0.,0),1.35), lp=p;
	lp.z+=.5;
	float dd;
	if (march(p,rd,dd)) {
		vec3 n=norm(p), l=N(lp-p);
		float ndl=clamp(dot(l,n),.0,1.),
		// stronger, tighter specular for brushed-metal look
		spe=pow(clamp(dot(N(lp-rd),n),.0,1.),48.),
		fres=pow(1.-clamp(dot(-rd,n),.0,1.),3.),
		ao=occ(p,n,.5)*.8*occ(p,n,1.),
		ld=distance(lp,p), atten=1./(1.+ld*.25+ld*ld*.125);
		// cool metallic silver-green base + green edge tint
		vec3 metal=vec3(.55,.62,.58);
		vec3 greenEdge=vec3(.18,.85,.42);
		vec3 mat=mix(metal,greenEdge,.22+fres*.35);
		col+=.04+ndl*mat*ao*atten*1.15;
		col+=spe*(vec3(.85,.95,.88)+greenEdge*.25)*atten*1.4;
		col+=fres*greenEdge*.12*atten;
	}
	col=mix(vec3(0),col,exp(-125e-5*dd*dd*dd));
	col=tanh(col*col);
	col=sqrt(col);
	col=mix(vec3(0),col,min(time*.3,1.));
	// vignette
	vec2 c=FC/R;
	c*=1.-c.yx;
	float vig=c.x*c.y*25.;
	vig=pow(vig,.5);
	col*=vig;
	return col;
}
void main() {
	// lock a wide cinematic framing (like the original pen on a wide screen)
	// regardless of the actual canvas aspect ratio
	vec2 uv=(FC/R-.5)*vec2(2.8,1.);
	vec3 col=render(uv);
	O=vec4(col,1);
}`;

export default function AboutShaderBackground() {
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
      new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]),
      gl.STATIC_DRAW
    );
    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, "time");
    const resolutionLoc = gl.getUniformLocation(program, "resolution");
    const moveLoc = gl.getUniformLocation(program, "move");
    const wheelLoc = gl.getUniformLocation(program, "wheel");

    // Heavy raymarcher: render at reduced resolution (pen default is half res)
    const dpr = Math.min(window.devicePixelRatio || 1, 1) * 0.75;

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
      gl.uniform2f(moveLoc, 0, 0);
      gl.uniform2f(wheelLoc, 0, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };

    // Pause when the About section is off-screen (this shader is expensive)
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
