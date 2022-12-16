Bài viết được tham khảo từ: https://blog.ganeshjaiwal.dev/how-does-javascript-work

# Lịch sử của javascript

Trong những ngày thuở sơ khai của website, khi mà những trang web còn vô cũng đơn giản và vẫn chỉ là những web tĩnh với giao diện xấu hơn cả bản mặt tôi. Thì để người dùng có thể tương tác nhiều hơn với website, vào năm 1995, một ngôn ngữ mới đã được phát triển bởi Netscape, đó chính là Javascript. Javascript đã được tạo ra chỉ trong 10 ngày bởi Brendan Eich (nghe thế này tôi cũng không tin nên sẽ để[ link ở đây](https://thenewstack.io/brendan-eich-on-creating-javascript-in-10-days-and-what-hed-do-differently-today/) :D). 

# Javascript engine
Mình sẽ có một đoạn code đơn giản như sau:
```javascript
const a = 2;
console.log(a);
```
Ai biết Javascript, kể cả những người mới cũng sẽ hiểu được đoạn code này. Nhưng chúng ta là con người, còn máy tính thực chất sẽ chẳng hiểu gì nếu bạn đưa cho nó mấy dòng code này cả. Thứ duy nhất máy tính hiểu là 0 và 1. Và Javascript engine sinh ra để thực hiện chuyển đổi code javascript thành ngôn ngữ máy

Khi một file Javascript được đưa vào trình duyệt, Javascript Engine sẽ thực thi file đó từng dòng một từ trên xuống dưới (nếu code không đồng bộ thì sẽ là ngoại lệ). Javascript Engine sẽ phân tích và chuyển  mã đó thành mã máy. Đây là một vài Javascript Engine:

![](https://images.viblo.asia/afc3df3e-ba22-4020-8b12-57d80de9e8c0.png)



# Memory heap

![](https://images.viblo.asia/b30aff06-893d-4479-8d87-a3191fd05f7b.png)


Javascript Engine đôi lúc sẽ không thể phân phát đủ bộ nhớ trong quá trình biên dịch, do đó, những dữ liệu này sẽ được đưa vào memory heap (vùng bộ nhớ không có cấu trúc). Dữ liệu được đưa vào heap sẽ tồn tại kể cả sau khi chúng ta thoát khỏi function đưa dữ liệu vào heap. Và đây là lúc mà chúng ta đối mặt với một vấn đề gọi là **memory leak**

Memory heap có giới hạn. Nếu chúng ta cứ tiếp tục sử dụng nó mà không quan tâm tới việc giải phóng bộ nhớ không sử dụng thì sẽ dẫn tới **memory leak**. Để khắc phục điều này, Javascript Engine sử dụng **Garbage collector**. Đây là một hình thức quản lý bộ nhớ. Về cơ bản thì nó sẽ dựa vào sự tham chiếu (reference). Khi dữ liệu mất đi mọi sự tham chiếu tới nó (nôm na là nó không được sử dụng nữa), **Garbage collector** sẽ đánh dấu nó là dữ liệu không thể tiếp cận và giải phóng nó. 

# Call Stack

Call Stack là một cấu trúc dữ liệu tuân thủ theo nguyên lý **Last In First Out(LIFO)** (cái cuối cùng được đưa vào sẽ là cái được sử dụng đầu tiên). Khi bạn bắt đầu một function, function đó sẽ được đẩy vào vùng chứa đầu tiên của stack. Rồi khi function đó kết thúc thì nó sẽ được remove ra khỏi stack. Đó là toàn bộ những gì stack có thể làm cho bạn.

# Web Api's
Web Apis không phải là một phần của Javascript engine nhưng là một phần của Javascript Runtime Enviroment. Javascript chỉ cung cấp cho chúng ta cơ chết để truy cập các api này. Bạn có thể xem danh sách các Web Apis ở [đây](https://developer.mozilla.org/en-US/docs/Web/API)

Giờ chúng ta sẽ có một ví dụ

```javascript
console.log(“First!”);

setTimeout(() => {
    console.log(“Second!”);
}, 1000 );

console.log(“Third!”);
/*
OutPut:- 
First
Third
Second
*/
```

Đọc đoạn này các bạn sẽ thấy thứ tự được log ra thì `Second` sẽ là cuối cùng vì phải đợi thêm 1s. Vậy điều gì đã thực sử xảy ra?

Đầu tiên, `console.log(“First!”)` sẽ được được vào `call stack`, sau đó nó sẽ được xử lý và đưa ra ngoài, lúc này stack sẽ rỗng và output chúng ta nhận được là `First`.  Tiếp tới `setTimeout(() => {
    console.log(“Second!”);
}, 1000 );` được đưa vào trong stack. Lúc này stack sẽ hiểu: "À, đây là một WebApi, hãy để WebApi xử lý nó". Và cuối cùng là đoạn `console.log(“Third!”);` Lúc này thì WebApi vẫn đang chờ để thực thi `console.log(“Second!”);`. Sau 1s thì WebApi sẽ được gõ đầu và bắt thực thi code. Nhưng WebApi sinh ra là người chơi hệ lươn, nó bảo rằng "Giờ mình phải làm cái đoạn console.log() này, nhưng mình không thể thực thi nó trực tiếp. Thôi để ném vào cho thằng `callback queue` vậy. Ê thằng `callback queue` t có cái callback này cần mày giải quyết này, đưa nó vào hàng đợi và thực thi nó đi".
# Callback Queue
Là cấu trúc dữ liệu kiểu hàng đợi (queue) tuân theo nguyên lý **First In First Out(FIFO)** (Cái gì được đưa vào queue đầu tiên sẽ được lấy ra trước). Đây sẽ là nơi mà những đoạn code bất đồng bộ của bạn được đẩy vào và chờ thực thi. Ngoài ra, còn có một thứ nữa gọi là **Job Queue**, dành riêng cho `Promise` function. Khi sử dụng promise, bạn có thể thêm `.then()` - với vai trò như một callback method. Và khi promise được resolve thì những đoạn code khai báo ở `.then()` sẽ được thực thi

# Event loop
Event Loop là cơ chế giúp Javascript có thể thực hiện nhiều thao tác cùng một lúc (concurrent model). Nhiệm vụ của Event Loop rất đơn giản đó là đọc Stack và Event Queue. Nếu nhận thấy Stack rỗng nó sẽ nhặt Event đầu tiên trong Event Queue và handler (callback hoặc listener) gắn với Event đó và đẩy vào Stack. Đặc điểm của việc thực thi hàm trong JS là sẽ chỉ dừng lại khi hàm return hoặc throw exception. Có nghĩa là trong khi hàm đang chạy thì sẽ không có một hàm khác được chạy, dữ liệu tạm của hàm cũng sẽ không bị thay đổi bởi một hàm khác hay cũng không bị dừng lại cho đến khi hoàn thành

![](https://images.viblo.asia/4e272d13-8df1-4188-b29a-8ca25ed330fa.png)

Trên đây chỉ là là khái quát về cách mà Javascript hoạt động. Thực tế thì nó phức tạp hơn rất nhiều và chắc sẽ tốn khá nhiều giấy mực mới có thể miêu tả được hết.

Bài hôm nay kết thúc tại đây thôi :D Chúc các bạn cuối tuần vui vẻ.