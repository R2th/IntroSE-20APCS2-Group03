Chào các bạn,

Ở bài trước, mình đã nói tới cách tạo 1 số khối hình học đơn giản bằng HTML/CSS. Để tiếp tục với seri **Tạo khối hình học bằng CSS3**, hôm nay mình tiếp tục giới thiệu cách tạo 1 số khối hình học khác nữa. Các bạn có thể theo dõi bài 1 tại đây nhé: [Tạo các khối hình học bằng CSS3 (phần 1)](https://viblo.asia/p/bai-24-tao-cac-khoi-hinh-hoc-bang-css3-phan-1-1Je5ExEYlnL)

## 1. Hình thang

Để tạo hình thang kỳ thực rất đơn giản, nó không khác tạo hình tam giác quay lên là mấy. Chỉ khác ở phần set **width** cho khối mà thôi.

**HTML**

```
<div class="row">
      <div class="block col-md-4">
        <div class="trapezium red "></div>
      </div>

      <div class="block col-md-4">
        <div class="trapezium green "></div>
      </div>

      <div class="block col-md-4">
        <div class="trapezium blue "></div>
      </div
```

**CSS**

```
.trapezium {
  border-bottom: 80px solid black;
	border-left: 50px solid transparent;
	border-right: 50px solid transparent;
	height: 0;
	width: 160px;

  &.red {
    border-bottom-color: red;
  }

  &.green {
    border-bottom-color: green;
  }

  &.blue {
    border-bottom-color: blue;
  }
}
```

**Result**

![](https://images.viblo.asia/4b1ddca0-ed6a-46e7-8c07-7c5b0376d783.png)

## 2. Hình bình hành

Để tạo hình khối hình bình hành thì thực chất ban đầu chúng ta tạo một hình chữ nhật hoặc hình vuông như bình thường sau đó dùng thuộc tính **transform: skew()** để tạo ra hình bình hành.

Nói thêm 1 chút về **skew**. Thuộc tính transform với giá trị skew: Xác định sự biến đổi nghiêng 2D dọc theo trục X và Y. Đó chỉ là như vậy thôi. Cũng không có gì khó hiểu lắm đúng không?

### 2.1. skew(0, y)

**HTML**

```
<div class="row">
      <div class="block col-md-4">
        <div class="skew-y red "></div>
      </div>

      <div class="block col-md-4">
        <div class="skew-y green "></div>
      </div>

      <div class="block col-md-4">
        <div class="skew-y blue "></div>
      </div>
    </div>
```

**SCSS**

```
.skew-y {
  width: 100px;
  height: 100px;
  background-color: black;

  &.red {
    background-color: red;
    transform: skew(0deg, 10deg);
    -moz-transform: skew(0deg, 10deg);
    -webkit-transform: skew(0deg, 10deg);
    -o-transform: skew(0deg, 10deg);
    -ms-transform: skew(0deg, 10deg);
  }

  &.green {
    background-color: green;
    transform: skew(0deg, 0deg);
    -moz-transform: skew(0deg, 0deg);
    -webkit-transform: skew(0deg, 0deg);
    -o-transform: skew(0deg, 0deg);
    -ms-transform: skew(0deg, 0deg);
  }

  &.blue {
    background-color: blue;
    transform: skew(0deg, -10deg);
    -moz-transform: skew(0deg, -10deg);
    -webkit-transform: skew(0deg, -10deg);
    -o-transform: skew(0deg, -10deg);
    -ms-transform: skew(0deg, -10deg);
  }
}
```

**Result **

![](https://images.viblo.asia/ffe92171-acac-4ff7-b115-421d37e1eecf.png)

### 2.2. skew(x, 0)

**HTML**

```
<div class="row">
      <div class="block col-md-4">
        <div class="skew-x red "></div>
      </div>

      <div class="block col-md-4">
        <div class="skew-x green "></div>
      </div>

      <div class="block col-md-4">
        <div class="skew-x blue "></div>
      </div>
    </div>
```

**SCSS**

```

.skew-x {
  width: 100px;
  height: 100px;
  background-color: black;

  &.red {
    background-color: red;
    transform: skew(20deg, 0deg);
    -moz-transform: skew(20deg, 0deg);
    -webkit-transform: skew(20deg, 0deg);
    -o-transform: skew(20deg, 0deg);
    -ms-transform: skew(20deg, 0deg);
  }

  &.green {
    background-color: green;
    transform: skew(0deg, 0deg);
    -moz-transform: skew(0deg, 0deg);
    -webkit-transform: skew(0deg, 0deg);
    -o-transform: skew(0deg, 0deg);
    -ms-transform: skew(0deg, 0deg);
  }

  &.blue {
    background-color: blue;
    transform: skew(-20deg, 0deg);
    -moz-transform: skew(-20deg, 0deg);
    -webkit-transform: skew(-20deg, 0deg);
    -o-transform: skew(-20deg, 0deg);
    -ms-transform: skew(-20deg, 0deg);
  }
}
```

**Result **

![](https://images.viblo.asia/209e8a51-071e-459e-bed5-abc9e79556d5.png)

### 2.3. skew(x, y)

**HTML**

```
<div class="row">
      <div class="block col-md-4">
        <div class="skew-xy red "></div>
      </div>

      <div class="block col-md-4">
        <div class="skew-xy green "></div>
      </div>

      <div class="block col-md-4">
        <div class="skew-xy blue "></div>
      </div>
    </div>
```

**SCSS**

```
.skew-xy {
  width: 100px;
  height: 100px;
  background-color: black;

  &.red {
    background-color: red;
    transform: skew(10deg, 10deg);
    -moz-transform: skew(10deg, 10deg);
    -webkit-transform: skew(10deg, 10deg);
    -o-transform: skew(10deg, 10deg);
    -ms-transform: skew(10deg, 10deg);
  }

  &.green {
    background-color: green;
    transform: skew(0deg, 0deg);
    -moz-transform: skew(0deg, 0deg);
    -webkit-transform: skew(0deg, 0deg);
    -o-transform: skew(0deg, 0deg);
    -ms-transform: skew(0deg, 0deg);
  }

  &.blue {
    background-color: blue;
    transform: skew(-10deg, -10deg);
    -moz-transform: skew(-10deg, -10deg);
    -webkit-transform: skew(-10deg, -10deg);
    -o-transform: skew(-10deg, -10deg);
    -ms-transform: skew(-10deg, -10deg);
  }
}
```

**Result**

![](https://images.viblo.asia/c6a51b70-ae77-46f5-8b2b-83257746e067.png)

Như vậy, qua bài thứ 2 này, chúng ta lại học thêm được cách tạo 2 loại khối hình học mới. Tuy nói là 2 nhưng thực chất là 4 hình đó nhỉ. 
Quan trọng hơn là chúng ta biết thêm được 1 giá trị khác của thuộc tính **transform**. Có thể cũng có nhiều bạn đã biết và từng sử dụng nó rồi. Nhưng mình dám cá 400 points rằng, ở đây còn rất rất nhiều bạn chưa từng biết đến **transform: skew()** luôn.
Các khối hình ở bài này vẫn còn đơn giản, chưa thực sự phức tạp. Bài sau thì các khối hình học sẽ phức tạp hơn rất nhiều đó. 
Hi vọng các bạn sẽ ủng hộ. Chúc thành công!