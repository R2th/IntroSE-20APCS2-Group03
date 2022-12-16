# Giới thiệu
Xin chào mọi ngươì, Đây là  các series về NodeJs sẽ đi từ những điều cơ bản, những khái niệm cơ bản nhất về JS nói chung và NodeJs nói riêng. Trước khi viết bài này mình cũng chưa biết gì và cũng chưa tìm hiểu j về nó cả. Vậy nên nếu phần viết của mình sai hoặc mình hiểu sai 1 vấn đề nào đó thì mọi người cứ góp ý nhé

Javascript là ngôn ngữ lập trình single-threaded nghĩa là nó chỉ có 1 call stach, do vậy nó chỉ có thể làm 1 công việc tại 1 thời điểm nhất định.

**Call stack**

call stach sẽ ghi nhơ vị trí của chúng trong chương trình đang chạy, và sẽ kết thúc sau khi xử lý xong và return từ hàm đó
VD:

```
function printNumber(){
  console.log(1);
  console.log(2);
  console.log(3);
}

printNumber();
```

Lúc thực thi call stack sẽ rỗng, và bắt đầu đưa vào trong stack
1. printNumber(); // add vào stack
2. console.log(1);  printNumber(); // thực thi 
3. console.log(2);  printNumber(); // thực thi 
4. console.log(3);  printNumber(); // thực thi
5. printNumber();
6. đẩy ra khỏi stack

Vậy nếu call stack xử lý quá lâu dẫn đến việc trình duyệt bị block và người dùng không thể làm j khi function đang chạy hoặc việc phải xử lý quá nhiều trong call stack dẫn đến trình duyệt sẽ báo `pages unresponsive` chẳng hạn.

Vậy làm cách nào để không bị block web cũng như ko bị treo trình duyệt,

Chỉ có thể là Asynchronous callback

**Asynchronous callback - Event Loop**

Asynchronous callback hay được hiểu là callback bất đồng bộ

Chúng ta có thể thấy được ở những request call ajax hoặc đơn giản hơn  như này:

```
function callFirst(){
  console.log(1);
}
function callSecond(){
  console.log(2);
}
function callThird(){
  console.log(3);
}

callFirst();
setTimeout(callSecond, 3000);
callThird();
```
 
 và output là:
 ```
 1
 3
 2
 ```

Tại sao lại như vậy?
Nhiều bạn sẽ đặt câu hỏi:

- Không phải là JS là lập trình single-threaded sao?
- Không phải call stack khi hoàn thành khi xong xong việc và return mới tới 1 call stack khác sao?

Câu trả lời là đúng là như vậy. Tuy nhiên hàm setTimeout chúng được gọi là những Web Apis đó là những thành phần của trình duyệt 
Hiển đơn giản là sau khi được thêm vào call stack thì setTimeout() sẽ được chuyển tới Web Apis. Và khi Web Apis được thực thi thì sẽ đẩy vào trong `Call back queue`, Call back queue là hàm call back của Web Apis.

VD:
1. callFirst(); // add vào call stack
2. console.log(1);  callFirst();
3. xóa khỏi call stack();
4. // stack trống
5.  setTimeout(second, 1000); // add vào call stack
6.  setTimeout là 1 Web Apis nên được add vào add vào Web APIs để thực thi
7.  // Còn call stack sau khi thực thi xong setTimeout(second, 3000); nên hiện giờ nó trống
8.  callThird(); // add vào call stack
9.  console.log(3);  callThird();
10.  xóa khỏi call stack();
11.  // stack rỗng
12.  sau 3000ms khi thực hiện xong timeOut(),  callSecond() được chuyển xuống Callback Queue
13.  Lúc này Event Loop sẽ kiểm tra xem stack có còn trống hay không? nếu đang trống sẽ đưa callSecond() vào lại call stack
14.  callSecond() // add vào call stack
15.  console.log(2); callSecond();
16.  // xóa khỏi call stack();
17.  // stack trống

Event Loop là 1 trong nhưng cơ chế của V8 engine là lắng nghe từ 2 phía call stack và callback Queue. Tiếp nhận callback từ Web APIs và kiểm tra xe call stack có đang trống hay không để đưa queue đầu tiên vào trong call stack để thực thi nó.

Hay đơn giản hơn là VD về call ajax
VD:
```
var response;
response = $.ajax({url: 'http://callApi.com',....})
console.log(response)
```

và response sẽ không hiện ra dữ liệu trả về.  Lý do chính là cơ chế bất đồng bộ của JS.
$.ajax sẽ được add vào WebAPis và được xóa ở call stack rồi. Nên `console.log(response)` sẽ được add vào call stack và hiển thị response là undefined.
1. response = $.ajax({url: 'http://callApi.com',....})
2.  $.ajax({url: 'http://callApi.com',....}) được add vào Web APIs
3.  // xóa khỏi call stack;
4.  // stack rỗng
5.  thêm console.log(response); // hiển thị response là undefined
6.  xóa khỏi call stack
7.  Khi server trả về dữ liệu sẽ được trả về cho callback queue
8.  event loop sẽ kiểm tra stack còn trống hay không rồi thực hiên gán dữ liệu trả về với biến response.

Để giải quyết bài toàn này chúng ta cần sử dụng promise, async/await với ES 7
Có thể chúng ta sẽ nói về chúng ở 1 bài khác. ^^

**V8 engine**

Hiển đơn giản là máy tính của chúng ta sẽ không hiểu được ngôn ngữ javascript và javascript engines sẽ convert ngôn ngữ javascript để cho máy tính có thể hiểu được(machine code):

 Thứ tự chuyển hoá từ Javascript thành Machine Code của javascript engines
 
`Javascript => C++ => Asembly Language => Machine Code`

# NodeJs
Nodejs là 1 platform được xây dựng và phát triển từ năm 2009 (tính đến thời điểm này là 10 năm) và được xây dựng trên javascript runtime của chrome.
Javascript runtime (v8 trong Google Chrome) có 1 cơ chế vòng lặp vô hạn được gọi là event loop dùng để lắng nghe các event.
Trước khi bắt đầu tìm hiểu và học về NodeJs thì nên đi từ những khái niệm cơ bản cũng như cách thức hoạt động của NodeJs đã nhé

NodeJs được viết bằng C++. Vì vậy V8 Engine được coi là trái tim của NodeJs. Nó sẽ giúp convert JS sang machine code

Và sau khi NodeJs ra đời thì việc biên dịch đã trở nên dễ dàng hơn:

`Javascript => NodeJS(C++, V8) => Machine Code`


# Kết Luận
Ủa? Tại sao 1 bài về NodeJs lại chỉ có vài dòng về nó vậy?
Mình nghĩ đây là bài khá là quan trọng, cho dù nó chưa thực sự chi tiết nhưng nó cũng giúp các bạn hiểu về hoạt động của JS, cũng như các phương thức hoạt động non-blocking/async. Bạn sẽ không biết được vấn đề nằm ở đâu khi xuất hiện những error, điều này khá nguy hiểm khi bạn chỉ là beginner về NodeJs trong khi cộng đồng của NodeJs cũng chưa đông. Cuộc sống mà cứ tìm hiểu 1 cách từ từ :v