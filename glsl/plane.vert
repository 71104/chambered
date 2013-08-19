uniform vec4 Camera;
uniform float fHeight;

const float fScreenRatio = 160.0 / 91.0;

mat4 ModelViewProjection = mat4(
	10, 0, 0, 0,
	0, fScreenRatio * 10.0, 0, 0,
	0, 0, 0, 10,
	0, 0, 1, 0
) * mat4(
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
	0, fHeight, 0, 1
);

attribute vec4 in_Vertex;
varying vec4 ex_Vertex;

void main() {
	gl_Position = ModelViewProjection * in_Vertex;
	ex_Vertex = in_Vertex;
}
