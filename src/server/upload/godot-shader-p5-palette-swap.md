![](https://images.viblo.asia/7a312755-e800-4f06-b5e4-101de6ce0352.png)

Đầu tiên chúng ta sẽ làm 1 phiên bản chọn các màu gần giống để thay thế thành các loại màu khác.

Shader color là 1 vec4 kiểu float, bạn có thể chuyển chúng thành 1 float nằm trong khoảng 0 -> 1.

Tiếp theo ta sẽ chọn các màu mà bạn muốn chuyển đổi. Bạn có thể để chúng là biến kiểu uniform để bạn có thể dễ chính sửa bằng cách sử dụng color picker thay vì chuyển đổi chúng thành vector float.

Bây giờ hãy so sánh màu của pixel hiện tại với các màu mà bạn muốn hoán đổi. 

Để ý rằng chúng ta không thể sử dụng toán tử == để so sánh các màu "gần giống" với nhau đưọc mà nên sử dụng func distance().

```
shader_type canvas_item;

uniform vec4 original_0: hint_color;
uniform vec4 original_1: hint_color;
uniform vec4 original_2: hint_color;
uniform vec4 original_3: hint_color;
uniform vec4 original_4: hint_color;
uniform vec4 replace_0: hint_color;
uniform vec4 replace_1: hint_color;
uniform vec4 replace_2: hint_color;
uniform vec4 replace_3: hint_color;
uniform vec4 replace_4: hint_color;

const float precision = 0.1;

vec4 swap_color(vec4 color){
	vec4 original_colors[5] = vec4[5] (original_0, original_1, original_2, original_3, original_4);
	vec4 replace_colors[5] = vec4[5] (replace_0, replace_1, replace_2, replace_3, replace_4);
	for (int i = 0; i < 5; i ++) {
		if (distance(color, original_colors[i]) <= precision){
			return replace_colors[i];
		}
	}
	return color;
}

void fragment() {
	COLOR = swap_color(texture(TEXTURE, UV));
}
```

Ở trên là phương pháp thay đổi màu sắc với các loại màu gần giống nhau.

Tuy nhiên, các bạn cũng có thể chỉnh sửa lại 1 tí để có thể dùng 1 bảng màu sắc tải từ https://lospec.com/palette-list xuống, và dùng trực tiếp từ file png thay vì phải set màu thông qua các biến bằng cách thủ công như ở trên.

![](https://images.viblo.asia/0921b6ed-b322-4a85-94e6-1bd118d6c21d.png)

OK, Bây giờ chúng ta sẽ viết 1 func để thay thế màu sắc bằng cách sử dụng bảng màu sprite thay vì tạo ra các biến để chọn các màu như ở trên.

Ở đây, chung ta sẽ sử dụng toạ độ UV dể xác định màu color nào ở pixel hiện tại.

Đầu tiên, chúng ta sẽ làm một bảng màu. Chú ý là toạ độ UV có góc là ở top-left mỗi màu.

Bây giờ, với mỗi màu sắc mà bạn muốn thay đổi, thay giá trị RED thành toạ độ U của màu bạn muốn thay thế trogn bảng màu, thay giá trị GREEN thành tọa độ V (BLUE ở đây cần cần dùng tới). Kết quả trông sẽ khá kì cục nhưng bạn đừng lo lắng, shader sẽ fix chúng. (các bạn có thể thay thế công thức tính toạ độ màu sắc tuỳ ý, ko nhất thiết phải dùng red hoặc green, ở trên chỉ là vd dùng rg đại diện cho uv để pick màu sắc từ bảng màu)

Bạn cũng nên để bảng màu là biến uniform để dễ chỉnh sửa, nó là loại sampler2D.

```
shader_type canvas_item;

uniform sampler2D palette;

void fragment() {
	COLOR = texture(palette, texture(TEXTURE, UV).rg);
}
```

Nếu bạn muốn giữ giá trị alpha của sprite, bạn có thể dùng code sau:

```
void fragment() {
	vec4 color = texture(TEXTURE, UV);
	vec4 result_color = texture(palette, color.rg);
	result_color.a = color.a;
	COLOR = result_color;
}
```

Đó là 2 cách khác nhau đẻ chuyển đổi màu sắc trong Godot shader.

Full code:

```
// No recolor

shader_type canvas_item;

uniform vec4 original_0: hint_color;
uniform vec4 original_1: hint_color;
uniform vec4 original_2: hint_color;
uniform vec4 original_3: hint_color;
uniform vec4 original_4: hint_color;
uniform vec4 replace_0: hint_color;
uniform vec4 replace_1: hint_color;
uniform vec4 replace_2: hint_color;
uniform vec4 replace_3: hint_color;
uniform vec4 replace_4: hint_color;

const float precision = 0.1;

vec4 swap_color(vec4 color){
	vec4 original_colors[5] = vec4[5] (original_0, original_1, original_2, original_3, original_4);
	vec4 replace_colors[5] = vec4[5] (replace_0, replace_1, replace_2, replace_3, replace_4);
	for (int i = 0; i < 5; i ++) {
		if (distance(color, original_colors[i]) <= precision){
			return replace_colors[i];
		}
	}
	return color;
}

void fragment() {
	COLOR = swap_color(texture(TEXTURE, UV));
}

```

Còn đây là phương pháp tô lại màu bằng bảng màu palette:

```
// Recolor
shader_type canvas_item;

uniform sampler2D palette;

void fragment() {
	vec4 color = texture(TEXTURE, UV);
	vec4 result_color = texture(palette, color.rg);
	result_color.a = color.a;
	COLOR = result_color;
}
```

Mình tham khảo tử nguồn sau: [link](https://godotshaders.com/shader/palette-swap-no-recolor-recolor/)