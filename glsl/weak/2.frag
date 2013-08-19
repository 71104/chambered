precision mediump float;

uniform sampler2D Texture;

varying vec2 ex_TexCoord;
varying float ex_fDistance;

float PI = acos(-1.0);

vec4 Attenuate(vec4 Color, float fDistance) {
	float fAttenuation = (-atan((fDistance - 6.0) * 0.3) + PI / 2.0) * 0.3183098861;
	return vec4(vec3(Color) * fAttenuation * 0.5, Color.a);
}

void main() {
	gl_FragColor = Attenuate(texture2D(Texture, ex_TexCoord), ex_fDistance);
}
