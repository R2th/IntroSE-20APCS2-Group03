### Giới thiệu
Hôm nay mình xin chia sẻ cách làm 1 animation loading từ nút seach khi click vào nút tìm kiếm, sẽ rất hay và thú vị khi các bạn đưa áp dụng vào trong việc thiết kế UI để tăng sự sinh động hơn nhé.
![](https://images.viblo.asia/7cc19b89-94d0-4193-9076-bac5fd6b8379.gif)
### Code
**1.HTML**
```
<div class="search"></div>
```

**2.CSS**
<br>
Tạo Animation loading time rồi trở về trạng thái Icon Search khi loading xong
```
.search {
  width: 20px;
  height: 20px;
  border: 2px solid #fff;
  border-radius: 50%;
  position: relative;
  margin: 1px 3px 3px 1px;
  cursor: pointer;
}
.search:before, .search:after {
  content: '';
  display: block;
  position: absolute;
  transform-origin: calc(100% - 1px) 50%;
  height: 2px;
  border-radius: 1px;
  background: #fff;
  bottom: calc(50% - 1px);
  right: calc(50% - 1px);
  -webkit-backface-visibility: hidden;
}
.search:before {
  width: 8px;
  transition: transform .4s ease;
  transform: rotate(45deg) translateX(16px);
  animation: none;
}
.search:after {
  width: 6px;
  opacity: 0;
  transform: rotate(45deg);
}
.search.loading:before {
   animation: rotate 2.1s linear forwards .45s, move .3s linear forwards 2.7s;
   transform: rotate(45deg) translateX(0);
}
.search.loading:after {
  opacity: 1;
  transition: opacity 0s ease .4s;
  animation: remove 0s linear forwards 2.6s;
}

@keyframes rotate {
  100% {
     transform: rotate(405deg) translateX(0);
  }
}

@keyframes remove {
  100% {
    opacity: 0;
  }
}
@keyframes move {
  100% {
    transform: rotate(45deg) translateX(16px);
  }
}
html {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

* {
  box-sizing: inherit;
}
*:before, *:after {
  box-sizing: inherit;
}

body {
  min-height: 100vh;
  font-family: Roboto, Arial;
  background: #5628EE;
  display: flex;
  justify-content: center;
  align-items: center;
}
body .dribbble {
  position: fixed;
  display: block;
  right: 24px;
  bottom: 24px;
}
body .dribbble img {
  display: block;
  width: 76px;
}

```
**3.Javascript**
<br>
Thêm 1 chút Js để khi click vào tạo ra được animation loading từ CSS
```
$('.search').on('click touch', function(e) {

    var self = $(this);

    self.addClass('loading');
    setTimeout(function() {
        self.removeClass('loading');
    }, 3000)

});

```

**4.Demo**
{@embed: https://codepen.io/kachibito/pen/ZVeXmR}
### Lời kết
Vừa rồi là 1 hướng dẫn đơn giản để chúng ta có thể tạo 1 animation loading trên chính nút search khi click vào để tìm kiếm, tăng độ sinh động hơn cho chức năng của trang Web. Cảm ơn các bạn đã đọc nhé.

Nguồn tham khảo
http://kachibito.net/snippets/search-loading