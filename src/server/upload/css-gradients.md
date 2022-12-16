# Linear Gradient
linear-gradient (gradient tuyến tính) là loại gradient phổ biến nhất mà chúng ta thấy trong thiết kế web là . Nó được gọi là "tuyến tính" vì flow của màu sắc sẽ từ trái sang phải, từ trên xuống dưới hoặc ở bất kỳ góc nào tùy thuộc vào hướng mà mình chọn.

### Syntax 
`linear-gradient()`  sẽ tạo nên các dải màu nên thường sẽ được sử dụng trong thuộc tính `background` (hay cụ thể hơn là `background-image`) trong CSS.
```css
linear-gradient(
  [ <angle> | to <side-or-corner> ]? ,
  <color-stop-list>
)
<side-or-corner> = [left | right] || [top | bottom]
```

Một cách để nhớ và hình dung được cách hoạt động của phương thức này
> Create a **background image** that is a **linear gradient** that moves **[to this direction or at this angle]** and starts with **[one color]** and ends with **[another color]**.

### Usage
{@embed: https://codepen.io/HuyNL/pen/KKwaEwP}

Mọi người có thể thấy mình không định nghĩa phần `[ <angle> | to <side-or-corner> ]` nên mặc định CSS sẽ hiểu là trải dải màu từ trên xuống `to bottom` với màu ban đầu là màu đỏ (red) sau đó chuyển đổi dần sang màu cam (orange). Ngoài cách định nghĩa cơ bản như trên còn có 1 số cách khác cho phép mình kiểm soát chiều cũng như tạo nhiều dải màu khác nhau cho màu nền đa dạng hơn.

```css
/* A gradient tilted 45 degrees,
   starting blue and finishing red */
linear-gradient(45deg, blue, red);
```
![](https://images.viblo.asia/0db3611c-3a72-42e5-b96e-f5135f857149.png)

```css
/* A gradient going from the bottom right to the top left corner,
   starting blue and finishing red */
linear-gradient(to left top, blue, red);
```
![](https://images.viblo.asia/c3572e6c-daf7-40a0-86d5-126d4af999bf.png)

```css
/* Color stop: A gradient going from the bottom to top,
   starting blue, turning green at 40% of its length,
   and finishing red */
linear-gradient(0deg, blue, green 40%, red);
```
![](https://images.viblo.asia/b7b10fd1-e968-4878-a94f-4c5fe196a1dc.png)

```css
/* Color hint: A gradient going from the left to right, 
   starting red, getting to the midpoint color 
   10% of the way across the length of the gradient, 
   taking the rest of the 90% of the length to change to blue */ 
linear-gradient(.25turn, red, 10%, blue);
```
![](https://images.viblo.asia/58d17eee-173a-4783-a491-487da93b2872.png)

```css
/* Multi-position color stop: A gradient tilted 45 degrees, 
   with a red bottom-left half and a blue top-right half, 
   with a hard line where the gradient changes from red to blue */
linear-gradient(45deg, red 0 50%, blue 50% 100%);
```
![](https://images.viblo.asia/2c1efd8e-5570-4cb8-be41-cf06143d81ed.png)

```css
/* Multi-color: A gradient going from left to right,
   starting red, change to orange, to yellow, then finally to green */
linear-gradient(to right, red, #f06d06, rgb(255, 255, 0), green);
```
![](https://images.viblo.asia/2b937c71-bca9-4928-b2a0-c5635b5e4116.png)

# Radial Gradient
Radial gradient (gradient xuyên tâm) khác với linear gradient ở chỗ nó bắt đầu tại một điểm duy nhất và phát rộng ra bên ngoài. Các lớp thường được sử dụng để mô phỏng một nguồn sáng. Điều đó làm cho chúng hữu ích để làm cho sự chuyển giao giữa các màu được tự nhiên hơn.

Mặc định màu đầu tiên bắt đầu ở vị trí trung tâm của phần tử và sau đó mờ dần sang màu kết thúc về hướng về phía rìa của phần tử. Sự mờ dần xảy ra ở một tỷ lệ bằng nhau bất kể phương hướng.

### Syntax
Tương tự như linear-gradient, `radial-gradient` cũng được  sử dụng trong thuộc tính `background` (hay cụ thể hơn là `background-image`)
```css
radial-gradient(
  [ [ <shape> || <size> ] [ at <position> ]? , |
    at <position>, 
  ]?
  <color-stop> [ , <color-stop> ]+
)
```

Cho dễ gợi nhớ :D
> Paint a **radial gradient** in **[some shape]** at **[some size]** that is located in **[these positions]**. Oh, and make sure it **starts** with this **[color]** and **stops** at this **[color]**.

### Usage
```css
background-image: radial-gradient(yellow, #f06d06);
```
Bằng việc không khai báo các giá trị `shape`, `size`, `position` hoặc `color-stop`, tất cả đều mặc định cho các giá trị đặt gradient ở chính giữa của phần tử và chuyển đổi đồng đều giữa các giá trị màu được khai báo.

![](https://images.viblo.asia/3c13eb38-5ef3-4103-bad2-fc9809a1c256.png)

Ngoài ra có thể thay vị trí điểm trung tâm

```css
background-image: radial-gradient(circle at top right, yellow, #f06d06);
```

![](https://images.viblo.asia/a5073925-0d1d-4cf9-90b1-8cadb9889d52.png)

# Conic Gradient
Conic gradient (gradient hình nón) tương tự như một radial gradient. Cả hai đều là hình tròn và sử dụng tâm của phần tử làm điểm nguồn cho các điểm màu. Tuy nhiên, khác với cái dải màu của radial gradient xuất phát từ tâm vòng tròn, conic gradient sắp xếp dải màu xung quanh vòng tròn. Gọi là "hình nón" vì nhìn từ trên cao xuống xu hướng trông giống hình dạng của một chiếc nón.

### Syntax

```css
conic-gradient(
  [ from <angle> ]? [ at <position> ]?,
  <angular-color-stop-list>
)
```

> Make a conic-gradient that is located at **[some point]** that starts with **[one color]** at some angle and ends with **[another color]** at **[some angle]**

```css
background-image: conic-gradient(#fff, #000);
```
![](https://images.viblo.asia/14e32713-0413-4526-b36b-ebd745b94ec3.png)

Vị trí của gradient bắt đầu ở chính giữa của phần tử (50% 50%) và được phân bố đồng đều giữa các giá trị màu trắng và đen.

Lợi dụng sự đơn giản này để tạo color palette trong các tool color picker
```css
background: conic-gradient(red, yellow, lime, aqua, blue, magenta, red);
```
![](https://images.viblo.asia/80e723a4-4139-4e97-bd58-2c60be278a62.png)

Hay tạo 1 cái pie chart chỉ với 1 dòng css
![](https://images.viblo.asia/d69f88c7-af01-4d8a-9eca-b471d5382e4f.png)


# References
https://css-tricks.com/snippets/css/css-linear-gradient/

https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient

https://css-tricks.com/snippets/css/css-radial-gradient/

https://developer.mozilla.org/en-US/docs/Web/CSS/radial-gradient

https://css-tricks.com/snippets/css/css-conic-gradient/

https://developer.mozilla.org/en-US/docs/Web/CSS/conic-gradient