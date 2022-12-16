Khi sử dụng Xamarin Form đôi khi có những đoạn code mà chúng ta phải code tay , rườm rà bởi vì có lẽ chúng ta không biết rằng nó có thể được thực hiện ngay với XAML .

Dưới đây là 10 điều mà có lẽ bạn đã không biết khi làm việc với XAML :

**1-Passing Constructor Arguments** 

Các đối số có thể được truyền tới hàm tạo non-default bằng việc sử dụng thuộc tính  x:Argument . Điều này thực sự hữu ích khi bạn custom một view trong XAML và truyền tham số cho nó .
Ví dụ  hãy tạo 1 view mới , về cơ bản sẽ nhận được một năm và sẽ hiển thị năm đó trong Label :

![](https://images.viblo.asia/685463d4-f139-4f76-9fdc-8824ec8b0d18.png)

Nếu chúng ta muốn thêm view xem bên ngoài này và truyền tham số bằng XAML, bạn chỉ cần thực hiện việc này :

![](https://images.viblo.asia/3b63df06-340b-4fcc-af26-12e663e5c3b3.png)

Như bạn có thể thấy ở đây, tôi đã sử dụng x:Arguments và sau đó truyền tham số bằng cách chỉ định kiểu. Trong trường hợp này, hàm tạo đang mong đợi một Integer, vì vậy tôi đã sử dụng x: Int32 .

Nếu bạn muốn biết làm thế nào để truyền các kiểu khác nhau, bạn có thể kiểm tra Tài liệu chính thức Xamarin trong phần [Passing Arguments in XAML](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/xaml/passing-arguments) . 

**2-Line break**  
Nhìn những đoạn code khác, tôi thường thấy rằng họ sử dụng nhiều label để thực hiện multiple lines thay vì chỉ sử dụng một dòng có line breaks . 
Ví dụ : 

UI mong muốn : ![](https://images.viblo.asia/2e60522a-6732-4cfc-9912-ab2a67d118ea.png)

![](https://images.viblo.asia/47c866fe-8b3a-4a69-8be4-c5e2db74833f.png)

Một cách tốt hơn để làm điều đó là bằng cách thêm line break ( &#10;) .

![](https://images.viblo.asia/099a40b1-fefc-4d81-bd50-85d142adf985.png)

**3-Create color in XAML**
Là nhà phát triển thông thường, chúng ta có nhu cầu tạo màu tùy chỉnh cho ứng dụng của mình. Ví dụ: nếu bạn muốn có hiệu ứng tối trong suốt trên view, bạn không thể sử dụng các màu được xác định trước để đạt được điều này, thay vào đó bạn phải tạo một hiệu ứng mới .

![](https://images.viblo.asia/dede801a-294a-498f-9b25-021387339920.png)

Để làm điều đó trong code, chúng ta chỉ cần tạo một màu mới trên trong file code (file có đuôi .cs) ta có thể thêm màu này vào view.

![](https://images.viblo.asia/75ef75dc-2a3b-46f3-9db8-645753b91c0f.png)
*Mỗi giá trị trong “Color” thể hiện màu sắc, độ bão hòa, độ chói và giá trị alpha*

Nhưng nếu bạn muốn làm tất cả trong XAML, chúng ta chỉ cần thêm màu và truyền tham số X:Arguments  như chúng ta đã học trước đó, cũng chỉ định kiểu phương thức để tạo màu (FromRGB, FromHex, FromHsla).

![](https://images.viblo.asia/232f3ce3-9659-4654-a6ea-930d4f91ceb7.png)

Ngoài ra nếu bạn muốn tạo các màu đó trên toàn cục, bạn có thể thực hiện trong file App.xaml bằng cách chỉ định một key để sử dụng nó :

![](https://images.viblo.asia/35c6290c-1766-48cc-be1d-0e5931612b84.png)

**4-The power of x:Reference**
Đây chắc chắn là một trong những điều yêu thích của tôi trong XAML, bằng cách sử dụng x: Reference bạn có thể liên kết các thuộc tính của hai view trên cùng một page. Có rất nhiều trường hợp sử dụng mà chúng ta có thể sử dụng . Ví dụ :  

1-Nếu chúng ta đang sử dụng ListView, bạn biết rằng BindingContext bên trong ViewCell, là item của List, nhưng điều gì xảy ra nếu tôi muốn thay đổi một thuộc tính cụ thể theo ViewModel .

![](https://images.viblo.asia/c409a9b5-01cc-4711-bfbf-b780e2b88664.png)

Như bạn có thể thấy ở đây trong ViewModel của tôi, tôi có một thuộc tính là “IsEnable”, nếu thuộc tính đó bằng true thì tôi sẽ hiển thị icon “Delete” trong mỗi cell .

![](https://images.viblo.asia/0f7c75c4-66fe-4427-8f8c-6c4291f81867.png)

BindingContext của trang của tôi là ViewModel, vì vậy, những gì tôi sẽ làm là :

1-Thêm x: Name vào layout chính của trang được set tới ViewModel. (Vì tôi muốn sử dụng BindingContext đó) 

2-Thêm icon trong ViewCell và sử dụng thuộc tính BindingContext thiết lập nó tới BindingContext của x: Name đã thêm trước đó .

![](https://images.viblo.asia/28eabc27-bd8f-4151-bfc7-ea4ee606fe66.png)

Như bạn có thể thấy cú pháp cho việc này thực sự dễ dàng, bạn sử dụng thuộc tính Source=”{x:Reference x:nameOfTheElemeent} để chỉ định thuộc tính bạn muốn được tham chiếu. Sử dụng thuộc tính Path nếu bạn muốn sử dụng một thuộc tính cụ thể của phần tử đó, không phải toàn bộ phần tử .

Ngoài ra nếu bạn không muốn sử dụng thuộc tính BindingContext, bạn có thể sử dụng bất kỳ thuộc tính nào. 
Ví dụ: nếu bạn muốn thực thi một lệnh trong ViewModel từ ViewCell.	

![](https://images.viblo.asia/33d25641-f3e3-435a-827c-b3be54a5cb02.png)

**5-Add Emoticons**

![](https://images.viblo.asia/f46d05e2-c1e8-4bce-bfbe-ad8f05f8a943.png)

Nếu bạn cần sử dụng Emoticons nếu chúng ta đang tạo một cuộc trò chuyện hoặc chỉ để thêm một số biểu tượng vui vào ứng dụng của chúng ta. Chúng ta chỉ cần sử dụng code của emotions và thêm nó vào Label.
Ví dụ : 

![](https://images.viblo.asia/cb82a1b5-3823-4990-8ffa-72550fb58fbd.png)

Nếu bạn muốn Unicode của mỗi emoticon, bạn có thể lấy nó ở đây : http://www.charbase.com/block/emoticons . 

Còn nữa ... 

Ở bài viết này mình xin dừng lại ở 5 Tips and Tricks ,và còn 5 Tips and Tricks  mình muốn chia sẻ với các bạn ở bài viết tiếp theo , hứa hẹn sẽ giúp ích cho bạn rất nhiều khi làm việc với XAML trong Xamarin 

Hẹn gặp lại các bạn ở Part 2 nhé <3