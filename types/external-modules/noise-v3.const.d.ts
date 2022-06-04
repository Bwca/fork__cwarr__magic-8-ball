export declare const NOISE_V3 = "\n//\tSimplex 4D Noise \n//\tby Ian McEwan, Ashima Arts\n//\nvec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}\nfloat permute(float x){return floor(mod(((x*34.0)+1.0)*x, 289.0));}\nvec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}\nfloat taylorInvSqrt(float r){return 1.79284291400159 - 0.85373472095314 * r;}\n\nvec4 grad4(float j, vec4 ip){\nconst vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);\nvec4 p,s;\n\np.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;\np.w = 1.5 - dot(abs(p.xyz), ones.xyz);\ns = vec4(lessThan(p, vec4(0.0)));\np.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www; \n\nreturn p;\n}\n\nfloat snoise(vec4 v){\nconst vec2  C = vec2( 0.138196601125010504,  // (5 - sqrt(5))/20  G4\n                      0.309016994374947451); // (sqrt(5) - 1)/4   F4\n// First corner\nvec4 i  = floor(v + dot(v, C.yyyy) );\nvec4 x0 = v -   i + dot(i, C.xxxx);\n\n// Other corners\n\n// Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)\nvec4 i0;\n\nvec3 isX = step( x0.yzw, x0.xxx );\nvec3 isYZ = step( x0.zww, x0.yyz );\n//  i0.x = dot( isX, vec3( 1.0 ) );\ni0.x = isX.x + isX.y + isX.z;\ni0.yzw = 1.0 - isX;\n\n//  i0.y += dot( isYZ.xy, vec2( 1.0 ) );\ni0.y += isYZ.x + isYZ.y;\ni0.zw += 1.0 - isYZ.xy;\n\ni0.z += isYZ.z;\ni0.w += 1.0 - isYZ.z;\n\n// i0 now contains the unique values 0,1,2,3 in each channel\nvec4 i3 = clamp( i0, 0.0, 1.0 );\nvec4 i2 = clamp( i0-1.0, 0.0, 1.0 );\nvec4 i1 = clamp( i0-2.0, 0.0, 1.0 );\n\n//  x0 = x0 - 0.0 + 0.0 * C \nvec4 x1 = x0 - i1 + 1.0 * C.xxxx;\nvec4 x2 = x0 - i2 + 2.0 * C.xxxx;\nvec4 x3 = x0 - i3 + 3.0 * C.xxxx;\nvec4 x4 = x0 - 1.0 + 4.0 * C.xxxx;\n\n// Permutations\ni = mod(i, 289.0); \nfloat j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);\nvec4 j1 = permute( permute( permute( permute (\n           i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))\n         + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))\n         + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))\n         + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));\n// Gradients\n// ( 7*7*6 points uniformly over a cube, mapped onto a 4-octahedron.)\n// 7*7*6 = 294, which is close to the ring size 17*17 = 289.\n\nvec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;\n\nvec4 p0 = grad4(j0,   ip);\nvec4 p1 = grad4(j1.x, ip);\nvec4 p2 = grad4(j1.y, ip);\nvec4 p3 = grad4(j1.z, ip);\nvec4 p4 = grad4(j1.w, ip);\n\n// Normalise gradients\nvec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\np0 *= norm.x;\np1 *= norm.y;\np2 *= norm.z;\np3 *= norm.w;\np4 *= taylorInvSqrt(dot(p4,p4));\n\n// Mix contributions from the five corners\nvec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);\nvec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);\nm0 = m0 * m0;\nm1 = m1 * m1;\nreturn 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))\n             + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;\n\n}\n";