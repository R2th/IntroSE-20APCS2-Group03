## 1. Lời nói đầu

Chào các bạn,

Đã khi nào các bạn gặp rắc rối trong việc tạo các khối hình học vuông, tròn, tam giác chưa? Có lẽ không ít bạn từng gặp phải trường hợp oái oăm là tạo 1 tam giác nhưng chỉnh mãi vẫn không đúng design và cuối cùng đành dùng biện pháp là cắt ảnh. Mà cắt ảnh thì cũng không ổn chút nào, chẳng lẽ mỗi 1 màu thì phải cắt từng đó ảnh? Như vậy thì không vui chút nào nhỉ?
Vì vậy, ở bài viết này, mình sẽ hướng dẫn các bạn tạo một số khối hình học chỉ bằng HTML & CSS3. Let's go!

## 2. Tạo hình tròn

Tạo khối hình tròn khá đơn giản. Mấu chốt để tạo nên hình tròn là ở thuộc tính **border-radius** trong CSS3. 

**HTML**

```
<div class="row">
  <div class="block col-md-4">
    <div class="circle red ">Red</div>
  </div>

  <div class="block col-md-4">
    <div class="circle green ">Green</div>
  </div>

  <div class="block col-md-4">
    <div class="circle blue ">Blue</div>
  </div>
</div>
```

**CSS**

```
.circle {
  width: 100px;
  height: 100px;
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  border-radius: 50px;
  text-align: center;
  line-height: 100px;
  color: #fff;
  font-size: 16px;

  &.red {
    background-color: red;
  }

  &.green {
    background-color: green;
  }

  &.blue {
    background-color: blue;
  }
}

```

**Result**

![](https://images.viblo.asia/08721dd4-8a55-460a-9ed2-92be2bd06875.png)


## 3. Tạo hình Oval

Như phần tạo hình tròn ở trên các bạn đã thấy rất đơn giản đúng không? Với việc tạo hình oval này thì chúng ta vẫn chỉ sử dụng thuộc tính **border-radius** mà thôi. Còn sử dụng như thế nào thì hãy xem demo dưới đây nhé.

Ở phần tạo oval thì có 2 trường hợp: oval nằm ngang và oval đứng. HTML của 2 trường hợp này như nhau cho nên mình chỉ tạo HTML một lần thôi nhé.

**HTML**

```
div class="row">
  <div class="block col-md-4">
    <div class="oval red ">Red</div>
  </div>

  <div class="block col-md-4">
    <div class="oval green ">Green</div>
  </div>

  <div class="block col-md-4">
    <div class="oval blue ">Blue</div>
  </div>
</div>
```

### 3.1 Tạo hình oval ngang

**CSS**

```
.oval {
  width: 160px;
  height: 80px;
  -moz-border-radius: 80px / 40px;
  -webkit-border-radius: 80px / 40px;
  border-radius: 80px / 40px;
  text-align: center;
  line-height: 80px;
  color: #fff;
  font-size: 16px;

  &.red {
    background-color: red;
  }

  &.green {
    background-color: green;
  }

  &.blue {
    background-color: blue;
  }
}
```

**Result**

![](https://images.viblo.asia/8dd2c46b-4c96-495b-91bb-7296ee39d0df.png)

### 3.2 Tạo hình oval dọc

**CSS**

```
.oval {
  width: 80px;
  height: 160px;
  -moz-border-radius: 40px / 80px;
  -webkit-border-radius: 40px / 80px;
  border-radius: 40px / 80px;
  text-align: center;
  line-height: 160px;
  color: #fff;
  font-size: 16px;

  &.red {
    background-color: red;
  }

  &.green {
    background-color: green;
  }

  &.blue {
    background-color: blue;
  }
}
```

**Result**

![](https://images.viblo.asia/a0606881-3946-42ae-933b-f41299ca3ae3.png)

Nếu bạn nào tinh ý sẽ nhìn thấy, các giá trị của thuộc tính **border-radius** sẽ khác hoàn toàn so với khi sử dụng để tạo hình tròn. Nếu như các giá trị này mà bạn thấy khó hiểu thì hãy chuyển sang sử dụng như thế này
```
-moz-border-radius: 100%;
-webkit-border-radius: 100%;
border-radius: 100%;
```

Như vậy thì vẫn có thể tạo thành hình oval theo cách rất đơn giản. Nhưng nhớ, để tạo được oval thì width phải luôn lớn hơn height (trong trường hợp oval ngang) hoặc height lớn hơn width (trong trường hợp oval dọc), nếu không hình bạn tạo ra là hình tròn đấy.

## 4. Tạo hình tam giác nhọn

Tạo hình tam giác có khác biệt hoàn toàn với tạo hình tròn và oval. Nếu như ở 2 hình trên chúng ta sử dụng thuộc tính **border-radius** thì ở phần tạo hình tam giác chúng ta chỉ sử dụng **border** mà thôi. Còn sử dụng như thế nào thì cùng xem ví dụ dưới đây nhé.


### 4.1. Tam giác nhọn quay lên

**HTML**

```
<div class="row">
  <div class="block col-md-4">
    <div class="triangle-up red "></div>
  </div>

  <div class="block col-md-4">
    <div class="triangle-up green "></div>
  </div>

  <div class="block col-md-4">
    <div class="triangle-up blue "></div>
  </div>
</div>
```

**CSS**

```
.triangle-up {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid black;

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

**Demo**

![](https://images.viblo.asia/8e1c700e-6fd0-4a24-a21c-70334e77dcfd.png)

### 4.2. Tam giác nhọn quay xuống

**HTML**

```
<div class="row">
  <div class="block col-md-4">
    <div class="triangle-down red "></div>
  </div>

  <div class="block col-md-4">
    <div class="triangle-down green "></div>
  </div>

  <div class="block col-md-4">
    <div class="triangle-down blue "></div>
  </div>
</div>
```

**CSS**

```
.triangle-down {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-top: 100px solid black;

  &.red {
    border-top-color: red;
  }

  &.green {
    border-top-color: green;
  }

  &.blue {
    border-top-color: blue;
  }
}
```

**Demo**

![](https://images.viblo.asia/52228577-03bd-476e-a970-0034fe663da9.png)

### 4.3. Tam giác nhọn quay trái

**HTML**

```
<div class="row">
  <div class="block col-md-4">
    <div class="triangle-left red "></div>
  </div>

  <div class="block col-md-4">
    <div class="triangle-left green "></div>
  </div>

  <div class="block col-md-4">
    <div class="triangle-left blue "></div>
  </div>
</div>
```

**CSS**

```
.triangle-left {
  width: 0;
  height: 0;
  border-top: 50px solid transparent;
  border-right: 100px solid black;
  border-bottom: 50px solid transparent;

  &.red {
    border-right-color: red;
  }

  &.green {
    border-right-color: green;
  }

  &.blue {
    border-right-color: blue;
  }
}
```

**Demo**

![](https://images.viblo.asia/9b71854c-5c09-4de4-9e2e-0b2fcf939870.png)

### 4.4. Tam giác nhọn quay phải

**HTML**

```
<div class="row">
  <div class="block col-md-4">
    <div class="triangle-right red "></div>
  </div>

  <div class="block col-md-4">
    <div class="triangle-right green "></div>
  </div>

  <div class="block col-md-4">
    <div class="triangle-right blue "></div>
  </div>
</div>
```

**CSS**

```
.triangle-right {
  width: 0;
  height: 0;
  border-top: 50px solid transparent;
  border-left: 100px solid black;
  border-bottom: 50px solid transparent;

  &.red {
    border-left-color: red;
  }

  &.green {
    border-left-color: green;
  }

  &.blue {
    border-left-color: blue;
  }
}
```

**Demo**

![](https://images.viblo.asia/b96595e5-472f-4c94-86ba-36ff76a29b28.png)

Như vậy, qua phần 1 này chắc các bạn cũng đã hiểu được cách tạo các hình tròn, oval và tam giác theo các hướng rồi phải không? Điểm mấu chốt chúng ta cần hiểu được là thuộc tính gì sẽ quyết định việc tạo ra các khối hình đó.

Trong phần tạo khối tam giác thì ở phần 1 này mình mới chỉ giới thiệu đến cách tạo tam giác nhọn, còn tạo tam giác vuông và các khối hình khác như thế nào thì mình sẽ giới thiệu tiếp ở bài sau nhé.