import{B as e,G as t,M as n,R as r,a as i,m as a,p as o,v as s,z as c}from"./ships-CigQLMOe.js";var l=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,u=`
  precision mediump float;
  varying vec2 vUv;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uDensity;
  uniform float uSeed;
  uniform float uTime;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21) + uSeed);
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
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
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = p * 2.03 + vec2(17.1, 9.7);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 p = vUv * 22.0;
    float n1 = fbm(p + uTime * 0.01);
    float n2 = fbm(p * 1.6 + vec2(5.2, 1.3) - uTime * 0.008);
    float cloud = smoothstep(0.32, 0.78, n1) * uDensity * 1.2;
    vec3 col = mix(uColorA, uColorB, smoothstep(0.3, 0.8, n2)) * cloud;
    // faint background glow
    col += uColorA * 0.06 * n2;
    // round twinkling stars
    vec2 grid = vUv * 2200.0;
    vec2 cell = floor(grid);
    vec2 f = fract(grid) - 0.5;
    float s = hash(cell);
    float star = step(0.9975, s) * smoothstep(0.42, 0.05, length(f)) * (0.55 + 0.45 * sin(uTime * 2.0 + s * 60.0));
    col += vec3(star) * (0.6 + 0.4 * hash(cell + 3.0));
    gl_FragColor = vec4(col, 1.0);
  }
`;function d(e,i=9e3){let a=new s().setHSL(e.hue/360,.65,.42),o=new s().setHSL(e.hue2/360,.7,.48),c=new t({vertexShader:l,fragmentShader:u,uniforms:{uColorA:{value:a},uColorB:{value:o},uDensity:{value:e.density},uSeed:{value:e.seed%1e3/1e3},uTime:{value:0}},depthWrite:!1}),d=new n(new r(i,i),c);return d.rotation.x=-Math.PI/2,d.position.y=-260,d.renderOrder=-10,{mesh:d,material:c}}function f(t=700,n=5e3){let r=new Float32Array(t*3);for(let e=0;e<t;e++)r[e*3]=(Math.random()-.5)*n*2,r[e*3+1]=-120-Math.random()*120,r[e*3+2]=(Math.random()-.5)*n*2;let s=new a;s.setAttribute(`position`,new o(r,3));let l=i(16777215);return new c(s,new e({color:16777215,size:5,sizeAttenuation:!0,transparent:!0,opacity:.8,map:l??void 0,alphaMap:l??void 0,depthWrite:!1,blending:2}))}export{f as n,d as t};