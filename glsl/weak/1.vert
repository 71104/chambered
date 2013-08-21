precision mediump float;

uniform vec4 Camera;
uniform ivec2 Position;

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
	0, 0, -1, 0,
	0, 1, 0, 0,
	1, 0, 0, 0,
	Position.x * 2 - 1, 0, Position.y * 2, 1
);

attribute vec2 in_Vertex;
attribute vec2 in_TexCoord;

varying vec2 ex_TexCoord;
varying float ex_fDistance;

void main() {
	vec4 Transformed = ModelView * vec4(in_Vertex, 0, 1);
	gl_Position = Projection * Transformed;
	ex_TexCoord = in_TexCoord;
	ex_fDistance = length(vec2(Transformed.x, Transformed.z) / Transformed.w);
}
