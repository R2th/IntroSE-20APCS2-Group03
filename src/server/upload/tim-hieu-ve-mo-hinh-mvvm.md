### Giới thiệu

![](https://images.viblo.asia/d626d27e-7850-43d9-9377-ff5ccbef772c.png)


  Kể từ khi Microsoft giới thiệu hai nền tảng phát triển ứng dụng mới là WPF và Silverlight, đã có nhiều thay đổi trong việc xử lý sự kiện và binding dữ liệu, giữa các tầng của ứng dụng với nhau. Qua đó, hầu hết các công việc của tầng kết hợp với lớp presentation. Điều này làm nảy sinh ra nhu cầu phải có một mô hình phát triển ứng dụng mới phù hợp hơn. Và do đó, Model – View – ViewModel (MVVM) pattern ra đời và ngày càng trở nên phổ biến.


Đa số các ứng dụng thuộc bất kì nền tảng nào cũng có thể chia thành hai phần: giao diện (View) và dữ liệu (Model). Vì việc tách riêng các phần này, cần phải có một phần trung gian nào đó nối kết hai phần này lại, và chúng tạo nên một mô hình (pattern).

Quen thuộc và phổ biến nhất với chúng ta là mô hình MVC (Model – View – Controller) . Có thể nói MVC là một mô hình tiêu chuẩn bởi sự logic và hợp lý của nó. Điều này làm cho việc xuất hiện một mô hình phát triển ứng dụng mới có thể khiến bạn bỡ ngỡ.

Trước khi tìm hiểu về mô hình MVVM này, ta cùng điểm qua một số tính năng mới trong xu hướng phát triển ứng dụng hiện nay.

### Data Binding
Binding Data trong MVVM là điều không bắt buộc, một số implement chỉ đơn giản làm ViewModel như một lớp trung gian giữa Model-View, lớp này giữ nhiệm vụ format data hoặc mapping trạng thái của View. Tuy nhiên cách này theo mình khiến cho ViewModel trở thành Presenter và đưa kiến trúc này về MVP.

### MVVM được hiểu như thế nào?

**View**: Tương tự như trong mô hình MVC, View là phần giao diện của ứng dụng để hiển thị dữ liệu và nhận tương tác của người dùng. Một điểm khác biệt so với các ứng dụng truyền thống là View trong mô hình này tích cực hơn. Nó có khả năng thực hiện các hành vi và phản hồi lại người dùng thông qua tính năng binding, command.

**Model**: Cũng tương tự như trong mô hình MVC. Model là các đối tượng giúp truy xuất và thao tác trên dữ liệu thực sự.

**ViewModel**: Lớp trung gian giữa View và Model. ViewModel có thể được xem là thành phần thay thế cho Controller trong mô hình MVC. Nó chứa các mã lệnh cần thiết để thực hiện data binding, command.  

Một điểm cần lưu ý là trong mô hình MVVM, các tầng bên dưới sẽ không biết được các thông tin gì về tầng bên trên nó. Như hình minh họa dưới đây:

![](https://images.viblo.asia/52a8cf0b-b5fb-457b-967f-ce406975b2d0.png)

### Kết Luận

MVVM có thể nói là mô hình kiến trúc được rất nhiều các cư dân trong cộng đồng ưa chuộng. Điểm tinh hoa của kiến trúc này là ở ViewModel, mặc dù rất giống với Presenter trong MVP tuy nhiên có 2 điều làm nên tên tuổi của kiến trúc này đó là:

ViewModel không hề biết gì về View, một ViewModel có thể được sử dụng cho nhiều View (one-to-many).
ViewModel sử dụng Observer design pattern để liên lạc với View (thường được gọi là binding data, có thể là 1 chiều hoặc 2 chiều tùy nhu cầu ứng dụng). Chính đặc điểm này MVVM thường được phối hợp với các thư viện hỗ trợ Reactive Programming hay Event/Data Stream, đây là triết lý lập trình hiện đại và hiệu quả phát triển rất mạnh trong những năm gần đây.

##### _Nguồn:_
[https://msdn.microsoft.com/en-us/library/hh848246.aspx)
[https://www.tutorialspoint.com/mvvm/index.htm)