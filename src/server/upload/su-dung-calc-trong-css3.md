Chào các bạn,

Trong bài này tôi sẽ giới thiệu về calc() trong CSS3
# I. Giới thiệu về calc()
Như chúng ta đã biết thì từ CSS3, chúng ta đã có hàm calc() cho phép chúng ta thực hiện các phép toán học ngay trong thuộc tính(property). Thay vì khai báo các giá trị pixel tĩnh cho các độ rộng (width) của element, chúng ta có thể sử dụng calc() để xác định kết quả dựa trên nhiều giá trị số truyền vào.

Ví dụ
```
.foo {
    width: calc(100px + 50px);
}
```
# II. Tại sao nên sử dụng calc()
Nếu bạn sử dụng CSS pro-processors giống như SASS, những gì bạn cần viết tương tự như trên sẽ là:
```
.foo {
    width: 100px + 50px;
}

// Or using SASS variables
$width-one: 100px;
$width-two: 50px;
.bar {
    width: $width-one + $width-two;
}
```

Tuy nhiên, hàm calc() ở trên sẽ cho ta 1 giải pháp tốt hơn với lý do:
- Thứ nhất, chúng ta có thể kết hợp nhiều đơn vị trong việc xác định giá trị size của property. Đặc biệt là chúng ta cho thể mix giữa tỉ lệ phần %, và viewport với absolute units như pixels.

Ví dụ:
```
.foo {
    width: calc(100% - 50px);
}
```
Trong ví dụ trên thì element .foo luôn có width là 50px nhỏ hơn so với 100% kích thức của parent chứa nó.
- Lý do thứ 2, sử dụng calc() thì giá trị tính toán chính là giá trị của expression của nó. Có nghiã là khi sử dụng biểu thức tính toán (mathematical expressions) trên thì giá trị show ra sẽ là biểu thức expression

Ví dụ:
```
// Value specified in SCSS
.foo {
    width: 100px + 50px;
}

// Compiled CSS and computed value in browser
.foo {
    width: 150px;
}
```
Tuy nhiên, nếu sử dụng calc() thì giá trị parsed ra bởi browser sẽ vẫn là calc() expression
```
// Value specified in CSS
.foo {
    width: calc(100% - 50px);
}

// Computed value in browser
.foo {
    width: calc(100% - 50px);
}
```
Điều này có nghĩa là giá trị của nó trên browser sẽ được dynamic. Khi đó, nếu 1 phần viewport(chiều cao hoặc chiều rộng) được thay đổi thì giá trị của nó sẽ được thay đổi và được trừ đi 1 giá trị tuyệt đối (50px) tương ứng.
# III. Sử dụng calc() khi nào?
Sử dụng calc() khi bạn muốn thực hiện cộng, trừ, nhân, chia với các giá trị thuộc tính số.  Đặc biệt bạn có thể sử dụng nó với kiểu dữ liệu như length, frequency, angle, time, number, integer

Ví dụ:
```
.foo {
    width: calc(50vmax + 3rem);
    padding: calc(1vw + 1em);
    transform: rotate( calc(1turn + 28deg) );
    background: hsl(100, calc(3 * 20%), 40%);
    font-size: calc(50vw / 3);
}
```
# IV. Lồng hàm
calc() có thể sử dụng lồng nhau, tuy nhiên nó được coi như các biểu thức tính toán đơn giản

Ví dụ:
```
.foo {
    width: calc( 100% / calc(100px * 2) );
}
```
Giá trị tính toán của function sẽ tuơng ứng với:
```
.foo {
    width: calc( 100% / (100px * 2) );
}
```
# V. Cung cấp Fallback
calc() khá là phổ biến, khi support hầu hết các browser hiện tại

![](https://images.viblo.asia/0310e3e6-efe7-4ad3-9e07-4780a0c0f7f8.png)

Đối với các browser không support calc() thì các biểu thức expression sẽ bị ignored. Khi đó chúng ta hoàn toàn có thể cung cấp các giải pháp fallback bằng các static value
```
.foo {
	width: 90%; /* Fallback for older browsers */
    width: calc(100% - 50px);
}
```
# VI. Khi nào thì sử dụng calc()
calc() là hữu ích trong rất nhiều các tình huống, do đó chúng ta có thể phối kết hợp nó trong các bài toán cụ thể.

Ví dụ sử dụng calc() để xử lý các phần tử trung tâm:
```
// Assuming .foo is 300px height and 300px width
.foo {
    position: absolute
    top: 50%;
    left: 50%;
    marging-top: -150px;
    margin-left: -150px;
}
```
Thay thế bằng calc()
```
.foo {
    position: absolute
    top: calc(50% - 150px);
    left: calc(50% - 150px);
}
```
# VII.Kết luận
Trên đây là bài giới thiệu về calc() trong CSS3, mong là nó sẽ hữu ích cho các bạn.

Thanks for reading!!!