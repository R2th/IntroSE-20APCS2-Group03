## 1.Lịch sử nodejs

-----


> **Node.js** là một hệ thống phần mềm được thiết kế để viết các ứng dụng internet có khả năng mở rộng, đặc biệt là máy chủ web. Chương trình được viết bằng JavaScript, sử dụng kỹ thuật điều khiển theo sự kiện, nhập/xuất không đồng bộ để tối tiểu tổng chi phí và tối đại khả năng mở rộng Node.js bao gồm có V8 JavaScript engine của Google, libUV, và vài thư viện khác.
> 
> Node.js được tạo bởi Ryan Dahl từ năm 2009, và phát triển dưới sự bảo trợ của Joyent.
> 
> Mục tiêu ban đầu của Dahl là làm cho trang web có khả năng push như trong một số ứng dụng web như Gmail. Sau khi thử với vài ngôn ngữ Dahl chọn Javascript vì một API Nhập/Xuất không đầy đủ. Điều này cho phép anh có thể định nghĩa một quy ước Nhập/Xuất điểu khiển theo sự kiện, non-blocking.
> 
> Vài môi trường tương tự được viết trong các ngôn ngữ khác bao gồm Twisted cho Python, Perl Object Environment cho Perl, libevent cho C và EventMachine cho Ruby. Khác với hầu hết các chương trình Javascript, Nodejs không chạy trên một trình duyệt mà chạy trên Server. Node.js sử dụng nhiều chi tiết kỹ thuật của CommonJS.[6] Nó cung cấp một môi trường REPL cho kiểm thử tương tác.
> ( Nguồn Wiki)

## 2. Đặc điểm nổi bật của Nodejs


-----
+ **NodeJs** là không phải là một ngôn ngữ mà nó chỉ là môi trường để chạy javascript phía server. Vì thế NodeJs nó có tất cả các tính chất của javascript.
+ **Javascript** là Một ngôn ngữ của xử lí bất đồng bộ(Asynchronous). Vì thế, **Nodejs** cũng xử lý bất đồng bộ.
+ **Nodejs** chạy đơn luồng. Tức là Node.js chạy trên 1 CPU core duy nhất.
+ **Javascript** là ngôn ngữ hướng sự kiện.
## 3.Nodejs và cơ chế xử lý bất đồng bộ

-----
> Đồng bộ(Synchronous):
> Hiểu đơn giản: Diễn ra theo thứ tự. Một hành động chỉ được bắt đầu khi hành động trước kết thúc.
> 
> Bất đồng bộ(Asynchronous):
> Không theo thứ tự, các hành động có thể xảy ra đồng thời hoặc chí ít, mặc dù các hành động bắt đầu theo thứ tự nhưng kết thúc thì không. Một hành động có thể bắt đầu (và thậm chí kết thúc) trước khi hành động trước đó hoàn thành. Vì thế, trong thời gian chờ kết quả trả về nó vẫn hoạt động do đó cơ chế xử lý bất đồng bộ tối ưu được thời gian xử lý.

Để hiểu rõ về xử lý bất đồng bộ ta đi vào ví dụ cụ thể sau:
```
console.log("cau lenh 1");

setTimeout(function(){
	console.log("cau lenh 2");
},0);

console.log("cau lenh 3");
```
Hàm setTimeOut là hàm bất đồng bộ trong javascript. Dự đoán kết quả là:
```
cau lenh 1
cau lenh 2
cau lenh 3
```

Nhưng trên thực tế nó là:
```
cau lenh 1
cau lenh 3
cau lenh 2
```
Vậy tại sao lại có kết quả như vậy. Chúng ta hãy cùng nhìn vào mô hình sau:
![](https://images.viblo.asia/9dd56c5e-76fd-49e8-9df7-68b146931ee5.png)

Giải thích các định nghĩa:

**Heap :** là vùng nhớ được dùng để chưa kết quả tạm phục vụ cho việc thực thi các hàm trong stack. Heap càng lớn thì khả năng tính toán càng cao.

**Stack** là một vùng nhớ đặc biệt trên con chip máy tính phục vụ cho quá trình thực thi các dòng lệnh mà cụ thể là các hàm. Hàm chẳng qua là một nhóm các lệnh và chương trình thì gồm một nhóm các hàm phối hợp với nhau. Mỗi khi một hàm được triệu gọi thì nó sẽ được đẩy vào một hàng đợi đặc biệt có tên là stack. Stack là một hàng đợi kiểu LIFO (Last In First Out) nghĩa là vào đầu tiên thì ra sau cùng. Một hàm chỉ được lấy ra khỏi stack khi nó hoàn thành và return.

**Js runtime engine** là khu thực thi câu lệnh js gồm Heap và stack.

**Web APIs** là nơi chức các tác vụ được cung cấp bởi trình duyệt.

**Callback queue** là hàng đợi công việc kiểu FIFO(first in first out). Vào trước ra trước.

**Event Loop** là đọc Stack và Event Queue. Nếu nhận thấy Stack rỗng nó sẽ nhặt Event đầu tiên trong Event Queue và handler (callback hoặc listener) gắn với Event đó và đẩy vào Stack. Đặc điểm của việc thực thi hàm trong JS là sẽ chỉ dừng lại khi hàm return hoặc throw exception. Có nghĩa là trong khi hàm đang chạy thì sẽ không có một hàm khác được chạy, dữ liệu tạm của hàm cũng sẽ không bị thay đổi bởi một hàm khác hay cũng không bị dừng lại cho đến khi hoàn thành. Bởi vì có 1 vòng lặp chạy mãi mãi thực thi Queue nên nó có tên gọi là Event-loop.

```
while (queue.waitForMessage()) {
  queue.processNextMessage();
```
**Cơ chế hoạt động:**
+ đầu tiên: các câu lệnh được chạy lần lượt từ trên xuông dưới. Các câu lệnh sẽ được ném vào hàng đợi queue.
+ Bước 2: lúc này **stack** chưa có gì nên **event loop** sẽ lấy 1 tác vụ ở trong queue bỏ vào stack. Tức là khi này `console.log("cau lenh 1")` sẽ được cho vào **stack** và xử lý. và in ra : `cau lenh 1`
+ Bước 3: sau khi xử lý xong thì tác vụ 1 sẽ được lấy ra khỏi **stack**. Và cho tác vụ 2 vào là: `setTimeout(function(){
	console.log("cau lenh 2");
},0);` Khi này ta thấy hàm SetTimeout là 1 hàm trong web AIPs để tính toán thời gian. do đó nó sẽ được đưa vào Web APIs để đợi. Khi nào hàng đợi queue rỗng thì nó sẽ được đưa trở lại hàng đợi.
Bước 4: Thực hiện tác vụ 3. tương tự tác vụ 1. In ra `cau lenh 3` 
Bước 5: lúc này hàng đợi rỗng nên tác vụ 2 sẽ được đưa trở lại queue và sau đó được đưa vào stack để thực hiện.

# Kết luận
trên đây là cơ chế hoạt động của các tiến trình trong javascript cũng như nodejs. Nhìn chung dù là hàm đồng bộ hay bất đồng bộ thì cơ chế hoạt động đều thống nhất và tuân thủ theo cơ chế trên.

## tham khảo
https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop

https://viblo.asia/p/co-che-bat-dong-bo-trong-javascript-jvElaO1zKkw

https://viettut.com/lap-trinh/javascripts/event-loop-la-gi-va-hoat-dong-the-nao/