### Bài viết này sẽ cho chúng ta 1 cái nhìn thực tế về việc đặt CSS trong head của 1 trang HTML và CSS ở bên ngoài tập tin sẽ ảnh hưởng đến perfomance của trang đó như thế nào?

### Let's go baby!

Trong suốt quá trình làm Dev của tôi, thực tế mặc định là đặt tất cả CSS ở trong 1 file CSS bên ngoài nhỏ gọn. Sau đó thì, đặt file CSS này lên CDN, giúp cải thiện thời giản load chúng xuống bằng cách lưu trữ file này ở nhiều máy chú, và 1 trong số những máy chủ đó có thể gần với người dùng và do đó load nhanh hơn, cách này chắc hẳn là cách chúng ta vẫn thường làm đúng không?

Vậy việc thử đặt CSS lên head của 1 trang HTML sẽ như thế nào? Có hợp lý không? Để hiểu được logic phía sau điều này, chúng ta tìm hiểu 1 chút về cách thức một trình duyệt hoạt động. Mặc dù, có sự khác biệt giữa các trình duyệt với trình duyệt với nhau, nhưng giữa chúng vẫn có các nguyên tắc cơ bản giống nhau.

![](https://images.viblo.asia/5268263f-e9cf-4e13-a4f6-661876bc1760.png)
The Rendering Engine of a Browser - credit: https://speakerdeck.com/patrickhamann/css-and-the-critical-path

Khi trang HTML được load trên trình duyệt - trình duyệt connect với network lên server và sau đó trả lại 1 response. Response này được biết đến như 1 "Đường dẫn". Stoyan Stefanove vào năm 2012, đã mỗ tả Đường dẫn như sau:
"Là còn đường liên kết từ người dùng đến hiển thị đầu tiên và sau đó là trải nghiệm tương tác"

Như vậy, đường dẫn quan trọng chủ yếu dựa vào 3 yếu tố chính: HTML, CSS và Javascript.
Đường dẫn ban đầu được chia thành 2 đường dẫn chính, là đường dẫn HTML và CSS. HTML được đọc bởi các cú pháp phân tích HTML,  rồi từ đó xây dựng DOM  và điều này trở thành 1 phần của Render Tree
Đường dẫn CSS: CSS được đọc bởi các trình phân tích thông thường, tạo ra CSSOM và sau đó cũng trở thành phần của Render Tree.

Khác 1 chút là thẻ Javascript, khi 1 thẻ Javascript được đọc, trình duyệt có thể hoạt động theo một số cách khác nhau.
Nếu đó là 1 file bên ngoài, trình duyệt sẽ dừng tất cả mọi thử và tải file đó xuống, sau đó mới tiếp tục việc xây dựng DOM. Trình duyệt sẽ không chạy javascript ngay bởi vì có thể javascript có thể liên quan đến CSS, trong khi CSS chưa được tải về sẽ dẫn đến bị lỗi.
Và thực tế một số trình duyệt như Mozilla có khuynh hướng chặn tất cả hoạt động javascript cho đến khi CSS đã được tải về và CSSOM được tạo. 
Webkit - hoạt động hơi khác với việc "pre-reading",  sau đó giữ đoạn code javascpirt lại cho đến khi có 1 tham chiếu đến CSSOM.
Có nhiều kỹ thuật như thêm attribute **defer** cho các trình duyệt HTML4 hoặc **async** cho các trình duyệt HTML5 ngăn chặn javascript xuất hiện trong đường dẫn khi tải trang. Do đó sẽ giảm phụ thược vào đường dẫn đến HTML và CSS.

Mục đích của việc đặt CSS vào Head là giảm thiểu CSS phải tải xuống. Để hiểu điều này, chúng ta cần phải đi sâu vào xem xét "giải phẫu" của 1 request mạng.

![](https://images.viblo.asia/33b634b1-7c3c-4a48-813c-bd5352d92c5e.png)
credit: https://speakerdeck.com/patrickhamann/css-and-the-critical-path

Khi 1 request được thực hiện, nó sẽ có độ trễ (delay) liên quan (các khối màu xanh đậm, cam và ánh sáng xanh).  Đây là điều chúng ta không thể thực sự loại trừ hẳn trừ khi công nghệ truyền dẫn thông tin tạo ra 1 bước nhảy vọt đáng kể trong tương lai.
Vì vậy, điểm đặt CSS vào head để loại bỏ độ trễ trong request network, nghĩa là không cần sử dụng request cho CSS - do đó thì việc xây dựng CSSOM được bắt đầu ngay lập tức. Bằng cách làm điều này, điểm mà trong đó render tree được tạo ra sớm hơn cả chứ không phải là sau này như mô tả ở tiến trình phía đầu bài viết. Do đó hiệu suất trang được cải thiện đáng kể.

Dưới dây là sơ đồ mạng hiện tại của trang đăng nhập cho 1 ứng dụng web.

![](https://images.viblo.asia/b9d4d4de-f922-4fcd-a8e0-b0beb943a91b.png)

(caveat: I’ve literally copied the CSS, which was unminified, the html tags and scripts that it uses and placed them on a different server)


Như bạn thấy, phải mất 378ms để tải. Để so sánh, biểu đồ tiếp theo bên dưới, tôi đã minified CSS và đặt nó vào đầu của trang HTML

![](https://images.viblo.asia/1e82bd29-37d6-4fc7-95c5-af413e18eef8.png)

CSS is placed within head of the HTML Page

Trong trường hợp này, trang tải trong 225ms, đó là gần 150ms nhanh hơn so với cách làm cũ. Có thể cho rằng ý nghĩa của 150ms là không liên quan cho đến tước khi bạn đọc bài viết này.
Tôi đã thử F12 Google lên và dưới đây là những điều tôi thấy trong trang web hiện tại của họ.

![](https://images.viblo.asia/5bc2e4df-8e0f-481a-8ed8-991c9be4e710.png)

Như bạn thấy, đặt CSS ở đầu có nghĩa là nó không phải là 1 phần của yêu cầu request - bằng 1 từ ngữ khác thì nghĩa là nó đã được xóa khỏi đường dẫn. Để Google tải 182ms để tải và tải nội dung DOM còn 182ms, hiệu quả cải thiện perfomance là tức thời.

Google, Bing hay Guardian chỉ 1 số công ty nổi tiếng đang lầm việc này ngay bây giờ.
Một số khác biệt là CSS của họ được tách thành 2 phần, 1 CSS cốt lõi (đặt nó trên head) và 1 CSS không cốt lõi, và được đặt như 1 CSS bên ngoài. Có 1 số lý do để áp dụng việc xử lý như vậy, nhưng chúng ta sẽ thảo luận về điều này trong 1 bài đăng khác.
Hãy thử đặt CSS của bạn vào đầu trang HTML của bạn sẽ làm tăng hiệu suất của trang web của bạn. Tôi cảm thấy nó chỉ là vấn đề thời gian làm quen hay thay đổi mindset của bạn lại 1 chút trước khi cách tiếp cận này trở thành một thực tế thông thường.

## Tài lệu tham khảo

Dịch từ nguồn https://medium.com/@schizdazzle/whats-with-putting-the-css-in-the-head-24888fbbd2e2