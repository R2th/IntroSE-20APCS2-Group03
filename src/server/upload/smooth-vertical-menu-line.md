### Giới thiệu
Chia sẻ tới mọi người cách làm 1 menu dọc hover trượt theo line rất là style vs đẹp.

### HTML

***Pug***
```Pug
.nav-line
  ul.nav-line__list
    -
      var listItem = [
        {title: 'Edu Glaticos'},
        {title: 'AllStart'},
        {title: 'Handsome Boy'},
        {title: 'ThaiLand Boy'},
        {title: 'Sun* Boy'}
      ]
    each list, index in listItem
     if (list.title === 'Edu Glaticos')
       li.active Edu Glaticos
     else
       li
        if list.title
        =list.title
```
Khi render ra HTML thì thế này<br>

***HTML***
```HTML
<div class="nav-line">
    <ul id="nav-line__list">
        <li class="active">Edu Glaticos</li>
        <li>AllStart</li>
        <li>Handsome Boy</li>
        <li>ThaiLand Boy</li>
        <li>Sun* Boy</li>
    </ul>
</div>
````
### SASS
**SASS**
```SASS
.nav-line {
	display: table;
	position: absolute;
	top: 55%;
	left: 46%;
	transform: translate(-46%, -55%);
	
	&__list {
		position: relative;
		float: left;
		text-align: right;
		border-right: 1px solid rgba(255, 255, 255, 0.3);
		text-transform: uppercase;
		font-size: 14px;
	
		li {
			padding: 30px 15px;
			cursor: pointer;
		}
	}
}

.active {
	color: #1abc9c;
	font-weight: 600;
}

.slidingLine {
	position: absolute;
	top: 0;
	right: -2px;
	width: 3px;
	padding: 0 !important;
	background-color: #1abc9c;
}
```

**CSS**
```CSS
.nav-line {
  display: table;
  position: absolute;
  top: 55%;
  left: 46%;
  -webkit-transform: translate(-46%, -55%);
          transform: translate(-46%, -55%);
}
.nav-line__list {
  position: relative;
  float: left;
  text-align: right;
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
  font-size: 14px;
}
.nav-line__list li {
  padding: 30px 15px;
  cursor: pointer;
}

.active {
  color: #1abc9c;
  font-weight: 600;
}

.slidingLine {
  position: absolute;
  top: 0;
  right: -2px;
  width: 3px;
  padding: 0 !important;
  background-color: #1abc9c;
}

```
### JS
**JS**
```JS
$(function() {
	$(".nav-line__listv li").on("click", function() {
		$(".nav-line__list li.active").removeClass("active");
		$(this).addClass("active");
	});
	
	//Function for vertical sliding menu
	function slidingLine() {
		var $el, topPos, newHeight,
			$mainNav = $(".nav-line__list");
		// Create a new li and append it to ul
		$mainNav.append("<li class='slidingLine'></li>");
		var $slidingLine = $(".slidingLine");
		$slidingLine // Defining initial height and position
			.height($(".active").outerHeight()).css("top", $(".active").position().top).data("origTop", $slidingLine.position().top).data("origHeight", $slidingLine.height());
		$(".nav-line__list li").hover(function() { // Set new height and position
			$el = $(this);
			topPos = $el.position().top;
			newHeight = $el.outerHeight();
			$slidingLine.stop().animate({
				top: topPos,
				height: newHeight
			});
		}, function() { // Add Animate
			$slidingLine.stop().animate({
				top: $(".active").position().top,
				height: $(".active").outerHeight()
			});
		});
	}
	slidingLine();
});
```
### Demo
{@embed: https://codepen.io/Truelove/pen/JqOxyB}

### Lời kết
Vừa rồi mình đã giới thiệu chia sẻ 1 chút về cách tạo 1 slide menu dọc khi hover đơn giản, hi vọng chia sẻ này có thể là 1 tài liệu tham khảo nho nhỏ cho các bạn với vào làm Front-End.
Cảm ơn các bạn đã đọc bài nhé!