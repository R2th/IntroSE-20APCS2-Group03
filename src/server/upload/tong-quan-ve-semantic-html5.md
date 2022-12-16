Hoạt động thiết kế Web cho tới nay không chỉ hướng tới mục tiêu phục vụ hoạt động cung cấp nội dung đầy đủ, chính xác mà còn cần đảm bảo về mặt thẩm mĩ, cũng như khả năng tối ưu khi sử dụng. Nắm bắt được xu hướng đó, nhằm hướng tới việc chuẩn hóa những trang Web, giúp nó vận hành thực sự hiệu quả hơn cũng như đem đến những trải nghiệm tuyệt vời nhất cho người dùng, các yếu tố Semantic trong HTML 5 ra đời. Để hiểu rõ thế nào là Semantic HTML 5, những cải tiến đột phá cũng như các loại Semantic của HTML 5 một cách cụ thể, chúng tôi sẽ cung cấp cho các bạn những thông tin cơ bản cần thiết nhất tổng quan về Semantic trong bài viết này.
![](https://images.viblo.asia/58eb416f-0aaf-4d68-89f5-bc22abbadbfa.jpg)


# Semantic HTML5 là gì?
* **HTML5**: đây là bản cải tiến của HTML (HyperText Markup Language – Ngôn ngữ đánh dấu siêu văn bản)nhằm cải thiện trải nghiệm người dùng World Wide Web.
* **Semantic** (yếu tố ngữ nghĩa trong HTML5): là định nghĩa, mô tả chính xác, cô đọng một nội dung trong trang web, từ đó giúp xác định vai trò của chính nội dung đó so với toàn bài.
* **Semantic HTML5**: các yếu tố ngữ nghĩa mới của HTML5. Hầu hết các trình duyệt hiện nay đều sử dụng các yếu tố ngữ nghĩa mới của HTML5.
![](https://images.viblo.asia/ab31cb0f-fc6a-4cb2-8e99-43a05034a32a.jpg)

# Những ưu việt của Semantic HTML5:
Sự ra đời của HTML5 giống như một bước nhảy vọt trong lịch sử HTML. So với các phiên bản HTML trước đây như HTML 2.0, HTML 3.2, HTML 4.01, XHTML 1.0, thì rõ ràng HTML5 đang dẫn đầu về các tính năng vượt trội:

* **Xác định vai trò của các nội dung chứa trong trang web**: giúp trang Web của bạn trở nên tối ưu, chuyên nghiệp hơn. Việc xác định như thế này giúp người dùng tập trung ưu tiên vào những nội dung quan trọng trong trang Web. Dĩ nhiên, nhờ vậy mà quá trình tiếp cận, theo dõi trang web của người dùng cũng dễ dàng, mượt mà hơn. Thử tưởng tượng hoạt động này giống như việc bạn làm luận văn tốt nghiệp, thay vì tự mình nghiên cứu, thì việc có sự hỗ trợ từ phía giảng viên hướng dẫn sẽ giúp bạn rút ngắn thời gian nghiên cứu cũng như đảm bảo độ chính xác, hoàn thiện của luận văn ấy rất nhiều.
* **Giao diện tối giản, dễ quan sát**: Việc sử dụng bố trí các phần tử ngữ nghĩa tối giản như vậy giúp các lập trình viên dễ dàng quan sát một khối lượng mã khổng lồ.
* **Hiệu quả tiếp cận vượt trội hơn**: Bên cạnh việc đem lại tiện ích tuyệt vời cho lập trình viên, việc sử dụng các yếu tố ngữ nghĩa còn hiệu quả trong việc giúp trang web đó tăng khả năng giao tiếp với các công cụ tìm kiếm và công cụ hỗ trợ. Từ đó tạo “khoái cảm” trong trải nghiệm của người dùng
# Một số các thẻ Semantic mới trong HTML5:
![](https://images.viblo.asia/af081bf7-219c-45d0-90e2-85beadd6fd6f.jpg)

## Thẻ <header> và <footer> trong HTML 5:
**Thẻ <header>:**
Thẻ xác định tiêu đề hoặc phần mở đầu của trang Web hoặc của một đoạn. Đây giống như phần mở đầu của một bài văn, chứa key word và thông tin chung giới thiệu nội dung mà bài viết sắp triển khai.
    
![](https://images.viblo.asia/dbe37725-3b08-4ba0-884f-ea09d3dd5472.jpg)

    
**Thẻ <footer>:**
Thẻ xác định phần kết thúc của một trang Web hay một đoạn. Đây được xem là phần tóm lược toàn phần nội dung trước đó.


Ví dụ:

<footer>

<p>Liên hệ với chúng tôi: Mona.Media</p>

<p>Địa chỉ: Số 319 c16 Lý Thường Kiệt, p15, q11HCM</p>

<p>Hotline: 1900 636 648</p>

<p>Email: <a href="mailto:mon@mona.media">

</footer>

=> Kết quả hiển thị:

![](https://images.viblo.asia/e2c45363-2d3a-4232-b577-b2eca6efd591.jpg)

**Thẻ <nav>:**
Đây được xem như đường dẫn liên kết tới các nội dung cốt lõi của trang Web, thông thường thẻ <nav> được tìm thấy trong thẻ <header> hoặc <fooder>.

Ví dụ:

<nav><br>
<a href="/website/"> Website</a><br>
<a href="/HTML/">HTML</a><br>
<a href="/trinh-duyet-web/"> Trình duyệt web </a><br>
<a href="/ung-dung/">Ứng dụng</a><bR>
</nav>

=> Kết quả hiển thị:
![](https://images.viblo.asia/43302e17-d560-4438-a3a5-4bf0c49c4b1c.jpg)

    
**Thẻ <section>:**
Trong các trang web thường tồn tại các phần riêng biệt, thẻ <section> được dùng để chứa và phân biệt các phần riêng đó. Lưu ý, thẻ <section> để phân biệt nội dung chứa trong nó chứ không tự tạo nội dung cho các thành phần đó.

**Thẻ <article>:**
Xác định các thông tin độc lập trong website.

Cụ thể, các trang Web là tổng hợp của rất nhiều thông tin, những thông tin đó liên kết với nhau hướng tới giải quyết một vấn đề chung. Trong số các thông tin đó, có những thông tin có thể tồn tại độc lập nếu tách riêng ra. Những thông tin đó được chứa trong thẻ <article>.

Ví dụ:
![](https://images.viblo.asia/45205804-9456-4825-ad33-ece8549723b2.jpg)


=> Kết quả hiển thị:
![](https://images.viblo.asia/eddff917-7f9b-428e-a066-918806511c2b.jpg)



**Thẻ <aside>:**
Xác định những thông tin có mối quan hệ bổ trợ cho nội dung đang đề cập trong trang web. Những thông tin này gọi là nội dung hỗ trợ, phụ họa cho nội dung cốt lõi, có hay không không làm giảm sút chất lượng nội dung chính.

Ví dụ, trong Website về công dụng của mỹ phẩm thảo dược, ta có thể chèn thêm các nội dung bổ trợ như cách phân biệt các loại mỹ phẩm nguồn gốc từ thảo dược đó để tạo độ chuyên sâu cho đề tài.

**Kết luận:**
Hi vọng những chia sẻ trên sẽ giúp mọi người có cái nhìn tổng quan và khoa học hơn về các phần tử ngữ nghĩa trong HTML5 cũng như những ưu việt mà các phần tử này đem lại trong thiết kế website. Bạn có thể tham khảo thêm bài viết và chủ đề liên quan tại http://webmini.vn/.