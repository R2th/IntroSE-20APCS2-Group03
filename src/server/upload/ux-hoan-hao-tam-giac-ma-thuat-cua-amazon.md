# Tam giác ma thuật của Amazon

Vậy là Amazon đã làm thế nào để vẫn đem lại UX hoàn hảo trong khi không có một tí delay nào ? Chúng ta không thấy Bootstrap bug, và tốc độ thì hẳn là tức thì. Câu trả lời là hình tam giác được đánh dấu dưới đây

![](https://images.viblo.asia/f93aa1a3-9069-4b98-9bf9-305bfeaef2da.gif)

Tôi vốn nghĩ tốc độ tức thì khi di chuyển con trỏ là điều không thể. Tất cả các menu đều cần một ít delay để thay đổi nội dung của submenu. Bạn có thể nhìn ví dụ dưới đây

![](https://images.viblo.asia/febaf9b7-d719-42ab-85e3-f5564f1d3221.gif)


Vùng màu xanh đậm được gọi là vùng "tam giác ma thuật" (chống chỉ định đối với các bạn có đầu óc đen tối  mục đích của nó là giúp cho thao tác move chuột từ menu bên trái sang menu con bên phải được mượt mà hơn. Không bị dính vấn đề mất focus mà ẩn luôn cả cái menu, ví dụ:



![](https://images.viblo.asia/9cc7a1d2-b730-44b4-832b-82d603bfb13c.png)



## Cách tạo ra tam giác ma thuật

### JavaScript

```
var in_magic_triangle = false;
var in_magic_triangle = false;
var previous_X = 0;
var MAGIC_A, MAGIC_B, MAGIC_C;

area = function(A, B, C) {
    return Math.abs(( A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y) ) / 2);
}

pointInTriangle = function(D, A, B, C) {
    var ABD = area(A, B, D);
    var BDC = area(B, D, C);
    var CAD = area(C, A, D);
    var ABC = area(A, B, C);
    if (ABC == (ABD + BDC + CAD)) {
        return true;
    }
    return false;
}

$(document).ready(function(){
    $('.menu-item a').on('mousemove', function(e){
        if(!in_magic_triangle){
            $(this).closest('.menu-item').addClass('active').siblings().removeClass('active');
            MAGIC_A = {x:e.pageX,y: e.pageY};
            MAGIC_B = {x:$(this).siblings('.sub-menu').offset().left,y: $(this).siblings('.sub-menu').offset().top};
            MAGIC_C = {x: $(this).siblings('.sub-menu').offset().left, y:$(this).siblings('.sub-menu').offset().top + $(this).siblings('.sub-menu').outerHeight()};
            console.log( MAGIC_A.y +','+MAGIC_A.x +' '+MAGIC_B.y +','+MAGIC_B.x +' '+MAGIC_C.y +','+MAGIC_C.x +' ');
            $('#magic-triangle').attr('points', MAGIC_A.x +','+MAGIC_A.y +' '+MAGIC_B.x +','+MAGIC_B.y +' '+MAGIC_C.x +','+MAGIC_C.y +' ');
            in_magic_triangle = true;
        }else{
            var D = {x: e.pageX, y: e.pageY};
            if (e.pageX < previous_X || !pointInTriangle(D, MAGIC_A, MAGIC_B, MAGIC_C)){
                in_magic_triangle = false;
            }
            previous_X = e.pageX;
        }
    })
})
```

### HTMl
```
<script   src="https://code.jquery.com/jquery-3.1.0.min.js"   integrity="sha256-cCueBR6CsyA4/9szpPfrX3s49M9vUU5BgtiJj06wt/s="   crossorigin="anonymous"></script>

<svg>
        <polygon id="magic-triangle" points="" style="fill:lime;stroke:purple;stroke-width:0" />
    </svg>
    <ul class="menu">
        <li class="menu-item">
            <a href="#">menu 1</a>
            <ul class="sub-menu">
                <li class="sub-menu-item">sub menu 1</li>
                <li class="sub-menu-item">sub menu 1</li>
                <li class="sub-menu-item">sub menu 1</li>
                <li class="sub-menu-item">sub menu 1</li>
                <li class="sub-menu-item">sub menu 1</li>
                <li class="sub-menu-item">sub menu 1</li>
                <li class="sub-menu-item">sub menu 1</li>
                <li class="sub-menu-item">sub menu 1</li>
            </ul>
        </li>
        <li class="menu-item">
            <a href="#">menu 2</a>
            <ul class="sub-menu">
                <li class="sub-menu-item">sub menu 2</li>
                <li class="sub-menu-item">sub menu 2</li>
                <li class="sub-menu-item">sub menu 2</li>
                <li class="sub-menu-item">sub menu 2</li>
                <li class="sub-menu-item">sub menu 2</li>
                <li class="sub-menu-item">sub menu 2</li>
                <li class="sub-menu-item">sub menu 2</li>
            </ul>
        </li>
        <li class="menu-item">
            <a href="#">menu 3</a>
            <ul class="sub-menu">
                <li class="sub-menu-item">sub menu 3</li>
                <li class="sub-menu-item">sub menu 3</li>
                <li class="sub-menu-item">sub menu 3</li>
                <li class="sub-menu-item">sub menu 3</li>
                <li class="sub-menu-item">sub menu 3</li>
                <li class="sub-menu-item">sub menu 3</li>
                <li class="sub-menu-item">sub menu 3</li>
                <li class="sub-menu-item">sub menu 3</li>
                <li class="sub-menu-item">sub menu 3</li>
            </ul>
        </li>
        <li class="menu-item">
            <a href="#">menu 4</a>
            <ul class="sub-menu">
                <li class="sub-menu-item">sub menu 4</li>
                <li class="sub-menu-item">sub menu 4</li>
                <li class="sub-menu-item">sub menu 4</li>
                <li class="sub-menu-item">sub menu 4</li>
                <li class="sub-menu-item">sub menu 4</li>
                <li class="sub-menu-item">sub menu 4</li>
                <li class="sub-menu-item">sub menu 4</li>
                <li class="sub-menu-item">sub menu 4</li>
                <li class="sub-menu-item">sub menu 4</li>
            </ul>
        </li>
        <li class="menu-item">
            <a href="#">menu 5</a>
            <ul class="sub-menu">
                <li class="sub-menu-item">sub menu 5</li>
                <li class="sub-menu-item">sub menu 5</li>
                <li class="sub-menu-item">sub menu 5</li>
                <li class="sub-menu-item">sub menu 5</li>
                <li class="sub-menu-item">sub menu 5</li>
                <li class="sub-menu-item">sub menu 5</li>
                <li class="sub-menu-item">sub menu 5</li>
                <li class="sub-menu-item">sub menu 5</li>
            </ul>
        </li>
        <li class="menu-item">
            <a href="#">menu 6</a>
            <ul class="sub-menu">
                <li class="sub-menu-item">sub menu 6</li>
                <li class="sub-menu-item">sub menu 6</li>
                <li class="sub-menu-item">sub menu 6</li>
                <li class="sub-menu-item">sub menu 6</li>
                <li class="sub-menu-item">sub menu 6</li>
                <li class="sub-menu-item">sub menu 6</li>
                <li class="sub-menu-item">sub menu 6</li>
                <li class="sub-menu-item">sub menu 6</li>
            </ul>
        </li>
    </ul>
```

### CSS
```
ul.menu{
    opacity: 0.8;
}
ul.sub-menu {
    display: none;
    background: #ccc;
    margin-left: 200px;
    position: absolute;
    width: 400px;
    top: 0;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
}

li.menu-item {
    list-style: none;
    height: 40px;
    background: #eee;
    width: 200px;
    line-height: 40px;
    padding: 0;
    box-sizing: border-box;
}

body {
    margin: 0;
    padding: 20px;
    font-family: verdana;
}

ul.menu {
    padding: 0;
    margin: 0;
    position: relative;
}

a {
    text-decoration: none;
    color: inherit;
}

ul.sub-menu{
    padding: 10px;
}
.menu-item.active ul.sub-menu {
    display: block;
}

li.menu-item a {
    margin: 0 10px;
    display: block;
}

li.menu-item:hover {
    background: #f9f5ec;
}
li.sub-menu-item:hover{
    background: #eee;
    padding: 0 10px;
}
svg {
    height: 1000px;
    width: 1000px;
    position: absolute;
    left: 0;
    top: 0;
    padding: 0;
    margin: 0;
}
```

**DEMO**

{@embed: https://jsfiddle.net/16e5apvw/2/embedded/}

<p>Cám ơn các bạn đã đọc!</p>

Tài liệu tham khảo :

https://bjk5.com/post/44698559168/breaking-down-amazons-mega-dropdown