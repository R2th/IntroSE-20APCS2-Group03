HTML là một ngôn ngữ khá đơn giản bao gồm các thành phần là các thẻ . Một trong những công việc chính của nó là đưa ra ý nghĩa văn bản để trình duyệt của bạn biết cách hiển thị chính xác, cũng như giúp các công cụ tìm kiếm hiểu cấu trúc và nội dung của trang.

Bạn, giống như tôi, có thể viết HTML hàng ngày và có lẽ chúng ta biết phần lớn các thẻ HTML. Nhưng một số trong số chúng không nổi tiếng như những thẻ HTML khác.

Dưới đây là 10 thẻ HTML tiện dụng mà bạn có thể sẽ phải đáng lưu tâm.

## <time></time>
![](https://images.viblo.asia/83227673-38a3-4f81-8d94-d8528d768e81.png)

Thẻ `<time> ` định nghĩa các thiết bị có thể đọc được thời gian, ngày, giờ,.

Về cơ bản, bạn có thể đặt bất cứ thứ gì giữa các thẻ mở và đóng - đó là bit có thể đọc được của con người.

Sau đó, được sử dụng với thuộc tính datetime, nó có thể giúp Công cụ tìm kiếm tạo ra kết quả thông minh hơn và giúp trình duyệt nhận ra ngày mà họ có thể sử dụng cho các tính năng đặc biệt như thêm sự kiện vào lịch, v.v.

Những ví dụ này có thể được tìm thấy trên CSS-Tricks và W3School . Ghé thăm những trang này để biết thêm về các định dạng được chấp nhận!


## <sup></sup> và <sub></sub>
    
![](https://images.viblo.asia/a0c14e20-c01a-4f21-8656-bd7b09faf4f6.png)


Không phải ngày nào chúng ta cũng cần viết văn bản chứa siêu ký tự và chỉ mục . Nhưng khi chúng ta làm, tốt hơn là giữ mọi thứ đơn giản!


<sup>và <sub>các thẻ làm cho văn bản xuất hiện một nửa ký tự trên hoặc dưới dòng bình thường và đôi khi được hiển thị trong một phông chữ nhỏ hơn.
    
    
Mặc dù văn bản siêu ký tự và ký tự có thể được sử dụng cho chú thích hoặc viết các công thức hóa học điên rồ như C₆H₆N₁₂O₁₂ (👨‍🔬)
    
   ##  <del></del>  và  <ins></ins>
    
   Các <del>từ khóa đơn giản định nghĩa văn bản đã bị xóa từ một tài liệu.
    
    
   Thẻ <ins> thì định nghĩa chèn văn bản thay thế cho từ bị xoá trong thẻ <del>.
    
    
   Tùy thuộc vào nhu cầu của bạn, bạn hầu như không cần phải tạo kiểu cho nó. Tìm ví dụ CodePen của tôi dưới đây:
    
![](https://images.viblo.asia/808128b0-1a79-4421-aac1-db3eb864b277.png)
  
    
    
##     <mark>
    
 ![](https://images.viblo.asia/13617be8-ed22-4796-b6df-f4a6b0d146cc.png)
    
    
Phần tử Văn bản Dấu HTML5 được sử dụng để gắn thẻ nội dung có liên quan. Bạn có thể sử dụng nó để nhấn mạnh nội dung hoặc đánh dấu các cụm từ tìm kiếm trong Tìm kiếm
    
![](https://images.viblo.asia/4152276a-9a76-48ed-b851-460c83458381.png)

##   `<picture>`
    
![](https://images.viblo.asia/79b4e440-6621-4d58-8324-85a9e9f69f08.png)

   Điều này là khá đơn giản để sử dụng và mạnh mẽ. Với thẻ` <picture>`, bạn có thể cung cấp một hình ảnh cụ thể cho một truy vấn phương tiện nhất định. Nó chắc chắn làm cho thiết kế của bạn ấn tượng.
    
   Bạn có thể thêm bao nhiêu hình ảnh tùy thích với phần tử  <source>và điền thuộc tính media bằng truy vấn phương tiện (như bạn sẽ làm với CSS).
    
   Để quyết định tải URL nào, trình duyệt sẽ kiểm tra từng URL <source>và chọn một hình ảnh tương thích phù hợp nhất với bố cục hiện tại của trang. Nó có các thuộc tính sau:
• srcset- Liên kết với tài nguyên
• media- Truy vấn CSS Media hợp lệ
• type- Loại MIME để chỉ định dạng tài nguyên. Trình duyệt sẽ bỏ qua <source>nếu nó không hỗ trợ type.
    
   Luôn chỉ định một phần tử <img>là phần tử con cuối cùng của phần tử <picture>. Nó được sử dụng bởi các trình duyệt không hỗ trợ phần tử <picture> (Internet Explorer,..) hoặc nếu không có thẻ <source> nào khớp.
    
   Có nhiều điều để biết về yếu tố này; xem bài viết [Built-in Browser Support for Responsive Images](https://www.html5rocks.com/en/tutorials/responsive/picture-element/) của Pearl Chen.
    
##     <progress>
    
![](https://images.viblo.asia/072fb45d-2ebd-45f7-9253-b75fb8f6f5f6.png)

    
![](https://images.viblo.asia/750e34a6-8b95-43db-8748-76482c0f7901.png)

    
   Phần tử HTML hiển thị một chỉ báo hiển thị tiến trình hoàn thành của một tác vụ, thường được hiển thị dưới dạng thanh tiến trình. Nó có thể có 2 thuộc tính: <progress>
    
    
• value- Phải được đặt trong khoảng từ 0 đến 1 nếu thuộc tính max bị bỏ qua - nếu không thì từ 0 đến max
    
    
• max - Bạn đặt giá trị cho nó, giá trị tối đa.
    
##  <meter>
![](https://images.viblo.asia/93189610-d441-424d-93ac-4405276ab046.png)
![](https://images.viblo.asia/9f7946f7-3c87-40e8-81c8-b6a4701e416c.png)
    
   Đừng nhầm lẫn với <progress>! Sử dụng nó để xác định phép đo vô hướng trong phạm vi đã biết hoặc giá trị phân số.
    
    
Nó chấp nhận các thuộc tính sau:
    
    
• value- Phải được đặt trong khoảng từ 0 đến 1 nếu maxthuộc tính bị bỏ qua giữa 0 và max
    
    
• min- Giá trị tối thiểu
    
    
• max- Giá trị tối đa
    
    
• low- Giới hạn số trên của đầu thấp của phạm vi đo.
    
    
• high- Giới hạn số thấp hơn của mức cao của phạm vi đo.
    
    
• optimum- Cho biết giá trị số tối ưu.
    
##     Tổng kết
    
   Trên đây mình đã giới thiệu một số thẻ HTML đặc biệt chuyên dụng. Hãy sử dụng chúng một cách linh hoạt để trang web của bạn thêm sinh động nhé. 
   
   Cảm ơn các bạn đã theo dõi, hẹn gặp lại!