precision mediump float;

uniform sampler2D Texture;

varying vec2 ex_TexCoord;
varying float ex_fDistance;

vec4 Attenuate(vec4 Color, float fDistance) {
	float fAttenuation = (-atan((fDistance - 6.0) * 0.3) + 1.5707963267) * 0.3183098861;
	return vec4(vec3(Color) * fAttenuation, Color.a);
}

void main() {
	gl_FragColor = Attenuate(texture2D(Texture, ex_TexCoord), ex_fDistance);
}
