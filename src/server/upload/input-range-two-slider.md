## Giới thiệu
Thẻ input có khá nhiều type, ngoài những type phổ biến như text, number... thì còn có những type ít dùng đến như range. Chắc ai đó đã từng thấy 1 thứ như này:
![](https://images.viblo.asia/44e9ea1c-000d-4a28-8ec1-2104673af2b8.png)
input type="range" chỉ giúp ta có 1 slider, làm thế nào để tạo ra 1 cái input range 2 slider như ảnh trên? trong bài này mình sẽ làm thử 1 cách, còn cách khác mn có thể search mạng nhé =))

## Lý thuyết
input range cho ta 1 cái slider, vậy muốn có 2 cái thì chồng lên nhau chắc là ổn.
Đây là lý thuyết để tạo ra cái input range như ảnh trên của mình:
1. Đè 2 cái input range có cùng min, max, step lên nhau = css
2. Đè cái thumb (cái tròn tròn để kéo) mặc định = 1 cái thumb khác mình tự tạo và css nó tuỳ thích, vấn đề là chúng phải cùng kích cỡ, cùng vị trí khi kéo
3. Thêm cái line ở giữa co dãn theo slider cho đẹp

Đây là code của mình, mình chỉ demo nhanh nên viết hơi láo, mn thông cảm nhé :joy:
{@embed: https://codepen.io/dfly24s/pen/KKVWeMr}

Css thì khá dễ hiểu, đè 2 cái input lên nhau, cho nó ẩn = opacity 0, cái thumb mình tạo thêm sẽ nằm dưới cái thumb thật (z-index 2 < 3), nằm dưới mà vẫn kéo đc là do `pointer-events: all`
Js thì lý thuyết cũng đơn giản: 
1. Tạo 2 biến min và max khởi tạo, ví dụ trong bài là 10 - 100
2. Với sự kiện onInput ở input range, ta set lại giá trị cho inputMin và inputMax, đồng thời là vị trí của thumb dự vào value mới, mình đang check nếu kéo min > max thì ko cho kéo tiếp và ngược lại
3. Chú ý hàm `calcLeftPosition()`, giải thích thì nó như này `100 / (MAX - MIN) *  (value - MIN)`, cái này là toán học thôi :joy:

## Kết luận
Trên đây là bài giới thiệu làm input range two slider của mình, vào project thì phải code lại cho đẹp hơn chứ đừng viết như mình :rofl:
Cũng còn cách làm khác như thay vì dùng input range ta tạo hẳn ra 1 đống html và css cho nó giống cái input, tuy nhiên xử lý css lẫn js đều phức tạp hơn.
Have a nice day!