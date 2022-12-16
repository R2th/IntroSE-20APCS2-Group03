### Mở đầu 
Flutter đang là một công nghệ mới ngày càng trở nên được biết nhiều trong cộng đồng mobile developers. Và nó cũng gây nên sự hiếu kỳ từ tôi :v: .

### Sơ qua về Flutter 
Flutter là 1 mã nguồn mở được tạo bởi Google. Nó được sử dụng cho việc tạo native app cho cả Android và iOS. Flutter sử dụng Dart làm ngôn ngữ lập trình. 

### Ưu điểm 

  ***Góc độ doanh nghiệp***
  
Chúng ta có thể tạo ra 1 ứng dụng Android và iOS chỉ với duy nhất 1 team.


Bên cạnh đó, Flutter widgets tương thích cho cả 2 nền tảng. 


***Góc độ developer***


Điều cần được nhắc đến là tính năng hot reload. Chúng ta có thể nhìn thấy ngay những thay đổi khi chúng ta thay đổi UI. 

Ngoài ra, bạn có thể sử dụng nó để phát triển thêm các ứng dụng Android hoặc iOS hiện có, được viết bằng Java, Kotlin, Swift hoặc C ++. Bên cạnh đó nếu bạn đang sử dụng Android Studio hay intellij, Flutter SDK  có thể dễ dàng cài đặt trên nó.

Không thể quên nhắc đến animations trong Flutter. Chúng không những được tối ưu 60fps mà còn dễ dàng trong việc khởi tạo. 

Không có gì đáng ngạc nhiên khi ngày càng có nhiều công ty thêm Flutter vào ngăn xếp của họ và danh sách các ứng dụng Flutter đang tăng nhanh. Điều này bao gồm các ứng dụng như Alibaba, Google AdWords, App Tree và hơn thế nữa.

### Widgets and their types

Có 2 loại widgets

1. Stateless chẳng hạn như: Text, RaisedButton, Icon Padding, AssetImage.  Nó không chấp nhận sự thay đổi bên trong nó. Còn đối với sự thay đổi từ bên ngoài (widget cha) thì nó sẽ thụ động thay đổi theo.


2. Stateful chẳng hạn như: Animatable, Scrollable, Image, Form, Checkbox. Các widgets này là động và state của chúng có thể thay đổi. Khi điều đó xảy ra setState được gọi và widget sẽ được rebuild. 


### MVVM 
Trong Flutter, rất dễ gặp phải tình huống chúng ta có các khung nhìn quá phức tạp chứa cả logic kinh doanh và logic liên quan đến khung nhìn. Để tránh điều này, chúng tôi đã quyết định tận dụng mô hình kiến trúc MVVM.

Trong MVVM, các views chỉ chịu trách nhiệm hiển thị dữ liệu và thông báo cho View Model về bất kỳ tương tác nào của người dùng với nó. Trong thực tế, nó đi xuống để xem các mô hình quản lý trạng thái ứng dụng và các views hoạt động theo các trạng thái đó.
Ngoài ra, một View Model chịu trách nhiệm phản ứng với các tương tác của người dùng với view và tạo dữ liệu mà chế độ xem có thể đăng ký.