uniform vec4 Camera;

attribute vec2 in_Vertex;
attribute vec2 in_TexCoord;

varying vec2 ex_Vertex;
varying vec2 ex_TexCoord;

float PI = acos(-1.0);

void main() {
	gl_Position = vec4(in_Vertex, 0, 1);
	ex_Vertex = in_Vertex;
	ex_TexCoord = in_TexCoord;
	ex_TexCoord.x -= Camera.a / (PI * 2.0);
}
