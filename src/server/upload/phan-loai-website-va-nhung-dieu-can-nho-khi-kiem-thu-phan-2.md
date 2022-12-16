*Như đã từng giới thiệu ở phần 1, hôm nay chúng ta sẽ cùng nhau tìm hiểu về 2 mảng web còn lại là:*
* E-commerce website (Website thương mại)
* Mobile website (Website dùng trên thiết bị di động)

![](https://images.viblo.asia/6f47f77c-3a32-4b02-927d-918f8a9850c4.png)
# I. E-commerce website (Website thương mại)
## a. Giới thiệu trang web thương mại điện tử:
:ballot_box_with_check: Trong bối cảnh tình hình dịch bệnh ngày càng diễn biến phức tạp, khi mà chính quyền luôn khuyến cáo người dân hạn chế việc ra đường khi không cần thiết, việc mua sắm online được đẩy mạnh, nhờ đó mà các sàn thương mại điện tử cũng trở nên phát triển hơn, dần quen thuộc với mọi người, mọi lứa tuổi. 

:ballot_box_with_check: Các trang web thương mại xuất hiện hỗ trợ và phục vụ cho nhiều nhu cầu của người dùng như hoạt động mua bán hàng hóa hay cung ứng dịch vụ hoặc chăm sóc sức khỏe, giải trí,... 

:ballot_box_with_check: Lợi ích phục vụ người dùng và nhà kinh doanh mà trang web thương mại đem lại là rất lớn, vậy nên việc thiết kế và phát triển trang web thương mại rất được chú trọng. Để đem lại sức hút đối với người dùng và tăng lợi nhuận cho nhà kinh doanh, các web thương mại cần được chú trọng khi phát triển, đem đến một trang web tốt nhất, tận dụng được tối đa các tài nguyên mà nó có và cuối cùng cũng là quan trọng nhất chính là phục vụ được các nhu cầu của người dùng mong muốn.

***Đặc điểm của web thương mại:***

1. Thao tác thuận tiện và nhanh chóng.
1. Cung cấp thông tin nhanh và chính xác.
1. Dễ dàng tương tác với người bán.
1. Hình thức thanh toán đa dạng
1. Hình ảnh và video trực quan, chất lượng
1. Các tính năng hỗ trợ nhu cầu riêng của KH như Giỏ hàng yêu thích, Wish List,...

![](https://images.viblo.asia/65ff9991-61f2-4e94-9777-b26600b6b14b.png)

***Bên cạnh đó trang web thương mại cũng cần hội tụ các yếu tố sau:***

:small_blue_diamond:Tiêu chí về nội dung cần hấp dẫn và hiển thị bắt mắt.

:small_blue_diamond:Chu trình hoạt động được tối ưu, phải tiện lợi, nhanh chóng, đơn giản.

:small_blue_diamond:Xây dựng chính sách bảo mật và tính bảo mật.

:small_blue_diamond:Chủ đề dễ dùng và tương thích với nhiều thiết bị.

=> Từ các yếu tố nêu trên, chúng ta có thể hình dung được rằng một trang web thương mại điện tử rất phức tạp khi so sánh với hai loại trang web trước, vậy nên người kiểm thử cần phải rất thận trọng trong việc kiểm thử trang web thương mại điện tử.

## b. Những lưu ý khi kiểm thử: 
Ở đây mình có tìm hiểu được một vài tip giúp chúng ta lưu ý hơn khi thực hiện việc kiểm thử trang web thương mại điện tử:

:star: Trong phần GUI, bạn cần kiểm tra tất cả các tính năng như trong SRS (software requirements specification) và đa phần các chức năng chính sẽ gần như giống nhau cho tất cả các trang web thương mại.

:star: Bạn cần kiểm tra tất cả các trang như các trang chính (bao gồm các sản phẩm nổi bật, hiển thị ưu đãi đặc biệt, chi tiết đăng nhập, chức năng tìm kiếm) trang chi tiết sản phẩm, trang danh mục, đặt hàng, cổng thanh toán,...

:star: Kiểm tra giỏ hàng có được cập nhật khi bạn chọn mua sản phẩm hoặc tăng giảm số lượng hay không. Kiểm tra chức năng này trong tất cả các trang liên quan.

:star: Kiểm tra xem các phiếu giảm giá và ưu đãi đặc biệt có được áp dụng cho các đơn đặt hàng chính xác hay không và giá chiết khấu có đang hiển thị hay không.

   *Hình ảnh minh họa cho trường hợp trường hợp có mã khuyến mãi được áp dụng:*
             ![](https://images.viblo.asia/378719ad-f366-404c-b89e-747adf95a177.jpg)

            

:star: Một vài trường hợp, khi chúng ta cập nhật một sản phẩm, số lượng sản phẩm sẽ bao gồm các sản phẩm đi kèm. Vì vậy, hãy kiểm tra xem sản phẩm chính và đơn lẻ có được hiển thị chính xác hay không.

:star: Kiểm tra xem tùy chọn bộ lọc có hoạt động chính xác hay không. 

:star: Trong khi đăng ký, một vài xác thực cá nhân (qua email, sms, otp,...) sẽ được thực hiện. Chỉ người dùng mới hoặc chính chủ của tài khoản mới có thể đăng ký.

:star: Đối với người dùng đã có tài khoản, nếu đã từng thêm sản phẩm vào giỏ hàng, thì phần danh sách mong muốn trong những lần đăng nhập trước của họ cũng sẽ được lưu và hiển thị trong lần đăng nhập tiếp theo.

:star: Kiểm tra thông tin hiển thị của các sản phẩm bằng cách so sánh dựa trên một số thông số kỹ thuật được chỉ định trong back-end

:star: Kiểm tra xem chức năng chuyển đổi tiền tệ (đối với các trang web quốc tế) có hoạt động tốt hay không. Dựa trên quốc gia được chọn, bộ chuyển đổi tiền tệ sẽ hiển thị giá và thuế suất có liên quan.

:star: Kiểm tra xem tính năng chia sẻ qua các mạng xã hội có hoạt động trên từng sản phẩm hay không.
Cần đối chiếu chi phí vận chuyển có phù hợp dựa trên khu vực đã chọn. Và cũng cần kiểm tra việc phát sinh thuế suất. 

:star: Việc thanh toán bằng các phương thức liên quan đến thẻ ATM, Mastercard, Visa,... chỉ hoạt động nếu thông tin thẻ hợp lệ được cung cấp. Việc xác thực phải áp dụng cho số Thẻ và mã CCV. (Tốt hơn là giữ xác thực trên chính trường số thẻ). 

:exclamation:Chức năng thanh toán cần được kiểm tra cẩn thận vì đây là yếu tố có thể gây ra thiệt hại nghiêm trọng đối với người dùng lẫn nhà cung cấp dịch vụ.

:star: Kiểm tra việc tạo email cũng như việc gửi - nhận mail trong các quá trình mua hàng (đăng ký, đặt hàng sản phẩm, thanh toán thành công, đơn đặt hàng bị hủy, đơn đặt hàng đã nhận và các kích hoạt email khác nếu có).

:star: Kiểm tra tính năng Live chat.

# II. Mobile website (Website dùng trên thiết bị di động)
## a. Giới thiệu về trang web dùng trên thiết bị di động:
:arrow_right: Trước hết chúng ta cần tìm hiểu như thế nào là trang web dùng trên thiết bị di động. Hầu hết mọi người rất hay nhầm lẫn giữa Ứng dụng di động và Website dùng trên thiết bị di động, tuy nhiên thực chất Ứng dụng di động (Web app) chỉ là một ứng dụng mà người dùng sau khi tải về thiết bị di động, không cần có mạng internet vẫn có thể sử dụng. Còn trang web dùng trên thiết bị di động khi truy cập thì người dùng cần phải có kết nối internet mới có thể sử dụng được.

:arrow_right: Ở đây chúng ta có khái niệm responsive website là khái niệm trang web cung cấp được nội dung và đáp ứng được kích thước phù hợp với từng loại thiết bị di động khác nhau. Phiên bản trang web dùng trên thiết bị di động sẽ không giống hoàn toàn với phiên bản dành cho máy tính, người dùng sẽ chỉ có vài trang web hạn chế so với phiên bản web chính, một vài tính năng không mong muốn có thể bị lược bỏ, chỉ giữ lại những tính năng cần thiết.

:arrow_right:Về cấu trúc thì website phiên bản di động sẽ tương tự phiên bản web dùng trên máy tính, vậy nên việc kiểm thử sẽ không quá khác biệt so với kiểm thử trang web thông thường, tuy nhiên chúng ta cũng cần chú ý một vài đặc điểm khi tiến hành kiểm thử.

## b. Những lưu ý khi kiểm thử:
![](https://images.viblo.asia/d7ab26ed-e228-49d2-85ae-9ab5e76950da.png)
* Thông thường, đội ngũ dev sẽ sử dụng trình giả lập để kiểm tra trang web trên thiết bị di động và nhận được kết quả lý tưởng nhưng tốt hơn hết khi kiểm thử chúng ta nên thực hiện trên thiết bị thực.Vì các thông số kỹ thuật thực tế của thiết bị có thể xung đột với các trang web được phát triển.
* Kiểm tra GUI và tính tương thích người dùng là quan trọng hơn hết, đó là những điểm khác biệt so phiên bản dành cho máy tính để bàn.
* Hiệu suất là một yếu tố quan trọng khác cần được xem xét khi kiểm tra trang web trên thiết bị di động. Các vấn đề liên quan đến hiệu suất có thể được theo dõi khi kiểm tra trên các thiết bị thực tế.
* Kiểm tra xem việc truy cập các liên kết web thông thường bằng liên kết URL trên thiết bị di động có hoạt động không.
* Ngoài ra, cần kiểm tra cuộn trang, điều hướng trang, cắt bớt văn bản, v.v. trên trang web di động.

Link tham khảo: https://www.softwaretestinghelp.com/web-application-testing/