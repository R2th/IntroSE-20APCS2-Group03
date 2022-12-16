Thời gian đầu khi mới học lập trình, Việc tạo menu dù ngang hay dọc với HTML & CSS
đối với mình và các bạn cùng học nó rất là khó khắn. Vì để tạo được một menu với CSS thì 
cần phải vận dụng rất nhiều kiến thức về CSS mặc dù nó chỉ là các kiến thức cơ bản nhưng 
bấy nhiêu thôi đã có thể gây khó dễ cho người mới rồi.

Và với kinh nghiệm đã từng chải của bản thân, mình xin chia sẻ các cách tạo một menu theo 
hướng dễ hiểu nhất dành cho người mới bắt đầu. Ở bài này mình sẽ hướng dẫn bạn tạo một menu ngang
đơn giản với chỉ HTML & CSS.

Các bạn làm theo hướng dẫn code HTML và CSS dưới đây của mình nhé...

***Code HTML:***
```
<h1>Menu ngang đơn giản với HTML & CSS</h1>
<div class="menu-wrapper menu-gold">
  <ul class="menu">
    <li><a href=""> Home</a></li>
    <li>
      <a href=""> Div Design</a>
      <ul>
        <li><a href=""> Design 1</a></li>
        <li><a href=""> Design 2</a></li>
        <li><a href=""> Design 3</a></li>
      </ul>
    </li>
    <li><a href=""> Division 1</a></li>
    <li>
      <a href=""> Division 2</a>
      <ul>
        <li><a href=""> Section 1</a></li>
        <li><a href=""> Section 2</a></li>
        <li>
          <a href=""> Section 3</a>
          <ul>
            <li><a href=""> Group 1</a></li>
            <li>
              <a href=""> Group 2</a>
              <ul>
                <li><a href=""> PHP</a></li>
                <li><a href=""> Mysql</a></li>
                <li><a href=""> Node.js</a></li>
              </ul>
            </li>
            <li><a href=""> Section 4</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li><a href=""> Division 3</a></li>
    <li><a href=""> Contact us</a></li>
  </ul>
</div>
```

***Code CSS:***
```
/* menu */
.menu-wrapper, .menu a{
  width: 100%;
}

.menu::after{
  content: '';
  clear: both;
  display: block;
}

.menu a{
  display: block;
  padding: 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-decoration: none;
  font-size: 20px;
}

.menu li{
  position: relative;
}

.menu > li{
  float: left;
}

.menu, .menu ul{
  display: inline-block;
  padding: 0;
  margin: 0;
  list-style-type: none;
  background: gold;
}

.menu ul li+li{
  border-top: 1px solid #fff;
}

.menu ul{
  position: absolute;
  box-shadow:  5px 5px 10px 0 rgba(0,0,0, 0.5);
}

.menu > li ul, .menu ul ul{
  opacity: 0;
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  z-index: -1;
  visibility: hidden;
}

.menu > li ul{
  top: 130%;
  left: 0;
}

.menu ul ul{
  left: 130%;
  top: 0;
}

.menu ul a{
  width: 250px;
}

.menu > li:hover > ul{
  top: 100%;
  opacity: 1;
  z-index: 1;
  visibility: visible;
}

.menu ul > li:hover > ul{
  left: 100%;
  opacity: 1;
  z-index: 1;
  visibility: visible;
}

.menu-gold, .menu-gold a{
  color: #000;
}
.menu-gold a:hover{
  background-color: #e6c300;
  color: #000;
}

body{
  background-image: url("http://recruit.framgia.vn/wp-content/themes/framgia-vn/css/images/bg/banner.jpg");
  text-align: center;
}

h1{
  text-align: center;
  margin-top: 20px;
  color: #fff;
  font-size: 40px;
}
/* ends */
```

***Và ta sẽ có kết quả là môt menu như này:***

![](https://images.viblo.asia/e6c0428b-3c96-4c03-bc32-7220c1f41763.png)

***Còn đây là [DEMO](https://codepen.io/hoatnv/pen/YjGayK) trực quan cho các bạn:***

{@codepen:  https://codepen.io/hoatnv/full/YjGayK/}

Tuy nó cũng đơn giản thôi, nhưng đôi khi chúng ta quyên mất là nên làm như thế nào cho đơn giản nhất mà hiệu quả.
vì nó là một phần quan trọng trong việc làm giao diện website.

Mình hy vọng bài viết có thể giúp ích cho các bạn, cảm ơn bạn đã đọc !