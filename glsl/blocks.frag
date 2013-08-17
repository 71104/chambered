precision mediump float;

uniform sampler2D Texture;

varying vec2 ex_TexCoord;
varying float ex_fDistance;
varying float ex_fBrightness;

vec4 Attenuate(vec4 Color, float fDistance) {
	float fAttenuation = (-atan((fDistance - 6.0) * 0.3) + 1.5707963267) * 0.3183098861;
	return vec4(vec3(Color) * fAttenuation, Color.a);
}

void main() {
	vec4 Sampled = texture2D(Texture, ex_TexCoord);
	vec4 Lighted = vec4(vec3(Sampled) * ex_fBrightness, Sampled.a);
	gl_FragColor = Attenuate(Lighted, ex_fDistance);
}
