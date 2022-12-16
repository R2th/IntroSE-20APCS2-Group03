Các bạn có thể xem phần 1 ở đây: [link](https://viblo.asia/p/godot-shader-p6-1-tao-hieu-ung-matrix-gDVK2OjmZLj)

tải file texture này về: 

![](https://images.viblo.asia/fed9912b-7b79-48a3-8672-7643d83c8eb6.png)


### Text Function

chúng ta đang cần 1 func sẽ tạo ra hình ảnh các kí tự thay đổi liên tục:
[link](https://thumbs.gfycat.com/BlankAdmirableCarpenterant-mobile.mp4)


Để vẽ mỗi kí tự vào 1 ô trên màn hình thì đầu tiên mình sẽ sử dụng kĩ thuật chia ô trong shader. Đây là một kỹ thuật rất phổ biến trong shader, để chia nhỏ không gian trong một lưới lặp lại được sử dụng để tạo các hiệu ứng lặp lại. 
Tìm hiểu thêm về điều đó trong [Book of Shaders](https://thebookofshaders.com/09/).

Để cho các bạn dễ hình dung thì có thể thử đoạn code sau:

```C++
void fragment() {
	vec2 uv = mod(FRAGCOORD.xy, 16.) * 0.0625;
	COLOR = vec4(uv.xy, 0., 1.0);
}
```

Lưu ý là 0.0625 là 1/16, ở đây chúng ta cố gắng đưa về phép nhân thay vì dùng chia, bởi vì nó man lại hiệu suất tốt hơn. Các bạn cứ ghi nhớ kĩ thuật chia lưới trong shader có công thức như thế này:

```C++
 float cellSize = 16.0 
 vec2 uv = mod(fragCoord.xy, cellSize) / cellSize;
 fragColor = vec4(uv.xy,0.,1.0);
```

- Trong đó **cellSize** là kích thước của ô (theo đơn vị pixel) mà bạn muốn chia trên màn hình:

xem kết quả đoạn code trên:

![](https://images.viblo.asia/9a5ccdea-a31a-4a5f-b35e-4f5827ef4183.png)

Và việc lúc này của chúng ta là muốn vẽ random các kí tự lên các ô được chia ở trên.
-> À như vậy chúng ta phải cần "ID" để phân biệt các khối block này với nhau (- Chúng ta sẽ dùng id này để xác định kí tự random vẽ lên khối block này)
-> Một cách tự nhiên nhất là chúng ta sẽ dùng số thước tự của nó để làm id khối block này luôn, vd khôi đầu tiên sẽ là 1-1, khối bên cạnh là 1-2 ....

![](https://images.viblo.asia/cfd3ac89-5c1b-4176-a205-41002f9fb671.png)

Phân tích 1 tí nhé: bây giờ mình đang giả định là 1 block sẽ là 16 pixel: chúng ta sẽ thử liệt kê lên giấy 1 tí để tìm quy luật, mình đang xét theo hàng ngang trước, dọc thì cũng tưong tự thôi:

pixel thứ 0, 1, 2, 3, ..., 15 -> thuộc ô block thứ 1

pixel thứ 16, 17, ..., 31 -> thuộc ô block thứ 2

pixel thứ 32, 33...., 47 -> thuộc ô block thứ 3

...

Nhìn ví dự trên thì chúng ta có thể nghĩ ngay tới việc lấy phần nguyên của phép chia **fragCoord** và **blockSize**

```C++
vec2 block = floor(_fragCoord / block_size);
```

Bây giờ chúng ta đã có id của các khối block rồi, chúng ta sẽ dùng nó cho việc vẽ random các kí tự lên từng khối block.

Một suy nghĩ đơn giản: để vẽ random các kí tự trên màn hình thì mình cần có 1 hàm có input là block_id còn output là char_id. 

Lưu ý là ảnh texture text đang là 16x16 character, mình có đánh số cho các bạn dễ hình dung char_id:

![](https://images.viblo.asia/8d4ae9b6-fd1d-4fcd-aabf-76084c2772ee.png)

vd như char id(0, 3) là số 0 chẳng hạn - (sr nhé trên hình mình đánh số lộn, đáng lí nên để số 0 là số bắt đầu thay vì 1 :v).

Vậy bây giờ mình sẽ tạo ra 1 hàm randomIndexChar dummy code trả về index của số 0 để text truớc:

```
vec2 randomIndexChar(vec2 blockID)
{
    // Dummy code
	return vec(0, 3);
}

float text(vec2 fragCoord, float time)
{
	vec2 _fragCoord = fragCoord.xy;
	vec2 uv = mod(_fragCoord.xy, block_size) / block_size;
	vec2 blockID = floor(_fragCoord / block_size);

	float max_size_char_texture = 16.0; // bời vì texture có 16 x 16 char
	vec2 index_char = randomIndexChar(blockID) / max_size_char_texture;

	uv = index_char + uv / max_size_char_texture;

	return texture(chars, uv).r;
}

void fragment() {
	float text = text(FRAGCOORD.xy, TIME);
    vec3 green = vec3(0.0, 1, .0);
	COLOR = vec4(text * green, 1.0);
}
```

nhìn xem kết quả: ![](https://images.viblo.asia/b72463bd-c92e-4360-9bd4-460f89efbacd.png)

perfect, vậy bây giờ chúng ta chỉ cần chỉnh hàm randomIndexChar theo một công thức nào đó của các bạn mà chỉ cần đảm bảo đầu vào là block_id, đầu ra là char_id, kết qủa random phải giống nhau với cùng 1 block_id tại cùng 1 thời điểm là được,
Đây là cách random của mình, mình sử dụng sin cos, các bạn cũng có thể dùng noise texture cũng đuợc :D.

```c++
vec2 randomIndexChar(float char_size, vec2 blockID, float time)
{
	vec2 indexChar = vec2(0, 0);
	indexChar.x = blockID.x + char_size * abs(sin(time * 0.3) * 2.);
	indexChar.y = blockID.y + char_size * abs(cos(time * 0.3) * 3.);
	
	indexChar = mod(floor(indexChar), char_size);
	return indexChar;
}

float text(vec2 fragCoord, float time)
{
	vec2 _fragCoord = fragCoord.xy;
	vec2 uv = mod(_fragCoord.xy, block_size) / block_size;
	vec2 blockID = floor(_fragCoord / block_size);

	float max_size_char_texture = 16.0;
	vec2 index_char = randomIndexChar(max_size_char_texture, blockID, time) / max_size_char_texture;

	uv = index_char + uv / max_size_char_texture;

	return texture(chars, uv).r;
}

void fragment() {
	float text = text(FRAGCOORD.xy, TIME);
    vec3 green = vec3(0.0, 1, .0);
	COLOR = vec4(text * green, 1.0);
}
```

![](https://images.viblo.asia/39e37691-c5c9-402a-a2ab-d59b5f888f37.png)

vậy là việc random đã xong, bây giờ kết hợp với layer rain mà mình viết ở p1, thì mình đuợc như sau:

```C++
shader_type canvas_item;

uniform sampler2D chars;
uniform sampler2D noise_tex; 
uniform float block_size = 24.0;

vec3 rain(vec2 fragCoord, vec2 uv, float time)
{
	vec2 _fragCoord = fragCoord;
	_fragCoord.x -= mod(_fragCoord.x, block_size);
	float offset = sin(_fragCoord.x * 15.0);
	float speed = cos(_fragCoord.x * 3.0) * 0.3 + 0.7;
	
	float y = fract(1.0 - uv.y + time * speed + offset);
	return vec3(0.0, 1, .0) * (1.0 / (15.0 * y));
}

vec2 randomIndexChar(float char_size, vec2 blockID, float time)
{
	vec2 indexChar = vec2(0, 0);
	indexChar.x = blockID.x + char_size * abs(sin(time * 0.3) * 2.);
	indexChar.y = blockID.y + char_size * abs(cos(time * 0.3) * 3.);
	
	indexChar = mod(floor(indexChar), char_size);
	return indexChar;
}

float text(vec2 fragCoord, float time)
{
	vec2 _fragCoord = fragCoord.xy;
	vec2 uv = mod(_fragCoord.xy, block_size) / block_size;
	vec2 blockID = floor(_fragCoord / block_size);

	float max_size_char_texture = 16.0;
	vec2 index_char = randomIndexChar(max_size_char_texture, blockID, time) / max_size_char_texture;

	uv = index_char + uv / max_size_char_texture;

	return texture(chars, uv).r;
}

void fragment() {
	vec3 rain = rain(FRAGCOORD.xy, UV, TIME);
	float text = text(FRAGCOORD.xy, TIME);
	COLOR = vec4(text * rain, 1.0);
}
```

![](https://images.viblo.asia/6f9ae2f8-2a7e-4f1b-b1ae-e9c4107e3665.png)

Phần tiếp mình sẽ chỉ các bạn custom màu cho từng dòng matrix.