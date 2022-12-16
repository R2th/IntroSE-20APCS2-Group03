![image.png](https://images.viblo.asia/b7b2fd17-1e34-40d9-b9e0-d16e43735dd7.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😊.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😉.

Sử dụng các mô-đun ES6 để chia sẻ code giữa Frontend và Backend

Kể từ khi mình bắt đầu sử dụng Node.js cho một số app Backend cách đây vài năm, mình đã phải vật lộn với việc chia sẻ code giữa môi trường Node và Browsers. Những thay đổi cần thiết để code thích ứng với một trong hai môi trường là rất nhỏ, điều này thường dẫn đến tình huống mình có hai phiên bản gần như giống hệt nhau của cùng một tệp. Có khi mình là copy một file Utils code từ FE -> BE hoặc ngược lại. Trong khi dự án đó rất nhỏ thậm chí nó còn được để trong 1 folder.

VD:
```
../source/backend
../source/frontend
../source/docker
...
```

Gần đây, mình đang code một side project mới, và mình lại gặp bài toán tương tự. Do đó, mình quyết định thử nghiên cứu nó và cuối cùng mình đã có thể tìm ra giải pháp cho vấn đề này.

Những thứ mình chia sẻ dưới dây chỉ là giải phải cá nhân và hiện mình chỉ apply cho side project của mình. Nếu các bạn cần apply vào dự án cần xem xét trong các trường hợp cụ thể nhé.

Chia sẻ Javascript Class
===========================

Hãy bắt đầu bằng cách chia sẻ một Class rất đơn giản:

```javascript
export function SharedClass()
{
    this.attribute = "I am a shared class.";
}

SharedClass.prototype.print = function()
{
    console.log( this.attribute );
}
```

Class này trông khá giống với một Javascript Class bình thường có thể được sử dụng trong môi trường Node hoặc Browsers. Điểm quan trọng duy nhất là keyword `export` phía trước định nghĩa. Bạn cũng có thể sử dụng cú pháp [`class`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) khi tạo Javascript Class, nhưng mình đã quen với prototype.

Sử dụng Class trong Node.js
=========================

Bây giờ hãy xem cách chúng ta có thể sử dụng Class dùng chung trong môi trường Node:

```javascript
import { SharedClass } from "./SharedClass.mjs";

var obj = new SharedClass();
obj.print();
```

Một lần nữa, đây trông giống như code Node.js bình thường. Import Class, tạo đối tượng và gọi hàm `print()`.

Một điều đáng chú ý ở đây là phần mở rộng `.mjs` của tệp `SharedClass.mjs` và `SharedClassNode.mjs`. Điều này chỉ ra rằng các tệp này là các mô-đun ES6. Nếu không muốn đặt tên cho tệp `.mjs`, bạn cũng có thể thêm `“type”: “module”` vào tệp `package.json` của mình.

Sử dụng Class trong Browsers
c

Việc sử dụng Class đã được chia sẻ của chúng ta trong Browsers JavaScript cũng khá đơn giản và chỉ có một chi tiết mà chúng ta cần phải quan tâm. Khi import file JavaScript chúng ta cần thêm `type=”module”` vào thẻ `script` để các câu lệnh import và export có sẵn trên Browsers. Tuy nhiên, điều này đi kèm với một vài lưu ý. Khi chúng ta muốn sử dụng Class dùng chung, chúng ta chỉ có thể thực hiện điều đó trong các tập lệnh `type=”module”` khác và chúng ta cần import  nó một cách rõ ràng như chúng ta sẽ làm trong môi trường Node. Ngoài ra, code trong tập lệnh `type=”module”` có phạm vi riêng, nó không được thêm vào phạm vi chung.

```htm
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Shared Class Test</title>
    <script src="./node/SharedClass.mjs" type="module"></script>
    <script type="module">
      import { SharedClass } from "./node/SharedClass.mjs";

      var obj = new SharedClass();
      obj.print();
    </script>
  </head>
  <body>
  </body>
</html>
```

Với việc JavaScript ngày càng trở nên phổ biến cho cả Frontend và Backend, thật là tiện khi có thể chia sẻ code giữa các môi trường khác nhau.
Chú ý: Kỹ thuật này có thể có ích trong một số trường hợp cụ thể. Cân nhắc khi sử dụng trong dự án.

Roundup
=========================
Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉
Ref
=========================
* https://tuan200tokyo.blogspot.com/2022/11/blog48-cach-tao-javascript-class-dung.html