Đây là phần 3 của bài tạo hiệu ứng matrix với shader trong Godot.

Nếu đây là lần đầu các bạn vào bài này thì có thể click lại link bên dưới để theo dõi các bài viết trước đó.

Ở phần 1 mình nói qua bố cục để tạo nên hiệu ứng này thì cần làm gì, và hướng dẫn các bạn code rain layer
[link p1](https://viblo.asia/p/godot-shader-p6-1-tao-hieu-ung-matrix-gDVK2OjmZLj)

Ở phần 2 mình đã hướng dẫn các bạn code text layer. Kết hợp với rain layer ở bài 1 thì các bạn đã có 1 hiệu ứng matrix đơn giản chỉ toàn màu lục.
[link p2](https://viblo.asia/p/godot-shader-p6-2-tao-hieu-ung-matrix-bWrZnrrbZxw)

Ở phần này mình sẽ hướng dẫn thêm cách tạo ra các màu sắc khác nhau cho từng cột matrix.

 Đầu tiên chúng ta sẽ tạo 1 func get color kiểu thế này:
 
```
vec3 randomColor() {
    // Dummy code
	return vec3(1.0, 1.0, 1.0);
}
```
 
 Update lại hàm rain 1 tí để nó lấy output từ hàm randomColor().
 
```c++
vec3 rain(vec2 fragCoord, vec2 uv, float time)
{
	vec2 _fragCoord = fragCoord;
	_fragCoord.x -= mod(_fragCoord.x, block_size);
	float offset = sin(_fragCoord.x * 15.0);
	float speed = cos(_fragCoord.x * 3.0) * 0.3 + 0.7;
	
	float y = fract(1.0 - uv.y + time * speed + offset);
    vec3 color = randomColor();
	return color * (1.0 / (7.0 * y));
}
```

Build and run, các bạn sẽ thấy màu của ma trận lúc này là màu từ randomColor() trả về, chắc chắn nó là cùng 1 màu toàn ma trận rồi.

![](https://images.viblo.asia/c5e5cf40-d20d-4dab-8803-687132de6961.png)

Bây giờ mình sẽ mở rộng lên tiếp, bằng cách thử cho mỗi cột có màu khác nhau.

Như vậy mình sẽ tạo thêm 1 biến để truyền vị trí của cột vào.

mình sẽ thử thêm 1 số code test để kiểm tra chúng hoạt động trên từng cột có đúng hay không.

```c++
vec3 randomColor (int indexColumn) { 
	if (indexColumn % 3 == 0) {
		return vec3(1.0, 0.0, 0.0);
	}
	
	if (indexColumn % 3 == 1) {
		return vec3(0.0, 1.0, 0.0);
	}
	
	return vec3(0.0, 0.0, 1.0);
}

vec3 rain(vec2 fragCoord, vec2 uv, float time)
{
	...
	vec3 color = randomColor(int(_fragCoord.x / block_size));
	return color * (1.0 / (7.0 * y));
}
```

Nếu đúng thì nó sẽ hoạt động như sau: Cột 1: Đỏ, Cột 2: Lục, Cột3: Lam, và lặp lại thứ tự này ở các cột tiếp theo.....

Build và chạy thử:

![](https://images.viblo.asia/591e5bdb-6466-4e90-aee1-4d5f9e718ae5.png)

Tốt .

Như vậy, nếu các bạn có mong muốn hiện thị  trên các cột cụ với 1màu cụ thể thì có thể tạo thêm biến để truyền màu vào và hiển thị chúng dựa theo index column.

Bây giờ mình sẽ thử tạo các màu ngẫu nhiên và thay đổi theo thời gian trên các cột xem thử chúng nó hoạt động như thế nào.

Mình sẽ sử dụng hàm sin, cos để tạo dummy kiểu giá trị ngẫu nhiên (Thật ra thì nó ko đc ngẫu nhiên nhưng thôi kệ T_T - dùng tạm cũng đc, các bạn có thể dùng Noise texture để lấy giá trị ngẫu nhiên, tại vì mình chưa tìm ra func random trong shader nên viết tạm dummy code cho các bạn tham khảo - Các bạn có thể 1 cách khác để lấy giá trị trông gần random hơn là sử dụng Noise Texture).

Các bạn có thể bịa bất cứ công thưc nào mà các bạn có thể nghĩ ra được nhưng phải nhớ lấy là nó thoã mãn điều kiện sau đây:

Cùng 1 indexColumn thì phải cho ra 1 màu giống nhau tại 1 thời điểm.

```c++
float ranndomValue(int seek)
{ // Dummy
	return float(seek) * sin(0.1);
}

vec3 randomColor (int indexColumn, float time) { 
	float v = ranndomValue(indexColumn);
	float red = fract(v + 0.3 * abs(cos(time))) * 0.8;
	float blue = fract(v + 0.1 * abs(cos(time))) * 0.5;
	float green = fract(v + 0.5 * abs(sin(time))) * 1.0;
	return vec3(red, blue, green);
}

vec3 rain(vec2 fragCoord, vec2 uv, float time)
{
    ...
	return color * (1.0 / (7.0 * y));
}
```

Ở trong hàm randomColor mình đã dùng hàm fract để đảm bảo các giá trị từ 0 -> 1.0, ngoài ra mấy cái số 0.3, 0.8 gì đó thì mình chỉ thử nhân bậy bạ để xem nhìn có ổn hay ko. Các bạn có thể tham khảo và tự nghĩ cách viết ra được hàm random color của chính mình chỉ cần thoã màn: Cùng 1 indexColumn thì phải cho ra 1 màu giống nhau tại 1 thời điểm là ok.

![](https://images.viblo.asia/588a4648-004c-4805-bb63-a14e11a2cd06.png)

Trên viblo dạo này mình ko đăng ảnh gif lên đc nên thôi các bạn nhìn ảnh minh hoạ tạm vậy :v.

Nếu không nghĩ ra gì đẻ bổ sung thêm thì matrix effect mình sẽ dừng ở đây.  Kì tới mình sẽ hướng dẫn các bạn làm h