Với front-end thì làm việc với các slideshow là việc làm thường xuyên gặp phải, có nhiều dạng slide cũng như rất nhiều plugin hỗ trợ. <br />
Tuy nhiên đôi khi vì một vài lý do nào đó hoặc bạn muốn tự tạo riêng cho mình một slideshow để tùy biến theo ý mình.  <br />
Hôm nay mình xin chia sẽ cách tạo một slide cơ bản với Javascript<br />
Hi vọng nó sẽ có ích cho các bạn !!!<br />
Let's go.<br />

Đầu tiên mình sẽ tạo cấu trúc HTML của slide như sau: 
```
<div class="slide" id="slider">
    <ul id="slide__content" class="slide__content">
        <li><img src="./images/banner1.jpg" class="slide__content-item resimg" alt="banner images"></li>
        <li><img src="./images/banner2.jpg" class="slide__content-item resimg" alt="banner images"></li>
        <li><img src="./images/banner3.jpg" class="slide__content-item resimg" alt="banner images"></li>
    </ul>
    <div class="slide__arrow">
        <a class="slide__arrow-arNext">arNext</a>
        <a class="slide__arrow-arPrev">arPrev</a>
    </div>
    <ul class="slide__nav"></ul>
</div>
```

Ở đây bạn thấy có cả class và id giống nhau, bạn không cần quan tâm đơn giản vì mình chỉ muốn style css với class.

Tiếp theo ở file *.js ta tạo một class bao gồm các tham số đầu vào cần thiết như sau:
```
class Slider {
    constructor(){
        this.slide = document.getElementById('slider');
        this.slideContent = document.getElementById('slide__content');
        this.item  = this.slideContent.getElementsByTagName('li');
        this.navItem = document.querySelectorAll('.slide__nav li');
        this.arNext = document.querySelector('.slide__arrow-arNext');
        this.arPrev = document.querySelector('.slide__arrow-arPrev');
        this.navSlider = document.querySelector('.slide__nav');
        this.heightItem = this.slideContent.querySelector('.slide__content-item').clientHeight;
        this.autoPlay = true;
        this.duaEffect = 900;
        this.duaration = 5000;
        this.current = 0;
        this.prev = 0;
        this.timer;
        if(!this.slide) return;
        this.init();
    }
}
```
Ở đây ta có: các item của slide, nav slide, button next/prev slide, autoplay slide, và có thể thay đổi time của effect (duaEffect) cũng như timeout của một slide(duaration).

Giờ ta sẽ viết các hàm để có thể thực thi một slide hoàn chỉnh: 
```
init() {
    let self = this;
    window.addEventListener('load', function(){self.Start()}, false);
}

Start() {
    let s = this;
    this.Nav();
    this.Arrow();
    this.item[this.current].classList.add("current");
    this.slideContent.style.height = this.heightItem + 'px';
    this.autoPlay ? this.timer = setTimeout(function() {s.getCurrent()}, this.duaration) : '';
}
```
Khởi tạo và set height cho slide
```
Next() {
    this.prev = this.current;
    clearTimeout(this.timer);
    this.current++;
    this.current >= this.item.length ? this.current = 0 : '';
    this.nextSlider();
}

Prev() {
    this.prev = this.current;
    clearTimeout(this.timer);
    this.current--;
    this.current < 0 ? this.current = this.item.length - 1 : '';
    this.nextSlider();
}

getCurrent() {
    this.prev = this.current;
    this.current++;
    this.current >= this.item.length ? this.current = 0 : '';
    this.nextSlider();
}
```
Next/Prev slide dựa trên slide current.
```
nextSlider() {
    let a = this;
    //remove all class
    for(let i = 0;i < this.item.length; i++){
        this.item[i].classList.remove("prev");
        this.item[i].classList.remove("current");
        this.navItem[i].classList.remove("prev");
    }

    //add class for slide item and nav item
    this.item[this.current].classList.add("current");
    this.item[this.prev].classList.add("prev");
    this.navItem[this.current].classList.add('active');
    this.navItem[this.prev].classList.remove('active');

    // start effect to slide
    this.item[this.current].style.opacity = '0';
    Velocity( this.item[this.current] ,{opacity: 1}, {duration: this.duaEffect, delay:0, queue:false, easing:'linear'});

    // autoplay slide
    this.autoPlay ? this.timer = setTimeout(function() { a.getCurrent() }, this.duaration) : '';
}
```
Handle khi change slide, ở đây mình có sử dụng Velocity.js là một thư viện javascript thú vị để tạo các hiệu ứng chuyển động như Fade, Slide, Scroll, Stop, Finish và Reverse…<br />
tham khảo thêm ở đây: GitHub: https://github.com/julianshapiro/velocity
```
Nav() {
    let n = this;
    // create nav item
    for(let j = 0; j < this.item.length; j++) {
        this.navItem = document.createElement('li');
        this.navItem.textContent = j;
        this.navSlider.appendChild(this.navItem);
    }

    // handle nav item
    this.navItem = this.navSlider.getElementsByTagName('li');
    n.navItem[this.current].classList.add('active');
    for(let i = 0; i<this.navItem.length; i++) {
        this.navItem[i].addEventListener("click", function(e){
            const posnav = Array.prototype.indexOf.call(n.navItem, e.currentTarget);
            if(!n.navItem[posnav].classList.contains("active")) {
                this.classList.add('active');
                n.prev = n.current;
                n.current = posnav;
                clearTimeout(n.timer);
                n.nextSlider();
            }
        });
    }
}

Arrow() {
    let r  = this;
    this.arNext.addEventListener('click', function(){r.Next()}, false);
    this.arPrev.addEventListener('click', function(){r.Prev();}, false);
}
```
Tiếp theo là xử lý phần Nav Slide và click button Next/Prev của slide. <br />
Tới đây mình đã xong phần js cho slide và chỉ việc gọi class Slide để thực thi: 
```
window.addEventListener('DOMContentLoaded', function() {
    new Slider();
});
```
Cuối cùng là css cho slide và các thành phần của nó như sau:
```
.slide {
	position: relative;

	&__content {
		position: relative;
		z-index: 8;
		overflow: hidden;
		width: 100%;

		li {
			height: 100%;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			overflow: hidden;
			z-index: 7;
			>img {
				width: 100%;
                height: 100%;
			}
		}

		li.current {
			z-index: 9;
		}
		li.prev {
			z-index: 8;
		}
	}

	&__nav {
		position: absolute;
		bottom: 30px;
		right: 0;
		left: 0;
		z-index: 99;
		margin: 0 auto;
		text-align: center;
		
		li {
			display: inline-block;
			font-size: 0;
			border-radius: 50px;
			background: #c5acac;
			width: 12px;
			height: 12px;
			text-indent: -99999px;
			margin: 0 12px;
			cursor: pointer;
			&.active {
				background: #ba2b1b;
			}
		}
	}

	&__arrow {
		a {
			position: absolute;
			top: 50%;
			width: 38px;
			height: 38px;
			transform: translateY(-50%);
			background: #d5d5d5;
			z-index: 9;
			cursor: pointer;
			overflow: hidden;
			text-indent: -999px;
			
			&::before {
				float: left;
				width: 38px;
				height: 38px;
				color: #000;
				font-size: 16px;
				position: relative;
				z-index: 9;
				text-indent: 0;
				text-align: center;
				line-height: 34px;
			}
		}

		&-arPrev {
			left: 30px;
			&::before {
				content: '<';
			}
		}

		&-arNext {
			right: 30px;
			&::before {
				content: '>';
			}
		}
	}
}
```

Vậy là ta đã có một slideshow cơ bản để dùng, các bạn có thể tùy biến thêm tùy theo yêu cầu của mình<br />
có thể xem thêm kết quả ở đây (Velocity chạy trên này hơi tù nhé :d) https://codepen.io/yes_no8x/pen/KGerEP <br />
Cảm ơn các bạn đã quan tâm !