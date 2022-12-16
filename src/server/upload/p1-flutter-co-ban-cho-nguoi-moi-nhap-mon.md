Dạo gần đây mình nhận thấy Flutter ngày càng phổ biển và có khá nhiều bạn gặp khó khăn khi lần đầu tiếp cận và làm quen nó. Thì để giúp các bạn cảm thấy dễ dàng hơn thì mình sẽ “chia sẻ” lại kinh nghiệm và hiểu biết của mình về Flutter. Vì sao lại là “chia sẻ” mà không  phải là những từ ngữ khác ? Vì mình khá non trong Flutter mới tầm khoản 1 năm kinh nghiệm về nó nên kiến thức cọn hạn hẹp. Rồi bây giờ chúng ta hãy đi vào chủ đề chính hôm nay.

### **1. Flutter là gì? Vì sao nên dùng Flutter?**
- Flutter là 1 nền tảng (Framework) giúp chúng ta tạo ra 1 ứng dụng chạy được trên nền tảng (Platform) khác nhau như Web, Android, IOS
- Flutter sử dụng ngôn ngữ Dart, được phát triển và hỗ trợ bởi Google
- Với Flutter chúng ta sẽ code 1 mà được hơn 1. Vì sao mình nói như vậy? Là vì với 1 cục code mà các bạn code ra nó sẽ chạy được trên cả Android và IOS và Web.
   + Mình sẽ nói thêm ở phần này là đôi khi ở 1 số chức năng nhất định các bạn phải câu hình riêng cho từng thằng thì nó mới chạy. Vd như đăng nhập thông qua Firebase thì muốn dùng thằng nào bạn phải cấu hình cho thằng đó.

### **2. Cấu trúc project Flutter**

Ngay sau khi tạo project, thì đây sẽ là cấu trúc của 1 project Flutter:

![](https://images.viblo.asia/05fd242b-19ca-409d-a821-204a8f96c531.png)

Nhìn vào thầy bạn cũng có thể thấy ở đây có nhiều file khác nhau. Nhưng các bạn mới tìm hiểu thì chỉ cần tìm hiểu về các thư mục này thôi:

- **android và ios**:  
  + 2 thư mục này chứa nguồn (Source) của từng nền tảng (Platform). Nói nom na là khi bạn build 1 project Flutter thì khi đó code Flutter sẽ được biên dịch thành code gốc để tương thích với từng nền tảng (Platform).
  + Đôi khi có những tính năng mà mà Flutter không hỗ trợ thì bạn sẽ vào thư mục của từng nền tẳng để cấu hình . Vẫn là ví dụ cũ là Login Google thông qua Firebase thì bạn sẽ phải cài 1 file cấu hình của Firebase vào từng nền tảng (Platform) để thực hiện.
 
- **lib**: đây sẽ là thư mục nơi mà chúng ta tạo ra các file .dart để code
- **pubspec.yaml**: tệp này chứa tên, mô tả, phiên bản của project, dùng để khai báo hình ảnh, font chữ và đặc biệt là nơi thêm các thư viện hỗ trợ. (Nơi phổ biến để lấy thư viện hỗ trợ https://pub.dev)


### **3. Làm quen code**

Trước khi vào làm quen với code thì mình nói cho bạn 1 số thứ để bạn có cái nhìn cơ bản trước khi nhìn vào code ^_^:
- **Widget**: theo định nghĩa nó là những khối cỏ bản dùng để xây dựng và tái sử dụng. Nói nom na đa số mọi thứ thứ trong Flutter đều là Widget. Flutter là thế giới của những Widget.
- **StatelessWidget** hiểu nôm na là **Widget tĩnh** và nó không thể tự thay đổi được những gì mà nó hiển thị sau khi đã được **Render** xong.
  + VD: Bạn không thể thay khổi dòng chữ Hello khi nhấn vào button 

| Demo | Code |
| -------- | -------- |
|  ![stateless.gif](https://images.viblo.asia/659d6c2d-c9f5-4a64-8493-b0d52e54a612.gif)     |  ![image.png](https://images.viblo.asia/7243a32b-9fa7-43fe-995b-88a39bf49371.png)     |

+ **StatefulWidget** là 1 **Widget động** và nó có thể thay đổi những gì đang hiển thị bằng cách thay đổi **State** của chính nó.
  - VD: Bạn thay khổi dòng chữ Hello thành GoodBye khi nhấn vào button


| Demo | Code |
| -------- | -------- |
| ![stateful.gif](https://images.viblo.asia/8b97c597-e864-4da3-8f1c-63d10b28acee.gif)  | ![image.png](https://images.viblo.asia/f36264e3-a01c-42b2-a3b7-06fa63f9607d.png)     |

Thì mình sẽ nói sơ qua về các hàm và widget trong code:

+ Khi chạy app thì **runApp()** sẽ được gọi và khi đó **Widget** bên trong **runApp()** sẽ là thư mục **root** của **widget tree**
+ **MaterialApp**: có thuộc tính **home** để chỉ định giao diện trang chính của app.
+ **Scaffold**: nói nôm na nó như 1 cái khung ảnh vậy bạn có thể thêm các yếu tố thiết kế **widget** phổ biến như AppBars, Drawers, Floating Action Buttons, Bottom Navigation…

![image.png](https://images.viblo.asia/5cb12616-b12c-4f32-92a9-b8c54227a6f4.png)

+ **mainAxisAlignment** và **crossAxisAlignment** (Hiện tại trong code mình dùng Column

![image.png](https://images.viblo.asia/8861b978-46ad-4e3a-8731-df307e631fcf.png)

### **Kết thúc**

Đây chỉ là kinh nghiệm và kiến thức tự học hỏi của bản thân mình nếu có sai sót gì các bạn cứ comment vào bình luận để chúng ta cùng nhau học hỏi và phát triển thêm. ^-^

Trong phần sau mình sẽ nói rõ hơn về code và sẽ có nhiều demo mẫu hơn. Cảm ơn các bạn đã đọc.

**Phần 2: Mình nói về vòng đời  của StatefulWidget và StatelessWidget** https://viblo.asia/p/p2-flutter-co-ban-cho-nguoi-moi-nhap-mon-Do7543kXlM6