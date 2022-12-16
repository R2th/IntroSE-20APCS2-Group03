Chào các bạn!

Tiếp tục với seri **Tạo khối hình học bằng CSS3**, bài này mình sẽ giới thiệu tới các bạn cách tạo 1 số hình phức tạp khá là thú vị. Cùng theo dõi bài viết dưới đây nào.

## 1. Hình ngôi sao 5 cánh

**HTML**

```
<div id="main">
  <div class="container">
    <div class="row">
      <div class="block col-md-4">
        <div class="star-five red "></div>
      </div>

      <div class="block col-md-4">
        <div class="star-five green "></div>
      </div>

      <div class="block col-md-4">
        <div class="star-five blue "></div>
      </div>
    </div>
  </div>
</div>
```

**SCSS**

```
.star-five {
  margin: 50px 0;
  position: relative;
  display: block;
  color: red;
  width: 0px;
  height: 0px;
  border-right:  100px solid transparent;
  border-bottom: 70px  solid red;
  border-left:   100px solid transparent;
  -moz-transform:    rotate(35deg);
  -webkit-transform: rotate(35deg);
  -ms-transform:     rotate(35deg);
  -o-transform:      rotate(35deg);

  &::before {
    border-bottom: 80px solid red;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    position: absolute;
    height: 0;
    width: 0;
    top: -45px;
    left: -65px;
    display: block;
    content: '';
    -webkit-transform: rotate(-35deg);
    -moz-transform:    rotate(-35deg);
    -ms-transform:     rotate(-35deg);
    -o-transform:      rotate(-35deg);
  }

  &::after {
    position: absolute;
    display: block;
    color: red;
    top: 3px;
    left: -105px;
    width: 0px;
    height: 0px;
    border-right: 100px solid transparent;
    border-bottom: 70px solid red;
    border-left: 100px solid transparent;
    -webkit-transform: rotate(-70deg);
    -moz-transform:    rotate(-70deg);
    -ms-transform:     rotate(-70deg);
    -o-transform:      rotate(-70deg);
    content: '';
  }

  &.green {
    color: green;
    border-bottom-color: green;

    &::before {
      border-bottom-color: green;
    }

    &::after {
      color: green;
      border-bottom-color: green;
    }
  }

  &.blue {
    color: blue;
    border-bottom-color: blue;

    &::before {
      border-bottom-color: blue;
    }

    &::after {
      color: blue;
      border-bottom-color: blue;
    }
  }
}
```

**Result**

![](https://images.viblo.asia/59696b37-ac00-4988-ad62-b3dd5cbb56dd.png)

## 2. Hình ngôi sao 6 cánh

**HTML**

```
<div id="main">
  <div class="container">
    <div class="row">
      <div class="block col-md-4">
        <div class="star-six red "></div>
      </div>

      <div class="block col-md-4">
        <div class="star-six green "></div>
      </div>

      <div class="block col-md-4">
        <div class="star-six blue "></div>
      </div>
    </div>
  </div>
</div>
```

**SCSS**

```
.star-six {
  width: 0;
	height: 0;
	border-left: 50px solid transparent;
	border-right: 50px solid transparent;
	border-bottom: 100px solid red;
	position: relative;

  &::after {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-top: 100px solid red;
    position: absolute;
    content: "";
    top: 30px;
    left: -50px;
  }

  &.green {
    color: green;
    border-bottom-color: green;

    &::after {
      color: green;
      border-top-color: green;
    }
  }

  &.blue {
    color: blue;
    border-bottom-color: blue;

    &::after {
      color: blue;
      border-top-color: blue;
    }
  }
}
```

**Result**

![](https://images.viblo.asia/abf8f796-29d7-44a8-be3d-8fbdfecdb089.png)

## 3. Hình trái tim

**HTML**

```
<div id="main">
  <div class="container">
    <div class="row">
      <div class="block col-md-4">
        <div class="heart red "></div>
      </div>

      <div class="block col-md-4">
        <div class="heart green "></div>
      </div>

      <div class="block col-md-4">
        <div class="heart blue "></div>
      </div>
    </div>
  </div>
</div>
```

**SCSS**

```
.heart {
  position: relative;
  width: 100px;
  height: 90px;

  &::before,
  &::after {
    position: absolute;
    content: "";
    left: 50px;
    top: 0;
    width: 50px;
    height: 80px;
    background: red;
    -moz-border-radius: 50px 50px 0 0;
    border-radius: 50px 50px 0 0;
    -webkit-transform: rotate(-45deg);
       -moz-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
         -o-transform: rotate(-45deg);
            transform: rotate(-45deg);
    -webkit-transform-origin: 0 100%;
       -moz-transform-origin: 0 100%;
        -ms-transform-origin: 0 100%;
         -o-transform-origin: 0 100%;
            transform-origin: 0 100%;
  }

  &::after {
    left: 0;
    -webkit-transform: rotate(45deg);
       -moz-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
         -o-transform: rotate(45deg);
            transform: rotate(45deg);
    -webkit-transform-origin: 100% 100%;
       -moz-transform-origin: 100% 100%;
        -ms-transform-origin: 100% 100%;
         -o-transform-origin: 100% 100%;
            transform-origin :100% 100%;
  }

  &.green {
    &::before,
    &::after {
      background: green;
    }
  }

  &.blue {
    &::before,
    &::after {
      background: blue;
    }
  }
}
```

**Result**

![](https://images.viblo.asia/2f2a18a5-1aad-44f0-aca3-29176413af0b.png)

## 4. Hình trăng khuyết

**HTML**

```
<div id="main">
  <div class="container">
    <div class="row">
      <div class="block col-md-4">
        <div class="moon red "></div>
      </div>

      <div class="block col-md-4">
        <div class="moon green "></div>
      </div>

      <div class="block col-md-4">
        <div class="moon blue "></div>
      </div>
    </div>
  </div>
</div>
```

**SCSS**

```
.moon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  box-shadow: 15px 15px 0 0 red;

  &.green {
    box-shadow: 15px 15px 0 0 green;
  }

  &.blue {
    box-shadow: 15px 15px 0 0 blue;
  }
}
```

**Result **

![](https://images.viblo.asia/f3587767-333a-43cb-b362-c009e6c4f884.png)

Như các bạn đã thấy, ở bài này độ phức tạp của các hình học này đã tăng lên rất nhiều. Có thể có nhiều bạn sẽ không nghĩ 1 số hình như hình trái tim, sao 5 cánh, sao 6 cánh có thể tạo bằng css được phải không? Và đáp án cũng đã rõ, chúng ta hoàn toàn có thể tạo được các hình này bằng css thậm chí có thể tạo được các hình khác phức tạp hơn nữa. Còn là hình nào thì mình sẽ giới thiệu ở bài sau nhé.
Hẹn gặp lại!