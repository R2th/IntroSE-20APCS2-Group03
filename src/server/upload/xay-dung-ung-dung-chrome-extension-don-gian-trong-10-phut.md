## Chrome Extension là gì?
Một ứng dụng Chrome Extension về cơ bản là một trang web được lưu lại trong trình duyệt Chrome của Google, được tạo ra bằng HTML, CSS, JavaScript và có thể tương tác với website thông qua api của trình duyệt.
![](https://images.viblo.asia/2cd6b90f-c10f-43ab-90fc-a669d2f5bb31.png)

Chrome Extension có thể làm được khá nhiều thứ hay ho. Ta có thể tạo ra 1 extension cho một số trang nhất đinh như thay đổi thành phần của trang web đã được load hiện tại hoặc show ra một trang HTML khi được click vào (đồng thời sẽ chạy các câu lệnh JS).

Ví dụ về thư mục của một project extension đơn giản:
![](https://images.viblo.asia/c4888317-4509-4689-91a7-aac9243041ee.png)

Trong đó file quan trọng nhất là file **manifest.json**, dùng để cấu hình cho extension:
```
{
    "manifest_version": 2,
    "name": "demo project",
    "version": "1.0",
    "icons":{
        "16": "images/icon16.png",
        "32": "images/icon32.png",
        "64": "images/icon64.png"
    },
    "description": "a simple extension",
    "browser_action": {
        "default_icon": "images/icon.png",
        "default_popup": "popup.html",
        "default_title": "project title"
    }
}
```
### Thuộc tính của file cấu hình:
* **manifest_version**: cho biết version của Google extension, hiện tại thì bạn phải xét giá trị cho nó là 2.
* **name**: tên của extension.
* **version**: version của extension.
* **icons**: icon muốn hiển thi lên trên thanh trình duyệt
* **description**: mô tả extension.
* **browser_action**: cấu hình này dành cho tất cả các page, bao gồm tooltip, icon, popup page khi người dùng click vào icon.
### Một số thuộc tính khác: 
* **page_action**: tương tự như browser_action, nhưng nó hiển thị trên thành address bar.
* **background**: Quản lý trạng thái của các task.
* **web_accessible_resources**: danh sách các file bạn muốn inject trực tiếp vào trang web đó. Chú ý : khi inject file vào web nào đó dùng Chrome extension, thì các file js sẽ được chạy ở một môi trường riêng so vs các file js đã có sẵn trong website đó. Nếu muốn inject trực tiếp vào chạy cùng môi trường với các file của website đó,hoặc muốn website đó dùng các file ảnh,css trong extension này,thì bạn liệt kê vào trường này.
* **content_scripts**: dùng để inject các file js,css vào các trang web,
     + matches: chỉ định những website sẽ được inject các file.
    + scripts: các file js sẽ được inject vào
     + css: các file css sẽ được inject vào
    + all_frames : mặc đinh là false chỉ định chay trang đầu tiên hay toàn bộ các trang khác ...
* **permissions**: liệt kê các quyền mà extension của chúng muốn sử dụng, khai báo các url, website, API mà chúng ta muốn chạy.
## Tạo một ứng dụng vẽ Chrome Extension đơn giản
Đầu tiên, để tạo một project đơn giản, bạn cần phải tao folder project với cấu trúc như sau:
![](https://images.viblo.asia/52fd2d01-07c5-4846-9a32-65ec2a570e91.png)
Project được chia ra thành các phần:
* images: chứa ảnh, icon cho ứng dụng
* scripts: chứa các file javascript
* styles: chứa các file css

Ở file *manifest.json* như sau:
```
{
    "manifest_version": 2,
    "name": "draw project",
    "version": "1.0",
    "icons":{
        "16": "images/lam16.png",
        "32": "images/lam32.png",
        "64": "images/lam64.png"
    },
    "description": "a simple draw extension",
    "browser_action": {
        "default_icon": "images/lam64.png",
        "default_popup": "lam.html",
        "default_title": "ghetsugiadoi"
    }
}
```
Thư mục images của project mình để các icon:
![](https://images.viblo.asia/2882cd5f-e141-4b45-811b-bb3174052fae.png)

File *lam.html* là file giao diện của project, bạn hoàn toàn có thể viết mã html như 1 website bình thường:
```html
<!DOCTYPE html>
<html>
<head>
	<title>lam</title>
	<link rel="stylesheet" href="styles/lam.css">
</head>
<body>
	<div class="pword"><div class="word" id="l">L</div></div>
	<div class="pword"><div class="word" id="a">A</div></div>
	<div class="pword"><div class="word" id="m">M</div></div>
	<div class="pword"><div class="word" id="l">L</div></div>
	<div class="pword"><div class="word" id="a">A</div></div>
	<div class="pword"><div class="word" id="m">M</div></div>
	<canvas id="show"></canvas>
</body>
	<script type="text/javascript" src="scripts/jquery-3.1.1.min.js"></script>
	<script type="text/javascript" src="scripts/lam.js"></script>
</html>
```
File  *lam.css* của project:
```css
* {
    margin: 0px;
    padding: 0px;
    font: bold 40px tahoma;
    color: white;
}

body {
    width: 342px;
    height: 110px;
    padding: 5px;
}

.pword {
    display: inline-block;
    width: 50px;
    height: 100px;
    border-bottom: 1px solid silver;
    color: gray;
}

.word {
    width: 50px;
    height: 50px;
    display: inline-block;
    text-align: center;
    line-height: 50px;
}

#l {
    animation: anim 2s infinite;
    background-color: #e6c145;
  
}

#a {
    animation: anim 2s infinite;
    animation-delay: 0.3s;
    background-color: #22b14c;
}

#m {
    animation: anim 2s infinite;
    animation-delay: 0.46s;
    background-color: #f94e3f;
}

@keyframes anim {
    0% {
       transform:translateY(0);
    }
    50% {
       transform:translateY(50px);
    }
    100% {
       transform:translateY(0);
    }
}

#show {
    margin-top: 5px;
    width: 342px;
    height: 342px;
    background-color: #eee;
    z-index: 10;
}
```
File *lam.js* của project:
```js
function $(el) {
    return document.getElementById(el.replace(/#/, ''));
};
var canvas = $('#show');
canvas.width = 342;
canvas.height = 342;

var context = canvas.getContext('2d');
var start = function(coors) {
    context.beginPath();
    context.moveTo(coors.x, coors.y);
    this.isDrawing = true;
};
var move = function(coors) {
    if (this.isDrawing) {
        context.strokeStyle = "#000";
        context.lineJoin = "round";
        context.lineWidth = 3;
        context.lineTo(coors.x, coors.y);
        context.stroke();
    }
};
var stop = function(coors) {
    if (this.isDrawing) {
        this.touchmove(coors);
        this.isDrawing = false;
    }
};
var drawer = {
    isDrawing: false,
    mousedown: start,
    mousemove: move,
    mouseup: stop,
    touchstart: start,
    touchmove: move,
    touchend: stop
};
var draw = function(e) {
    var coors = {
        x: e.clientX - 5|| e.targetTouches[0].pageX,
        y: e.clientY - 110 || e.targetTouches[0].pageY
    };
    drawer[e.type](coors);
}
canvas.addEventListener('mousedown', draw, false);
canvas.addEventListener('mousemove', draw, false);
canvas.addEventListener('mouseup', draw, false);
canvas.addEventListener('touchstart', draw, false);
canvas.addEventListener('touchmove', draw, false);
canvas.addEventListener('touchend', draw, false);
```
Sau khi project đã hoàn tất. ban cần import project của bạn vào trình duyệt. Vào chrome extension, chọn bật chế độ developer lên. Chọn Load unpacked extension và chọn project đã viết reload lại trang và xem kết quả:
![](https://images.viblo.asia/e9edcf16-d067-4d63-b760-6a5fbb5bcf3c.png)

Bạn có thể tham khảo project của mình tại đây: [github](https://github.com/laam55/drawSimpleExtension)

### Kết luận
Trên đây mình đã giới thiệu qua về Chrome extension, các cấu hình cơ bản nhất và một ví dụ để tạo được một ứng dụng extension đơn giản. Bạn cũng có thể làm rất nhiều ứng dụng hay với Chrome Extension. Hi vọng bài viết sẽ giúp được phần nào các bạn.