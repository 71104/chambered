precision mediump float;

uniform sampler2D Texture;
uniform vec4 Type;
uniform vec4 Camera;

mat4 ModelView = mat4(
	cos(Camera.a), 0, -sin(Camera.a), 0,
	0, 1, 0, 0,
	sin(Camera.a), 0, cos(Camera.a), 0,
	0, 0, 0, 1
) * mat4(
	1, 0, 0, 0,
	0, 1, 0, 0,
	0, 0, 1, 0,
	-vec3(Camera), 1
);

varying vec4 ex_Position;

vec4 Attenuate(vec4 Color) {
	vec4 Position = ModelView * ex_Position;
	vec3 StandardPosition = vec3(Position) / Position.w;
	float Distance = length(vec2(StandardPosition.x, StandardPosition.z));
	float Attenuation = (-atan((Distance - 6.0) * 0.3) + 1.5707963267) * 0.3183098861;
	return vec4(vec3(Color) * Attenuation, Color.a);
}

void main() {
	vec3 Position = (vec3(ex_Position / ex_Position.w) + 1.0) / 2.0;
	vec2 TexCoord = vec2((mod(Position.x, 1.0) + Type.w) / 16.0, Position.z);
	gl_FragColor = Attenuate(texture2D(Texture, TexCoord) * vec4(vec3(Type), 1));
}
