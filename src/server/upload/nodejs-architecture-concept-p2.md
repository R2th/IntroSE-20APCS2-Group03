Tiếp nối series giới thiệu về NodeJs, ở phần 1 trước mình đã viết về mối quan hệ giữa NodeJS và V8. Trong phần 2 này mình sẽ tiếp tục viết về NodeJS architecture core. Mọi người đón đọc nhé.   
## 1. Các khái niệm cơ bản trước Nodejs  
### 1.1 Blocking và Non-blocking I/O  
I/O là quá trình giao tiếp (lấy dữ liệu vào, trả dữ liệu ra) giữa một hệ thống thông tin và môi trường bên ngoài. Với CPU, thậm chí mọi giao tiếp dữ liệu với bên ngoài cấu trúc chip như việc nhập/ xuất dữ liệu với memory (RAM) cũng là tác vụ I/O. Trong kiến trúc máy tính, sự kết hợp giữa CPU và bộ nhớ chính (main memory – RAM) được coi là bộ não của máy tính, mọi thao tác truyền dữ liệu với bộ đôi CPU/Memory, ví dụ đọc ghi dữ liệu từ ổ cứng đều được coi là tác vụ I/O.  
<br>

Do các thành phần bên trong kiến trúc phụ thuộc vào dữ liệu từ các thành phần khác, mà tốc độ giữa các thành phần này là khác nhau, khi một thành phần hoạt động không theo kịp thành phần khác, khiến thành phần khác phải rảnh rỗi vì không có dữ liệu làm việc, thành phần chậm chạp kia trở thành một bottle-neck, kéo lùi hiệu năng của toàn bộ hệ thống.  
<br>
Dựa theo các thành phần của kiến trúc máy tính hiện đại, tốc độ thực hiện tiến trình phụ thuộc:  
* **CPU Bound:** Tốc độ thực hiện tiến trình bị giới hạn bởi tốc độ xử lý của CPU. 
* **Memory Bound:** Tốc độ thực hiện tiến trình bị giới hạn bởi dung lượng khả dụng và tốc độ truy cập của bộ nhớ.
* **Cache Bound:** Tốc độ thực hiện tiến trình bị giới hạn bởi số lượng ô nhớ và tốc độ của các thanh cache khả dụng.
* **I/O Bound:** Tốc độ thực hiện tiến trình bị giới hạn bởi tốc độ của các tác vụ I/O.
* **Blocking I/O:** Yêu cầu thực thi một IO operation, sau khi hoàn thành thì trả kết quả lại. Process/Theard gọi bị block cho đến khi có kết quả trả về hoặc xảy ra ngoại lệ.
* **Nonblocking I/O:** Yêu cầu thực thi IO operation và trả về ngay lập tức (timeout = 0). Nếu operation chưa sẵn sàng để thực hiện thì thử lại sau. Tương đương với kiểm tra IO operation có sẵn sàng ngay hay không, nếu có thì thực hiện và trả về, nếu không thì thông báo thử lại sau.  
### 1.2 Synchorous và Asynchorous
* **Synchronous:** Các sự kiện diễn ra theo thứ tự. Một sự kiện chỉ được bắt đầu khi sự kiện trước kết thúc.

* **Asynchronous:** Không theo thứ tự, các hành động có thể xảy ra đồng thời hoặc chí ít, mặc dù các hành động bắt đầu theo thứ tự nhưng kết thúc thì không. Một hành động có thể bắt đầu (và thậm chí kết thúc) trước khi hành động trước đó hoàn thành.  
<br>

Sau khi gọi hành động A, ta không trông chờ kết quả ngay mà chuyển sang bắt đầu hành động B. Hành động A sẽ hoàn thành vào một thời điểm trong tương lai, khi ấy, ta có thể quay lại xem xét kết quả của A hoặc không. Trong trường hợp quan tâm đến kết quả của A, ta cần một sự kiện Asynchronous Notification thông báo rằng A đã hoàn thành.  

*Một ví dụ về bất đồng bộ:*  
```js
setTimeout(()=>{
   console.log("hello1")
},2000)
setTimeout(()=>{
   console.log("hello")
},1000)
setTimeout(()=>{
   console.log("hello2")
},3000)
// Output:   hello, hello1, hello2
```

Vì thời điểm xảy ra sự kiện hành động A hoàn thành là không thể xác định, việc bỏ dở công việc đang thực hiện để chuyển sang xem xét và xử lý kết quả của A gây ra sự thay đổi luồng xử lý của chương trình một cách không thể dự đoán.  

> Luồng của chương trình khi ấy không tuần tự nữa mà phụ thuộc vào các sự kiện xảy ra. Mô hình như vậy gọi là Event-Driven.  

### 1.3 Callback
“ *Callback function có thể được hiểu nôm na là một function A được truyền vào một function B thông qua danh sách các tham số của B. Lúc này tại hàm B sẽ gọi đến hàm A để thực hiện một chức năng nào đó mà A đang nắm giữ. Javascript là một ngôn ngữ lập trình hướng sự kiện và bất đồng bộ nên callback function đóng vai trò rất quan trọng, bạn sẽ truyền một callback function vào các sự kiện và xử lý bất đồng bộ đó.* “   
<br>
Giả sử ta có một ajax lấy dữ liệu từ client về, ta biết khái niệm của ajax chính là bất đồng bộ, sau khi dữ liệu lấy về được thành công, thực hiện các thao tác trên dữ liệu này.  
<br>
*ES6 định nghĩa 3 state cho 1 lời gọi hàm không đồng bộ:*
* **Pending:** hàm đang được thực hiện và chưa trả về kết quả. Trong lúc này, nếu cố tình console.log biến kết quả sẽ nhận được output < pending >
* **Fulfilled:** hàm đã thực hiện xong – thành công và trả về kết quả.
* **Rejected:** hàm đã thực hiện xong – không thành công. Thường thì sẽ bắt exception tại bước này.  
## 2. Các thành phần và kiến trúc trong Nodejs 
**Câu chuyện về Nodejs xoay quanh hình vẽ này:**

![](https://images.viblo.asia/c57ddd76-0876-409d-b4ec-ce82aae712eb.png)

Ta thấy rằng V8 Javascript Engine là trình dịch javascript, rõ ràng không biết gì về vào/ra file cả. Đằng sau cánh gà, thứ mang lại cơ chế Asychronous Event-Driven Non-Blocking I/O là libuv – một thư viện multi-platform hỗ trợ asynchronous I/O. Thứ trong folder deps/uv trên Github repo của Nodejs chính là repo của libuv.  
### 2.1 Libuv – thành phần xử lý vào ra bất đồng bộ
**Thread pool:**  Cách truyền thống là dùng multithreading. Khi gọi một I/O operation, thread chính bỏ đi và tiếp tục thực hiện lệnh khác, việc harder operation này được giao cho một worker theard hoặc một child process. Sau khi operation này hoàn thành trong worker thread, worker threar thông báo lại cho main thread.Vấn đề là ở đây:
* Sinh thread tiêu tốn tài nguyên để tạo mới và cần bộ nhớ cho stack của riêng nó (Như Linux là tối thiểu 2MB mỗi thread by default)
* Các vấn đề thread-safety như deadlock (do các thread chia sẻ tài nguyên), racing conditions, mutex,…
* Tiêu tốn tài nguyên cho thread context switching, scheduler của kernel cần làm việc nhiều hơn
* Worker thread là I/O bound.
  
Những ngoằng loằng trong việc khởi tạo thread có thể được giảm bớt bằng cách sử dụng Thread Pool. Trong mô hình cổ điển, với ví dụ về socket, các webserver cũ thường cho phép tạo 1 process/thread cho mỗi incoming request. Bằng cách ấy, main thread vẫn có thể lắng nghe và accept() các yêu cầu kết nối mới, trong khi worker thread vẫn có thể chờ recv() từ client đã kết nối một cách đồng thời (đồng thời một cách tương đối).  
<br>
Với nonblocking I/O hành động thử đọc/ghi dữ liệu lên file được gọi là polling (thăm dò). Nếu không có cơ chế thông báo thời điểm file operation sẵn sàng để thực hiện, chương trình của bạn sẽ phải liên tục polling một file trong một vòng lặp vô hạn cho tới khi thành công. Unix cung cấp cơ chế I/O Multiplexing cho phép đồng thời theo dõi nhiều file descriptor để xem có thể thực hiện I/O operation nào đó trên bất kỳ file nào mà không bị hay không. Một lời gọi giám sát có thể block process gọi nó cho tới khi có bất kỳ một file nào sẵn sàng. Ba system call có thể thực hiện I/O Multiplexing là select(), poll() và epoll().  
<br>
Libuv tự quảng cáo nó là một multi-platform support library with a focus on asynchronous I/O. Kiến trúc của libuv sử dụng epoll, kqueue và dev/poll cho các hệ điều hành Unix-like. epoll là system call của Linux, kqueue là system call tương tự trong các hệ đều hành phát triển từ BSD (Một phiên bản của Unix) trong đó có Mac OS X, cuối cùng là dev/poll cho họ Solaris. Tất cả đều được bọc bởi giao diện uv__oi_t. Riêng Windows thì sử dụng IOCP (Mình cũng chẳng biết nó là cái gì nữa).  
<br>
Các phương pháp này (có lẽ) chia sẻ chung một cơ chế để theo dõi I/O event notification của nhiều file descriptor khác nhau.  
### 2.2 Callstack trong V8 engine

![](https://images.viblo.asia/586b61bd-6729-4682-8135-966fc36b0bc7.png)  

 Call Stack là thành phần của V8. Nó là cấu trúc dữ liệu mà V8 dùng để theo dõi các lệnh gọi hàm. Mỗi khi chúng ta gọi một function, V8 đặt một reference đến function đó bên trong 1 call stack và nó tiếp tục làm như vậy cho mỗi lần gọi lồng nhau của các function khác. Điều này cũng bao gồm các function tự gọi mình(đệ quy).   
 <br>
 Câu chuyện về call stack của JavaScript có lẽ chúng ta đều đã được nghe kể rất nhiều lần. Ta đều biết rằng stack frame được push mỗi khi một hàm được gọi, và được pop với lệnh return. Sau khi lần lượt xử lý hết các lệnh trong chương trình, call stack trở nên rỗng ruột, một phép màu mang tên event loop sẽ nhặt các hàm callback trong một tạo vật gọi là event queue (hay task queue), đẩy vào trong call stack, và V8 engine tiếp tục thực thi hàm đang nằm trong call stack này.  
### 2.3 Event Loop – trái tim của Nodejs
**Event Loop** được cung cấp bởi thư viện libuv. Nó không phải là thành phần của V8. Vòng sự kiện là thực thể xử lý các sự kiện bên ngoài và chuyển đổi chúng thành lời kêu gọi gọi lại. Đó là một vòng lặp mà chọn các sự kiện từ hàng đợi sự kiện và đẩy callbacks của họ vào Call Stack. Nó cũng là một vòng lặp đa pha. Event Loop là một thực thể xử lý các event ngoại vi và chuyển đổi chúng vào trong lời gọi callback. Nó là một vòng lặp chọn các event từ danh sách event đang chờ và đẩy callback của các event này vào Call Stack.  
<br>
**Node JS Platform** tuân theo mô hình **Single Threaded with Event Loop**. Mô hình chính Node JS Processing dựa trên mô hình cơ bản Javascript Event với cơ chế Javascript callback.   
  Khi Node JS đi theo kiến trúc này, nó có thể xử lý được đồng thời nhiều yêu cầu của clients rất dễ dàng. Trước khi thảo luận về mô hình này, trước tiên hãy đi qua biểu đồ dưới đây:

![](https://images.viblo.asia/37a5bb8d-19dd-4c18-9eba-f93c9908be65.png)

***Các bước xử lý mô hình vòng lặp sự kiện đơn Threaded:***
* Clients gửi yêu cầu tới Web Server.
* Node JS Web Server duy trì một Limited Thread Pool để cung cấp dịch vụ cho các yêu cầu của clients.
* Node JS Web Server nhận được các yêu cầu đó và đưa chúng vào hàng đợi. Nó được hiểu như là là "Event Queue".
* Node JS Web Server nội bộ có một Components, gọi là "Event Loop". Tại sao nó có tên này là vì nó sử dụng vòng lặp vô hạn để nhận yêu cầu và xử lý chúng.
* Event Loop sử dụng một Single Thread duy nhất. Đó là trọng tâm của mô hình Node JS Platform Processing Model.
* Event Loop kiểm tra bất kỳ client request nào được đặt trong Event Queue. Nếu không, nó sẽ chờ các request đến.
* Nếu có, nó chọn một yêu cầu client từ Event Queue
    * Bắt đầu quá trình yêu cầu của client.
    * Nếu client request không yêu cầu bất kỳ Blocking IO Operations, thì xử lý mọi thứ và chuẩn bị phản hồi và gửi lại cho client.
    * Nếu client request yêu cầu một số Blocking IO Operations như tương tác với cơ sở dữ liệu, file systems, extenal services thì nó sẽ theo cách tiếp cận khác.
    * Kiểm tra các Thread có sẵn từ Internal Thread Pool
    * Chọn một Thread và chỉ định request client này cho Thread đó.
    * Thread này chịu trách nhiệm lấy request đó, xử lý nó, thực hiện các Blocking IO Operations, chuẩn bị phản hồi và gửi nó trở lại Event Loop
    * Event Loop lần lượt gửi phản hồi cho client tương ứng.
#### Event Loop Pseudo Code
```js
public class EventLoop {
  while(true){
     if(Event Queue receives a JavaScript   Function Call){
         ClientRequest request =   EventQueue.getClientRequest();
         If(request requires BlokingIO or takes more computation time)
             Assign request to   Thread T1
         Else
             Process and   Prepare response
     }
   }
} 
```
## 3. ECMAScript 2015 (ES6) 
Node.js được xây dựng trên phiên bản mới nhất của V8. Bằng việc luôn đảm bảo cập nhật đến phiên bản mới nhất của V8, Nodejs luôn được cập nhât những tính năng mới nhất của JavaScript ECMA-262 (ES6).  
<br>
***Những tính năng này được chia thành ba nhóm là shipping, staged và in progress:***
* **Shipping**: Tính năng ổn định và được đặt mặc định trong Node.js
* **Staged**: Tính năng gần hoàn thiện và có thể sử dụng bằng việc đặt cờ harmony, nhưng chưa ổn định
* **In progress**: Tính năng đang thử nghiệm, có thể sử dụng, V8 team engineer có thể thay đổi mà không cần thông báo.  

<br>
Trên là một số kiến thức  lý thuyết khi tìm hiểu về NodeJS, hãy tiếp tục theo dõi để đọc các bài viết tiếp theo.    (To be continue... 👌)

##### Link bài viết gốc của mình: [BKFA Team 💪](https://www.facebook.com/bkfateam/notes/)