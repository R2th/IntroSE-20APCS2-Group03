Cá nhân mình, và mình tin là còn rất nhiều người đã từng phân vân các khái niệm URI, URL và URN. Nhân tiện tìm hiểu về chúng, mình có viết lại theo ý hiểu của mình để làm tài liệu tra cứu sau này cũng như giúp các bạn phần nào hiểu được sự khác nhau của chúng.

#  URI
![](https://images.viblo.asia/4c13886d-0f9c-43ef-b35a-6c3de050b843.png)

URI là viết tắt của Uniform Resource Identifier . Nó dùng để xác định tài tài nguyên bởi chính xác nơi lấy nó hoặc tên của nó, và tất nhiên là có thể bằng cả hai. Tài nguyên, hay chính xác hơn với trường hợp này là tài nguyên trên mạng, nó có thể là tập tin nhạc, ảnh, văn bản, css … Ví dụ :

1. https://www.sample.com.vn/logo.jpg
2. https://www.sample.com/logo.ico
3. https://www.sample.com/logo.png
4. ftp://sample/files/document.doc
5. https://www.sample.com
6. urn:isbn:978-0132350884

Như bạn có thể thấy, URL có thể không cần chỉ đích xác tới tập tin hay định dạng nào, ví dụ như URI thứ 5. Nội dung nhận được khi request sẽ do web server quyết định và trả về tài nguyên thích hợp. Cái đó là Content negotiation, về cơ bản nó là cơ chế có thể phục vụ nhiêu phiên bản của tài nguyên trên cùng một URI ( Ví dụ như điện thoại sẽ nhận được file .jpg, còn máy tính sẽ nhận được .png mặc dù request chung một URI ).

Vấn đề nữa là như URI thứ 6. Mặc định bạn sẽ không thể dùng trình duyệt trực tiếp request nội dung từ nó được, tuy nhiên nó vẫn là định danh duy nhất cho một tài nguyên trên mạng, nên sẽ luôn có service riêng để chuyển nó thành cái mà trình duyệt có thể request được.

Vì vậy ta có thể thấy URI không thống nhất và chia ra các cách khác nhau để khai báo sự tồn tại của tài nguyên. Từ đây chia là 2 nhánh là URL và URN.

# URL
![](https://images.viblo.asia/7f26a3b7-d463-4df7-89ec-3d7b51e77627.png)

URL ( Uniform Resource Locator ). Nó là một dạng của URI, nó sẽ thể hiện chính xác cách ta có thể lấy tài nguyên về. URL sẽ bao gồm giao thức và domain name cũng như path tới tài nguyên nó thể hiện. Như ví dụ trên, URL sẽ là từ cái thứ 1 tới 5, cái mà ta có thể nhận ra được giao thức cũng như path tới tài nguyên và request trực tiếp luôn được. Như có nhắc bên trên, URL là một dạng của URI, nên tất cả URL có thể gọi là URI, tuy nhiên sẽ không có chiều ngược lại, vì URI còn có một dạng khác nữa, là URN.

# URN
URN ( Uniform Resource Name ) . Vâng, chắc chắn là là một dạng của URI rồi, nó khác URL ở chỗ nó sẽ không chỉ cho ta chính xác sử dụng giao thức hay cách nào để lấy tài nguyên, thay vì đó nó sẽ cung cấp cho ta định danh của tài nguyên này trên mạng, định danh này sẽ là duy nhất theo thời gian, hay nói cách khác là nếu không có biến động lớn, nó sẽ là duy nhất ở bất cứ thời điểm nào. URI thứ 6 ở ví dụ trên là một URN. Tất nhiên, mọi URN sẽ có thể gọi là URI, và không có chiều ngược lại.

# Ví dụ
Để dễ hình dung hơn, ta có thể ví dụ về cuốn sách Clean Code được bán trên Amazon. Ta sẽ có URL ( Hoặc URI ) là : https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882

Và URN ( Hoặc URI ) là : urn:isbn:0132350882

Về URL bạn có thể thấy khá quen thuộc, còn với URN thì sẽ lạ lẫm, vậy nên bạn có thể tham khảo thêm trên wiki để hiểu chính xác khái niệm này hơn, cũng như xem nhiều ví dụ hữu ích. https://en.wikipedia.org/wiki/Uniform_Resource_Name