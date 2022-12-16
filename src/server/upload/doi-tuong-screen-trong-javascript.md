# Đối tượng Screen trong JavaScript
- Đối tượng screen chứa đựng các thông tin về màn hình của người dùng.
- Với đối tượng screen, ta có thể xác định được chiều cao, chiều rộng, độ phân giải màu sắc màn hình của người dùng.

- Dưới đây là danh sách các thuộc tính của đối tượng screen.



| Thuộc tính | Mô tả | 
| -------- | -------- | -------- |
| height    | 	Lấy chiều cao màn hình của người dùng     |
| width    | 	Lấy chiều rộng màn hình của người dùng     |
| availHeight    | Lấy chiều cao màn của người dùng (không bao gồm thanh Taskbar nằm ngang)     |
| availWidth    | 	Lấy chiều rộng màn hình của người dùng (không bao gồm thanh Taskbar nằm dọc)     |
| colorDepth    | 		Lấy độ phân giải màu sắc màn hình của người dùng     |

## 1) Lấy chiều cao của màn hình

- Để lấy chiều cao màn hình của người dùng, ta truy cập vào thuộc tính height của đối tượng screen.

### Ví dụ
Lấy chiều cao màn hình của người dùng

```
<!DOCTYPE html>
<html>
<body>
  <p id="demo"></p>
  <script>
    var x = "Chiều cao màn hình của bạn là: " + screen.height + "px";
    document.getElementById("demo").innerHTML = x;
  </script>
</body>
```
Đối với màn hình của bạn, biến x sẽ lưu trữ giá trị là:

> 1080

{@embed: https://codepen.io/v-hu/pen/abomGNN}

## 2) Lấy chiều rộng của màn hình

- Để lấy chiều rộng màn hình của người dùng, ta truy cập vào thuộc tính width của đối tượng screen.
### Ví dụ
Lấy chiều rộng màn của người dùng
```
<!DOCTYPE html>
<html>
<body>
  <p id="demo"></p>
  <script>
    var x = "Chiều rộng màn hình của bạn là: " + screen.width + "px";
    document.getElementById("demo").innerHTML = x;
  </script>
</body>
</html>
```
Đối với màn hình của bạn, biến x sẽ lưu trữ giá trị là:
> 1920

{@embed: https://codepen.io/v-hu/pen/rNBMvMV}

## 3) Lấy chiều cao của màn hình (không gồm Taskbar)

- Để lấy chiều cao màn hình (không bao gồm thanh Taskbar nằm ngang) của người dùng, ta truy cập vào thuộc tính **availHeight** của đối tượng screen.


![](https://images.viblo.asia/dbccf2cf-5f35-4595-b639-d9a1a861d824.JPG)


### Ví dụ
Lấy chiều cao màn hình (không bao gồm thanh Taskbar nằm ngang) của người dùng
```
<!DOCTYPE html>
<html>
<body>
  <p id="demo"></p>
  <script>
    var x = "Chiều cao màn hình không bao gồm thanh Taskbar nằm ngang của bạn là: " + screen.availHeight + "px";
    document.getElementById("demo").innerHTML = x;
  </script>
</body>
</html>
```
Đối với màn hình của bạn, biến x sẽ lưu trữ giá trị là:

> 1040

{@embed: https://codepen.io/v-hu/pen/oNvzdBw}

## 4) Lấy chiều rộng của màn hình (không gồm Taskbar)

- Để lấy chiều rộng màn hình (không bao gồm thanh Taskbar nằm dọc) của người dùng, ta truy cập vào thuộc tính availWidth của đối tượng screen
### Ví dụ
Lấy chiều rộng màn hình (không bao gồm thanh Taskbar nằm dọc) của người dùng
```
<!DOCTYPE html>
<html>
<body>
  <p id="demo"></p>
  <script>
    var x = "Chiều rộng màn hình không bao gồm thanh Taskbar nằm dọc của bạn là: " + screen.availWidth + "px";
    document.getElementById("demo").innerHTML = x;
  </script>
</body>
</html>
```

Đối với màn hình của bạn, biến x sẽ lưu trữ giá trị là:

> 1920

{@embed: https://codepen.io/v-hu/pen/NWKRMpo}

## 5) Lấy độ phân giải màu sắc
- Để lấy độ phân giải màu sắc (số bit cho một điểm ảnh) màn hình của người dùng, ta truy cập vào thuộc tính colorDepth của đối tượng screen.

### Ví dụ
Lấy độ phân giải màu sắc màn hình của người dùng

```
<!DOCTYPE html>
<html>
<body>
  <p id="demo"></p>
  <script>
    var x = "Độ phân giải màu sắc màn hình của bạn là: " + screen.colorDepth + " bit";
    document.getElementById("demo").innerHTML = x;
  </script>
</body>
</html>
```

Đối với màn hình của bạn, biến x sẽ lưu trữ giá trị là:

> 24
> 

{@embed: https://codepen.io/v-hu/pen/eYOdrRp}