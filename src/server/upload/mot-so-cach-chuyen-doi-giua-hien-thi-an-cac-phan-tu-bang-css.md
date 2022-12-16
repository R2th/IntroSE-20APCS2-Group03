Một số cách chuyển đổi (switch) giữa hiển thị-ẩn các yếu tố (elements) bằng CSS

Thực tế có nhiều cách để hiển thị và ẩn các elements tùy vào thói quen của từng người, bài viết này giới thiệu một số cách chuyển đổi bằng các thuộc tính sau của CSS 

* opacity: Tạo hiểu ứng trong suốt, mờ ảo cho các thành phần như ảnh, chữ, khối nền. Thuộc tính opacity có thể được thiết lập giá trị từ 0.0 – 1.0. Với giá trị càng nhỏ thì độ trong suốt càng nhiều.

* visibility: Xác định ẩn hay hiển thị thành phần trên trang.

* display: Xác định loại hiển thị của thành phần. Với giá trị như sau: block, list-item, table, inherit, none, etc...

Sau đây là tính năng và ví dụ lần lượt của từng thuộc tính:

### 1.Switch bằng opacity

.html
```
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="./css.css">
  </head>
  <body>
    <p class="target">
      <a class="text" href="https://sun-asterisk.vn/" target="_blank">
        When switching between show/hide<br>
        You can be animated by the transition
      </a>
    </p>
    
    <button class="button">Switch Show-Hide</button>
    
    <script src="./js.js"></script>
  </body>
</html>
```

.css
```
.target {
  background-color: #ea3345;
  padding: 10px;
  transition: opacity 300ms;
}
.target.is-hidden {
  opacity: 0;
}
.text {
  color: white;
}
p {
  margin: 0;
}
```

.js
```
function attachEvent () {
  var button = document.querySelector('.button')

  button.addEventListener('click', function() {
    var target = document.querySelector('.target')

    target.classList.toggle('is-hidden')
  })
}

attachEvent()
```

**Tính năng**
1. Duy trì khu vực riêng ngay cả khi ẩn
2. Có thể click/tap
3. Cho phép transition


### 2.Switch bằng visibility

.css
```
.target {
  background-color: #ea3345;
  padding: 10px;
}
.target.is-hidden {
  visibility: hidden;
}
.text {
  color: white;
}
p {
  margin: 0;
}
```

**Tính năng**

1. Duy trì khu vực riêng ngay cả khi ẩn
2. Không thể click/tap
3. Cho phép transition


### 3.Chuyển đổi display

.css
```
.target {
  background-color: #ea3345;
  padding: 10px;
}
.target.is-hidden {
  display: none;
}
.text {
  color: white;
}
p {
  margin: 0;
}
```

**Tính năng**

1. Không duy trì khu vực riêng khi ẩn
2. Không thể click/tap
3. Không cho phép transition


### 4.Kết hợp Switch giữa opacity và pointer-events

.css
```
.target {
  background-color: #ea3345;
  padding: 10px;
  transition: opacity 200ms;
}
.target.is-hidden {
  opacity: 0;
  pointer-events: none;
}
.text {
  color: white;
}
p {
  margin: 0;
}
```

**Tính năng**

1. Duy trì khu vực riêng ngay cả khi ẩn
2. Không thể click/tap
3. Cho phép transition


### 5.Kết hợp Switch giữa opacity, pointer-event và property xác định kích thước

.css
```
.target {
  background-color: #ea3345;
  padding: 10px;
  line-height: 1.5;
  transition:
    padding-top 300ms,
    line-height 300ms;
}
.target.is-hidden {
  padding-top: 0;
  padding-bottom: 0;
  line-height: 0;
  pointer-events: none;
}
.text {
  color: white;
  transition: opacity 200ms;
}
.target.is-hidden .text {
  opacity: 0;
}
p {
  margin: 0;
}
```

**Tính năng**
1. Không duy trì khu vực riêng khi ẩn
2. Không thể click/tap
3. Cho phép transition


### Tóm tắt

Có nhiều phương pháp chuyển đổi dễ dàng bằng jQuery, nhưng đối với tôi việc chuyển đổi bằng CSS khiến tôi cảm thấy hoạt động trở nên nhẹ nhàng và thoải mái hơn.