# I. Lời mở đầu
Bug Bounty là chương trình trao thưởng của các tổ chức cho các nhà nghiên cứu, các hacker có các phát hiện về lỗ hổng bảo mật trên hệ thống và các sản phẩm của tổ chức đó. Phần thưởng dành cho các nhà nghiên cứu khi báo cáo lỗ hổng phụ thuộc vào chương trình Bug bounty có thể là tiền mặt, quà tặng, vinh danh …
Các nhà phát triển phần mềm tạo ra các chương trình bug bounty trực tiếp hoặc gián tiếp qua các trang web cung cấp nền tảng bug bounty kết nối giữa nhà phát triển và hacker. Tham gia các chương trình bug bounty giúp cho các nhà phát triển phần mềm phát hiện và vá được nhiều lỗi bảo mật cho hệ thống giảm thiểu nguy cơ bị khai thác tấn công cho hệ thống. Còn đối với các nhà nghiên cứu và hacker mũ trắng thì đây là cơ hội đóng góp cho xã hội và kiếm thêm thu nhập cho bản thân.

Trong bài viết này mình sẽ cho bạn biết làm thế nào mình có thể kiếm được bug bounty đầu tiên trên Bugcrowd (một nền tảng cung cấp về Bug Bounty hợp pháp).
# II. Lỗ hổng Store XSS
Vì lỗ hổng mình tìm được nằm trong 1 chương trình private nên mình sẽ sử dụng target.com làm tên trang web. 

 target.com là 1 trang web về bán hàng, tại phần chi tiết các mặt hàng sẽ có phần đánh giá của khách hàng về sản phẩm đó:
 
 ![](https://images.viblo.asia/bf683c5e-1736-48ea-adc8-fffba60b531d.png)

Các trường input nằm trong phần comment như này luôn tiềm ẩn rất nhiều nguy cơ về lỗ hổng Stored XSS do dữ liệu sẽ được lưu trữ trong database và sẽ được lấy ra cho bất cứ người dùng nào truy cập vào trang web để xem chi tiết sản phẩm. 

Trong form đánh giá ở trên có 3 trường input rất đáng chú ý là `Title`, `Review` và `What activity ...? `. Mình sẽ thử truyền payload ` <script>alert("XSS")</script>` vào cả 3 cái trên.

![](https://images.viblo.asia/5ac9aa89-6a02-4345-abed-304cf1313c5f.png)

Phần đánh giá hiển thị lên dạng:

![](https://images.viblo.asia/ade7ce16-524e-4158-bd2b-d20322c1d484.png)

Kết quả output tại `Title` và `Review` đã được encoded, các ký tự đặc biệt như `<>` đều được chuyển thành `&lt; &gt;`. Tuy nhiên trường `What activity ...? ` thì thì không được hiển thị, đến đây mình bật f12 lên để kiểm tra chi tiết:

![](https://images.viblo.asia/bb107517-c9da-4216-8cc3-2830e8ad58d9.png)

Mình rất bất ngờ, thẻ script của mình đã được truyền vào output đầy đủ và không hề bị encode, tuy nhiên lại không trigger được XSS. Mình thử thêm 1 vài payload khác như `<img onerror=alert("XSS")>` thì output trả về đầy đủ toàn bộ script nhưng cũng không thể trigger thành công. Đến đây mình có nghĩ đến 1 kiểu khá giống với trường hợp mình đang gặp đó là `XSS in hidden inputs`, XSS truyền vào các trường ẩn nên không thể trigger theo cách thông thường. Trong trường hợp của mình thì thẻ script không bị cho vào hidden tuy nhiên rất có thể trang web đã chặn các thẻ script tự động alert thông báo tại Client Side hoặc chặn việc alert thông qua Blacklist. Từ đó mình nghĩ đến các payload XSS kích hoạt thông qua bắt event từ người dùng, và lựa chọn các payload ít thông dụng. Mình sử dụng thẻ `div` và event `onpointerover`. 

Điền vào payload `<div onpointerover="alert(origin)">MOVE HERE</div>` payload trên sẽ kích hoạt XSS khi người dùng di chuyển con trỏ chuột vào dòng `MOVE HERE`:

![](https://images.viblo.asia/44686a77-9992-4d15-a9f9-2778a991b89b.png)

Vậy là trigger thành công XSS

# III. Gửi report, tranh luận và tiền thưởng
## Gửi report
Sau khi tìm ra lỗ hổng XSS, mình ngay lập tức viết report cho chương trình:

![](https://images.viblo.asia/f5f55f63-8f4a-4f0d-a284-41a9f9e19867.png)
Trong report mình ghi các bước POC và đính kèm 1 video POC để chứng minh
## Tranh luận
2 ngày sau khi mình gửi report, mình nhận được một thông báo từ phía bugcrowd như sau:

![](https://images.viblo.asia/f8664f66-d614-48de-9381-c45a122d0d18.png)

Dịch ra là: "Cảm ơn bạn đã gửi. Tôi đã kiểm tra cùng một liên kết sản phẩm và nó dường như không bao gồm đánh giá mà bạn đã chèn. Bạn có thể xác nhận rằng điều này vẫn tồn tại trên trang đánh giá không?"

Mình truy cập lại trang target.com và kiểm tra thì thật bất ngờ, trang web xóa luôn chức năng đánh giá và thay bằng 1 chức năng comment khác :). Mình khá thất vọng, thay vì chỉ xóa payload của mình thì trang web quyết định xóa luôn chức năng, nên phía bugcrowd không thể tái tạo lại lỗi và yêu cầu mình chứng minh. Khác tiếc là hồi đó mình chưa sử dụng XSS hunter nên không lấy được thông tin khi có người dùng bị XSS để đưa ra làm bằng chứng. Sau đó mình đã gửi lại 2 tin nhắn như sau:

![](https://images.viblo.asia/b99e8e3b-58b0-4ab9-a7c4-0a02a32cbeb1.png)

![](https://images.viblo.asia/444e5c38-07c2-4c62-bec1-71dc46e0f422.png)

Trong tin nhắn trả lời mình có nhắc đến 3 vấn đề:
- Thứ nhất: Mình không thể POC lại để chứng minh được do trang web đã sửa đổi chức năng của phần đánh giá và xóa hết toàn bộ dữ liệu 
- Thứ hai: Mình có nói về việc đánh giá của mình cần được admin kiểm duyệt để hiển thị ra cho người dùng khác. Tuy nhiên, nếu quản trị viên kiểm duyệt nó, tài khoản của quản trị viên sẽ bị XSS và điều đó hoàn toàn có thể xảy ra với những người dùng khác nếu quản trị viên chấp nhận nó. Và nếu nó không có lỗi thì không có lí do nào tự nhiên trang web lại thay đổi chức năng gấp như thế.
- Thứ 3: mình có gửi ảnh chụp 2 chức năng trước và sau để chứng minh là trang web đã thay đổi chức năng ngay sau khi mình report.

Khoảng 1 ngày sau thì mình nhận được thông báo bên phía bugcrowd đã yêu cầu đại diện của chương trình này vào trả lời cho các vấn đề của mình:

![](https://images.viblo.asia/f180c5f5-8e93-4953-a54c-3391a013ebdf.png)

## Tiền thưởng
Sau 1 tuần không thấy tin tức gì, mình đã nhắn tin lại để hỏi thì cuối cùng bên chương trình cũng trả lời vấn đề của mình:

![](https://images.viblo.asia/387bd466-0c2c-4de9-80c5-5324bf540edd.png)

Chương trình đã quyết định đánh mức nguy hiểm cho lỗ hổng của mình là P2. Mình được trả bug bounty và 20 điểm trên Bugcrowd (Điểm này giúp mình có thêm cơ hội tham gia vào các chương trình private) <3 
# IV. Phần kết
Trên đây là những chia sẻ của mình về lỗ hổng bug bounty đầu tiên mình tìm được. Nếu như bạn đọc có hứng thú về bug bounty là gì cũng như các chương trình bug bounty hiện nay thì có thể comment bên dưới nhé. Mình sẽ làm 1 bài viết chi tiết về bug bounty trong 1 bài viết gần nhất.