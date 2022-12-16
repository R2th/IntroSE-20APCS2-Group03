Hẳn bạn đã nghe tới RxJava, RxAndroid. Nó có những khả năng tuyệt vời mà chưa hẳn mọi người đều biết. Nhiều người cũng đã đọc nhưng việc hiểu, áp dụng được nó cũng rất khó khăn. 

Vậy nên ở phần 1 này của series tìm hiểu về Rx trong Android chúng ta sẽ bắt đầu tìm hiểu những khái niệm cơ bản nhé. Let's go !!!

## 1. Reactive Programming là gì ??

Trước hết hãy tìm hiểu về khái niệm **Reactive Programming**
 
**Reactive Programming** là lập trình sự kiện phản ứng (react) lại với **luồng dữ liệu bất đồng bộ (asynchronous data stream):**

- Mọi thứ bạn thấy là một luồng dữ liệu bất đồng bộ, cái mà có thể quan sát được và các hành động sẽ được thực hiện khi nó phát ra các giá trị. Sở dĩ sử dụng khái niệm luồng (stream) là để mô tả theo trình tự thời gian mà luồng - chuỗi các sự kiện xảy ra. Ví dụ như hình dưới.

<img src="https://images.viblo.asia/aae3efe8-9dc1-4ba6-9dda-235f073b369e.png"/>

- Bạn có thể tạo ra luồng dữ liệu này từ bất kỳ thứ gì : thay đổi biến, sự kiện click, http call, data storage, errors và có thể là không thứ gì.
- Khi nói đến đến bất đồng bộ có nghĩa là mọi module code thì mỗi module chạy trên từng thread riêng của nó, và do đó cùng một lúc có nhiều khối mã được thực thi. 

**Ví dụ:**

1. Phép tính x = y + z

Trong reactive programming, khi giá trị y hoặc z thay đổi thì x cũng tự động thay đổi theo mà không cần phải thực hiện lại câu lệnh x = y + z. Điều này có thể nhận được khi ta lắng nghe, quan sát giá trị của y và z.

2. Update lại giao diện của một view

Ta có một view hiển thị danh sách tên sinh viên từ csdl. Khi dữ liệu trong csdl thay đổi nó sẽ tự động thông báo cho view update lại dữ liệu. View không cần phải hỏi xem csdl có thay đổi gì không rồi sau đó mới update.  

## 2. Tạo sao nên sử dụng

- Nếu chỉ dừng lại ở đó thì FRP cũng không có gì đặc biệt. Sức mạnh của FRP là việc áp dụng functional programming cho phép filter (filter, take, scan, …), chuyển đổi từ stream này qua stream khác (map, flatMap, reduce), hoặc merge nhiều stream thành một stream mới (combine, merge, zip, …) khá dễ dàng mà không làm thay đổi trạng thái của stream ban đầu.

- Việc sử dụng FRP sẽ cải thiện được trải nghiệm người dùng, khi chúng ta muốn ứng dụng phản hồi nhanh hơn. Lợi ích tiếp theo là giúp hạn xử lý trung gian, thay vào đó sử dụng chuyển đổi stream (map, flatMap, reduce, ….).

- Một điểm mạnh khác của RP là giúp cho việc xử lý lỗi trong lập trình bất đồng bộ nhẹ nhàng hơn rất nhiều. Nếu bạn nào từng handle error khi lập trình bất đồng bộ, multiple thread, thì sẽ thấy việc này không hề dễ dàng. RP giúp tách biệt việc xử lý lỗi với logic. Việc này giúp cho code trong sáng hơn rất nhiều.

## 3. Reactive extension

**Reactive Extension (ReactiveX hay RX)** là một thư viện follow theo những quy tắc của Reactive Programming tức là nó soạn ra các chương trình bất đồng bộ và dựa trên sự kiện bằng cách sử dụng các chuỗi quan sát được.

Các thư viện này cung cấp một list các interface và method giúp các developers viết code một cách đơn giản và sáng sủa hơn.

Rx là sự kết hợp của những ý tưởng tốt nhất từ Observer pattern, Iterator pattern và functional programming. 

Reactive Extension có sẵn bằng nhiều ngôn ngữ như C++ (RxCpp), C# (Rx.NET), Java (RxJava), Kotlin (RxKotlin) Swift (RxSwift), ...

<img src="https://images.viblo.asia/eab691c8-c7e2-4727-8a3d-d6ec7fa9ebe7.png"/>

## 4.  RxJava - Rx kotlin

**RxJava** là một trong những Reactive Extension, dành cho ngôn ngữ **Java**:
- Về cơ bản nó là một thư viện follow theo Observer Pattern.
- Bạn có thể tạo ra bất kì luồng dữ liệu không đồng bộ trên bất kỳ thread nào, chuyển đổi dữ liệu và dữ liệu này được sử dụng bởi Observer trên bất kỳ thread nào. Thư viện này cung cấp nhiều toán tử tuyệt vời như Map, Combine, Merge, Filter, .... có thể áp dụng cho một luồng dữ liệu.

**Rx Kotlin** là tập hợp các phương thức bổ sung thêm (extension methods) của RxJava cho Kotlin. Sẽ có các phương thức giúp bạn dễ dàng tạo ra code reactive programming hơn, chuyển đổi, kết hợp các kiểu phát dữ liệu, ...

### 5. Rx Android

RxAndroid là một loại Rx dành cho nền tảng Android. Nó được hình thành từ RxJava với vài lớp được thêm vào, giúp áp dụng reactive programming trong Android dễ dàng, hiệu quả hơn. 

<img src="https://miro.medium.com/max/1000/1*TUUz8bQw_9b0ZicuO1fS1w.png"/>

Một ví dụ là hẳn bạn đã biết nếu một task chạy quá lâu trên main thread sẽ gây ra **lỗi ANR**, và muốn update giao diện bạn phải update trên main thread.

==> RxAndroid giới thiệu thêm chức năng cho lớp **Schedulers**, giúp update giao diện trên **mainthread, từ một Looper.**

Bạn hoàn toàn có thể chỉ khai báo Rx Android trong file build.gradle của app. App vẫn sẽ chạy bình thường vì Rx Android lúc đó sẽ tự pull Rx Java về. Nhưng phiên bản Rx Java ở đây là phiên bản cũ, ít được cập nhật vì nó phụ thuộc vào Rx Android mà nó cũng ít được cập nhật luôn. 

Nên tốt nhất khi khai báo sử dụng RxAndroid nên khai báo cả RxJava/Kotlin để luôn được cập nhật mới nhất.

## 6. Các thành phần cơ bản 

Hình sau sẽ mô tả cho chúng ta

<img src="https://images.viblo.asia/cae60dbb-1718-4a53-983a-d74a3406b5bf.png"/>

### Observable 

Là một luồng dữ liệu (data stream) làm công việc nào đó và phát ra dữ liệu (data). Theo hình vẽ thì đó là đường mũi tên ở trên, thực hiện xử lý gì đó và phát ra các dữ liệu là các khối hình.

### Observer 

Là những đối tượng lắng nghe Observable. Nó nhận dữ liệu từ Observable phát ra. Theo hình vẽ thì nó là đường mũi tên ở dưới, nhận dữ liệu từ Observer là các khối hình sau khi đã được xoay.

### Subscription 

Sự liên kết giữa Observable và Observer được gọi là Subscription. Có thể có nhiều Observers đăng ký (subscribed) tới chỉ một Observable. 

### Schedulers

Schedulers quyết định thread mà trên đó Observable sẽ phát ra dữ liệu và trên Observer sẽ nhận được dữ liệu

### Operator / Transformation

Operator còn có thể gọi là Transformation bởi vì nó là các toán tử có nhiệm vụ biến đổi dữ liệu được phát ra bởi Observable trước khi một Observer nhận chúng (nhận dữ liệu)

## Tóm lại

Ở phần này chúng ta đã đi tìm hiểu:
- Reactive Programming là gì ? 
- Rx là gì ? RxJava, RxKotlin, RxAndroid là gì ?
- Các thành phần cơ bản của Rx.

Sang phần sau chúng ta sẽ tiếp tục tìm hiểu sâu hơn về các thành phần của Rx nhé !!!

Các bạn có thể đọc thêm cái bài viết về kiến thức Android cả chém gió tại blog của mình nhé

Blog Code cùng Trung: http://codecungtrung.com/