### Thẻ Canvas
```HTML
<canvas id="canvas" width="150" height="150"></canvas>
```
Ngoại trừ thuộc tính global là `id` ra thì thẻ canvas chỉ có duy nhất hai thuộc tính đó là `width` và `height`. Và cả 2 thuộc tính này đề không bắt buộc bạn phải khai báo. Khi không được khai báo thì canvas sẽ tự động được set lại về 300px chiều rộng và 150px chiều dọc. Tuy có thể điều chỉnh style cho canvas bằng `CSS` nhưng bạn vẫn nên khai báo 2 thuộc tính `width` và `height` ngay bên trong thẻ để tránh bị vỡ hình ảnh.
### Render nội dung
```Javascript
var canvas = document.getElementById('tutorial');
var ctx = canvas.getContext('2d');
```
Thẻ `canvas` tạo ra một bề mặt để vẽ có kích thước cố định. Để hiện thị nội dung thì chúng ta phải chạy 1 đoạn script và đắt đầu vẽ lên nó.
### Kiểm tra hỗ trợ
```Javascript
var canvas = document.getElementById('tutorial');

if (canvas.getContext) {
  var ctx = canvas.getContext('2d');
  // drawing code here
} else {
  // canvas-unsupported code here
}
```
Fallback dành cho những trình duyệt k hỗ trợ `canvas`
### Khung mẫu
```HTML
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <title>Canvas tutorial</title>
    <script type="text/javascript">
      function draw() {
        var canvas = document.getElementById('tutorial');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
        }
      }
    </script>
    <style type="text/css">
      canvas { border: 1px solid black; }
    </style>
  </head>
  <body onload="draw();">
    <canvas id="tutorial" width="150" height="150"></canvas>
  </body>
</html>
```
Đoạn script bao gồm một hàm gọi là `draw ()`, được thực thi khi trang tải xong. Khi chạy bạn sẽ thấy một hình vuông được vẽ lên canvas
### Ví dụ
```HTML
<!DOCTYPE html>
<html>
 <head>
  <meta charset="utf-8"/>
  <script type="application/javascript">
    function draw() {
      var canvas = document.getElementById('canvas');
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(10, 10, 50, 50);

        ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        ctx.fillRect(30, 30, 50, 50);
      }
    }
  </script>
 </head>
 <body onload="draw();">
   <canvas id="canvas" width="150" height="150"></canvas>
 </body>
</html>
```
Cảm ơn vì đã đọc bài