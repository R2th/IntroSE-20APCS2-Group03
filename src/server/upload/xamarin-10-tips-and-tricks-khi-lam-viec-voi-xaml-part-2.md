Khi sử dụng Xamarin Form đôi khi có những đoạn code mà chúng ta phải code tay , rườm rà bởi vì có lẽ chúng ta không biết rằng nó có thể được thực hiện ngay với XAML .

Dưới đây là 10 điều mà có lẽ bạn đã không biết khi làm việc với XAML :

**6-Use Converters**

Bạn sử dụng trình chuyển đổi để sửa đổi kết quả của một thuộc tính theo một giá trị
Ví dụ :

Tôi muốn sửa đổi Height của danh sách theo số lượng phần tử. Để đạt được điều này sẽ tạo ra một trình chuyển đổi mới sẽ nhận được danh sách và kích thước cho mỗi ô và sẽ trả lại cho tôi Height mới.

Hãy cùng tôi thực hiện từng bước:

1 . Create the converter
![](https://images.viblo.asia/2c66d04c-9a2b-47b2-866e-84516403faa1.png)

2 . Add the converter reference

![](https://images.viblo.asia/40198a8a-5ee4-4cae-a6d2-fa0cc2e08f42.png)

3 . Use it

![](https://images.viblo.asia/62eb7e7f-567e-4229-8411-9942156750a5.png)

Như bạn có thể thấy ở đây, để sử dụng nó, tôi chỉ cần thêm **Converter=”{StaticResource NameOfTheConverter}** và để thêm một tham số phụ **ConvererParameter=”Parameter”**.

**7-Use DataTriggers**

Đôi khi chúng ta cần phải thay đổi diện mạo của một control theo một giá trị cụ thể. Để đạt được điều đó, chúng ta có thể sử dụng DataTriggers bằng cách sử dụng DataBinding, nó cho phép bạn cập nhật một thuộc tính hoặc nhiều thuộc tính theo giá trị ràng buộc.

Nhìn vào đoạn code dưới đây :
Chúng ta có một thuộc tính IsReadOnly trong ViewMode và theo dõi giá trị của nó, chúng ta muốn thay đổi TextColor của một Label.

![](https://images.viblo.asia/763e9822-f585-4d5d-90e9-ff6df94cae66.png)

XAML :

![](https://images.viblo.asia/284fbb61-9f24-4d1b-bff2-21590f06f083.png)

Ngoài ra, có nhiều kiểu Triggers như PropertyTrigger, EventTrigger và MultiTrigger mà bạn có thể sử dụng . Để biết thêm thông tin, hãy kiểm tra [Tài liệu Xamarin về Triggers](https://developer.xamarin.com/guides/xamarin-forms/application-fundamentals/triggers/).

**8-Use String Format**

Trong XAML, bạn có thể sử dụng StringFormat, điều này thực sự hữu ích khi bạn muốn thay đổi định dạng hiển thị của binding value .

Ví dụ: tôi có một thuộc tính trong ViewModel của mình được gọi là Title và trong XAML, tôi muốn hiển thị thuộc tính + text “Favorites . thay vì có 2 Label với hướng nằm ngang, tôi sẽ làm điều đó bằng cách sử dụng StringFormat.

![](https://images.viblo.asia/14e7f175-608d-4f99-b4da-13b986de3fb2.png)

Ngoài ra, bạn có thể sử dụng nó để format DateTime, Time hoặc Number .

![](https://images.viblo.asia/c1a61e61-ad82-454b-8ada-97887ecf5249.png)

**9-Add general styles to your controls**

Nếu bạn muốn tạo kiểu chung có thể áp dụng cho tất cả các control trong ứng dụng của bạn. Ví dụ: nếu tất cả các Label của bạn có kiểu in đậm, bạn không phải thêm thuộc tính "Bold" vào mỗi Label, bạn có thể sử dụng kiểu toàn cục .

Bạn chỉ cần thêm một kiểu mới cho loại control và thêm các thuộc tính bạn muốn sửa đổi trong class App.xaml .

Ví dụ :

![](https://images.viblo.asia/05f8a2b0-8eb1-474a-b9c3-3a536da9e0d5.png)

**10-Use Attached Properties**

Các thuộc tính tĩnh được đính kèm mà chúng tôi sử dụng trong code cũng có thể được sử dụng trong XAML. Ví dụ: nếu chúng tôi muốn ẩn NavigationBar của một page cụ thể, thông thường trong code  chúng tôi sẽ làm như thế này:

![](https://images.viblo.asia/696ecc2b-7e67-417c-aee9-d7af53af7559.png)

Và trong XAML :

![](https://images.viblo.asia/2f76cd7d-1b2b-4228-a2cd-449bcdb65b84.png)

Ở loạt bài này mình đã giúp các bạn biết thêm 1 số tips & tricks trong Xamarin . Nếu các bạn chưa xem phần 1 có thể click vào [đây](https://viblo.asia/p/xamarin-10-tips-and-tricks-khi-lam-viec-voi-xaml-part-1-RQqKL2nNl7z) 

Cảm ơn bạn đã theo dõi bài viết của tôi !