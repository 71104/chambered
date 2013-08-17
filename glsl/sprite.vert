uniform vec4 Camera;
uniform vec3 Position;

attribute vec2 in_Vertex;
attribute vec2 in_TexCoord;

varying vec2 ex_Vertex;
varying vec2 ex_TexCoord;

const float fScreenRatio = 160.0 / 91.0;
mat4 Projection = mat4(
	10, 0, 0, 0,
	0, fScreenRatio * 10.0, 0, 0,
	0, 0, 0, 10,
	0, 0, 1, 0
);

mat4 ModelView = mat4(
	cos(Camera.w), 0, -sin(Camera.w), 0,
	0, 1, 0, 0,
	sin(Camera.w), 0, cos(Camera.w), 0,
	0, 0, 0, 1
) * mat4(
	1, 0, 0, 0,
	0, 1, 0, 0,
	0, 0, 1, 0,
	-vec3(Camera), 1
) * mat4(
	1, 0, 0, 0,
	0, 1, 0, 0,
	0, 0, 1, 0,
	Position, 1
);

void main() {
	vec4 Vertex = mat4(
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		in_Vertex, 0, 1
	) * ModelView * vec4(0, 0, 0, 1);
	gl_Position = Projection * Vertex;
	ex_Vertex = vec2(Vertex.x, Vertex.z) / Vertex.w;
	ex_TexCoord = in_TexCoord;
}
