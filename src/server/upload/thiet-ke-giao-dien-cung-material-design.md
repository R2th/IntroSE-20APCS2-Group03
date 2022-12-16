Google's Material Design được ra mắt cách đây 5 năm và vẫn đang tiếp tục được phổ biến rộng rãi trong các ứng dụng Android. SystemUI của android tuân thủ các nguyên tắc thiết kế của Google's Material Design, cũng như hầu hết các ứng dụng phổ biến hiện nay có trên Google Play.
Mặc dù Material Design có trang hướng dẫn cách sử dụng chúng rất cụ thể và dễ hiểu, nhưng việc triển khai chúng một cách chính xác bằng Android SDK và AndroidX đòi hỏi rất nhiều  thời gian coding và testing, chủ yếu vì bạn cần hỗ trợ mật độ pixel, kích thước màn hình, định hướng thiết bị và phiên bản Android. Tuy nhiên, bằng cách sử dụng MaterialX, bạn có thể tiết kiệm tất cả thời gian và công sức đó.

Được phát triển bởi Envato Elite, tác giả Dream Space, MaterialX là thư viện cung cấp các thành phần giao diện cao cấp có sẵn trên CodeCanyon. Ngoài các thành phần UI cơ bản như nút, thẻ và thanh trượt, nó cung cấp hàng trăm bố cục Material Design thủ công độc đáo mà bạn có thể sử dụng trực tiếp trong ứng dụng của mình. Như vậy, trong khi làm việc với các bố cục này, bạn sẽ không phải lo lắng về các tác vụ như định vị các thành phần UI, điều chỉnh lề và phần đệm của chúng hoặc thậm chí tạo hiệu ứng cho chúng.

Bây giờ chúng ta hãy cùng xem xét kỹ hơn những gì MaterialX cung cấp.

# 1. Navigation Components
 Navigation Components cung cấp một giao diện hấp dẫn cho phép người dùng di chuyển từ màn hình này sang màn hình khác một cách uyển chuyển. Material design liệt kê một số thành phần bạn có thể sử dụng để xây dựng giao diện như vậy và MaterialX có các triển khai cho tất cả chúng.

Thành phần phổ biến nhất hiện nay là thanh điều hướng phía dưới (Bottom navigation). MaterialX hiện cung cấp tám thanh điều hướng phía dưới đẹp mắt cho bạn lựa chọn. Đây là hai thanh như vậy:
![](https://images.viblo.asia/25a1ce6f-f435-4fd1-a1ed-4f56421b27a6.jpg)

Nếu bạn thích sử dụng ngăn kéo trượt thay vào đó, mẫu này cung cấp cho bạn một số tùy chọn, tất cả đều hướng đến các loại ứng dụng khác nhau. Ví dụ: nếu bạn đang xây dựng một ứng dụng tin tức, bạn có thể sử dụng thành phần Ngăn kéo Tin tức. Tương tự, nếu bạn đang tạo một ứng dụng liên quan đến thư, bạn có thể sử dụng thành phần Ngăn kéo Thư.
![](https://images.viblo.asia/ff4540f6-2ac7-4700-a635-743ba3be9ccc.jpg)

Các tab, thường bổ sung cho các thanh ứng dụng phía trên, cũng được sử dụng rộng rãi trong các ứng dụng Android. MaterialX có nhiều chế độ xem tab, trông đẹp mắt trong cả chủ đề sáng và tối. Tất cả chúng đều hỗ trợ cử chỉ vuốt ngang.
![](https://images.viblo.asia/1b80575d-084c-4bdb-8d69-11d2dbba77e9.jpg)

# 2. Lists and Grids
Danh sách là một phần không thể thiếu của các ứng dụng Android và một danh sách được thiết kế tốt có thể cải thiện đáng kể trải nghiệm người dùng của ứng dụng của bạn. MaterialX cung cấp gần một chục loại danh sách khác nhau, bao gồm các danh sách phân đoạn, hoạt hình và nhiều lựa chọn. Nó cũng cung cấp một vài danh sách dành riêng cho ứng dụng, chẳng hạn như danh sách cho các ứng dụng tin tức.
![](https://images.viblo.asia/b60dd603-f031-46db-88be-43c5f63c71b1.jpg)

Tuy nhiên, nếu bạn cần hiển thị nhiều mục liên tiếp, bạn sẽ phải sử dụng một trong sáu lưới khác nhau mà Material design cung cấp. Ngoài các lưới cơ bản và phân chia thường được sử dụng, MaterialX còn có các lưới cho các ứng dụng thư viện
![](https://images.viblo.asia/a4305ed4-6001-4b2e-9597-5577f85303f0.jpg)

CardView thường được sử dụng với cả danh sách và lưới. Vì MaterialX có các mẫu thẻ để xử lý hầu hết các trường hợp sử dụng, giờ đây bạn có thể tránh phải tạo cardview của riêng mình từ đầu. Một số mẫu cardview có thể được sử dụng để tạo màn hình giới thiệu hoặc hướng dẫn.
![](https://images.viblo.asia/ae03713e-ae96-4abb-86c6-a3180fc99abe.jpg)

# 3. Forms
Tạo các form là một công việc khó khăn. Thuyết phục người dùng điền và gửi biểu mẫu còn khó hơn. May mắn thay, MaterialX cung cấp một số lượng lớn các mẫu đẹp cho các biểu mẫu mà người dùng của bạn sẽ thích điền vào.

Trong khi tạo biểu mẫu, bạn có thể tự do chọn từ các mẫu biểu mẫu chung, chẳng hạn như các mẫu cho đăng nhập và mẫu đăng ký hoặc các mẫu dành riêng cho tên miền, chẳng hạn như các mẫu cho Thương mại điện tử.

![](https://images.viblo.asia/88403a4a-ba85-4ece-94e3-b4368a48544e.jpg)

Ngoài ra, MaterialX cũng cung cấp bố cục Forms dành riêng cho các loại biểu mẫu cụ thể. Vì các bố cục hấp dẫn này đóng vai trò là các thùng chứa đầy đủ cho các biểu mẫu, bạn sẽ không phải thêm bất kỳ thành phần UI nào khác vào bố cục của mình trong khi sử dụng chúng. Hiện tại, có bố cục cho các hình thức đăng nhập, biểu mẫu xác minh số điện thoại và hình thức thanh toán.
![](https://images.viblo.asia/1b9122e7-d264-4c1c-bde6-71737c5d16fa.jpg)

# 4. Form Elements
Nếu bạn quan tâm đến việc tự tạo biểu mẫu, thay vì trực tiếp sử dụng các biểu mẫu mặc định của Android, bạn có thể thử sử dụng các thành phần có sẵn mà MaterialX cung cấp. Chúng thường đẹp hơn và cung cấp trải nghiệm người dùng thú vị hơn.

Mẫu có nhiều nút, bộ chọn và thanh trượt, như bạn có thể thấy trong ảnh chụp màn hình bên dưới:
![](https://images.viblo.asia/b56b98b8-fe88-449f-89e4-6cca0e90fa6a.jpg)

# 5. Dashboards
Bảng điều khiển trực quan hiển thị nhiều dữ liệu tùy chọn theo ngữ cảnh và kịp thời có thể là màn hình chính lý tưởng cho nhiều loại ứng dụng, chẳng hạn như ứng dụng thể dục, ứng dụng du lịch và ứng dụng liên quan đến tiền điện tử. MaterialX hiện có 11 bảng điều khiển, mỗi bảng nhắm đến các mục tiêu khác nhau. Ví dụ: đây là hai bố cục bảng điều khiển, một cho ứng dụng Thương mại điện tử và một cho ứng dụng du lịch:
![](https://images.viblo.asia/fae7596e-3442-423c-928c-b16d86539da9.jpg)

# 6. Social Screens
Thêm các tính năng đơn giản vào ứng dụng của bạn là một cách tuyệt vời để cải thiện khả năng giữ chân người dùng. Thông thường, tất cả những gì bạn cần làm là cho phép người dùng của bạn tạo hồ sơ cho chính họ và chia sẻ nội dung với bạn bè hoặc người theo dõi. MaterialX có hàng tá các thành phần có thể giúp bạn tiết kiệm thời gian trong khi thực hiện cả hai tính năng này.

Mẫu này có gần hai chục bố cục cho các trang hồ sơ, mỗi trang có một giao diện độc đáo. Mặc dù một số là chung chung, hầu hết được thiết kế để nhắm mục tiêu các nhóm người dùng nhất định, chẳng hạn như nhiếp ảnh gia, dịch giả tự do và người tìm việc.
![](https://images.viblo.asia/df510fd8-ec57-4c96-b46c-d0f00bcb23a5.jpg)

Ngoài ra, MaterialX có bố cục để hiển thị nguồn cấp dữ liệu và thời gian của người dùng. Nếu bạn đang cố gắng thực hiện chức năng giống như Twitter trong ứng dụng của mình, bạn sẽ thấy những bố cục này cực kỳ hữu ích.
![](https://images.viblo.asia/c89bb670-4e74-41ea-924a-49536f691690.jpg)

Cuối cùng, nếu bạn muốn cho phép người dùng giao tiếp với nhau hoặc với nhóm của bạn trong thời gian thực, MaterialX cung cấp bố cục rất giống với những gì bạn thấy trong các ứng dụng như WhatsApp và Telegram.
# 7. Screens for Blogs
Bạn đã có một blog WordPress chưa? Với MaterialX, bạn có thể tạo một ứng dụng Android cho nó dễ dàng.

Material design có nhiều bố cục bạn có thể sử dụng để hiển thị bài viết của mình. Những bố cục dễ chịu này có thể kết xuất trơn tru cả văn bản và hình ảnh
![](https://images.viblo.asia/9781983d-4e44-4994-83a8-65d61016bffb.jpg)

Ngoài ra, có nhiều bố cục cho các trang "about us" mà bạn có thể sử dụng để nói về bản thân hoặc công ty của mình và các trang "tìm kiếm" mà bạn có thể sử dụng trong khi thêm chức năng tìm kiếm vào ứng dụng của mình.
![](https://images.viblo.asia/816aca8a-76aa-4678-86d4-c69376ff33c1.jpg)

Vì blog ngày nay không giới hạn chỉ có văn bản và hình ảnh mà còn có thêm video, MaterialX cũng có bố cục để xử lý nội dung âm thanh và video. Mẫu có hai bố cục cho trình phát video và một số cho trình phát âm thanh, hỗ trợ cả tệp âm thanh và danh sách phát độc lập.
# Conclusion
Tham khảo : https://code.tutsplus.com/articles/jumpstart-your-android-app-ui-with-a-material-design-template--cms-33937