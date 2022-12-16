Như các bạn cũng đã biết trong quá trình phát triển phần mềm, lỗi mà các developer thường hay mắc phải là viết ra các dòng code không đúng convention cũng như có khả năng dẫn đến break code của các dev khác khi deploy sẽ dẫn đến các tai nạn khôn lường. Vì lí do đó mọi người đều tìm cách hướng đến các cách triển khai phần mềm tốt hơn. Đó là lúc CI chứng tỏ khả năng ưu việt của mình, dưới đây mình sẽ giới thiệu sơ bộ về CI. Chúc các bạn đọc bài vui vẻ!
# Giới thiệu CI
CI (viết tắt của Continuous integration) là một hướng phát triển phần mềm bằng cách liên tục tích hợp những thay đổi vào trong dự án của mình và test lại nó thường xuyên . Mỗi khi các thay đổi ở một nhánh được merge thì tool sẽ tự động build code và test theo tuần tự để phát hiện ra các lỗi trong quá trình tích hợp. Một khi code được build thành công mà không sinh ra bất kỳ lỗi nào thì sẽ tiến hành tới quá trình delevery đó là deploy code. Nếu build thất bại thì hệ thống CI sẽ ngăn nó không thực hiện giai đoạn tiếp theo của quá trình, dev team có thể nhận được báo cáo về việc build fail cũng như fails vì lí do gì qua Email hoặc tích hợp vào Bot của Chatwork, và team có thể khắc phục lỗi đó nhanh chóng chỉ trong vài phút.

Bằng cách tự đông hóa việc build, test cũng như deploy thì các developer cũng sẽ giảm bớt các căng thẳng đau đầu trong quá trình phát triển dự án, dự án cũng trở nên dễ dự đoán và dễ nắm bắt hơn. Developer có thể liên tục phát triển các tính năng mới, PM mang đến cho khác hàng các sản phẩm hoạt động tốt nhanh hơn, thậm chí developer còn có thể fix bugs real quick trước khi sản phẩm đến với user.

CI yêu cầu tất cả các dev trong dự án phải đều tuân thủ theo hệ thống, các kết quả về những pull được push lên phải đều minh bạch giữa các dev trong team, build status sẽ được gửi đến các developer trong team khi có thay đổi. Trong trường hợp nhánh code chính xuất hiện lỗi hay các unit tests không pass thì thông báo cũng sẽ được gửi tác cả team để có thể kịp thời chuyển "xanh" cho em nó.

![CI Workflow](https://images.viblo.asia/cc9356c9-dddf-4190-b2da-fcd8822a16fb.png)


# Các lợi ích của CI

Vậy CI mang lại cho chúng ta các lợi ích gì thì các bạn cũng mình tìm hiểu bên dưới nhé. 

* Khi làm việc trong một dự án nào đó thì nó đồng nghĩa với việc sẽ có nhiều thành viên đang làm việc trên dự án đó nhưng với các task riêng biệt. Sẽ khó tránh được rủi ro các phần code của mình gây ra lỗi ở phần của người khác, khiến cái pass bị fail hay tệ hơn là build không thành công, cho nên việc tích hợp và kiểm thử hàng ngày sẽ giúp giảm thiểu rủi ro khi phát triển đồng thời cũng giúp ước lượng công việc chính xác hơn và kiểm tra chất lượng công việc thường xuyên hơn. 
* Chất lượng code cũng được cải thiện nhờ vào CI luôn chạy các check convention như Rubocop cho Ruby khi thực hiện build giúp ta phần nào tập trung được vào các chức năng hệ thống hơn.
* Các thành viên trong team cũng không còn phải tranh luận với nhau về việc code ai làm break dự án nữa mà chỉ việc nhìn vào report của CI để xem build ở pull nào bị fail là biết "thủ phạm" rồi.
* Giảm thời gian deploy mỗi lần tích hợp tính năng mới, vì giờ đây deploy đã được tự động hóa rồi.
* Team cũng không còn phải lo sợ mỗi khi code không biết có làm hỏng gì hay không, tập trung tinh thần tạo ra kết quả tốt hơn.

# Các điều kiện để triển khai CI
Các yêu cầu cơ bản cho một hệ thống CI đó là:

* Build được chạy tự động.
* Test được chạy tự động.
* Thường xuyên commits các thay đổi tới repository của dự án.
* Cung cấp giao diện dễ nhìn cho các tiền trình của hệ thống cũng như real-time status cho cả team có thể theo dõi.

Bên cạnh đó cũng cần một Version Control System (VCS). Xem như một nơi tập trung hóa cũng như lưu giữ các thay đổi mà chúng ta tạo ra cho dự án theo thời gian. Ngoài ra cũng cần một server hoặc máy ảo để có thể chạy hệ thồng CI tại chỗ.

Để bỏ qua các rắc rối về server hay máy ảo thì sẽ có các bên thứ 3 cung cấp các CI tool, giúp đảm bảo toàn bộ quy trình và cho phép chúng ta bổ sung, mở rộng tính năng dễ dàng. Điểm yếu của các hệ thống này đó là không cung cấp nhiều các tùy chọn thiết lập trong khi cái tool phụ trợ cho việc self-hosted nói trên thì đầy đủ. Những CI tool được biết đến rộng rãi có thể tìm thấy [ở đây](https://www.softwaretestinghelp.com/tools/24-best-continuous-integration-tool/).


Đó là những giới thiệu sơ lược về CI, CI còn có thể mở rộng thêm ra CD (Continuous delivery) nhưng mình sẽ không nói trong bài viết lần này vì mình chỉ muốn tập trung vào CI trước hết. Cảm ơn các bạn đã theo dõi bài viết, bài viết tiếp theo mình sẽ cố gắng tìm hiểu cách thức tích hợp CI vào một dự án demo để có thể chia sẻ lại cho các bạn. Peace!