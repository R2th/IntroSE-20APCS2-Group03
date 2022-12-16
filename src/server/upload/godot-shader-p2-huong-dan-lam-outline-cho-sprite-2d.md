Mình tính viết bài hướng dẫn về cách sử dụng Godot, nhưng nghĩ lại thì vài tháng nữa ra Godot 4 rồi nên để dành từ từ viết luôn. 

Bài viết này dành cho những bạn đã biết dùng Godot rồi, nhưng muốn tìm hiểu thêm về cách sử dụng shader trong Godot hoặc ai đó muốn tìm hiểu thêm về shader.

Nếu bạn chưa từng dùng Shader bao giờ thử xem [link](https://viblo.asia/p/cach-su-dung-shader-trong-godot-maGK70beZj2) phần 1 truớc để biết cách tạo ra file shader.

Như tiêu đề hôm nay mình sẽ huớng dẫn cho các bạn các tạo ra hiệu ứng outline cho sprite.

![](https://images.viblo.asia/24f2db7c-3f12-42a0-be68-5b6ca8f486d5.png)

Ở bài này mình sử dụng hình ảnh tải này: 

![](https://images.viblo.asia/295d9fb6-651f-4ec9-9f31-06ac9d461e3a.png)

Các bạn cũng có thể config lại giao diện của game cho giống với màn hình của mình nếu muốn so sánh ảnh:

Vào **Project** > Project **Settings**:

**Width**: 384

**Height**: 192

**Test Width**: 768

**Test Height**: 384

Phần **Stretch**:

**Mode**: 2d

![](https://images.viblo.asia/3b4791e2-98b8-4bc6-9ce5-bd9a4420c0dc.png)

kéo ảnh rabit vào thư mục Godot:

![](https://images.viblo.asia/29dab104-ac6c-4470-9cc9-a6853c6002e4.png)

Sau đó các bạn tạo 1 Sprite mà bạn vừa kéo vào và chỉnh scale x và y nó là 2 cho nó to to cho dễ nhìn.

Lưu ý nếu ai dùng ảnh Sprite kiểu pixel thì ban đầu khi zoom sẽ thấy nó rất mờ vì nó qua bộ lọc khử răng cưa cái quần què gì ấy :v .... Nói chung là cái này là tính năng chứ ko phải bug. Nó vẫn có ích với các sprite khác, có độ phân giải cao, còn khi dùng với ảnh kiểu pixel thì mình thấy khi zoom nên nó bị làm mờ đi. 

Nếu bạn dùng ảnh pixel như ảnh rabit ở trên thì hãy chỉnh thêm:

![](https://images.viblo.asia/ad9425fb-9693-4682-a980-b07b6ef162f8.png)

Chọn **Import** > Preset > **2D Pixel** > **Set as Default for texture** > **Reimport**.

Ok giờ thì các bạn zoom lại thử còn thấy vỡ ảnh ko. Nếu Vẫn mờ thì các bạn kiểm ra lại thử đã làm đủ buớc ở trên truớc hoặc ảnh các bạn có phải kiểu styler pixel ko.

Quay lại bài này:

![](https://images.viblo.asia/59243cee-d196-40a1-9cec-e0a57dc41af6.png)


Bây giờ mình có scene với 1 sprite trên màn hình, mình sẽ bắt đầu apply shader cho nó:

```
shader_type canvas_item;

void fragment() {
    COLOR = texture(TEXTURE, UV);
}
```
Đây là đoạn code khởi đầu, nó chả có gì, ý nghĩa của đoạn này là nó vẽ lại sprite nguyên bản lên thôi, cái này mình có nói ở phần 1 rồi:

```
shader_type canvas_item;

uniform vec4 line_color : hint_color = vec4(1);
uniform float line_thickness : hint_range(0, 10) = 1.0;

void fragment() {
    COLOR = texture(TEXTURE, UV);
}
```

Với ý tưởng ở trên các bạn có thể thử

Bây giờ mình thêm 2 biến để config outline: **line_color** dùng để chỉnh màu outline và **line_thickness** (đơn vị là pixel - tức là bạn để 1 thì độ dày outline là 1 pixel, để 10 thì outline dày 10 pixel) dùng để chỉnh độ dày của outline.

Kiểu khai báo biến như trên các bạn cứ từ từ làm quen, từ khóa "**uniform**" dùng để nói biến này sẽ đc dùng toàn cục cho shader này và biến này có thể được truyền và thay đổi từ bên ngoài.

![](https://images.viblo.asia/6fd4a393-8524-43bb-97d6-7ffd8556be53.png)

Bây giờ, mình sẽ chỉ thêm một số thứ mà mình sẽ dùng trong hưóng dẫn này:

Đầu tiên là cách lấy chúng ta chuyển đổi **line_thickness** thành giá trị trong toạ độ **UV**.
Tại sao phải làm việc này??? Lưu ý là texture của bạn toạ độ đang là pixel kiểu 32x32 hay 64x64, còn khi chúng ta sử dụng các hàm của shader (vd như func texture dùng để lấy mẫu color) thì thường phải dùng toạ độ UV (xem lại phần 1 nếu bạn muốn đọc về toạ độ UV). 

```
vec2 size = TEXTURE_PIXEL_SIZE * line_thickness;
```

ở đây biến **TEXTURE_PIXEL_SIZE** là biến đc tạo sẵn trong Godot, nó trả về kích thước **1 pixel của Texture trong toạ độ UV**, ta chỉ cần lấy nó nhân với line_thickness để tạo ra size (đây là biến lưu trữ độ dày của outline trong toạ độ UV).  


Tiếp theo chúng ta sẽ sử dụng đoạn sau để lấy mẫu của texture lệch với toạ độ uv hiện tại:

```
texture(TEXTURE, UV + offset)
```

offset ở đây là 1 vec2.

Ok, bây giờ chúng ta bắt đầu vận dụng, thay code fragment thành như sau:

Dễ dàng ta có :v :

```
void fragment() {
    vec2 size = TEXTURE_PIXEL_SIZE * line_thickness;

    float left = texture(TEXTURE, UV + vec2(-size.x, 0)).a;
    float right = texture(TEXTURE, UV + vec2(size.x, 0)).a;
    float up = texture(TEXTURE, UV + vec2(0, size.y)).a;
    float down = texture(TEXTURE, UV + vec2(0, -size.y)).a;
    
    float sum = left + right + up + down;
    float outline = min(sum, 1.0);

    vec4 color = texture(TEXTURE, UV);
	
    COLOR = mix(color, line_color, outline - color.a);
}
```

Dễ dàng ta thấy:

![](https://images.viblo.asia/8b16ff1f-a84d-48c9-b402-2dd5a6de5081.png)

Đùa thôi, mình biết là nếu bạn ít làm việc với shader thì việc hiểu đoạn code trên cũng là 1 vấn đề, đâu phải hồi xưa còn đi học toán đâu mà dễ dàng ta thấy :))).

Nếu các bạn chưa hiểu đoạn code trên hoạt động như thế nào thì mình sẽ cũng chia nhỏ, và phân tích bên dưói, còn các bạn hiểu đc rồi thì thôi, không cần đọc chi cho lòng vòng.

Mình sẽ nói sơ qua về cách đoạn code trên hoạt động như thế nào:

Để đơn giản hết sức có thể mình muốn các bạn hãy tưởng tuợng trường hợp mình vẽ **outline** là **1 pixel**, như vậy để xác định được ô pixel đang vẽ có phải là outline hay ko thì ta sẽ kiểm tra xem các ô lân cận (ở trên dưói trái phải nó) có phải là ô màu của sprite không (bằng cách check pixel của các ô lân cận có **alpha = 1** hay ko). Chú ý là là các giá trị left, right, up, down đang giữ giá trị alpha của các pixel lân cận.

```
    float sum = left + right + up + down;
    float outline = min(sum, 1.0);
```

nếu có ô pixel này có outline thì giá trị outline = 1 hoặc nếu không có thì nó sẽ trả ra 0. (các vùng có left, right, up, down có alpha = 0 là vùng trong suốt ở bên ngoài outline và ngoài sprite). Nói chúng các bạn cứ hiểu ý nghĩa đoạn code này là nếu ít nhất có 1 ô lân cận có alpha khác không thì outline = 1 (tức là ô màu này là vùng vẽ outline), ngược lại là outline = 0 (tức là vùng trong suốt).

```
COLOR = mix(color, line_color, outline - color.a);
```

Hàm `mix(x, y, a)`, khi **a <= 0** thì nó **return x**, **khi a >= 1** thì nó **return y**, còn nếu a ở **giữa 0 và 1** thì nó return một giá trị trung gia của x và y: **return x×(1−a)+y×a**.

Nếu các bạn code shader thì sẽ thường xuyên làm việc với những hàm như thế này, các x, y thưòng là các vertor. Các bạn cứ nhớ đơn giản ch mình như sau, mix là hàm trộn, nó sẽ nhận 1 giá trị a ở giữa 0 và 1, a có gía trị càng gần với 0 thì giá trị output của nó sẽ càng giống với x, khi a có gía trị càng gần với 1 thì giá trị của nó sẽ càng gần y.

Quay lại `COLOR = mix(color, line_color, outline - color.a);`

Nếu nó là vùng **outline** tức là outline = 1 và color.a = 0 nên outline - color.a = 1 => mix(...) = line_color.

Nếu nó là vùng **sprite** tức là outline = 0 và color.a = 1 nên outline - color.a = -1 => mix(...) = color.

Nếu nó là vùng **trong suốt** tức là  outline = 0 và color.a = 0 nên outline - color.a = 0 => mix(...) = color, nhưng color này có color.a = 0 => Vùng này sẽ trả về màu trong suốt.


Đối với những game pixel mình cảm thấy là toạ outline 4 hướng này đã đủ tốt rồi, tuy nhiên với những game ko phải đồ hoạ pixel thì việc dùng 8 hường sẽ cho kết quả tốt hơn:

Dưới đây là đoạn code đưọc tác giả (không phải mình :v) chỉnh chu lại rồi, nếu các bạn hiểu đưọc những gì mình viết ở trên thì việc hiểu đưọc đoạn ở dưới sẽ không gặp khó khăn.

```
shader_type canvas_item;

uniform vec4 line_color : hint_color = vec4(1);
uniform float line_thickness : hint_range(0, 10) = 1.0;

void fragment() {
    vec2 size = TEXTURE_PIXEL_SIZE * line_thickness;

    float outline = texture(TEXTURE, UV + vec2(-size.x, 0)).a;
    outline += texture(TEXTURE, UV + vec2(0, size.y)).a;
    outline += texture(TEXTURE, UV + vec2(size.x, 0)).a;
    outline += texture(TEXTURE, UV + vec2(0, -size.y)).a;
    outline += texture(TEXTURE, UV + vec2(-size.x, size.y)).a;
    outline += texture(TEXTURE, UV + vec2(size.x, size.y)).a;
    outline += texture(TEXTURE, UV + vec2(-size.x, -size.y)).a;
    outline += texture(TEXTURE, UV + vec2(size.x, -size.y)).a;
    outline = min(outline, 1.0);

    vec4 color = texture(TEXTURE, UV);
    COLOR = mix(color, line_color, outline - color.a);
}
```

Một số khuyết điểm ở cách tiếp cận này:

Nó hoạt động tốt với các sprite kiểu hình lồi, còn kiểu gai nhọn như hình ngọn cỏ thì mình thấy đôi lúc nó không thật sự đúng.

Với lại nó cũng không hoạt động đưọc với các sprite có các giá trị khác 0 và 1 :]]].:v

Với lại tấm ảnh sprite của các bạn cũng cần phải có 1 khoảng trống đẻ có thể vẽ outline lên. Như hình rabit ở trên thì các bạn thấy trên tai của nó bị mất outline, nguyên nhân là do tấm ảnh của nó hết vùng để vẽ lên, đẻ khắc phục trường hợp này thì chúng ta có thể apply shader lên viewport, cách này cũng đc dùng với sprite có nhiều thành phần (kiểu như tay chân đầu mình là các ảnh riêng ấy, cần phải ráp lại với ra nhân vật đc- phần này mình sẽ bổ sung ở bài viết khác hoặc sẽ update trong bài này ở hồi sau, còn giờ thì mình bị dí task sml luôn rồi T_T).

Bài viết này, đuợc mình đọc hiểu từ **gdquest** và **trình bày lại theo ý của mình**, các bạn có thể tham khảo bài nguyên bản của nó ở đây:
[link](https://gdquest.mavenseed.com/lessons/outlines-for-2d-sprites)

Mặc dù mình đã ráng viết rồi nhưng chắc vẫn còn sai sót và nếu như các bạn có đoạn nào đó gây khó hiểu cho bạn thì hãy comment bên dưói, có thể mình sẽ giải đáp giúp các bạn :D.