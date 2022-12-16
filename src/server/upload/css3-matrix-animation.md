Bộ phim "The Matrix" là một bộ phim bom tấn của điện ảnh Mỹ, và điểm gây được ấn tượng với mình nhiều nhất là những màn hình xanh đầy dãy số và ký tự đủ kiểu chạy tít mù trong màn hình cổ lỗ sĩ.
Và mình thích nó, nay mình sẽ giới thiệu cách tạo một màn hình matrix như vậy bằng css3 và sức mạnh của animation.

### Phân tích

* Đầu tiên background màu đen
* Tiếp theo là các dòng chữ màu xanh bố trí ở các vị trí khác nhau và độ dài cũng khác nhau, cho nó đa dạng `color: rgb(0, 255, 0);`
* Tiếp theo là animation, có 2 loai chính như sau: 
    * Text đổ từ trên top xuống bottom, --> text transform rotate 90deg là ok
    * text sáng và mờ dần khi gần về bottom --> text opacity từ 1 -> 0 là ok
    * Các animation là infinite
    
### Markup
Ví dụ:
`<div class="d1 c1 de" style="left:5px;">q8w<span>1</span>ertyuioklsdfgh<span>j</span>zxc</div>`

Ví dụ đây là 1 đoạn text với random character, mình sẽ import katakana font vào thì chuỗi string này sẽ thành chữ nhật, nhìn cho nó nguy hiểm.
ở đây có 3 class `class="d1 c1 de" `: 

    * d* -> định nghĩa cho duration của cái text đó, nghĩa là nó chạy nhanh hay chậm, từ rõ -> mờ dần, phụ thuộc vào cái thời gian này
    * c* -> định nghĩa màu text khi khởi tạo
    * de* -> thời gian delay khi animation khởi tạo, thực ra cũng ko cần lắm, do là mỗi một thằng text chạy sẽ có một duration khác nhau rồi.

### CSS

**Import fontface**
```
@font-face {
        font-family: Katakana;
        src: url('https://s.cdpn.io/26175/MoonBeams-katakana_.TTF');
    }
```

**Global setting**
```
    #matrix{
        margin: 1em auto;
        font-family: Katakana;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        background: #000;
        background-image: -webkit-gradient(linear, 0% 90%, 0% 100%, from(rgba(0, 255, 0, 0)), to(rgba(0, 255, 0, 0.1)));
        color: rgba(0, 255, 0, .7);
        text-shadow: rgba(255, 255, 255, .8) 0px 0px 4px;
        position: relative;	
    }
```
**Animation **
```
@-webkit-keyframes fade{
    0%   { opacity: 1; }
    100% { opacity: 0; }
}
// Cái này là mờ dần

@-webkit-keyframes fall{
    from {top: -250px;}
    to 	{top: 300px;}
}
// Cái này là đổ từ trên xuống, ở đây là text đổ từ trên xuống, có thể dùng cái này làm hiệu ứng lá rơi này
```


**Apply animation**
```
#matrix div{
    position: absolute;	
    top: 0;
    transform-origin: 0%;
    transform: rotate(90deg); 

    /* animation */
    animation-name: fall, fade;			
    animation-iteration-count: infinite;
    animation-direction: normal;
    animation-timing-function: ease-out;
}
```

Setting cho text, thực tế sẽ có nhiều hơn rất nhiều:

```
.f1{
    font-size: 1.2em;
}	
.c1{
    color: rgba(0, 255, 0, .5);
}
.d1{
    -webkit-animation-duration: 4s;
}
```
Kết quả:
	{@codepen: https://codepen.io/buiduccuong30051989/pen/QmvWjR}