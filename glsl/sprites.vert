uniform vec4 Camera;

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
attribute vec2 in_Pivot;
attribute float in_fType;

varying float ex_fType;
varying vec2 ex_Vertex;

void main() {
	vec4 Vertex = mat4(
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		in_Vertex, 0, 1
	) * View * vec4(in_Pivot.x, 0, in_Pivot.y, 1);
	gl_Position = Projection * Vertex;
	ex_fType = in_fType;
	ex_Vertex = vec2(Vertex.x, Vertex.z) / Vertex.w;
}
