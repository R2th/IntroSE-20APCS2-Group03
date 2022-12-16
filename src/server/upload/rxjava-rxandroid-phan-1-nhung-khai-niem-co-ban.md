## 1. Mở đầu.
RxJava có mặt khá lâu và hầu như mọi người đều nghe về khả năng rất tuyệt vời của nó. Họ đã nghe về nó như thế nhưng lại chưa dùng nó. Bạn có phải là một trong số đó không :). Nhiều bạn đã đọc nhiều tài liệu nhưng thấy nó rất khó khăn, một số người lại sợ bắt đầu một cái gì đó mới thì lại thêm cảm giác khó thêm ^^. Vì vậy trong bài viết này tôi sẽ trình bày các vấn đề cơ bản trong RxJava và RxAndroid một cách dễ hiểu nhất. 

Ok hoy, đầu tiên, sẽ bắt đầu với giải thích các lý thuyết cơ bản trong reactive programming:
## 2. Reactive Programming là gì?
Reactive Programming về cơ bản là dựa trên sự kiện lập trình không đồng bộ. Mọi thứ bạn thấy là một luồng dữ liệu không đồng bộ (asynchronous data stream), cái mà có thể quan sát được và một hành động sẽ được thực hiện khi nó phát ra các giá trị. Bạn có thể tạo ra luồng dữ liệu này từ bất kỳ thứ gì : thay đổi biến, sự kiện click, http call, data storage, errors và có thể là không thứ gì. Khi nói đến đến bất đồng bộ có nghĩa là mọi module code thì mỗi module chạy trên từng thread riêng của nó, và do đó cùng một lúc có nhiều khối mã được thực thi.
Một lợi thế của bất đồng bộ là khi mọi nhiệm vụ chạy trên thread riêng của nó, tất cả các nhiệm vụ có thể bắt đầu đồng thời và lượng thời gian để hoàn thành nhiệm vụ là nhanh hơn khi ta thực hiện tuần tự. Khi nói đến các ứng dụng cho mobile, khi các tác vụ chạy trên background thread, bạn có thể đạt được trải nghiệm người dùng liền mạch mà không block main thread.
- Lấy một ví dụ đơn giản là x = y + z, trong đó tổng của y và z được gán cho x. Trong reactive programming, khi giá trị y thay đổi thì x cũng tự động thay đổi theo mà không cần phải thực hiện lại câu lệnh x = y + z. Điều này có thể nhận được khi ta lắng nghe, quan sát giá trị của y và z.
- Một mảng có thể là một luồng dữ liệu và mỗi hành động có thể được thực hiện khi mỗi phần tử của mảng đó được phát ra. Có thể bạn muốn lọc lấy các số chẵn và bỏ qua các số lẻ chẳng hạn. Điều này có thể thực hiện khi bạn thực hiện vòng lặp thông thường và các câu lệnh có điều kiện. Nhưng trong reactive programming bạn có thể đạt được điều này theo một cách tiếp cận khác.
Khi bạn bắt đầu một ứng dụng bằng cách áp dụng reactive programming, cách mà các bạn chọn architecture và viết code hoàn toàn khác so với trước đây. Ứng dụng sẽ vô cùng mạnh mẽ khi bạn dùng Clean Architecture, MVP, MVVM, …
## 3. Reactive Extension.
Reactive Extension (ReactiveX hay RX) là một thư viện follow theo những quy tắc của Reactive Programming tức là nó soạn ra các chương trình bất đồng bộ và dựa trên sự kiện bằng cách sử dụng các chuỗi quan sát được. Các thư viện này cung cấp một list các interface và method giúp các developers viết code một cách đơn giản và sáng sủa hơn.

**Rx là sự kết hợp của những ý tưởng tốt nhất từ Observer pattern, Iterator pattern và functional programming.**
![](https://images.viblo.asia/cc83987d-b783-4b8f-ac2b-5fe9159d632a.png)
Reactive Extension có sẵn bằng nhiều ngôn ngữ như C++ (RxCpp), C# (Rx.NET), Java (RxJava), Kotlin (RxKotlin) Swift (RxSwift), ...
![](https://images.viblo.asia/eab691c8-c7e2-4727-8a3d-d6ec7fa9ebe7.png)
Chúng ta nên đặc biệt quan tâm đến RxJava và RxAndroid đúng không nào.
## 4. RxJava là gì?
RxJava là một trong những Reactive Extension, dành cho ngôn ngữ Java. Về cơ bản nó là một thư viện follow theo Observer Pattern. Bạn có thể tạo ra bất kì luồng dữ liệu không đồng bộ trên bất kỳ thread nào, chuyển đổi dữ liệu và dữ liệu này được sử dụng bởi Observer trên bất kỳ thread nào. Thư viện này cung cấp nhiều toán tử tuyệt vời như Map, Combine, Merge, Filter, .... có thể áp dụng cho một luồng dữ liệu.
## 5. RxAndroid là gì?
RxAndroid là một loại Rx dành cho nền tảng Android. Nó được hình thành từ RxJava với vài lớp được thêm vào. Cụ thể hơn, Schedulers được giới thiệu trong RxAndroid (AndroidSchedulers.mainThread()) đóng vai trò quan trọng trong việc hỗ trợ đa luồng trong các ứng dụng Android. Schedulers về cơ bản quyết định.
Có rất nhiều loại Schedulers có sẵn nhưng Schedulers.io() và AndroidSchedulers.mainThread() là được dùng nhiều nhất:
### Schedulers.io()
Khi dùng cái này thì sẽ không dùng đến CPU, nó thực hiện các công việc chuyên sâu như networks call, đọc đĩa/file, database, … Nó duy trì được pool của thread.
### AndroidSchedulers.mainThread()
Nó cung cấp quyền truy cập đến Main Thread/UI Thread. Thông thường cập nhật giao diện hay tương tác với người dùng sẽ xảy ra trên luồng này. Chúng ta không thực hiện bất kì công việc chuyên sâu trên luồng này vì nó sẽ làm cho ứng dụng bị crash hoặc ANR.
### Schedulers.newThread()
Sử dụng cái này thì mỗi thread sẽ được tạo ra mỗi lần nhiệm vụ được xếp lịch. Thường thì không khuyến cáo sử dụng cách này trừ khi công việc rất dài. Thread được tạo qua newThread() sẽ không được dùng lại.
### Schedulers.computation()
Có thể đòi hỏi đến đòi hỏi nhiều CPU như xử lý dữ liệu lớn, xử lý bitmap, … Số lượng các thread được tạo ra bằng cách sử dụng Scheduler này hoàn toàn phụ thuộc vào số lõi CPU.
### Schedulers.single()
Scheduler này sẽ thực hiện tất cả các nhiệm vụ theo thứ tự tuần tự mà chúc được add vào. Việc này có thể cần thiết trong  một số trường hợp cần tuần tự.
### Schedulers.immediate()
Thực hiện nhiệm vụ ngay lập tức một cách đồng bộ bằng cách chặn main thread.
### Schedulers.trampoline()
Nó thực hiện các nhiệm vụ theo Last In - First Out. Tất cả các nhiệm vụ được xếp lịch sẽ được thực hiện từng cái một bằng cách giới hạn số lượng các background thread thành một.
### Schedulers.from()
Cách này cho phép tạo ra một Scheduler từ một Executor bởi giới hạn số lượng các thread được tạo ra. Khi thread pool bị full, các nhiệm vụ sẽ xếp hàng đợi.

Chúng ta đã có những khái niệm cơ bản cần thiết. Giờ hãy bắt đầu với một số khái niệm chính về RxJava mà mọi người nên biết.
## 6. RxJava Basic: Observable, Observer
RxJava gồm hai components chính là Observable và Observer. Thêm vào đó có những thứ khác ta phải quan tâm thêm như Schedulers, Operators and Subscription.
### Observable.
Là một luồng dữ liệu (data stream) làm công việc nào đó và phát ra dữ liệu (data)
![](https://images.viblo.asia/cae60dbb-1718-4a53-983a-d74a3406b5bf.png)
### Observer.
Là những đối tượng lắng nghe Observable. Nó nhận dữ liệu từ Observable phát ra.
### Subscription.
Sự liên kết giữa Observable và Observer được gọi là Subscription. Có thể có nhiều Observers đăng ký (subscribed) tới chỉ một Observable.
### Operator / Transformation
Operator còn có thể gọi là Transformation bởi vì nó là các toán tử có nhiệm vụ biến đổi dữ liệu được phát ra bởi Observable trước khi một Observer nhận chúng (nhận dữ liệu)
### Schedulers.
Như đã nói ở trên thì Schedulers là một tên mà có thể quyết định thread mà trên đó Observable sẽ phát ra dữ liệu và trên Observer sẽ nhận được trên background hay main thread, …
## 7. Tổng kết.
Qua bài viết mình đã tổng hợp một số khái niệm cơ bản liên quan đến RxJava và RxAndroid
## 8. Tài liệu tham khảo:
- http://reactivex.io/
- https://github.com/ReactiveX/RxJava
- https://github.com/ReactiveX/RxAndroid