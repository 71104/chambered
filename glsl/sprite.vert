precision mediump float;

uniform vec4 Camera;
uniform vec3 Sprite;

const float fScreenRatio = 160.0 / 91.0;

mat4 Projection = mat4(
	10, 0, 0, 0,
	0, fScreenRatio * 10.0, 0, 0,
	0, 0, 0, 10,
	0, 0, 1, 0
);

mat4 View = mat4(
	cos(Camera.w), 0, -sin(Camera.w), 0,
	0, 1, 0, 0,
	sin(Camera.w), 0, cos(Camera.w), 0,
	0, 0, 0, 1
) * mat4(
	1, 0, 0, 0,
	0, 1, 0, 0,
	0, 0, 1, 0,
	-vec3(Camera), 1
);

attribute vec2 in_Vertex;

varying vec4 ex_Vertex;
varying vec2 ex_TexCoord;

void main() {
	float fType = Sprite.x;
	vec4 Position = vec4(Sprite.y, 0, Sprite.z, 1);
	vec4 Vertex = mat4(
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		in_Vertex, 0, 1
	) * View * Position;
	gl_Position = Projection * Vertex;
	ex_Vertex = Vertex;
	ex_TexCoord = (in_Vertex + 1.0) / 2.0;
	ex_TexCoord.x = (ex_TexCoord.x + fType) / 32.0;
}
