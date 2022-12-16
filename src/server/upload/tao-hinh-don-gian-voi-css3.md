Với CSS3 chúng ta có thể tạo ra các hình dạng thú vị mà không hề khó khăn. Vậy có bao nhiêu có cách khác nhau để tạo hình?

Trong bài viết này mình xin trình bày một số cách phổ biến nhất để tạo ra hình tròn, hình tam giác, hình đa giác.. cũng như ưu nhược điểm của các phương pháp này.

Dưới đây là một số cách tạo hình cho trang web:

## border-radius

Sử dụng thuộc tính `border-radius` là cách dễ nhất để tạo hình tròn.

```
.circle {
   height: 500px;
   width: 500px;
   border-radius: 50%;
}
```

![](https://images.viblo.asia/3ab79d5b-d82a-4f2e-93c4-e7d6559b5f1a.png)

Bạn có thể sử dụng bất kỳ giá trị độ dài nào cho bán kính đường tròn. Với các giá trị độ dài khác nhau, ta sẽ thu được các hình khác nhau:

```
# HTML

<div class="shape"></div>
<div class="shape shape2"></div>
<div class="shape shape3"></div>

# CSS

.shape {
  height: 150px;
  width: 150px;
  background-color: #0074d9;
  border-radius: 80px;
  margin-bottom: 30px;
  float: left;
  margin-right: 20px;
}

.shape2 {
  border-radius: 30px;
}

.shape3 {
  border-radius: 5px;
}
```

![](https://images.viblo.asia/1d6e28cc-47ad-42bb-8d9f-6f362f7c8060.PNG)

Ưu điểm:
   - Đa số các trình duyệt đều hỗ trợ.
   - Chỉ cần chỉnh sửa CSS với lượng nhỏ.

Mọi người có thể tìm hiểu thêm các option với css `border-radius` [tại đây](https://css-tricks.com/almanac/properties/b/border-radius/).

## border

Chúng ta cũng có thể tạo ra một số hình dạng khác nhau với thuộc tính `border` như hình tam giác, hình thang...

1. Hình tam giác

```
.triangle {
     height: 0;
     width: 0;
     border-left: 50px solid red;
     border-right: 50px solid transparent;
     border-bottom: 50px solid transparent;
     border-top: 50px solid transparent;
}
```

![](https://images.viblo.asia/f445a8c2-7fbf-4ff9-8d0e-e2b31aa54dd6.PNG)

2. Hình thang

```
.trapezium {
    border-bottom: 100px solid #333;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    height: 0;
    width: 100px;
}
```

![](https://images.viblo.asia/74061a0b-0981-4535-b8c5-1828ceb40819.PNG)


**Ưu điểm**

- Hỗ trợ tốt trên các trình duyệt.
- Sử dụng dễ dàng cho việc tạo hình.

## Rotate transform 

Với một số hình đặc trưng như kim cương, ta có thể sử dụng thuộc tính `transform` để biến đổi một hình vuông thông thường:

```
.diamond {
    transform: rotate(45deg);
}
```

![](https://images.viblo.asia/6ec599e5-a7ad-497c-8cbd-6c6f6e90c2e7.PNG)

Ta có thể thay đổi vị trí của khối bằng thuộc tính `transform-origin` 

```
.diamond {
    transform: rotate(45deg);
    transform-origin: 0 100%;
}
```

**Ưu điểm**

- Trình duyệt hỗ trợ tốt.

**Nhược điểm**

- Việc thay đổi hình dạng với thuộc tính `transform-origin` phụ thuộc vào từng trường hợp.

## pseudo element

`Pseudo elements` rất quan trọng trong việc tạo ra hình dạng trong css. Với chúng, ta có thể tạo ra các hình đặc biệt như ngũ giác, ngôi sao nhiều cánh...
Dưới đây là ví dụ về hình ngũ giác:

```
.pentagon {
    position: relative;
    width: 54px;
    border-width: 50px 18px 0;
    border-style: solid;
    border-color: #01ff70 transparent;
}
.pentagon:before {
    content: "";
    position: absolute;
    height: 0;
    width: 0;
    top: -85px;
    left: -18px;
    border-width: 0 45px 35px;
    border-style: solid;
    border-color: transparent transparent #01ff70;
}
```

![](https://images.viblo.asia/ec9e8539-4441-45d4-b7f2-1538576f3a98.PNG)

Bằng cách sử dụng `pseudo element` ta có thể tạo ra các hình dạng riêng biệt, sau đó, set vị trí cho chúng để tạo ra hình thống nhất mà ta muốn. 

**Ưu điểm**
- Có thể tạo ra hầu hết mọi hình dạng với `pseudo element`.
- Không yêu cầu thêm HTTP.

**Nhược điểm**
Trong các dự án lớn, với một số hình dạng phức tạp, ta nên sử dụng một cách phù hợp để tránh gây phức tạp, nhầm lẫn.

## box-shadow

Đây là cách kỳ lạ nhất để tạo hình dạng bằng css. Với thuộc tính này ta có thể tạo ra các hình dạng đáng kinh ngạc.

```
.element {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    box-shadow: 15px 15px red;
}
```

![](https://images.viblo.asia/df85b577-4ad5-458e-b76d-045d0cf8d695.PNG)

**Ưu điểm**

- WOA, ta có thể tạo hình với `box-shadow`?

**Nhược điểm**

- Đòi hiểu việc tìm chính xác vị trí từng px trong thuộc tính `box-shadow`.
- Hình ảnh không thể chỉnh sửa bởi các ứng dụng như Illustrator, Photoshop hoặc Sketch.

## clip-path 

Chúng ta có thể sử dụng các hàm với `clip-path` bao gồm `inset(), polygon(), and ellipse()`. Dưới đây là một ví dụ:

```
.element {
  width: 200px;
  height: 200px;
  clip-path: polygon(0% 100%, 100% 100%, 0% 0%);
}
```

**Ưu điểm**

- Chúng ta có thể tạo ra các hình phức tạp mà không cần image.

**Nhược điểm**

- Nếu bạn muốn tạo hình bao quanh văn bản, thì cần phải sử dụng kết hợp với `shape-outline`.

## SVG

- SVG (viết tắt của Scalable Vector Graphics) dùng để miêu tả các hình ảnh đồ họa véc tơ hai chiều, tĩnh và hoạt hình, thường dành cho ứng dụng trên các trang mạng.
- SVG có thể phóng to thu nhỏ mọi kích cỡ mà không giảm chất lượng hình ảnh. Vì thế, nó được dùng nhiều trong các bản đồ, sơ đồ.
- Với SVG, ta dễ dàng tạo các hình ảnh như hình tròn, hình ovan....

Tham khảo thêm tại [đây](https://www.inithtml.com/html-css/tao-hinh-khoi-voi-svg/).

**Ưu điểm**

- Kích thước tệp nhỏ.
- Có thể đặt trong bất kỳ trình soạn thảo đồ họa nào.
- Dễ sử dụng cho người mới.
- Chúng có thể mở rộng đến hầu hết mọi kích thước mà không bị mờ.
- Hỗ trợ trên nhiều trình duyệt.
- Animatable với CSS và JS.

**Nhược điểm**

- Với những hình ảnh đơn giản thì ta chỉ cần sử dụng các thuộc tính css thuần túy.

## canvas

-  Ban đầu nó được thiết kế để vẽ đồ họa bằng JavaScript, canvas đặc biệt hữu ích cho các biểu đồ hoặc tạo các trò chơi tương tác. Bạn có thể tìm hiểu thêm tại [đây](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial).

**Ưu điểm**

- Hữu ích cho việc tạo trò chơi và biểu đồ tương tác.

**Nhược điểm**

- Phụ thuộc vào Javascript.

## Tổng kết

Không có kỹ thuật nào là hoàn hảo, với từng trường hợp ta nên lựa chọn kỹ thuật cho phù hợp, để tránh gây ra sự phức tạp và khó khăn cho việc tạo hình.

## Nguồn tham khảo

https://css-tricks.com/working-with-shapes-in-web-design/