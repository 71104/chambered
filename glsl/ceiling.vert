uniform vec4 Camera;

const float ScreenRatio = 160.0 / 91.0;
mat4 ModelViewProjection = mat4(
	1, 0, 0, 0,
	0, ScreenRatio, 0, 0,
	0, 0, 0, 1,
	0, 0, 0.1, 0
) * mat4(
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

attribute vec4 in_Vertex;
varying vec4 ex_Position;

void main() {
	gl_Position = ModelViewProjection * in_Vertex;
	ex_Position = in_Vertex;
}
