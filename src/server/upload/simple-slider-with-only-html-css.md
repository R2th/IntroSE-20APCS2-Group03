Chào mọi người! Nay mình xin chia sẻ một demo nho nhỏ về Slider đơn giản, chỉ với HTML và CSS. **Khuyến cáo không nên sử dụng** trong các dự án với vì bây giờ có rất nhiều thư viện rất tốt với nhiều `hiệu ứng (animation)` và hỗ trợ `Responsive`. Vậy mình chia sẻ bài ví dụ này để làm gì? Để chứng mình cho mọi người thấy khi làm chủ được HTML + CSS thì mình hoàn toàn làm được những thứ tưởng chừng như phải dùng đến Javascript.

# 1. Dựng layout 
```
<div class="slider">
    <input type="radio" id="slide-1" name="slide" checked>
    <div class="slide-item">
        <img class="slide-1" src="https://via.placeholder.com/500x200/cccccc?text=Xin%20Chao" alt="">
    </div>
    <input type="radio" id="slide-2" name="slide">
    <div class="slide-item">
        <img src="https://via.placeholder.com/500x200/cccccc?text=Dat%20Nuoc" alt="">
    </div>
    <input type="radio" id="slide-3" name="slide">
    <div class="slide-item">
        <img src="https://via.placeholder.com/500x200/cccccc?text=Viet%20Nam" alt="">
    </div>
</div>
```
Ví dụ chúng ta có **3 Slide** với class là **slide-item** mà 1 **image** bên trong. Xen kẽ có 3 input radio để làm gì? Chính là mấu chốt của ví dụ này. Lợi dụng input lúc **checked** và **unchecked** để show/hide các **slide-item** tương ứng. Nên nhớ phải sử dụng input radio chứ checkbox sẽ không được.

# 2. Thêm style
```
.slider {
    position: relative;
    width: 500px;
    height: 200px;
}

.slide-item {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    visibility: hidden;
    transition: 0.5s;
}

input {
    display: none;
}

// Hiện slide-item khi input ngay phía trên checked
input:checked + .slide-item {
    visibility: visible;
    opacity: 1;
}
```
Chúng ta ẩn hết các **input** và **slide-item**, chỉ hiển thị slide-item phía dưới input ở trạng thái checked, đó là lý do chúng ta bố trí layout như vậy. Sau khi có CSS layout sẽ như sau:

![](https://images.viblo.asia/b6e350ae-25a4-4eea-a2f3-5f6f82db7bef.PNG)

# 3. Thêm button điều hướng và style
Để kích hoạt chuyển đổi trạng thái checked của các input, ta sử dụng cái **label** có attribute **for** tương ứng với các **id** input. Code layout như sau:
```
<div class="slider">
    <input type="radio" id="slide-1" name="slide" checked>
    <div class="slide-item">
        <img class="slide-1" src="https://via.placeholder.com/500x200/cccccc?text=Xin%20Chao" alt="">
    </div>
    <input type="radio" id="slide-2" name="slide">
    <div class="slide-item">
        <img src="https://via.placeholder.com/500x200/cccccc?text=Dat%20Nuoc" alt="">
    </div>
    <input type="radio" id="slide-3" name="slide">
    <div class="slide-item">
        <img src="https://via.placeholder.com/500x200/cccccc?text=Viet%20Nam" alt="">
    </div>
    <label class="next slide-3" for="slide-1">Next</label>
    <label class="next slide-1" for="slide-2">Next</label>
    <label class="next slide-2" for="slide-3">Next</label>
    <label class="prev slide-2" for="slide-1">Prev</label>
    <label class="prev slide-3" for="slide-2">Prev</label>
    <label class="prev slide-1" for="slide-3">Prev</label>
</div>
```

CSS cho các label:
```
input#slide-1:checked ~ label.slide-1,
input#slide-2:checked ~ label.slide-2,
input#slide-3:checked ~ label.slide-3 {
    display: block;
}

label {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 10px;
    cursor: pointer;
    padding: 5px;
    background: #000;
    color: #fff;
    display:none;
}

label.next {
    right: 10px;
    left: auto;
}
```

Layout hiện tại như hình:

![](https://images.viblo.asia/572fbeda-de4b-4824-89e0-52ef17bbfcfa.PNG)

Như vậy là đã xong demo, rất đơn giản. Slider sẽ hoạt động như sau: Khi một **input checked** thì
-  **slide-item** kề dưới nó sẽ **hiện** và các slide-item còn lại bị **ẩn** đi.
- label Next có attribute **for** là id phía sau id của input checked sẽ hiện, các label Next còn lại bị ẩn.
- label Prev có atttribute **for** là id phía trước id của input checked sẽ hiện, các label Prev còn lại bị ẩn.

Hơi khó hiểu cho ý giải thích 2 và 3, nhưng xem lại code layout sẽ dễ dàng nhận ra. Một lần nữa xin nhắc lại là không nên sử dụng slider kiểu này vào các dự á., Demo này giúp các bạn Frontend, đặc biệt là các bạn newbie có cái nhìn khác về input radio, checkbox. Nó không đơn giản chỉ là các
input form bình thường, nó còn có nhiều công dụng hữu ích khác nếu bạn hiểu rõ và làm chủ được nó.

# 4. Tổng kết
- Hi vọng ở ví dụ vừa rồi giúp các bạn dev Frontend vận dụng được vào các dự án của mình, không nhất thiết phải là Slider, mà ngẫu nhiên ở một trường hợp nào đó nếu cần, xin cám ơn!
- Demo:

{@embed: https://codepen.io/looj25391/pen/jXgRYv}