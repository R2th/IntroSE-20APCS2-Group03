Hôm nay mình sẽ tiếp tục hướng dẫn với các bạn làm quen shader qua các vd. Hiệu ứng hôm nay mà mình chọn để viết bài là hiệu ứng hoà tang.
 
 ![](https://images.viblo.asia/c44022c8-2846-491b-aa1c-3d0bb31932f8.gif)
 
 Đã tới bài này rồi thì mình sẽ không viết lại cách cấu hình nữa, các bạn có thể tham khảo lại nếu muốn [P1](https://viblo.asia/p/cach-su-dung-shader-trong-godot-maGK70beZj2)  và [P2](https://viblo.asia/p/godot-shader-p2-huong-dan-lam-outline-cho-sprite-2d-Qpmleb0N5rd).
 
 Mình sử dụng hình con thỏ ở bài 2 cho vd này.
 
 ![](https://images.viblo.asia/3c9b4019-319c-4d2f-960c-d3dd7b0a45fe.png)

Nếu các bạn kéo về mà bị hiện tượng ảnh bị mờ khi zoom to thì xem cách fix trong p2 ở trên.

Khởi tạo một file Shader trống cho sprite này:

![](https://images.viblo.asia/37decbfd-a67c-490c-bb9a-e2d87534f637.png)

Điền đoạn code sau vào file shader, đây là đoạn code đã hoàn thành để được hiệu ứng hoà tang. Các bạn cứ copy vào, mình sẽ giải thích từ từ về ý tưởng và cách hoạt động của code này sau.

```
shader_type canvas_item;

uniform sampler2D noise;
uniform float threshold: hint_range(0, 1) = 0.33;

float white_purity(vec4 color){
	return (color.r + color.g + color.b) / 3.0;
}

void fragment() {
	vec4 color = texture(TEXTURE, UV);
	vec4 mask = texture(noise, UV);
	if (white_purity(mask) <= threshold){
		color.a = 0.0;
	}
	
	COLOR = color;
}
```

Hiện tại bạn thấy bên ô param của Shader xuất hiện tham số Threshold và Noise.

![](https://images.viblo.asia/0ff01ecc-09fc-4078-afd5-4eadd0cd40a5.png)

Click vào Noise và chọn NewNoise Texture:

![](https://images.viblo.asia/662e7888-d9ca-4e11-a2f5-a9f2534e9a0b.png)

click vào noise để bung phần param của noise ra:

![](https://images.viblo.asia/f7fa1ce0-868e-44bf-9b8d-ca0113eac430.png)

Tiếp tục click vào Noise trong param và chọn New OpenSimplexNoise:

![](https://images.viblo.asia/da64cbb9-d2eb-4558-a932-77e35784dff6.png)

Click lại Noise đầu tiên để đóng của sổ param lại, để xem ảnh noise mà ta thu được.

![](https://images.viblo.asia/cf612a7b-3281-49a7-9fd5-8372db8a2c2d.png)

Lưu ý là các bạn có thể chỉnh các param trong Noise để thu được các ảnh noise khác nhau.

Bây giờ các bạn có thể thay đổi Threshold bằng cách kéo 0 -> 1 và từ 1 -> 0, sẽ thấy ảnh rabit biến mất và xuất hiện:

![](https://images.viblo.asia/c44022c8-2846-491b-aa1c-3d0bb31932f8.gif)

OK, bây giờ thì chắc các bạn hình dung ra là mình muốn làm gì và kết quả như thế nào rồi đấy, mình sẽ bắt đầu giải thích ý tưởng và cách hoạt động của nó:

Đầu tiên mình sẽ nói về **Noise texture** trước, kiểu kiểu nó sẽ như vầy:

![](https://images.viblo.asia/d9bf1e8b-9077-43d5-ac17-5e941c550e48.png)

Như các bạn thấy thì nó cũng chỉ là 1 bức ảnh gồm màu đen, xám và trắng. Màu trắng sẽ có giá trị là 1, màu đen là 0 và màu xám sẽ mang giá trị ở giữa 0 -> 1, giá trị càng lớn thì càng trắng, càng nhỏ thì màu càng tối. 

Các bức ảnh như vậy có thể đưọc tạo ra bằng các thuật toán, trong godot cũng có hỗ trợ rồi, công việc mà các bạn làm chỉ là điền các param sao cho ưng ý là được, ở vd trên mình đang để param đều là mặc định hết, các bạn có thể thay đổi để test.

Quay lại ý tưởng của hiệu ứng này. Bây giờ chúng ta đang có 2 bức ảnh: 1 là ảnh con thỏ hồng và 1 ảnh noise như ở trên. 

Bây giờ mình muốn các bạn tuởng tượng như sau: Các bạn đang có 2 tờ giấy **cùng kích thước** đăt **chồng lên nhau**, ở giấy 1 có ảnh con thỏ, tờ giấy 2 là ảnh noise như trên. Bây giờ các bạn sẽ vẽ lại con thỏ ở những vị trí mà có màu xám (lớn hơn 0.5 chẵng hạn, vd thế), còn những vị trí có màu xám đen (nhỏ hơn 0.5) thì các bạn xoá có bộ phận con thỏ đi. Như vậy các bạn đã có đưọc bức ảnh con thỏ bị biến mất rồi đó.

Bây giờ trong shader các bạn cũng làm tưong tự như vậy, các bạn sẽ chọn ra 1 ngưỡng để xoá hoặc vẽ là threshold, trước khi vẽ từng pixel con thỏ lên màn hình thì chúng ta sẽ kiểm tra lại tại vị trí vẽ pixel này thì giá trị noise của nó như thế nào, nếu lơn hơn threshold thì sẽ vẽ, không thì ngược lại. Ý tưởng chỉ đơn giản như vậy thôi ^^.

Các bạn có thể dùng **Tween** hoặc **Animation Player** để thay đổi **threshold** theo thời gian trong lúc chạy hiệu ứng này, phần này ai quen godot rồi thì chắc tự hiểu nên mình sẽ không hướng dẫn vì các bài này chỉ tập trung giải thích shader và các ý tưởng của nó mà thôi.

Bài viết **đọc hiểu** và **tự trình bày lại theo ý mình** từ code trên trang:  [link](https://godotshaders.com/shader/dissolution/)

**Nhận xét** của mình là nếu đã dùng noise từ godot thì chúng ta chỉ cần:

```
shader_type canvas_item;

uniform sampler2D noise;
uniform float threshold: hint_range(0, 1) = 0.33;

void fragment() {
	vec4 color = texture(TEXTURE, UV);
	vec4 mask = texture(noise, UV);
	if mask.r <= threshold) {
		color.a = 0.0;
	}
	
	COLOR = color;
}
```

Bởi vị bức ảnh noise là màu xám đen nên các giá trị red, blue, green luôn bằng nhau nên việc lấy trung bình cộng nó là không cần thiết.

Ở bài sau mình sẽ tiếp tục với hiệu ứng này nhưng sẽ đi sâu hơn 1 tí. Thank các bạn đã đọc bài, nếu có đoạn nào gây khó hiểu nhở comment để mình biết