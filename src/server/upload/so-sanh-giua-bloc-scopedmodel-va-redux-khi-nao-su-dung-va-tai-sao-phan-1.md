# I. Giới thiệu
* Khi tiếp cận với [Flutter](https://flutter.dev/) các bạn sẽ được làm quen với các framework như [BLoC](https://bloclibrary.dev/#/), [ScopedModel](https://pub.dev/packages/scoped_model) và [Redux](https://pub.dev/packages/flutter_redux). Sự khác nhau, ưu/nhược điểm, khi nào nên sử dụng và khi nào không?... sẽ là các câu hỏi được đặt ra nhiều nhất khi chúng ta lựa chọn một trong 3 framework này. Và trong khuôn khổ Phần 1 của bài viết này, chúng ta sẽ làm quen với mỗi framework này trước khi đưa ra so sánh trong Phần 2.
* Nội dung của bài viết được tham khảo tại [đây](https://www.didierboelens.com/2019/04/bloc---scopedmodel---redux---comparison/).
# II. Redux
### 1. Giới thiệu
**Redux** là một Application State Management (ASM) framework – hay nói cách khác, mục đích chính của **Redux** là quản lý các trạng thái.

**Redux** được xây dựng trên những nguyên lý sau:
1. Luồng dữ liệu một chiều (**Unidirectional**).
2. Một **Store**: Mỗi **Store** sẽ hoạt động như các **orchestrator** của Redux, trong đó:
+ Chỉ lưu trữ một **State**.
+ Cung cấp một điểm truy cập - được gọi là **dispath** – chỉ chấp nhận các **Action** trong đối số.
+ Cung cấp một **getter** để lấy **State** hiện tại.
+ Cho phép đăng ký/hủy bỏ nhận thông báo (thông qua **StreamSubscription**) về bất kỳ sự thay đổi nào của **State**.
+ Gửi các **action** và **store** đến **Middleware** đầu tiên.
+ Gửi các **action** và **state** hiện tại đến một **Reducer**.
3. **Action**: 
- Là đầu vào duy nhất được chấp nhận bởi các điểm truy cập của **Store**. **Middleware** và **Reducer** sẽ sử dụng **Action** kết hợp với **State** hiện tại để thực hiện các chức năng có thể dẫn đến sự thay đổi của **State**.
- Chỉ mô tả những gì đã xảy ra.
4. **Middleware**: 
- Là một chức năng thường để chạy bất đồng bộ dựa trên một **Action**. **Middleware** chỉ đơn giản là sử dụng một **State** (hoặc một **Action**) làm trigger nhưng không thay đổi **State**.
5. **Reducer**
- Thường là một chức năng đồng bộ để thực hiện một vài tiến trình xử lý dựa trên sự kết hợp giữa **Action** và **State**. Đầu ra của tiến trình này có thể tạo ra **State** mới. 
- Là đối tượng duy nhất được phép thay đổi **State**.
### 2. Cách hoạt động
![](https://images.viblo.asia/85a808b1-da83-4357-a5d6-231f6c877ff4.gif)
- Khi có sự kiện phát sinh ở tầng **UI**, một **Action** được tạo ra và gửi đến **Store**.
- Nếu có một hoặc nhiều **Middleware** đã được cấu hình thì chúng sẽ được kích hoạt theo trình tự. Mỗi **Middleware** sẽ chứa **Action** và tham chiếu đến **Store**.
- **Middleware** có thể tự gửi một **Action** đến **Store** trong quá trình xử lý.
- Sau đó **Action** và **State** hiện tại sẽ được gửi đến **Reducer**.
- Thông qua **Reducer** sẽ là cách duy nhất để thay đổi **State**.
- Khi **State** thay đổi, **Store** sẽ thông báo tới tất cả các **listener** đã đăng ký.
- **UI** sau đó có thể thực hiện các hành động thích hợp tương ứng với sự thay đổi của **State**.
### 3. Thực hiện
- **Redux** đã được phát triển cho **Javascript** và được chuyển qua **Dart** trong [package redux.dart](https://pub.dev/packages/redux).
- Package [flutter_redux](https://pub.dev/packages/flutter_redux) hỗ trợ một vài Widget như sau:
- **StoreProvider**: chuyển **Store** tới tất cả các **Widget**.
- **StoreBuilder**: lấy **Store** từ **StoreProvider** và chuyển đến **Widget** builder.
- **StoreConnector**: lấy **Store** từ **StoreProvider** gần nhất, chuyển đổi thành **ViewModel** và chuyển qua các builder.
# III. ScopedModel
### 1. Giới thiệu
Là một tập hợp các tiện ích để cho phép truyền một **Model** dữ liệu từ **Widget** cha đến một **Widget** con nào đó.

**ScopedModel** có 3 class chính:
1. **Model**: Là class chứa dữ liệu và business logic liên quan đến dữ liệu. Nó hiện thực [Listenable](https://docs.flutter.io/flutter/foundation/Listenable-class.html) và có thể thông báo cho bất kỳ thành phần nào đang theo dõi về sự thay đổi.
2. **ScopedModel**: 
* Là một **Widget** tương tự như **Provider**, chứa **Model** và cho phép:

    a. Truy xuất **Model** thông qua việc sử dụng **ScopedModel.of< Model >(context)**.

    b. Đăng ký context như một phụ thuộc dưới dạng **InheritedWidget** khi được yêu cầu.

* **ScopedModel** được dựa trên [AnimatedBuilder](https://docs.flutter.io/flutter/widgets/AnimatedBuilder-class.html) lắng nghe các thông báo được gửi bởi **Model** và sau đó sinh ra một **InheritedWidget**, đồng thời sẽ yêu cầu tất cả các phụ thuộc khác khởi chạy lại.
3. **ScopedModelDescendant**: 
- Là một **Widget** đối ứng với các biến thể của **Model**, nó sẽ khởi chạy lại khi **Model** thông báo rằng một sự thay đổi đã diễn ra.
### 2. Cách hoạt động
![](https://images.viblo.asia/55732c81-33c6-4132-813f-2898dd4524e1.gif)
- Phương thức **model.increment()** sẽ được gọi khi người dùng thao tác với **RaisedButton**.
- Phương thức này chỉ đơn giản là tăng giá trị của bộ đếm và sau đó gọi **notifyListeners()** API có sẵn khi **Model** hiện thực lớp trừ tượng **Listenable**.
- **AnimatedBuilder** sẽ tiếp nhận **notifyListeners()** và khởi chạy lại các **InheritedWidget** con.
- **InheritedWidget** thêm các **Column** và thành phần con của chính nó.
- **ScopedModelDescendant** sẽ kích hoạt builder có tham chiếu tới **Model** đang giữ giá trị bộ đếm mới.
# IV. BLoC
### 1. Giới thiệu
- **BLoC pattern** không yêu cầu bất kỳ thư viện hoặc package hỗ trợ bên ngoài nào vì nó chỉ đơn giản dựa vào việc sử dụng **Stream**. Tuy nhiên, để các tính năng dễ tiếp cận hơn (ví dụ **Subject**) nó thường được kết hợp với [RxDart package](https://pub.dartlang.org/packages/rxdart)
- **BLoC pattern** dựa trên:
1. **StreamController**: Cung cấp một **StreamSink** để đưa dữ liệu vào **Stream** và một **Stream** để lắng nghe dữ liệu.
2. **StreamBuilder**: Là một **Widget** để lắng nghe **Stream** và khởi chạy lại khi có dữ liệu mới được phát ra bởi **Stream**.
3. **StreamSubscription**: Cho phép lắng nghe dữ liệu được phát ra bởi **Stream** và đối ứng.
4. **BlocProvider**: Là một **Widget** thường được sử dụng để chứa một **BLoC** và luôn đáp ứng cho các **Widget** kế thừa.
### 2. Cách làm việc
![](https://images.viblo.asia/59cea35b-b0f5-4b52-a5f7-f3aa175feb3b.gif)
- Dữ liệu được đưa vào một trong các **BLoC sink**.
- Dữ liệu được **BLoC** xử lý, cuối cùng sẽ phát ra kết quả thông qua một trong số các **Stream** đầu ra.
- Điều tương tự cũng có thể áp dụng khi sử dụng **BLoC API**.
# V. Kết
- Như vậy là chúng ta đã tiếp cận với các định nghĩa cơ bản của 3 framework, trong Phần 2 chúng ta sẽ đi phân tích các trường hợp cụ thể để lựa chọn 1 trong 3 framework này.