Đến hẹn lại lên, sau bài viết tìm hiểu về slick sẽ hứa viết bài cách sử dụng event nhưng chắc để lần sau. Như các bạn cũng đã biết chúng ta tạo ra popup để thông báo, form nhập thông tin, quảng cáo …. Để có thể viết 1 cái popup thì các bạn nghĩ ngay đến js, jquery, html, css, boostrap… Nhưng để viết popup sao cho nhẹ và giảm bớt js (đối với các bạn không thích js). Thì đây ! hôm nay mình sẽ hướng dẫn các bạn viết về nó.

## 1. HTML
Chúng ta cần một div popup để có thể show nó lên. Ở đây bạn có thể code nội dung của popup theo ý của mình và cần có một thẻ ``` <a href="#" class="close">x</a>``` để có thể đóng popup.

```html
<!DOCTYPE html>
	<html>
	    <head>
	        <meta charset="utf-8">
	        <title>CSS Only Lightbox / Popup</title>
	        <link href="styles.css" rel="stylesheet" type="text/css" />
	    </head>
	    <body>
	

	        <!-- popup code -->
	        <div id="xmas-popup" class="popup" href="#">
	            <div class="popup-content">
	                <img src="popup.jpg" alt="xmas-sale" />
	                <a href="#" class="close">x</a>
	            </div>
	        </div>
	

	        <!-- normal page code -->
	        <div class="wrapper">
	            <h1>CSS Only Popup</h1>
	            <p>
	                Lorem ninja ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore maga aliquam erat volutpat. Ut ninja wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit ninja lobortis nisl ut aliquip ex ea commodo consequat. Duis ninja autem vel eum iriure dolor in hendrerit in vulputate ninja velit esse molestie consequat, vel illum dolore eu feugiat nulla ninja facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam ninja ipsum liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi ninja non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes ninja demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas ninja est etiam processus dynamicus, qui ninja sequitur mutationem consuetudium lectorum.
	            </p>
	            <a href="#xmas-popup" class="button">Show popup</a>
	        </div>
    </body>
</html>
```

## 2. CSS
Dùng một vài thủ thuật css cùi bắp dưới đây ta cũng có thể tạo ra một cái popup đơn giản.
```css
body {
 background: #ddd;
 margin: 0;
 font-family: arial;
 font-size: 1.2em;
 color: #111;
}
	
.wrapper {
 max-width: 960px;
 margin: 10% auto;
 text-align: center;
 line-height: 2em;
}
	
.button {
 border: 3px solid #111;
 adding: 10px;
 color: #111;
 text-decoration: none;
}
	

.popup {
 position: fixed;
 width: 100%;
 height: 100%;
 top: 0;
 left: 0;
 background: rgba(0,0,0,0.6);
 display: none;
}

#xmas-popup .popup-content{
 width: 600px;
 height: 600px;
 background: #bbb;
 margin: 100px auto;
 position: relative;
 border: 5px solid #fff;
}

.close {
 position: absolute;
 top: 5px;
 right: 5px;
 border-radius: 50%;
 background: #222;
 border: 3px solid #fff;
 color: #fff;
 text-decoration: none;
 line-height: 0;
 padding: 9px 0 11px;
 width: 20px;
 text-align: center;
}
	
.popup:target {
  display: block;
}
```
 Thủ thuật cùi bắp thứ nhất là làm cho màn hình tức popup full body mờ đi hay tạo cho ta cảm giác nó có tác động đến cả trang ```width: 100%```,  ```height: 100%```
 Dùng màu ```background: rgba(0,0,0,0.6);``` để làm mờ trang đi. Tất nhiên ban đầu phải ``` display: none;``` nó đi.
 <br>
 <br>
 Riêng **popup-content**  chúng ta css width, height, margin,..... Thuộc tính positon: relative để định vị trí cho các thẻ con.
 <br>
 <br>
Vấn đề ở đây làm nằm ở thuộc tính **target** của css3, thuộc tính target sẽ css đến class được gọi. Ví dụ ở đây khi `<a href="#xmas-popup" class="button">Show popup</a>` được click thẻ **href** sẽ 
gọi class nào có id tương ứng. Khi class nhận được thì thuộc tính target css được gọi lên như sau:<br>
```css
.popup:target {
    display: block;
}
```
Và nút close <a href="#" class="close">x</a> đóng popup lợi dụng việc không tìm thấy điểm neo trang sẽ trở lại ban đầu mà không load lại. Nhưng url lại dính thêm chưởng **#** của các neo trên trang.

Những kiến thức này có lẽ sẽ giúp ích cho các bạn design html css mà không cần phải sử dụng đến js  (không ưa js). Cảm ơn các bạn đã quan tâm