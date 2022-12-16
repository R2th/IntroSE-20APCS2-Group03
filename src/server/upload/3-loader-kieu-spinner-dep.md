Tôc độ internet ngày này đã rất nhanh, tuy nhiên vẫn có một số thời điểm chúng ta vẫn phải đợi website tải nội dung.
Việc phải chờ đợi này đã khiến không mọi người chúng ta phát cáu. Cho nên cac developer và các designer đã sáng tạo ra
nhiều kiểu khác nhau để làm cho khoảng thời gian chờ đợi của người dùng bớt nhàm chán và chở nên thú vị hơn,
nhằm mục đích giữ người dùng không close website của họ ngay lập tức.
Một trong những cách phổ biến là tạo ra những kiểu loader hay độc đáo với nhiều hiệu ứng bắt mắt.

Trong đó loader theo kiểu Spinner là một thiết kế đẹp và đầy tính sáng tạo với những hiệu ứng chuyển động vui mắt.
Giới thiệu đến các bạn 3 kiểu Spinner với sự kết hợp HTML & CSS mà mình sưu tầm.

**Kiểu thứ nhất:**

HTML
```
<div class='loader'></div>
```

CSS
```
body {
  background: #ececec;
}
.loader:before, .loader:after {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  border-style: solid;
  border-top-color: #ECD078;
  border-right-color: #C02942;
  border-bottom-color: #542437;
  border-left-color: #53777A;
  content: '';
  transform: translate(-50%, -50%);
  animation: rotate 1.5s  infinite ease-in-out;
}
.loader:before {
  border-width: 10vh;
}
.loader:after {
  width: 30vh;
  height: 30vh;
  border-width: 2.5vh;
  animation-direction: reverse;
}
@keyframes rotate {
  0% {
    transform: translate(-50%, -50%) rotate(0);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
```

Demo:
{@codepen:  https://codepen.io/hoatnv/full/oqYrNy/}

**Kiểu thứ 2:**

HTML
```
<div class="loader">
	<div class="loader-inner">
		<div class="loader-line-wrap">
			<div class="loader-line"></div>
		</div>
		<div class="loader-line-wrap">
			<div class="loader-line"></div>
		</div>
		<div class="loader-line-wrap">
			<div class="loader-line"></div>
		</div>
		<div class="loader-line-wrap">
			<div class="loader-line"></div>
		</div>
		<div class="loader-line-wrap">
			<div class="loader-line"></div>
		</div>
	</div>
</div>
```

CSS
```
.loader {
    background: #000;
    background: radial-gradient(#222, #000);
    bottom: 0;
    left: 0;
    overflow: hidden;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 99999;
}

.loader-inner {
    bottom: 0;
    height: 60px;
    left: 0;
    margin: auto;
    position: absolute;
    right: 0;
    top: 0;
    width: 100px;
}

.loader-line-wrap {
    animation: 
		spin 2000ms cubic-bezier(.175, .885, .32, 1.275) infinite
	;
    box-sizing: border-box;
    height: 50px;
    left: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    transform-origin: 50% 100%;
    width: 100px;
}
.loader-line {
    border: 4px solid transparent;
    border-radius: 100%;
    box-sizing: border-box;
    height: 100px;
    left: 0;
    margin: 0 auto;
    position: absolute;
    right: 0;
    top: 0;
    width: 100px;
}
.loader-line-wrap:nth-child(1) { animation-delay: -50ms; }
.loader-line-wrap:nth-child(2) { animation-delay: -100ms; }
.loader-line-wrap:nth-child(3) { animation-delay: -150ms; }
.loader-line-wrap:nth-child(4) { animation-delay: -200ms; }
.loader-line-wrap:nth-child(5) { animation-delay: -250ms; }

.loader-line-wrap:nth-child(1) .loader-line {
    border-color: hsl(0, 80%, 60%);
    height: 90px;
    width: 90px;
    top: 7px;
}
.loader-line-wrap:nth-child(2) .loader-line {
    border-color: hsl(60, 80%, 60%);
    height: 76px;
    width: 76px;
    top: 14px;
}
.loader-line-wrap:nth-child(3) .loader-line {
    border-color: hsl(120, 80%, 60%);
    height: 62px;
    width: 62px;
    top: 21px;
}
.loader-line-wrap:nth-child(4) .loader-line {
    border-color: hsl(180, 80%, 60%);
    height: 48px;
    width: 48px;
    top: 28px;
}
.loader-line-wrap:nth-child(5) .loader-line {
    border-color: hsl(240, 80%, 60%);
    height: 34px;
    width: 34px;
    top: 35px;
}
@keyframes spin {
    0%, 15% {
		transform: rotate(0);
	}
	100% {
		transform: rotate(360deg);
	}
}
```
Demo
{@codepen:  https://codepen.io/hoatnv/full/qoqzYQ/}

**Kiểu thứ 3:**

HTML
```
<div class="spin-dr"></div>
```

CSS
```
body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  overflow: hidden;
}

.spin-dr {
  box-sizing: border-box;
  position: relative;
  width: 150px;
  height: 150px;
  border: 8px solid transparent;
  border-radius: 50%;
  animation: loader 2s linear infinite, spin 0.5s linear infinite;
  filter: blur(3px) saturate(110);
}

.spin-dr::after {
  content:'';
  box-sizing: border-box;
  position: absolute;
  display: block;
  top: 30%;
  left: 30%;
  height:40%;
  width: 40%;
  border: 8px solid transparent;
  border-radius: 50%;
  animation: loader 1.5s linear infinite, spin 0.25s linear reverse infinite;
}

@keyframes loader {
  0% {border-left-color:transparent;border-right-color:#013C80}
  25% {border-top-color:transparent;border-bottom-color:#016dae}
  50% {border-right-color:transparent;border-left-color:#009edb}
  75% {border-bottom-color:transparent;border-top-color:#016dae}
  100% {border-left-color:transparent;border-right-color:#013C80}
}

@keyframes spin {
  0% {transform: rotate(0deg)}
  100% {transform: rotate(-360deg)}
}
```

Demo
{@codepen:  https://codepen.io/hoatnv/full/PRbrVZ/}

Với những kiểu Spinner đẹp mắt,  hy vọng sẽ giúp website của bạn trở nên thêm sinh động,
mong rằng nó có thể phần nào đó níu chân người dùng lâu hơn.

### **Tham khảo**
https://codepen.io/search/pens?q=loader&limit=all&type=type-pens