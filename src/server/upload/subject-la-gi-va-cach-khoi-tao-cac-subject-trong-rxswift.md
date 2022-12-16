# Giới thiệu
* RxSwift là 1 phiên bản mở rộng của Reactive, nó là sự kết hợp Observer, Iterator, Functional Programing, nó giúp chúng ta có thể phản ứng với những thay đổi dữ liệu và chúng ta không cần phải gọi trực tiếp đến nó. Giúp công việc của chúng ta trở nên dễ dàng hơn và hạn chế sử dụng Notification hay là Delegate kết hợp với những block code và các câu lệnh phức tạp.

* Đó là về phần giới thiệu tổng quan về RxSwift, bây giờ vào chủ đề chính ngày hôm nay mình sẽ giới thiệu với các bạn về 1 phần quan trọng trong RxSwift là Subject và cách khởi tạo các Subject.

## Subject là gì?
* Trước khi đi tới định nghĩa về Subject thì mình muốn làm rõ về 2 khái niệm sau:
    1. Observable: là nguồn phát dữ liệu và chịu trách nhiệm emit các dữ liệu cho các cho các đối tượng đăng kí tới
    2. Observer: là nơi nhận và chịu trách nhiệm xử lý dữ liệu nhận được

* Kết hợp của cả 2 khái niệm trên chúng ta sẽ có được là Subject nó vừa hoạt động như là Observable và vừa hoạt động như là Observer. Khi mà subject vừa onNext thì sẽ ngay lập tức emit dữ liệu đi đến các subscriber của nó, mình xin giới thiệu các loại Subject sau đây

### PublishSubject
- Là 1 loại Subject và khi khởi tạo thì không cần phải cung cấp giá trị ban đầu cho nó 
- Các giá trị được emit trước lúc subscriber đăng kí tới thì sẽ không nhận được, subscriber chị nhận được các giá trị mà emit sau khi đăng kí
- Khi mà subject kết thúc complete hay error thì các subscriber mới đăng kí tới chỉ nhận được complete hay error

![](https://images.viblo.asia/035451ff-aee4-4f8c-814a-0ca085a6e076.png)

### BehaviorSubject
- Là 1 loại subject và khác với Publish thì Behavior phải cung cấp giá trị khởi tạo ban đầu cho subject
- Khi mà subscriber đăng kí tới thì sẽ luôn nhận được giá trị mới nhất từ subject
- Khi subject kết thúc complete hay error thì các subscriber mới đăng kí tới chỉ nhận được complete hay error

![](https://images.viblo.asia/6334616e-d160-4452-9325-493c15b061c4.png)

### ReplaySubject
- Là 1 loại subject và khởi tạo bằng kích thước của bộ đệm
- Nó sẽ phát lại các value đã phát cho subscriber đăng kí tới nó và số lượng value phát lại bằng với kích thước của bộ đệm
- Khi mà chúng ta kết thúc complete hay error thì subsciber đăng kí tới vẫn sẽ nhận được value từ trong bộ đệm đó và sau đó sẽ nhận complete hoặc error
- Chúng ta muốn khi kết thúc khi subscriber mới đăng kí tới chỉ nhận được complete hoặc error thôi thì chúng ta sẽ sử dụng operator .dispose() để có thể xoá hết các value ở trong bộ đệm

![](https://images.viblo.asia/c0063680-c8d5-4b09-8f07-a07245c2cb51.png)

### Relays
-  Relay được ra mắt để thay thế Variable ở phiên bản cũ thì nó là 1 wrap subject tuy nhiên nó không giống với subject hay là observable ở 1 số điểm sau:
    + Thứ nhất là nó không có onNext khi muốn emit chúng ta sử dụng accept để emit đi
    + Thứ hai là nó không bao giờ error hay complete
    + Khi sử dụng Relay thì chúng ta phải import thêm RxCocoa để sử dụng

- Relay có 2 loại liên quan tới 2 subject khác đó là:
    + PublishRelay: là 1 wrap của PublishSubject nó mang đặt tính của PublishSubject
    ![](https://images.viblo.asia/898a2ac4-79b1-4920-a5a1-da94ff6e91fe.png)

    + BehaviorRelay: là 1 wrap của BehaviorSubject nó mang đặt tính của BehaviorSubject
    ![](https://images.viblo.asia/7ba45a09-b2e4-4db8-bc94-c63ed1b48059.png)

## Kết thúc
* Thì đây cũng là kết thúc bài viết của mình, mình hi vọng qua bài viết này các bạn có thể hiểu hơn về các subject và cách khởi tạo của mỗi subject, chúc các bạn 1 ngày tốt lành.