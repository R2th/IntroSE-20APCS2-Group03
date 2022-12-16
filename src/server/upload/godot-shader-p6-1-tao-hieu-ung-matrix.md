Xin chào các bạn, tiếp tục vởi [seri](https://viblo.asia/s/hoc-godot-shader-qua-cac-vi-du-aQZRb84dZvx) này, hôm nay mình sẽ hướng dẫn các bạn cách tạo hiệu ứng ma trận trong Godot bằng cách sử dụng shader.
Nếu bạn chưa từng biết về shader thì mình nghĩ nên tìm các bài dễ hơn để có kiến thức căn bản truớc :D.

Bài này mình đọc hiểu từ 1 bài viết về hiệu ứng này bằng Unity, bây giờ mình sẽ viết lại nó trong Godot và trình bày theo ý mà mình hiểu được. Đây là [link](https://shahriyarshahrabi.medium.com/shader-studies-matrix-effect-3d2ead3a84c5) nếu các bạn muốn tham khảo nguyên bản từ bài viết Unity. 

Để tạo hiệu ứng này thì về cơ bản  nó sẽ chia làm 2 phần:

**Phần 1**: Tạo ra hiệu ứng mưa như này [link](https://thumbs.gfycat.com/ApprehensiveVerifiableLeopard-mobile.mp4):

Mình tính úp ảnh gif lên cho các bạn xem luôn cho thuật tiện mà viblo bị gì ấy, mình ko up đưọc nên các bạn chịu khó click vào link để xem animation vậy :v.

![](https://images.viblo.asia/2a21619e-03cc-443d-8b2c-e4f239c3a2ea.png)

**Phần 2**: Tạo ra background characters thay đổi random các kí liên tục, [link](https://thumbs.gfycat.com/BlankAdmirableCarpenterant-mobile.mp4):

![](https://images.viblo.asia/5498c77f-fa7b-47b9-a824-454cf6e3d296.png)

**Phần 3:** combine chúng lại, ý tuởng là layer rain ở phần 1 sẽ giống như 1 chiếc mặt nạ, các bạn có thể hình dung như thế này, tại cùng 1 thời điểm, chúng ta sẽ vẽ cả 2 layer này lên, layer rain ở truớc và layer char ở phía sau, chỗ nào mà lớp rain có màu xanh thì sẽ cho phép tháy đuợc layer char, còn chỗ nào bị đen thì sẽ che đi, ngưọc lại thì ko.

![](https://images.viblo.asia/4a5a094f-ef2f-486f-8820-520f1d502ab3.png)

Và như vậy thì mình sẽ được kết quả như sau:

![](https://images.viblo.asia/a5aefb19-80ef-4b73-813a-0ee701d7e744.png)

Và Cuối cùng là trang trí thêm cho nó vd như là mỗi cột sẽ có màu gradient khác nhau [link](https://thumbs.gfycat.com/CarelessDarlingGavial-mobile.mp4):

![](https://images.viblo.asia/c504fce4-143d-4b92-9934-1daabece8de5.png)

OK, bây giờ chúng ta sẽ đi vào từng phần, ở bài này, mình sẽ hưóng dẫn các bạn code rain layer trước.

Để thử nghiệm nhanh, các bạn có thể tạo các node như thế này trước, Chỗ ColorRect các bạn chọn Layout là FullRect để nó tự động scale background full màn hình cho dễ quan sát.

![](https://images.viblo.asia/de62f969-dc94-47ad-99a3-b7bc06069eba.png)

![](https://images.viblo.asia/95c43dc4-ecd1-4bb5-a143-0f58e3035ead.png)

Sau đó các bạn khởi tạo file shader trống cho ColorRect, mấy bước setup này mình sẽ đi nhanh nha, vì mấy bài truớc mình có ghi chi tiết rồi, nếu bạn lần đầu coi vè shader, các bạn có thể kiếm P1 của mình để coi chi tiết cách tạo shader như thế nào:

![](https://images.viblo.asia/72683386-8797-4d9d-ab56-a4fa215daddc.png)

Về cơ bản thì full code của phần rain là như thế này:

```
shader_type canvas_item;

uniform sampler2D chars;
uniform float block_size = 16.0;

vec3 rain(vec2 fragCoord, vec2 uv, float time)
{
	vec2 _fragCoord = fragCoord;
	_fragCoord.x -= mod(_fragCoord.x, block_size);
	float offset = sin(_fragCoord.x * 15.0);
	float speed = cos(_fragCoord.x * 3.0) * 0.3 + 0.7;
	
	float y = fract(1.0 - uv.y + time * speed + offset);
	return vec3(0.0, 1, .0) * (1.0 / (20.0 * y));
}

void fragment() {
	vec3 rain = rain(FRAGCOORD.xy, UV, TIME);
	COLOR = vec4(rain, 1.0);
}
```

Nếu bạn có kinh nghiệm về shader, có thể tự xem và hiểu đuợc thì có thể qua phần tiếp theo của bài này để coi tiếp. Còn nếu bạn chưa rõ lắm, và muốn một vài lí giải đẻ hiểu được func này có thể làm đuợc như vậy thì đi tiếp xuống bên dưới :]

Mình sẽ chia nhỏ func này ra:

Mình sẽ code truớc 1 cột có màu xanh tăng dần từ dưói lên trên, sau đó sẽ dùng kĩ thuật để chia màn hình ra nhiều cột màu xanh khác sau:

Mình lượt hết mấy yếu tố rườm ra đi, và để lại code đơn giản nhất như sau:

```
vec3 rain(vec2 fragCoord, vec2 uv, float time)
{
 float y = fract(1.0 - uv.y);
 return vec3(.0, 1, .0) * (1.0 / (20.0 * y));
}
```

Hàm **fract** là hàm lấy phần phân số, vd fract(12.55) = 0.55.

**vec3(.0, 1, .0)** là màu xanh thôi (RGB), mình đẻ tạm vậy thôi, về sau sẽ có 1 hàm khác để tạo random màu có matrix sau, các bạn có thể đổi màu khác nếu thích.

Và đây là kết quả:

![](https://images.viblo.asia/b2b96eee-dc70-49d9-93c3-44eae7152991.png)

OK, bây giờ chúng ta sẽ dùng Time làm cho nó thay đổi y, tạo cảm giác như "giọt mưu" từ trên di chuyển xuống dưói:

```
vec3 rain(vec2 fragCoord, vec2 uv, float time)
{
 float speed = 0.5;
 float y = fract(1.0 - uv.y + time * speed);
 return vec3(0.0, 1, .0) * (1.0 / (20.0 * y));
}
```

Các bạn chịu khó bấm vào [link](https://thumbs.gfycat.com/UnevenThickArrowworm-mobile.mp4) này để xem animation nhé, hiện tại mình ko gửi đc file gif lên viblo đc, hơi bất tiện tí :v 

Như vậy là chúng ta đã code "1 giọt mưa" thành công, bây giờ chúng ta sê chia màn hình ra làm nhiều cột, mình đang đặt 1 biến **block_size** để gán width cho mỗi "gọt mưa" này, mặc định là 16px;

```
vec3 rain(vec2 fragCoord, vec2 uv, float time)
{
	vec2 _fragCoord = fragCoord;
	_fragCoord.x -= mod(_fragCoord.x, block_size);
	float offset = sin(_fragCoord.x * 15.0);
	float speed = cos(_fragCoord.x * 3.0) * 0.3 + 0.7;
	
	float y = fract(1.0 - uv.y + time * speed + offset);
	return vec3(0.0, 1, .0) * (1.0 / (20.0 * y));
}
```

mình giải tích 1 tí về input func này:

param1: **fragCoord** sẽ truyển toạ độ của màn hình vào, vd như màn hình bạn là 1024x700 thì biên này sẽ truyền các giá trị như (1,1) .... (1024, 700), và trong Shader Godot đã có 1 biên lưu trữ sẵn giá trị này là **FRAGCOORD**, chúng ta có thể sử dụng nó đẻ truyền vào biến này.

param2: uv, toạ độ **UV** của node này.

param3: time - biến thời gian.

Còn về nội dung bên trong hàm thì các bạn để ý:

func **mod**, là func phép chia lấy phần dư (vd **mod**(15.5, 12.0) = 3.5)

Ý tưỏng cơ bản là mình sẽ chia màn hình ra thành nhiều cột, và các "giọt mưa" **trong mỗi cột** này phải có các giá trị **offset** và **speed** là như nhau:

Và dòng `_fragCoord.x -= mod(_fragCoord.x, block_size);` này chính là dòng chính để thực hiện ý tưởng đó.

Để cho dễ hình dung các bạn có thể nhìn 1vd để minh hoạ như sau.

Giả sử block_size = 16.0

và vd như ban đầu các fragCoord.x của mình sẽ nhận các giá trị như sau 0, 1, 2, 3, 4 ... ,16, 17, 18...,31, 32, ,33...., 48,....

các bạn chú ý là:

mod(0, 16) = 0; mod(1,16) = 1; ... mod(15, 16) = 15

mod(16, 16) = 0; mod(17,16) = 1... mod(31, 32) = 15
....

Như vậy, sau khi qua dòng`_fragCoord.x -= mod(_fragCoord.x, block_size);` thì **fragCoords.x** sẽ thành các giá trị giống nhau nếu nó thuộc 1 block:

0, 0, 0, 0....., 1, 1, 1, 1, .... 2, 2, 2...

tức là các pixel trong cùng 1 block đều đưa về cùng 1 giá trị.

Tén tèn ten, và các bạn có thể dùng giá trị này đẻ tạo random các **offset** và **speed** như các công thức mà cá bạn có thể tưởng tượng ra đc :D.

```
	float offset = sin(_fragCoord.x * 15.0);
	float speed = cos(_fragCoord.x * 3.0) * 0.3 + 0.7;
```

Ở vd trên thì công thức mà tác giả viết ra cũng là 1 cách, các bạn có thể tham khảo, nhưng ko cần để ý nó quá, có bạn có thể tự chỉnh thành chính các hàm của các bạn cũng đc.

![](https://images.viblo.asia/2a21619e-03cc-443d-8b2c-e4f239c3a2ea.png)

Mình sẽ tạm dừng ở bưóc này ở đây, Ở các bài sau mình sẽ hướng dẫn các bạn code tiếp phần text và phần color.

Cảm ơn các bạn đã đọc bài :]