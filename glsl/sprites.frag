precision mediump float;

uniform sampler2D Texture;

varying float ex_fType;
varying vec2 ex_Vertex;

vec4 Attenuate(vec4 Color) {
	float fDistance = length(ex_Vertex);
	float Attenuation = (-atan((fDistance - 6.0) * 0.3) + 1.5707963267) * 0.3183098861;
	return vec4(vec3(Color) * Attenuation, Color.a);
}

void main() {
	vec4 Sample = Attenuate(texture2D(Texture, ex_Vertex + vec2(ex_fType, 0)));
	if (Sample.a < 0.5) {
		discard;
	} else {
		gl_FragColor = Sample;
	}
}
