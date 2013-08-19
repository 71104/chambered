precision mediump float;

uniform sampler2D Texture;

varying float ex_fType;
varying vec2 ex_Vertex;

float PI = acos(-1.0);

vec4 Attenuate(vec4 Color) {
	float fDistance = length(ex_Vertex);
	float Attenuation = (-atan((fDistance - 6.0) * 0.3) + PI / 2.0) * 0.3183098861;
	return vec4(vec3(Color) * Attenuation, Color.a);
}

void main() {
	vec4 Sample = Attenuate(texture2D(Texture, vec2((ex_Vertex.x + ex_fType) / 32.0, ex_Vertex.y)));
	if (Sample.a < 0.5) {
		discard;
	} else {
		gl_FragColor = Sample;
	}
}
