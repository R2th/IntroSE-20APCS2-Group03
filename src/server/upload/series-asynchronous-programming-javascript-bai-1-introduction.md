Trong bài này, chúng ta sẽ tìm hiểu/ ôn tập về các khái niệm cơ bản trong xử lý bất đồng bộ trong Javascript. Các khái niệm chỉ ở mức độ cơ bản, mình viết ra để tự bản thân mình ôn tập nếu còn thiếu sót 1 điểm nào đó, và cũng muốn chia sẻ cho những bạn mới học làm sao để viết javascript 1 cách ngắn gọn (concise)

### 1. Asynchronous là gì ?

Thông thường, 1 chương trình sẽ chạy liên tục và chỉ xử lý 1 thứ tại 1 thời điểm. Nếu 1 function phải dựa vào kết quả của 1 function khác thì thời gian chờ đợi tổng cộng sẽ rất dài, và thời gian execute của chương trình sẽ bị kéo dài.
Cách khắc phục : lập trình cho chạy song song nhiều task cùng 1 lúc. Đây được gọi là asynchronous programming (lập trình bất đồng bộ)

### 2. Blocking code 

Lập trình bất đồng bộ được ứng dụng trong web rất nhiều. Khi 1 web app chạy trên browser và chạy 1 function dài, xử lý nhiều mà không trả về điều khiển cho browser thì browser có thể rơi vào trạng thái frozen. Đây được gọi là trạng thái blocking (bị khoá) - browser bị block, không tiếp tục xử lý user input được cho đến khi function trả về điều khiển cho browser.

### 3. Threads

Thread là 1 đơn vị xử lý mà chương trình có thể sử dụng để hoàn thành 1 task nào đó. Mỗi thread chỉ có thể làm 1 task tại 1 thời điểm.

> Task A -> Task B -> Task C

Mỗi task sẽ được chạy theo thứ tự. Các máy tính hiện nay chạy nhiều core, support chạy multiple-thread và có thể làm nhiều task cùng 1 lúc.

Thread 1 : Task A -> Task B
Thread 2 : Task C -> Task D 

### 4. Javascript là single-threaded

Javascript chỉ là đơn luồng (single-threaded). Tuy nhiên Javascript hỗ trợ chạy thêm ngoài main thread, 1 thread gọi là *worker thread*. Với điều bổ sugn này, Javascript hoạt động tương tự như multiple-thread 

> Main thread : Task A -> Task C
Worker thread : Expensive task B (Task nặng về xử lý B)

### 5. Code bất đồng bộ 

Đây là 1 phần khá quan trọng, các bạn nên đọc kĩ để hiểu đúng về khái niệm này.

*Worker thread* có 1 số hạn chế : 
+ Không thể trực tiếp truy cập DOM
+ Mặc dù code chạy trong worker không là blocking nhưng nó vẫn cơ bản là đồng bộ. Chúng ta xét ví dụ dưới đây 
VD1 : 
> Main thread : Task A -> Task B 

Task A : fetch list image từ server 
Task B : xử lý ảnh cho 1 image trong list

Task A phải xong thì mới chạy đến Task B được, nếu không thì xảy ra lỗi 

VD2 : 
> Main thread : Task A -> Task B -> Task D

> Worker thread : Task C -----> 

Task D sử dụng kết quả từ các task B và task C. Nếu ít nhất 1 trong 2 kết quả chưa có trước khi chạy task D thì sẽ bị lỗi. 
Để khắc phục vấn đề này thì browser cho phép chạy các thao tác 1 cách bất đồng bộ. Promises giúp cho bạn thực thi 1 task và đợi cho đến khi kết quả trả về mới tiếp tục chạy task khác.

> Main thread : Task A                                Task B

> Promise        :              (async operation) 

Promise chạy xong, đợi A trả về kết quả mới thực hiện B.