Chắc hẳn CSS Animation không còn lạ lẫm gì với bất cứ Frontend Dev nào, hôm nay mình sẽ giới thiệu một số tricks khi sử dụng css animation mà không phải ai cũng biết.

### Chuyển trạng thái giữa animation
CSS animation giúp dễ dàng chuyển đổi các thuộc tính sang một giá trị mới theo thời gian. Nó cũng có khả năng chuyển các thuộc tính sang một giá trị mới gần như ngay lập tức. Mẹo nhỏ là sử dụng hai keyframes với sự thay đổi rất nhỏ, khoảng 0,001%.

Ví dụ: 
```css 
@keyframes toggleOpacity {
  50% { opacity: 1; } /* Turn off */
  50.001% { opacity: 0.4; }

  /* Keep off state for a short period */

  52.999% { opacity: 0.4; } /* Turn back on */
  53% { opacity: 1; }
}
```

### Animation delays âm
Một animation delay dương là animation chờ một khoảng thời gian nhất định để bắt đầu. Một animation delay âm là bắt đầu animation ngay lập tức, như thể lượng thời gian delay đó đã trôi qua. Nói cách khác, bắt đầu animation ở trạng thái tiếp theo của chu kỳ animation. Điều này cho phép các hình ảnh động được sử dụng lại qua nhiều yếu tố mà chỉ cần thay đổi thời gian.

Dưới đây là một ví dụ:
```css
div:nth-of-type(1) {
  height:20px; width:20px;
  margin-top:-12px; margin-left:-12px;
  -webkit-animation:slide 3s -2.7s ease-in-out infinite;
  animation:slide 3s ease-in-out infinite;
}
div:nth-of-type(2) {
  height:20px; width:20px;
  margin-top:-12px; margin-left:-12px;
  -webkit-animation:slide 3s -2.7s ease-in-out infinite;
  animation:slide 3s -2.7s ease-in-out infinite;
}
```

### Animations theo tỷ lệ thuận
Một cách để giữ responsive với các khung hình mượt mà và nhanh nhất có thể là sử dụng tỷ lệ % và các đơn vị khác thay cho set cố định. Ví dụ dưới đây có thể tạo hiệu ứng sóng bằng cách sử dụng chiều rộng phần trăm, chiều cao bằng không và phần trăm phần trăm. 
```css
div {
  margin-top: -17%;
  height: 34%; 
  width: 2%;
  top: 30%;
  border-radius: 20px;
  position: absolute;
}
div:nth-of-type(1)  { animation: wave 17s   0.000s linear infinite; }
div:nth-of-type(2)  { animation: wave 17s -16.227s linear infinite; }
div:nth-of-type(3)  { animation: wave 17s -15.455s linear infinite; }
div:nth-of-type(4)  { animation: wave 17s -14.682s linear infinite; }
@keyframes wave {
  0%   { left:-2%; background: #3B44D1; }
  5%   { background: #9337FE; }
  10%  { height:10%; margin-top: -5%; background: #C532FC; }
  15%  { background: #F639F8; }
  20%  { height:34%; margin-top:-17%; background: #F236C8; }
  25%  { background: #FF2F8D; }
  30%  { height:10%; margin-top: -5%; background: #EE3860; }
  35%  { background: #DC5245; }
  40%  { height:34%; margin-top:-17%; background: #F38643; }
  45%  { background: #F8B435; }
  50%  { height:10%; margin-top: -5%; background: #FAF444; }
  55%  { background: #E0FF3B; }
  60%  { height:34%; margin-top:-17%; background: #E1FF3C; }
  65%  { background: #46F443; }
  70%  { height:10%; margin-top: -5%; background: #54E67B; }
  75%  { background: #4DF3A9; }
  80%  { height:34%; margin-top:-17%; background: #3AF9DA; }
  85%  { background: #36EBF4; }
  90%  { height:10%; margin-top: -5%; background: #3DB3F3; }
  95%  { background: #3C82F1; }
  100% { height:34%; margin-top:-17%; left:100%; background: #5B38EE; }
}
```

### Thay đổi transfrom-origin giữa animation
 Trong ví dụ dưới đây, bạn sẽ thấy chúng ta có tạo một animation bằng cách sử dụng rotations trên các trục khác nhau thay vì sử dụng bốn animation riêng biệt.
 
```css
div {
  width:200px; height:200px;
  background:rgba(0,0,255,.5);
  animation:flipAround 8s infinite;
  transform-origin:right;
}
@keyframes flipAround {
  25% { transform-origin:right; animation-mode:forwards; transform:rotateY(-180deg); }
  25.001% { transform-origin:bottom; transform:translateX(200px); }
  50% { transform-origin:bottom; transform:translateX(200px) rotateX(-180deg); }
  50.001% { transform-origin:left; transform:translateX(200px) translateY(200px); }
  75% { transform-origin:left; transform-origin:left; transform:translateX(200px) translateY(200px) rotateY(180deg); }
  75.001% { transform-origin:top; transform:translateY(200px); }
  100% { transform-origin:top; transform-origin:top; transform:translateY(200px) rotateX(180deg); }
}
```

Nhược điểm của thủ thuật này là bạn không thể sử dụng animation-mode: forwards; cho chỉ một phần của animations.  Điều này có nghĩa là chúng ta phải xác định lại thành phần tương đương với trạng thái của nó trước khi áp dụng transformation-origin.

### Transform-origins âm
Transform-origin âm rất hữu ích cho việc như tạo animation di chuyển vòng tròn. Thay vì chỉ định các giá trị translate và rotation cụ thể bằng một phần tử để tạo hình động tròn, chúng ta có thể làm điều đó đơn giản hơn bằng cách sử dụng các giá trị transform-origin âm ngoài phần tử thứ hai hoặc pseudo-element (một phần tử nếu chúng ta muốn phần tử xoay cũng như di chuyển theo vòng tròn). Bằng cách sử dụng các giá trị khác nhau của nguồn transform-origin âm, chúng ta có thể sử dụng lại cùng một hình động cho nhiều phần tử trong khi vẫn giữ chuyển động tròn cho mỗi phần tử.

```css
div { width:100px; height:100px; margin-top:180px; transform-origin:200% center; position:relative; animation:rotate 3s linear infinite; }
div:before { content:''; position:absolute; height:100%; width:100%; background:blue; animation:rotate 3s linear reverse infinite; }
@keyframes rotate { 100% { transform:rotate(-360deg); } }
```

### Animation sử dụng box shadow
Hãy thử ví dụ dưới đây
```css
div {
  border-radius:50%;
  height:2px; width:2px; /* To allow border-radius to work */
  position:absolute;
  top:50%; left:50%;
  margin-top:-1px; margin-left:-1px;
  box-shadow:
    -75px -125px 0 40px #6cce74,
     75px -125px 0 40px #c18d46,
    150px    0px 0 40px #c14745,
     75px  125px 0 40px #2e1e5b,
    -75px  125px 0 40px #9c37a6,
   -150px    0px 0 40px #76bdd1;
  -webkit-animation:rotate 12s infinite linear;
  animation:rotate 12s infinite linear;
}
@keyframes rotate {
  16.67% {
    box-shadow:
      -75px -125px 0 40px #76bdd1,
       75px -125px 0 40px #6cce74,
      150px    0px 0 40px #c18d46,
       75px  125px 0 40px #c14745,
      -75px  125px 0 40px #2e1e5b,
     -150px    0px 0 40px #9c37a6;
  }
  33.33%   { 
    box-shadow:
      -75px -125px 0 40px #9c37a6,
       75px -125px 0 40px #76bdd1,
      150px    0px 0 40px #6cce74,
       75px  125px 0 40px #c18d46,
      -75px  125px 0 40px #c14745,
     -150px    0px 0 40px #2e1e5b;
  }
  50%      { 
    box-shadow:
      -75px -125px 0 40px #2e1e5b,
       75px -125px 0 40px #9c37a6,
      150px    0px 0 40px #76bdd1,
       75px  125px 0 40px #6cce74,
      -75px  125px 0 40px #c18d46,
     -150px    0px 0 40px #c14745;
  }
  66.67%   { 
    box-shadow:
      -75px -125px 0 40px #c14745,
       75px -125px 0 40px #2e1e5b,
      150px    0px 0 40px #9c37a6,
       75px  125px 0 40px #76bdd1,
      -75px  125px 0 40px #6cce74,
     -150px    0px 0 40px #c18d46;
  }
  88.88%   { 
    box-shadow:
      -75px -125px 0 40px #c18d46,
       75px -125px 0 40px #c14745,
      150px    0px 0 40px #2e1e5b,
       75px  125px 0 40px #9c37a6,
      -75px  125px 0 40px #76bdd1,
     -150px    0px 0 40px #6cce74;
  }
  100% {
    transform:rotate(-360deg);
    box-shadow:
      -75px -125px 0 40px #6cce74,
       75px -125px 0 40px #c18d46,
      150px    0px 0 40px #c14745,
       75px  125px 0 40px #2e1e5b,
      -75px  125px 0 40px #9c37a6,
     -150px    0px 0 40px #76bdd1;
  }
}
```

Do box-shadow không được sử dụng % nên sẽ khó để responsive, nếu muốn thay đổi kích thước animation thì có thể sử dụng transform:scale(n).

### Sử dụng pseudo-elements
Tương tự với box-shadow, các pseudo-elements có thể được sử dụng để thêm nhiều nội dung vào sự xuất hiện của một phần tử. Chúng có thể có các hiệu ứng animation riêng, hiệu ứng box-shadow riêng kế thừa từ các element cha. 

Tham khảo tại: https://css-tricks.com/css-animation-tricks/