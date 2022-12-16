1 Hãy suy nghĩ kỹ trước khi thêm bất kỳ thư viện bên thứ ba nào

2 Nếu người dùng không thể nhìn thấy layout, thì đừng vẽ nó.
https://riggaroo.co.za/optimizing-layouts-in-android-reducing-overdraw

3 Đừng sử dụng cơ sở dữ liệu trừ khi bạn thực sự cần;

4 Đánh dấu đếm phương thức 65k sẽ diễn ra nhanh chóng, ý tôi là rất nhanh! Và multidexing có thể cứu bạn;

5 RxJava là sự thay thế tốt nhất cho AsyncT task và hơn thế nữa.

6 Retrofit là thư viện mạng tốt nhất hiện có.

7 Rút ngắn mã của bạn với Retrolambda.

8 Kết hợp RxJava với Retrofit và Retrolambda để đạt được hiệu quả tối đa.

9 Tôi sử dụng EventBus và nó rất tuyệt, nhưng tôi không sử dụng nó quá nhiều vì codebase sẽ trở nên rất lộn xộn.

10 Đóng gói theo tính năng, không phải layers
https://medium.com/the-engineering-team/package-by-features-not-layers-2d076df1964d

11 Chuyển mọi thứ ra khỏi application thread.

12 Phân tích các View của bạn để giúp bạn tối ưu hóa bố cục và phân cấp layout để bạn có thể xác định các View dư thừa có thể bị xóa.

13 Nếu bạn sử dụng gradle, hãy tăng tốc bằng mọi cách bạn có thể;
https://medium.com/the-engineering-team/speeding-up-gradle-builds-619c442113cb

14 Làm profile reports về các bản build của bạn để xem những gì đang mất thời gian build;

15 Sử dụng một kiến trúc nổi tiếng.
http://fernandocejas.com/2015/07/18/architecting-android-the-evolution/

16 Việc Test mất nhiều thời gian nhưng nó nhanh hơn và mạnh hơn so với code mà không cần kiểm tra một khi bạn đã hiểu rõ về nó;

17 Sử dụng  dependency injection để làm cho ứng dụng của bạn trở nên module hơn và dễ test hơn;

18 Nghe https://fragmentedpodcast.com/ sẽ rất tốt cho bạn;

19 Không bao giờ sử dụng email cá nhân của bạn cho tài khoản android market của bạn;

20 Luôn sử dụng các loại input method thích hợp;

21 Sử dụng analytics để tìm các mẫu sử dụng và cách ly lỗi;

22 Dịch vụ của bạn nên làm những gì họ cần làm và chết càng nhanh càng tốt;

23 Sử dụng Trình quản lý tài khoản để đề xuất tên người dùng và địa chỉ email đăng nhập;

24 Sử dụng CI để build và phân phối bản beta và production .apk của bạn;

25 Đừng chạy máy chủ CI của riêng bạn, việc duy trì máy chủ rất tốn thời gian vì vấn đề về không gian / bảo mật ổ đĩa / cập nhật máy chủ để bảo vệ khỏi các cuộc tấn công SSL, v.v. Sử dụng Circleci, travis hoặc shippable, chúng rẻ và đó là một điều ít lo lắng về;

26 Tự động hóa việc deploy của bạn đến playstore.
https://github.com/Triple-T/gradle-play-publisher

27 Nếu một thư viện đồ sộ và bạn chỉ sử dụng một tập hợp con nhỏ các chức năng của nó, bạn nên tìm một tùy chọn nhỏ hơn thay thế (ví dụ như dựa vào proguard).

28 Đừng sử dụng nhiều mô-đun hơn bạn thực sự cần. Nếu các mô-đun đó không được sửa đổi liên tục, điều quan trọng là phải xem xét rằng thời gian cần thiết để biên dịch chúng từ đầu (build CI là một ví dụ tốt) hoặc thậm chí để kiểm tra xem build mô-đun riêng lẻ trước đó có cập nhật không, có thể lớn hơn gần gấp 4 lần so với chỉ đơn giản là tải phụ thuộc đó dưới dạng nhị phân .jar / .aar.

29 Bắt đầu suy nghĩ về việc bỏ các PNG cho SVG.

30 Tạo các lớp trừu tượng thư viện, việc chuyển sang thư viện mới sẽ dễ dàng hơn nếu bạn chỉ cần chuyển đổi ở một nơi.

31 Giám sát kết nối và loại kết nối (cập nhật dữ liệu nhiều hơn trong khi trên wifi?).

32 Giám sát nguồn điện và pin (cập nhật nhiều dữ liệu hơn trong khi sạc? Tạm dừng cập nhật khi pin yếu?).

33 Một giao diện người dùng giống như một trò đùa. Nếu bạn phải giải thích nó, thì nó thực sự không tốt;

34 Test rất tốt cho hiệu suất: Viết triển khai chậm (nhưng chính xác) sau đó xác minh tối ưu hóa, đừng phá vỡ mọi thứ bằng test.

Nguồn : https://medium.com/@cesarmcferreira/building-android-apps-30-things-that-experience-made-me-learn-the-hard-way-313680430bf9