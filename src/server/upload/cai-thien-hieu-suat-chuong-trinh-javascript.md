`Javascipt` đang dần trở lên bá chủ và là ngôn ngữ lập trình phổ biến nhất hiện nay, là tiền đề cho hàng loạt những front-end framwork, plugin nổi tiếng đang dần làm thay đổi thế giới. Chính vì thế việc học và hiểu rõ ngôn ngữ này, chỉ nó thôi cũng giúp lập trình viên không sợ chết đói trong mội trường đầy cạnh tranh này, khi ai cũng biết làm thì người làm tốt hơn sẽ là người chiến thắng, nó được thể hiện qua kết quả mà ứng dụng họ tạo ra đem lại trải nghiệm như thế nào cho người dùng. Trong bài viết đầy văn vở hôm nay mình sẽ giới thiệu một số công cụ giúp cải thiện hiệu suất của một chương trình javascript, hy vọng sẽ giúp ích được gì đó trong quá trình làm việc với JS của các bạn. (go)
## 1. Web worker
Web worker là javascript chạy ngầm, mà không làm ảnh hưởng gì đến hiệu suất của page.

Như bạn đã biết khi thực thi một script trên trang HTML, hiểu đơn giản trang web sẽ bị đơ cho đến khi script đó chạy xong ví dụ click, select .... Thật là phiền phức đúng không. Vì vậy web worker ra đời giúp tách biệt một luồng xử lý nào đó mà không làm ảnh hưởng gì đến hoạt động của người dùng, họ có thể thoải mái thao tác trên trang web trong khi đoạn script kia vẫn chạy.

Việc sử dụng web worker khá đơn giản:

Trước tiên bạn cần kiểm tra xem web worker có được hỗ trợ trên trình duyệt của bạn hay không bằng cách:
```javascript
if (typeof(Worker) !== "undefined") {
  // Yes! Web worker support!
  // Some code.....
} else {
  // Sorry! No Web Worker support..
}
```
Đầu tiên chúng ta cần khởi tạo một worker với mục đích chạy ngầm có tên là workder_file.js
```javascript
var i = 0;

function timedCount() {
  i = i + 1;
  postMessage(i);
  setTimeout("timedCount()",500);
}

timedCount();
```

Tiếp theo sau khi đã có tác vụ chạy ngầm đơn giản như trên chúng ta khởi tạo web worker object.
```javascript
if (typeof(w) == "undefined") {
  w = new Worker("worker_file.js");
}
```
Đoạn code trên check xem nếu worker chưa tồn tại thì khởi tạo worker và chỉ định đường dẫn tới worker cần chạy, ở đây là worker_file.js
file này có nhiệm vụ tính toán và gửi lại kết quả đầu ra cho chúng ta để hiển thị lên web. Việc hiển thị lên web chúng ta có thể làm như sau :
```javascript
w.onmessage = function(event){
  document.getElementById("result").innerHTML = event.data;
};
```

Để tạo dừng một worker đang chạy chúng ta có thể thực hiện lệnh terminate nó như sau :
```javascript
w.terminate();
```
Như vậy chúng ta hoàn toàn có thể sử dụng web worker để tách biệt hoàn toàn phần tính toán và hiển thị , sau khi tính toán web worker sẽ trả kết quả lại bằng cách postMessage() ra, việc còn lại là bên ngoài sẽ hứng lấy và hiển thị lên page. Khá đơn giản nhỉ :D

## 2. Deferred Scripts
Tiếp tục xoay quanh việc blocking-script này, bởi nó chính là điểm yếu làm cho trang web của bạn bị block khi một script được xử lý, do vậy chúng ta cũng có thể hoàn toàn ngừng việc thực thi này lại cho đến khi html load xong bằng từ khóa defer khi khai báo file javascipt
```javascript
<script type="text/javascript" src="file1.js" defer></script>
```
Và trong quá trình download file js nó cũng không làm block trang web của bạn. 
```html
<html>
    <head>
         <title>Script Defer Example</title>
    </head>
    <body>
         <script defer>
             alert("defer");
         </script>
         <script>
             alert("script");
         </script>
         <script>
             window.onload = function() {
                 alert("load");
             };
         </script>
    </body>
</html>
```
Trong ví dụ trên sẽ show ra 3 lần alert, Nếu trình duyệt không hỗ trợ defer thì thứ tự thực hiện sẽ là defer -> script -> load, còn trong trình duyệt hỗ trợ defer thì thứ tự sẽ là script->defer->load. Defer được thực thi trước khi sự kiện onload được thực thi. 

## 3. Dynamic Script Elements
DOM cho phép ta tạo ra những phần tử dynamic HTML  dùng javascript.
```javascript
var script = document.createElement("script");
script.type = "text/javascript";
script.src = "file1.js";
document.getElementsByTagName("head")[0].appendChild(script);
```
Trong đoạn code trên file1.js sẽ được load khi phần tử của nó được add vào trong page. Điều đặc biệt trong kiểu load này là nó không làm block các xử lý của page.Tuy nhiên vấn đề của kỹ thuật này nằm ở chỗ nó chỉ hoạt động tốt nếu file js đó hoạt động độc lập mà không phụ thuộc vào bất kỳ script nào khác, Còn nếu script này là interface được sử dụng ở một script khác thì việc chúng ta cần phải làm sẽ là tracking xem khi nào thì file này được load xong. Công việc có vẻ khó khăn hơn chút.
```javascript
var script = document.createElement("script")
script.type = "text/javascript";
//Firefox, Opera, Chrome, Safari 3+
script.onload = function(){
 alert("Script loaded!");
};
script.src = "file1.js";
document.getElementsByTagName("head")[0].appendChild(script);
```
## 4. XMLHttpRequest Script Injection
Môt trong những cách tiếp cận nonblocking script đó là lấy mã js thông qua một đối tượng XMLHttpRequest (XHR) sau đó inject vào trong page. 
```javascript
var xhr = new XMLHttpRequest();
xhr.open("get", "file1.js", true);
xhr.onreadystatechange = function(){
     if (xhr.readyState == 4){
         if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
             var script = document.createElement("script");
             script.type = "text/javascript";
             script.text = xhr.responseText;
             document.body.appendChild(script);
         }
     }
};
xhr.send(null);
```
Đoạn code trên sẽ gửi một Get request đên file1.js sau đó sử dụng sự kiên onreadystatechange để check readyStatus, và check HTTP status code xem có success 200 không hoặc là được response từ cache với status 304. Nếu tất cả được verify một element mới sẽ được tạo và script sẽ được thực thi. Với cách này bạn hoàn toàn có thể load một script mà không cần thực thi nó.
## 5. Kết luận
Trên đây là một số cách xử lý với javascipt giúp cải thiện hiệu năng trang web của bạn, tuy có nhiều điều khó nhằn nhưng chúng ta hoàn có thể tiếp tục tìm hiểu để áp dụng vào ứng dụng web của mình. Hy vọng sẽ đem lại cho các bạn kết quả tốt hơn trong việc cải thiện kỹ năng làm việc cũng như hiệu năng và tìm ra được những biện pháp tốt nhất phù hợp với ứng dụng của mình :D