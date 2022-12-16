Hôm nay mình sẽ huớng dẫn các bạn làm hiệu ứng này:

![](https://images.viblo.asia/cccfdf25-3087-49f8-aa0c-e53ca72b01b7.gif)

Đầu tiên các bạn có thể tạo 1 project mới, sau đó tạo 1 node2D có ColorRect như sau:

![](https://images.viblo.asia/fa1eac4b-ead4-4fd8-8750-61e2313669b9.png)

Thêm shader vào ColorRect, nếu như các bạn không biết thêm có thể quay lại các bài cũ của mình để xem chi tiết cách tạo shader :

Sau khi tạo xong thì sẽ có như thế này:

![](https://images.viblo.asia/54d934d2-c952-4aba-a7f7-f786e69735e0.png)

Mình sẽ tạo 1 biến progress để kiểm soát việc chạy animation cho hiệu ứng này, giá trị của nó là từ  0 -> 1 (0 là chưa chạy, 0.5 là hiệu ứng chạy đc 50% rồi, 1 là hiệu ứng chạy hoàn tất)

Về cơ bản thì chúng ta sẽ code như sau:

```
void fragment() {
	if (???) {
       // Chúng ta sẽ không render pixel này
		discard;
	}
}
```

mình có thể điền vào ??? để thử biến **discard** như sau:

```
shader_type canvas_item;

uniform float progress : hint_range(0, 1);

void fragment() {
	if (UV.x + UV.y > 2.0 * progress) {
		discard;
	}
}
```

copy đoạn code trên vào và từ từ kéo biến progress trong phần Shader Param, các bạn sẽ thấy như sau:
![](https://images.viblo.asia/fe481650-b4ae-4907-af70-b50d0701ab81.gif)

Mình cũng không có gì để giải thích quá nhiều về dòng "UV.x + UV.y > 2.0 * progress", Đây là phương trình nữa mặt phẳng lớp 10 đã học thôi: ax + by + c  > 0, ax + by + c  < 0. Còn tại sao lại là 2.0 * progress là bởi vì UV.x từ 0 -> 1, UV.y cũng từ 0 -> 1, nên mình phải nhân 2 vào progress để đảm bảo khi progress bằng 1 thì nó phải chạy xong hiệu ứng, các bạn có thể bỏ số 2 để test là sẽ thấy.

OK, giờ quay trở lại vấn đề chính, chúng ta sẽ điển gì vào ??? để đạt đc hiệu ứng mong muốn:

Mình sẽ thêm 1 biến để giúp mình kiểm soát size của hình thoi:

```
// Size of each diamond, in pixels.
uniform float diamondPixelSize = 30f;
```

Chình fragment thành như sau:

```
shader_type canvas_item;

uniform float progress : hint_range(0, 1);
uniform float diamondPixelSize = 30f;

void fragment() {
    float xFraction = fract(FRAGCOORD.x / diamondPixelSize);
    float yFraction = fract(FRAGCOORD.y / diamondPixelSize);
    if (xFraction + yFraction > progress * 2f) {
        discard;
    }
}
```

Lưu ý: 
- Biến **FRAGCOORD** trả cho chúng ta toạ độ của của pixel theo màn hình vd như 20 pixel, 100 pixel, (Lưu ý là Biến UV chỉ trả về toạ độ đã đưọc chuẩn hoá từ 0 -> 1 chứ không trả ra toạ độ chính xác của pixel theo màn hình)
- Hàm **fract** là hàm phân số, nó sẽ trả về phần phân số, vd: fract(5.31) = 0.31; fract(1.2) = 0.2

Bây giờ thì hiệu ứng chạy được như sau:

![](https://images.viblo.asia/9082702b-87cd-415b-9fdd-0dfe93e53027.gif)

Nhận xét, nó khá giống như func mình test ở lúc trước, nhưng mà thay vì phủ chéo lên toàn mình hình như truớc thì bây giờ nó chạy trên từng hình vuông nhỏ có kích thước được cấu hình tại **diamondPixelSize** 

Ưhmmmm, như vậy bây giờ chúng ta sẽ app dụng công thức của hình thoi thay vì dùng công thức nữa mặt phẳng như trên:

Đại loại là hình thoi sẽ có công thức là |X - A| + |Y - B| = R, Trong đó R là bán kính hình thoi, và (A, B) là tâm của hình thoi.

chúng ta muốn hình thoi sẽ nằm ở giữa mối ô vuông nên chúng là (A, B) = (0.5, 0.5)

Update code thành như sau:

```
void fragment() {
    float xFraction = fract(FRAGCOORD.x / diamondPixelSize);
    float yFraction = fract(FRAGCOORD.y / diamondPixelSize);
    
    float xDistance = abs(xFraction - 0.5);
    float yDistance = abs(yFraction - 0.5);
    
    if (xDistance + yDistance > progress * 2f) {
        discard;
    }
}
```

Chạy thử và chúng ta sẽ thấy:

![](https://images.viblo.asia/b57a7fcc-eba8-4f22-b006-0c8b5d60d9dc.gif)

Tốt, nhưng vẫn còn đơn điệu quá, chúng ta muốn mở rộng ra thành các hình vuông sẽ xuất hiện từ từ góc trên xuống, hoặc từ trái qua phải, hoặc từ trên xuống dưới:

Cái này cũng đơn giản, chúng ta chỉ cần kết hợp thêm các phương trình đường thẳng phù hợp vào thì sẽ có đưọc hiệu ứng như ý:

Thay code thành như sau:

```
void fragment() {
    float xFraction = fract(FRAGCOORD.x / diamondPixelSize);
    float yFraction = fract(FRAGCOORD.y / diamondPixelSize);
    
    float xDistance = abs(xFraction - 0.5);
    float yDistance = abs(yFraction - 0.5);
    
    if (xDistance + yDistance + UV.x + UV.y > progress * 4f) {
        discard;
    }
}
```

![](https://images.viblo.asia/56dec6e6-6267-402e-8f4d-8d89152b58a5.gif)

Nếu muốn cho nó đi từ trái qua phải thì chỉnh thành:
```
void fragment() {
    float xFraction = fract(FRAGCOORD.x / diamondPixelSize);
    float yFraction = fract(FRAGCOORD.y / diamondPixelSize);
    
    float xDistance = abs(xFraction - 0.5);
    float yDistance = abs(yFraction - 0.5);
    
    if (xDistance + yDistance + UV.x > progress * 3f) {
        discard;
    }
}
```
![](https://images.viblo.asia/048cce95-bd28-4c14-8bef-07408c55384a.gif)

Nếu muốn từ trên xuống thì thay thành:

```
void fragment() {
    float xFraction = fract(FRAGCOORD.x / diamondPixelSize);
    float yFraction = fract(FRAGCOORD.y / diamondPixelSize);
    
    float xDistance = abs(xFraction - 0.5);
    float yDistance = abs(yFraction - 0.5);
    
    if (xDistance + yDistance + UV.y > progress * 3f) {
        discard;
    }
}
```

![](https://images.viblo.asia/6ef9a16b-7019-47fd-9a0b-c20cb8cfb74f.gif)

Bài của mình tới đây thôi, hẹn gặp các bạn ở lần khác