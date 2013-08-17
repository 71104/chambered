precision mediump float;

uniform sampler2D Texture;
uniform vec4 Camera;

varying vec4 ex_Vertex;

vec4 Attenuate(vec4 Color, float fDistance) {
	float fAttenuation = (-atan((fDistance - 6.0) * 0.3) + 1.5707963267) * 0.3183098861;
	return vec4(vec3(Color) * fAttenuation, Color.a);
}

void main() {
	vec2 Coordinates = vec2(ex_Vertex.x, ex_Vertex.z) / ex_Vertex.w;
	vec2 TextureCoordinates = Coordinates * 0.5;
	gl_FragColor = Attenuate(texture2D(Texture, TextureCoordinates),
		length(Coordinates - vec2(Camera.x, Camera.z)));
}
