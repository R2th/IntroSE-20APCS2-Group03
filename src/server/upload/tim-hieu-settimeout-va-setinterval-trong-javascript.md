# JavaScript Scheduling: setTimeout and setInterval
## Giới thiệu chung
Một block mã Javascript thường được thực thi đồng bộ. Tuy nhiên có một số hàm Javascript (timers) cho phép chúng ta trì hoãn việc thực thi của các hướng dẫn tùy ý. 
* setTimeout()
* setInterval()

Hai hàm này cho phép bạn thực hiện một đoạn mã Javascript tại một thời điểm nào đó trong tương lai. Nó được gọi là "lập lịch một cuộc gọi" (scheduling a call). Trong bài viết này, chúng ta sẽ tìm hiểu động của hai method này như thế nào qua các ví du minh họa.
## setTimeout()
Hàm setTimeout() thường được sử dụng nếu bạn muốn hàm của mình thực thi bao nhiêu mili giây kể từ khi gọi method setTimeout(). Cú pháp chung của method này như sau:
``` javascript
setTimeout ( expression, timeout );
```
Trong đó, expression là đoạn mã JavaScript được thực thi sau khi timeout chạy hết số mili giây đã thiết lập.

Để theo dõi thời gian chờ, setTimeout() cũng trả về một số id của timeout. Điều này thường được sử dụng trong method clearTimeout().

Một ví dụ đơn giản cho method này:
``` html 
<input type="button" name="sayHello" value="Wait for my Hello!"
onclick="setTimeout('alert(\'Hello!\')', 4000)"/>
```
Khi bạn click button "Wait for my Hello", method setTimeout sẽ được gọi. Biểu thức mà bạn muốn thực hiện sẽ được thực thi sau 4000 mili giây hay là 4 giây. 

Điểm lưu ý ở đây là setTimeout() sẽ không dừng việc thực thi các lệnh tiếp theo trong thời gian chờ. Nó chỉ lập lịch cho đoạn mã JavaScript được chỉ định sẽ thực thi vào thời điểm được thiết lập trước đó. Sau khi gọi hàm setTimeout(), các lệnh tiếp tục chạy bình thường với timer chạy ở chế độ nền.

Ví dụ trên là ví dụ đơn giản thực hiện hộp thoại alert trong method setTimeout. Thay vì việc sử dụng câu lệnh được viết ngay trong setTimeout chúng ta sẽ sử dụng bằng cách gọi đến một hàm. Ví dụ tiếp theo sẽ đưa ra cho bạn ý tưởng tốt hơn về gọi hàm với setTimeout(). 

Xem xét ví dụ sau đây:
``` javascript
function sayHello() {
  alert('Hello');
}
setTimeout(sayHello, 1000);
```
Hàm ``sayHello`` sẽ được thực thi sau 1s.
Bạn cũng có thể truyền các đối số cùng với hàm như ví dụ dưới đây:
``` javascript
function sayHello(message, person) {
  alert( message + ', ' + person );
}
setTimeout(sayHello, 1000, "Hi", "Monica"); // Hi, Monica
```
Nếu đối số đầu tiên của setTimeout() là 1 string, JavaScript sẽ tạo một hàm từ nó. Do đó, nó cũng thực hiện như sau:
``` javascript
setTimeout("alert('Hello')", 1000);
```
Tuy nhiên sử dụng string không được đề xuất sử dụng, sử dụng hàm thay thế chúng câu lệnh trên sẽ sửa lại như sau:
``` javascript
setTimeout(() => alert('Hello'), 1000);
```
Để dừng hàm này, ta sử dụng:
``` javascript
clearTimeout(myVar);
```
với myVar được khai báo: `myVar = setTimeout(function, milliseconds);`
để thấy hoạt động của nó rõ hơn, chúng ta xem xét ví dụ sau:
``` html javascript
<button onclick="myVar = setTimeout(myFunction, 3000)">Try it</button>

<button onclick="clearTimeout(myVar)">Stop it</button>

<script>
function myFunction() {
  alert("Hello");
}
</script>
```
Khi click button "Try it" sau 3s sẽ xuất hiện hộp thoại "Hello" tuy nhiên nếu trong khoảng 3s lại click button "Stop it" hộp thoại sẽ không xuất hiện.
## setInterval()
Xem xét ví dụ sau:
``` javascript
var myVar = setInterval(myTimer, 5000);

function myTimer() {
  alert("Hello world!");
}
```
Với đoạn mã JavaScript trên cứ sau 5s sẽ xuất hiện hộp thoại hiển thị thông báo "Hello world!". Trên đây là ví dụ đơn giản về sử dụng hàm `setInterval()`. Tiếp theo chúng ta sẽ đi tìm hiểu kỹ hơn về cách sử dụng của nó.

Hàm setInterval() như cái tên của nó, hàm này sẽ thường được sử dụng để thiết lập độ trễ cho các hàm sẽ được thực hiện lặp lại như là hiệu ứng. Hàm setInterval() có quan hệ gần gũi với setTimeout() - cú pháp của 2 hàm cũng có vẻ giống nhau:
``` javascript
setInterval ( expression, interval );
```
Điểm khác duy nhất giữa chúng là: `setTimeout` chỉ kích hoạt `expression`  một lần trong khi `setInterval` sẽ kích hoạt `expression` sau một khoảng thời gian nhất định (trừ khi bạn cho nó dừng lại).

Để dừng hoạt động của hàm `setInterval`,  chúng ta sử dụng hàm `clearInterval(timerId)`. 
Xem ví dụ dưới đây:
``` javascript
// Hello is alerted repeatedly after every 3 seconds
let timerId= setInterval(() => alert('Hello'), 3000);

// Clear intervals after 6 sec with the timer id 
setTimeout(() => { clearInterval(timerId); alert('Bye'); }, 6000);
```
Một câu hỏi đặt ra là chúng ta nên sử dụng setInterval() khi nào? Trước tiên, bạn không cần phải ghi nhớ để gọi hàm setTimeout() tại cuối mỗi hàm hẹn giờ của bạn. Ngoài ra, khi sử dụng setInterval() sẽ không có độ trễ giữa 2 lần gọi hàm liên tiếp. Với setTimeout(), độ trễ tương đối dài trong khi biểu thức được ước tính, hàm được gọi, và setTimeout() mới bắt đầu được thiết lập. Vì vậy, nếu thời gian cần chính xác, thường xuyên hoặc một cái gì đó cần phải được thực hiện lặp lại sau những khoảng thời gian nhất định thì bạn nên sử dụng setInterval().

Nguồn tham khảo:

https://medium.com/@monica1109/scheduling-settimeout-and-setinterval-ca2ee50cd99f?fbclid=IwAR3QqRkcl37_yeEqLFNp7Kjv8-J5aeRDAsZC6A3OK3OO4ynyMvWHm8icA7s

[https://www.w3schools.com/js/js_timing.asp](https://www.w3schools.com/js/js_timing.asp)