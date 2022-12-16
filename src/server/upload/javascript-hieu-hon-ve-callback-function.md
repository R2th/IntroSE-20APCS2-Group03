![](https://images.viblo.asia/1e7ba9be-d5c0-4b0f-b588-227c5f57af21.jpeg)

# Callback là gì? 
**Khái niệm cơ bản:** Callback là một function được thực thi sau khi một function khác đã hoàn thành.

Trong JavaScript, mỗi function chính là một object. Vì vậy, mỗi function có thể dùng các functions khác làm đối số và cũng có thể là kết quả trở về bởi các functions khác. Các functions như vậy được gọi là **higher-order functions**. Bất kì function nào được truyền dưới dạng đối số được gọi là một **callback function**

Hãy cũng xem một số ví dụ ở bài viết này để có cách nhìn rõ ràng hơn về callback function nhé 

# Tại sao cần đến Callback?
Bởi vì JavaScript là ngôn ngữ hướng sự kiện. Điều đó có nghĩa là thay vì phải đợi có response, JavaScript luôn luôn thực thi các listening cho events. Cùng xem ví dụ dưới đây: 
```
function first(){
  console.log(1);
}
function second(){
  console.log(2);
}
first();
second();
```

Function `first` được thi trước rồi tiếp đến function `second`. 
```
// 1
// 2
```

Nhưng điều gì sẽ xảy ra nếu function `first` chứa những khối lệnh chưa được thực thi tức thì? Ví dụ, chúng ta cần đợi response khi gửi API request. Để mô phỏng hành động này ta có thể dùng `setTimeout` - một JavaScript function được gọi sau một khoảng thời gian nhất định. Ta sẽ delay 500 milliseconds để mô phỏng cho một API request. 
```
function first(){
  // Simulate a code delay
  setTimeout( function(){
    console.log(1);
  }, 500 );
}
function second(){
  console.log(2);
}
first();
second();
```

```
first();
second();
// 2
// 1
```

Mặc dù function `first()` được gọi trước nhưng kết quả của nó lại được hiển thị sau kết quả của function `second()`.

Từ đó có thể thấy rằng JavaScript đã không thực thi các function theo một trình tự mà ta mong muốn, cụ thể hơn là nó đã không đợi response từ function `first()` trước khi thực hiện function `second()`.

Do ta không thể gọi một function sau một function khác và hi vọng chúng được thực thi theo trình tự mong muốn. Callback là một cách để chắc chắn rằng không thực thi những khối lệnh cho đến khi khối lệnh khác đã hoàn thành. 

# Tạo một Callback
Cùng mở Chrome Developer Console (Windows: Ctrl + Shift + J)(Mac: Cmd + Option + J) và nhập dòng lệnh sau
```
function doHomework(subject) {
  alert(`Starting my ${subject} homework.`);
}
```
Với ví dụ trên, ta có function `doHomework` với một đối số là môn học (subject) truyền vào. 
```
doHomework('math');
// Alerts: Starting my math homework.
```

Bây giờ ta hãy thử truyền vào một callback function như là đối số cho function `doHomework()` nhé 
```
function doHomework(subject, callback) {
  alert(`Starting my ${subject} homework.`);
  callback();
}

doHomework('math', function() {
  alert('Finished my homework');
});
```
Như bạn đã thấy nếu ta thực thi dòng code đó trên console sẽ có 2 thông báo alert được hiển thị `starting homework` alert và `finished homework` alert. 

Tuy nhiên callback function không phải khi nào cũng phải định nghĩa ngay trong khi gọi function. Chúng có thể định nghĩa bất cứ đâu như sau: 
```
function doHomework(subject, callback) {
  alert(`Starting my ${subject} homework.`);
  callback();
}
function alertFinished(){
  alert('Finished my homework');
}
doHomework('math', alertFinished);
```
Kết quả của ví dụ trên giống hệt với ví dụ trước đấy, tuy nhiên các chúng ta khai báo lại khác đôi chút. Như bạn có thể thấy, ta đã passed `alertFinished` function như là đối số của function `doHomework()`

# Ví dụ thực tế 
```
T.get('search/tweets', params, function(err, data, response) {
  if(!err){
    // This is where the magic will happen
  } else {
    console.log(err);
  }
})
```
* `T.get` gửi một API request tới server
* Có ba params trong request: `search/tweets` - đường dẫn của request, `params` - các search parameters và cuối cùng là một anonymous callback function 

Callback function ở đây để chờ response từ server sau đó sẽ quyết định thực hiện action gì tiếp theo. Ta không thể biết được API request có thành công hay không. Bằng việc sử dụng `if()` để kiểm tra xem trạng thái của request  sau đó thông báo lỗi hay thực hiện đoạn code mong muốn. 

Bài viết trên đây mình đã giới thiệu cho các bạn về khái niệm callback và nó được sử dụng như thế nào. Chúc các bạn một ngày làm việc vui vẻ!


Tài liệu tham khảo [JavaScript: What the heck is a Callback?
](https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced)