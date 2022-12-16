Một website đơn với hiệu ứng chuyển trang giúp trang web di chuyển tới các nội dung khác nhau và chỉ trên một trang duy nhất
đang là xu hướng được nhiều doanh nghiệp sử dụng. Với các trang web không có nhiều nội dung thì đây là sự lựa chọn đúng đắn nhất.
Web Single Page thường được thiết kế linh hoạt, sinh động, chuyên nghiệp bao hàm gắn gọn các ý chính về sản phẩm dịch vụ nhằm giúp khách hàng hiểu rõ hơn. 

Và dưới đây tôi giới thiệu đến các bạn hiệu ứng chuyển trang đơn giản với CSS3.
Ưu điểm của phương pháp chuyển trang này là không sử dụng Javascript, chỉ dùng CSS3 thuần 
nên tạo nên hiệu ứng chuyển trang rất mượt mà và không làm ảnh hướng tới tốc độ load trang web.

Code HTML:

```
<div id="header">
  <h1><a href="#"><img src="http://www.stickpng.com/assets/images/58430032a6515b1e0ad75b3f.png" width="180px"></a></h1>
  <ul id="navigation">
    <li><a id="link-home" href="#home">World cup 2018</a></li>
    <li><a id="link-japan" href="#japan">Japan</a></li>
    <li><a id="link-portfolio" href="#germany">Germany</a></li>
    <li><a id="link-about" href="#portugal">Portugal</a></li>
    <li><a id="link-contact" href="#brazil">Brazil</a></li>
  </ul>
</div>

<div id="home" class="content">
  <h2>RUSSIA 2018</h2>
  <img src="https://cdn.newsapi.com.au/image/v1/6a63d4ffa1b82ad7a0f6227ae104d3ac" width="1000">
</div>	

<div id="japan" class="panel">
  <div class="content">
    <h2>Japan Squad 2018</h2>
    <img src="https://articlebio.com/uploads/sports/2018/04/10/japan-world-cup-2018.png" width="1000">
  </div>
</div>	

<div id="germany" class="panel">
  <div class="content">
    <h2>Germany Squad 2018</h2>
    <img src="https://i.ytimg.com/vi/zAmPbcIl8us/maxresdefault.jpg" width="1000">
  </div>
</div>	

<div id="portugal" class="panel">
  <div class="content">
    <h2>Portugal Squad 2018</h2>
    <img src="https://www.fifa-cup.world/wp-content/uploads/2018/05/Portugal-world-cup-squad-playing-11-fifa-world-cup-2018.jpg" width="1000">
  </div>
</div>

<div id="brazil" class="panel">
  <div class="content">
    <h2>Germany Squad 2018</h2>
    <img src="http://images.performgroup.com/di/library/GOAL/d8/f1/brazil-team-england-14112018_j9fqplwexjdx1nvi1aklbcprr.jpg?w=4654&h=2617&quality=100&w=960&quality=70" width="1000">
  </div>
</div>
```

Code CSS:

```
body {
    width: 100%;
    background: #fff;
    overflow: hidden;
}
#header{
    position: absolute;
    z-index: 2000;
    width: 235px;
    top: 50px;
}
#header h1{
    font-size: 30px;
    font-weight: 400;
    text-transform: uppercase;
    color: rgba(255,255,255,0.9);
    text-shadow: 0px 1px 1px rgba(0,0,0,0.3);
    padding: 0;
    margin: 0;
    background: #fff;
    text-align: right;
}
#navigation {
    margin-top: 20px;
    width: 235px;
    display:block;
    list-style:none;
    z-index:3;
}
#navigation a{
    color: #444;
    display: block;
    background: #fff;
    background: rgba(255,255,255,0.9);
    line-height: 50px;
    padding: 0px 20px;
    text-transform: uppercase;
    margin-bottom: 6px;
    box-shadow: 1px 1px 2px rgba(0,0,0,0.2);
    font-size: 14px;
}
#navigation a:hover {
    background: #ddd;
}
.panel{
    min-width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    margin-top: -150%;
    position: absolute;
    background: #000;
    box-shadow: 0px 4px 7px rgba(0,0,0,0.6);
    z-index: 2;
    -webkit-transition: all .8s ease-in-out;
    -moz-transition: all .8s ease-in-out;
    -o-transition: all .8s ease-in-out;
    transition: all .8s ease-in-out;
}
.panel:target{
    margin-top: 0%;
    background-color: #fff;
}
.content{
    right: 40px;
    left: 280px;
    top: 0px;
    position: absolute;
    padding-bottom: 30px;
    margin-left: 50px;
}
.content h2{
    font-size: 60px;
    padding: 10px 0px 20px 0px;
    margin-top: 52px;
    color: #000;
}

.content img {
  height: 100%;
  object-fit: cover;
}

#home:target ~ #header #navigation #link-home,
#japan:target ~ #header #navigation #link-japan,
#germany:target ~ #header #navigation #link-portfolio,
#portugal:target ~ #header #navigation #link-about,
#brazil:target ~ #header #navigation #link-contact{
    background: #000;
    color: #fff;
}
```

Kết quả ta có 1 Web Single Page:
![](https://images.viblo.asia/7ddeb325-5a13-4e1b-9ce6-ae230c0271ed.png)
[Link Demo](https://codepen.io/hoatnv/full/PaRJdO/)


Rất mong bài viết nó là hữu ích với bạn, cám ơn các bạn đã xem bài viết !!