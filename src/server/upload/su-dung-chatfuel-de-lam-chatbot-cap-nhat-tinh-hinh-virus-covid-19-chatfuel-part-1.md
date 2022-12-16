Chào tất cả mọi người,
Chắc mọi người cũng đã nge qua hoặc biết đến Chatfuel tại địa chỉ chatfuel.com rồi đúng không. Nhân tiện những ngày cách ly, mình xin chia sẻ với mọi người cách tạo chatbot cập nhật tình hình dịch Covid-19 nhé.

Đầu tiên, để sử dụng chatbot thì bạn phải có fanpage trên Facebook. Nếu bạn nào có rồi thì hãy bỏ qua phần này, còn bạn nào chưa có thì hãy tạo cho mình một page trước khi bắt đầu nhé. Cách tạo page trên facebook cũng khá là đơn giản, các bạn có thể tham khảo tại [đây](https://quantrimang.com/huong-dan-tao-fanpage-facebook-nhanh-chong-117005) 

Vì chúng ta sử dụng fanpage nên không nhất thiết phải có like, cứ tạo để kết nối với chatfuel đã nhé.
Sau khi chúng ta tạo page xong, các bạn vào link: https://chatfuel.com/ rồi bấm vào nút Get started for free để kết nối với Facebook nhé.
Khi login và kết nối tới page, chúng ta sẽ vào trang quản lý như này. 
![](https://images.viblo.asia/142857bd-ba04-49d3-869b-c1e0d5b7db77.jpg)

Chọn tới chatbot mà chúng ta đã kết nối, vào đó để chúng ta thiết lập những thuộc tính để bot trả về kết qua khi người dùng gửi tin nhắn.

Nhìn sang bên trái, chúng ta sẽ thấy các menu, đầu tiên để thiết lập tự động trả lời, chúng ta vào menu **Automate**
Ở mục Add Block Here, chúng ta nhấn vào dấu (+) để thêm block, đặt tên bất kỳ nhé, ở đây mình đặt là corona :D

Trong block này, chúng ta sử dụng JSON API để gọi code đã được viết sẵn nhằm trả về dữ liệu ở đây. Ở đây, chúng ta có sử dụng 1 url json để lấy dữ liệu. Bạn có thể sử dụng đường link của mình được cung cấp tại: http://codebug.website/other/corona.json

Bạn chỉ cần bỏ URL mình cung cấp ở trên vào trong URL là được nhé.
![](https://images.viblo.asia/72659dbe-b169-4f77-be27-ad487a340d1d.jpg)

hoặc bạn có hosting riêng thì hãy sử dụng đoạn code này của mình, up lên đó và sử dụng :D
Code dành cho bạn nào xài hosting: https://gist.github.com/quangpro1610/491c279c1bbc6a329dd6a68c01015fea

Đến đây thì bạn đã hoàn thành được một chút, nhưng chúng ta cần thiết lập các lệnh để bot biết mà chạy, các bạn hãy vào menu ở bên trái có mục **Set Up AI** ở trong này chúng ta có 2 phần, phần đầu là những đoạn lệnh người dùng nhập, phần 2 là bot sẽ phản hồi bằng block hay đoạn text bất kỳ nào.

Đơn giản chúng ta sẽ thiết lập như sau, xem hình ảnh nhé :D
![](https://images.viblo.asia/ae547636-ba52-416a-9522-12c2d98e1171.jpg)
Nhìn ảnh các bạn sẽ hiểu ra là ô bên trái sẽ bao gồm những lệnh mà khi người dùng gửi tin nhắn cho page thì bot sẽ hiểu là chạy block corona( cái block mà chúng ta thiết lập json đó) thì tin nhắn sẽ được gửi lại người dùng thông qua block này.

Sau cùng sau khi thiết lập xong, chúng ta hãy test thử và sẽ có kết quả như thế này là xong :D
![](https://images.viblo.asia/3a1d44de-ffa8-46c2-9613-77ac32dd2eeb.jpg)