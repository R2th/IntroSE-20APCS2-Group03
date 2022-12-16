## Giới thiệu
Chào 2021, mình sẽ giới thiệu vài kiểu style cho text màu mè chút cho rực rỡ :triumph:

## Lý thuyết & code
Lý thuyết thì thực ra các bạn chỉ cần search text css là sẽ ra rất nhiều thuộc tính, mình sẽ dùng vài cái để làm 3 mẫu text thôi, còn nhiều kiểu đẹp lắm

{@embed: https://codepen.io/dfly25e/pen/OJbxmJz}

![](https://images.viblo.asia/4452a7c1-70c6-4d97-b21d-9bb26792e594.png)

html

```
<h1 class="shadow">2021</h1>

<div class="split">
  <h1 class="split-1">2021</h1>
  <h1 class="split-2">2021</h1>
</div>

<h1 class="typo">2021</h1>
```

css

```
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

h1 {
  margin: 0;
  padding: 0;
}

h1 {
  line-height: 240px;
}

.shadow {
		  font-size: 120px;
	    text-align: center;
	    color: #fcedd8;
	    background: #d52e3f;
	   	font-family: monospace;
      margin: 0;
	    font-weight: 700;
      text-shadow: 5px 5px 0px #eb452b, 
                  10px 10px 0px #efa032, 
                  15px 15px 0px #46b59b, 
                  20px 20px 0px #017e7f, 
                  25px 25px 0px #052939, 
                  30px 30px 0px #c11a2b, 
                  35px 35px 0px #c11a2b, 
                  40px 40px 0px #c11a2b, 
                  45px 45px 0px #c11a2b;
}

.split {
  position: relative;
}

.split h1 {
  font-size: 120px;
	font-weight: 900;
  font-family: monospace;
	background-color: #e17943;
	color: #fff;
	display: block;
  text-align: center;
}

.split .split-2 {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
	background-color: #fff;
	color: #e17943;
	clip-path: inset(0 0 50% 0);
}

.typo {
  text-align: center;
  background-color: #e0e1e2;
  font-size: 120px;
	letter-spacing: 8px;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 3px;
  -webkit-text-stroke-color: white;
  text-shadow: 
						8px 8px #ff1f8f,
						20px 20px #000000;
}
```

1. Cái đầu tiên mình áp dụng `text-shadow`, mọi người hẳn không lạ gì thuộc tính này nhưng không phải ai cũng biết nó có thể xếp chồng nhiều lớp, rất đơn giản mà đẹp nhỉ

2. Cái số 2 thì mình áp dụng `clip-path: inset()`
https://css-tricks.com/almanac/properties/c/clip-path/
> Those four values in inset() (in the CSS above) represent the top/left point and the bottom/right point, which forms the visible rectangle. Everything outside of that rectangle is hidden.
![](https://images.viblo.asia/bcce6eb6-9237-4699-b9a2-8f25ad7b0011.jpeg)

Clone text rồi dùng clip-path inset 50%, sau đó absolute cho nó đè lên text gốc, thế là được cái text mới trông như bị chia làm 2 vậy :v 

3. Cái cuối thì kết hợp mấy thứ này
`-webkit-text-fill-color;
  -webkit-text-stroke-width;
  -webkit-text-stroke-color;
  text-shadow`
  
  Đầu tiên là tạo 1 text có *viền trắng* đã, dùng 3 thuộc tính đầu https://css-tricks.com/adding-stroke-to-web-text/
  Sau đó thì áp dụng text-shadow để thêm bóng
  
Have a nice day! :water_buffalo: