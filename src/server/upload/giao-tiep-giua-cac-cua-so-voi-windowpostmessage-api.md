# Mở đầu
Bạn đã bao giờ có nhu cầu giao tiếp giữa các cửa sổ hoặc cửa sổ hiện tại và iframe bên trong chưa. như truyền data từ cửa sổ này đến cửa sổ kia và ngược lại. Vậy làm cách nào để làm được điều đó? thì window.postMessage api chính là giải pháp của bạn? chúng ta cùng tìm hiểu trong bài viết này nhé!!
# Cú pháp
```js
targetWindow.postMessage(message, targetOrigin, [transfer]);
```

Với các tham số được mô tả bằng bảng dưới đây: 


| Tên | Mô tả|
| -------- | -------- 
| targetWindow     | Reference tới một windows hoặc iframe nào đó mà bạn muốn gửi message, giá trị này được trả về khi gọi hàm window.open hoặc tên, id của frame trong biến window.frames
|message| Dữ liệu cần gửi đến **targetOrigin**, có thể là string hoặc objec .....
|targetOrigin| Là trang sẽ nhận được message này. Hoặc có thể là "*"  thì message này sẽ được gửi đến mọi window target đến nó (**Không khuyến khích dùng**)

# Gửi Message
Để dõ hơn mình sẽ tạo ra 2 cửa sổ window như này: 
![](https://images.viblo.asia/7832ff1e-8bda-494b-bb9e-76f3d036e511.png)

> Window 1 (http://localhost:8002/window-1)
> 
> Window 2 (http://localhost:8002/window-2)

Tiếp theo mình sẽ viết code js cho window 1 để gửi message cho window 2: 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <h1>This is window 1</h1>
    <button onClick="sendHello()">Send hello to window 2</button>
</body>
</html>

<script>
    function sendHello() {
        var popup = window.open("http://localhost:8002/window-2", 'window-2');
        popup.postMessage("Hello, window-2! i am window-1", "http://localhost:8002/window-2");
    }
</script>
```

# Nhận Message
Tiếp theo viết code nhận message từ window-1 cho window-2

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <h1>This is window 2</h1>
</body>
</html>

<script>
    window.addEventListener("message", function (event) {
        if (event.origin !== "http://localhost:8001/window-1")
            return;
            
        alert(event.data)
    });
</script>

```

Các thuộc tính nhận được sẽ bao gồm: 


| Tên | Mô tả
| -------- | --------
| data     | Đối tượng được truyền đến 
| origin     |Nguồn gốc của data truyền đến. bạn phải kiểm tra trường này để tranh trường hợp người khác giả mạo sender cũng như xử lý những message không liên quan tới mình
| source     | reference đến đối tượng cửa sổ đã gửi tin nhắn; bạn có thể sử dụng điều này để thiết lập giao tiếp hai chiều giữa hai cửa sổ với nguồn gốc khác nhau.



Thành quả sẽ như thế này : 

![](https://images.viblo.asia/94d25356-e36b-4a5c-9f5e-9d4d330f62f7.gif)

# Vấn đề về bảo mật
> Nếu trang web của bạn không muốn nhận message từ các trang khác gửi tới thì tuyệt đối không lắng nghe event **message**  dưới đây:
```js
window.addEventListener("message", receiveMessage, false);
```

> Nếu bạn bắt buộc phải nhận message từ những trang khác thì luôn luôn xác minh danh tính của trang gửi đến bằng cách sử dụng **origin**

```js
if (event.origin !== "http://localhost:8001/window-1")
            return;
```
> **Bất kỳ window nào cũng có thể gửi tin nhắn đến các window khác, và  bạn không phải biết tin nhắn đó có độc hại hay không vì vậy không chỉ xác minh danh tính của window gửi đến mà bạn còn phải luôn xác minh cú pháp của tin nhắn nhận được**

> Luôn chỉ định chính xác **targetOrigin**.và không dùng **"*"** khi bạn sử dụng **postMessage** để gửi data đến window khác.

# Tổng kết
Hy vọng qua bài này bạn có thể sự dụng window.postMessage để giao tiếp giữa các window 1 cách an toàn và hiệu quả nhất. :100::100::100::100::100::100::astonished: