> "A picture is worth a thousand words" - Henrik Ibsen

Trong việc diễn đạt thông tin, một tấm ảnh sẽ hữu ích hơn 1000 từ ngữ. Điều này cũng hiển nhiên đúng với các website. Tuy nhiên, việc load nhiều ảnh sẽ khiến hiệu suất của website chậm đi. Bài viết sau đây của mình sẽ chia sẻ cho các bạn 5 cách để tối ưu việc load ảnh trên website.
# Cách 1. Chọn đúng loại image
Việc chọn đúng loại ảnh cho từng tình huống khác nhau rất quan trọng bởi vì mỗi loại ảnh sẽ có các đặc tính khác nhau:
* Nếu muốn ảnh transparent: Xài PNG
* Nếu muốn ảnh có animation: Xài GIF
* Nếu muốn ảnh nhiều màu sắc: Xài JPG
* Nếu muốn ảnh đóng vai trò là icon, logo, illustration: Xài SVG
# Cách 2. Giảm chất lượng image
Với các công nghệ AI, Machine Learning, ta có thể dễ dàng giảm chất lượng ảnh mà không làm hình ảnh xấu đi. Điều này giúp tăng đáng kể tốc độ website mà không làm ảnh hưởng tới trải nghiệm người dùng. Một số website giúp bạn giảm chất lượng ảnh có thể kể đến:
* Đối với ảnh PNG: Sử dụng www.tinypng.com
* Đối với ảnh JPG: Sử dụng www.jpeg-optimizer.com
# Cách 3. Xoá meta-data của image 
Với mỗi một file ảnh, máy tính sẽ chứa đựng thêm các thông tin liên quan như tác giả, ngày chụp, loại máy ảnh,... Các thông tin này mặc dù có ích nhưng không cần thiết khi hiển thị trên website. Do đó, chúng ta nên xoá đi các thông tin này để dung lượng ảnh giảm đi. Bạn có thể xoá meta-data của ảnh bằng website sau: https://www.verexif.com/en/index.php
# Cách 4. Responsive image  
Đối với thiết bị di dộng, việc load ảnh phải thật sự tối ưu vì tài nguyên của điện thoại rất hạn chết. Cùng một nội dung ảnh nhưng ta sẽ sử dụng 2 tấm khác nhau khi load trên máy tính và load trên điện thoại. Chẳng hạn trên máy tính, ta sử dụng logo có kích thước 300x100 thì trên điện thoại ta chỉ cần sử dụng logo có kích thước 60x20 là đủ rồi. Việc chọn image sẽ phụ thuộc vào 2 yếu tố:
 * Kích thước màn hình
 * Độ phân giải của thiết bị

Để responsive image, bạn có thể sử dụng thuộc tinh srcset trong tag <image/>. Tham khảo ở đây: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
# Cách 5. CND image
CND image giúp tăng hiệu năng cho website vì yêu cầu được phản hồi nhanh hơn. Đồng thời việc sử dụng CDN giúp tiết kiệm băng thông cho server. Tuy nhiên, bạn cần lưu ý CDN chỉ thực sự hữu ích trong các trường hợp sau:
*  Có 1 lượng lớn người dùng nằm xa vị trí của máy chủ hoặc phân bố trên toàn thế giới.
*   Lượt truy cập ngày càng nhiều khiến server tốn nhiều băng thông.
*   Khi phối hợp sử dụng với Load Balancing.

Bạn có thể sử dụng dịch vụ CDN image của  www.imgix.com

# --- Kết bài
Vừa rồi mình đã chia sẻ cho các bạn về "5 cách tối ưu việc load ảnh trong website". Nếu có vấn đề gì hãy để lại comment bên dưới cho mình biết nhé!