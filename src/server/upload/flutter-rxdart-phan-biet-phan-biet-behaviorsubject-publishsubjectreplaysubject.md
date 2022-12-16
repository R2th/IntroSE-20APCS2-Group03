# Giới thiệu
RxDart islà một reactive functional programming library for Google Dart, được xây dựng dựa trên ReactiveX.
Google Dart với rất nhiều  Streams API hay ho,  thay vì cố gắng cung cấp một giải pháp thay thế cho API này, RxDart thêm chức năng lên trên nó.

| Dart | RxDart |
| -------- | -------- |
| Stream        | Observable     |
| StreamController        | Subject     |


Từ đó, chúng phát sinh ra thêm 3 biến thể chính cho StreamController (Subject):

**BehaviorSubject**:
Một trong các biến thể của Subject đó là BehaviorSubject, nó là biến thế có khái niệm về “the current value”. BehaviorSubject lưu trữ lại giá trị mới emit gần nhất để khi một Observer mới subscribe vào, nó sẽ emit giá trị đó ngay lập tức cho Observer vừa rồi.

![](https://images.viblo.asia/6e00474f-e3ac-4cff-aa9f-7837e071f269.png)
**PublishSubject**:

![](https://images.viblo.asia/af41aaae-737c-4996-8cce-ccf1a62b3903.png)

Bạn có thể thấy được, các listener chỉ nhận được những sự kiện xảy ra sau khi chúng bắt đầu lắng nghe từ PublishSubject.

Điểm khác biệt giữa BehaviorSubject và PublishSubject là các listener sẽ nhận được 1 sự kiện gần với thời điểm chúng lắng nghe nhất.

**ReplaySubject**:
Một ReplaySubject tương tự như một BehaviorSubject khi nó có thể gửi những dữ liệu trước đó cho Observer mới subscribe, nhưng nó có thể lưu giữ nhiều giá trị (có thể là toàn bộ giá trị của stream từ thời điểm ban đầu).

Tham số đầu vào của ReplaySubject có thể là:

buffer: là số lượng phần tử tối đa có thể lưu trữ.

windowTime: (ms) thời gian tối đa tính đến thời điểm gần nhất emit value.

![](https://images.viblo.asia/e533974d-e205-47ce-9ce0-d4d111961ac3.png)
# Thực nghiệm
Để hiểu rõ hơn về cơ chế hoạt động của 3 loại  Broadcast StreamController trên chúng ta sẽ cùng đi vào thực nghiệm

**BehaviorSubject**

![](https://images.viblo.asia/cf5fdebb-c508-433d-be4c-9badfb7c153c.png)

Hãy cùng quan sát kết quả khi chạy đoạn code trên: Ỏ lần listen thứ 2 nó chỉ nhận giá trị cuối là 2 và bỏ qua 2 giá trị phía trước là 0 và 1

**PublishSubject**

![](https://images.viblo.asia/2d0269fb-7c93-4d78-8212-e69e92a08b1c.png)

Đối với PublishSubject nó sẽ bỏ qua tất cả giá trị phía trước và chỉ nhận các giá trị sau đó

**ReplaySubject**

![](https://images.viblo.asia/0791fcbd-0e47-4fa2-a8ac-0432d38945d6.png)

Đối với ReplaySubject nó sẽ nhận tất cả giá trị trước và sau khi listen