![](https://images.viblo.asia/364a445d-1995-47fd-be56-ce1b761af1e5.gif)
Mặc dù có thể tìm được rất nhiều thư viện để thực hiện việc kéo thả các phần tử nhưng mình muốn tự mình làm thử, nên đó là lý do để có bài viết này.
# Thực hiện như thế nào?
Có 4 điểm bạn cần tính đến trước khi thực hiện:
## 1. Làm cho một phần tử có thể kéo được
Việc này khá đơn giản bạn chỉ cần thêm thuộc tính **draggable** vào phần tử đó và đặt nó bằng **true**
```html
<img src="cat.png" draggable="true" />

<div id="box" draggable="true"></div>
```
## 2. Điều gì xảy ra khi một phần tử được kéo?
Sự kiện khi bạn bắt đầu kéo một phần tử là **ondragstart** và bạn có thể thiết lập dữ liệu truyền đi khi kéo với **DataTransfer** object, hình ảnh mặc định khi kéo, .... hoặc thực hiện tác vụ khác.
## 3. Nơi để thả một phần tử?
Bạn có thể thả một phần tử ở bất kỳ vị trí nào và thiết lập nó với các sự kiện


| Sự kiện | Mô tả |
| -------- | -------- |
| ondragenter    | Được kích hoạt khi phần tử được kéo vào một vùng thả hợp lệ.|
| ondragleave    | Được kích hoạt khi phần tử được kéo ra một vùng thả hợp lệ.|
| ondragover    | Được kích hoạt khi phần tử được kéo ra qua vùng thả hợp lệ.|
## 4. Điều gì xảy ra khi bạn thả một phần tử?

Cuối cùng, bạn có thể xác định điều gì sẽ xảy ra khi phần tử được thả vào 'vùng thả' thông qua trình xử lý sự kiện ondrop của phần tử.

Mình đã trình bày các kiến thức cơ bản và sẽ làm một ví dụ cơ bản để hiểu rõ hơn.
# Ví dụ
Đầu tiên thì mình có một file html
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Drag Drop</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
    #box {
      display: inline-block;
      width: 200px;
      height: 200px;
      background: black;
    }
    .w {
      display: flex;
      width: 250px;
      height: 250px;
      align-items: center;
      justify-content: center;
      border: 2px solid black;
    }
    .container {
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="w">
      <div id="box" draggable="true"></div>
    </div>
    <div class="w"></div>
    <div class="w"></div>
    <div class="w"></div>
  </div>
</body>
<script src="js.js"></script>
</html>
```
Nó sẽ có giao diện :
![](https://images.viblo.asia/d0dbed67-6af5-4087-a432-8cec1b5d5265.png)

* Ở đây phần tử có thể kéo được của mình là cái ô vuông có màu đen trong hình :), ngoài ra bốn cái khung là vùng thả của mình.
* Mình sẽ thiết lập để có thể kéo thả được ô vuông qua lại các vùng thả.
```js
document.getElementById('box').addEventListener('dragstart', dragStart)
function dragStart(e) {
    e.dataTransfer.setData('text', e.target.id);
}
```
* Thực tế thì dữ liệu mà mình lấy chỉ là id của phần tử đó, và ở sự kiện thả thì từ id đó query đến phần tử và chèn nó vô vùng thả.
```js
function drop(e) {
    e.preventDefault();
    var id = e.dataTransfer.getData('text');
    var dom = document.getElementById(id);
    this.appendChild(dom);
  }
```
**Lưu ý: bạn cần đặt e.preventDefault() vào function của event dragover để event drop có thể thực hiện được**

Cuối cùng thì file js của mình như sau:
```javascript
  document.getElementById('box').addEventListener('dragstart', dragStart)

  for(const w of document.getElementsByClassName('w')) {
    w.addEventListener('dragenter', dragEnter)
    w.addEventListener('dragleave', dragLeave)
    w.addEventListener('dragover', dragOver)
    w.addEventListener('drop', drop)
    w.addEventListener('dragend', dragEnd)
  }

  function dragStart(e) {
    e.dataTransfer.dropEffect = "move"
    e.dataTransfer.setData('text', e.target.id);
  }

  function dragEnd(e) {
    this.style = ""
  }

  function dragEnter(e) {
    e.preventDefault();
    this.style = "border: 2px dashed red"
  }

  function dragLeave(e) {
    this.style = ""
  }

  function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move"
  }

  function drop(e) {
    e.preventDefault();
    var id = e.dataTransfer.getData('text');
    var dom = document.getElementById(id);
    this.appendChild(dom);
  }
```


-----


link xem [DEMO](https://hungkieu.github.io/drag_drop/index.html)
# Kết
Để thực hiện một chức năng kéo thả xịn bạn có thể sẽ cần nhiều xử lý hơn, hoặc có thể tìm một số thứ viện kéo thả có sẵn.
Cảm ơn đã đọc bài viết của mình ^^