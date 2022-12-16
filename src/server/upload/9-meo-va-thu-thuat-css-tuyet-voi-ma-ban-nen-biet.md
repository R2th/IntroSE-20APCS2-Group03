CSS là Cascading Style Sheets và được sử dụng để mô tả cách các phần tử HTML sẽ hiển thị. Đây là một trong những công nghệ đầu tiên được học sớm nhất để phát triển web, các developer tuyệt đối phải biết cơ bản.

Mặc dù có vẻ như CSS không thể làm được gì nhiều ngoài việc cung cấp màu sắc, vị trí, v.v. của HTML, nhưng nó cũng có thể cho phép chúng ta tạo hình động và mang lại sức sống cho các ứng dụng và trang web của chúng ta. Có lẽ bây giờ nhiều người trong chúng ta quan tâm đến việc thành thạo CSS và học nó rất sâu, nhưng hoàn toàn đáng để biết một số mẹo và thủ thuật hữu ích có thể giúp bạn tạo các trang web tuyệt đẹp!

Bạn đã sẵn sàng để xem 9 mẹo và thủ thuật có thể thay đổi cách sử dụng CSS của bạn từ bây giờ chưa?

Hãy bắt đầu!


# 1. Vertical align với flex
Từ khi Flexible Box Layout Model xuất hiện, nó trở nên rất phổ biến, bởi vì nó làm cho việc định vị và sắp xếp các element dễ dàng hơn. Sử dụng flex (Flexible Box Layout Model sub-property) giúp căn chỉnh dọc nhanh, đẹp và dễ dàng trước khi chúng ta phải thực hiện một chút trong nhiều trường hợp. 

Chúng ta hãy xem ví dụ code cho định vị dọc với flex bởi vì nó cho phép thực hiện nhiều việc căn chỉnh.

{@codepen: https://codepen.io/annafromduomly/pen/eYYgNQb}

Như bạn có thể thấy trong đoạn code trên, chúng ta đã sử dụng ***display: flex*** và ***align-items: center***, ***justify-content: center*** để đảm bảo phần tử con của chúng ta sẽ nằm chính xác ở giữa phần tử cha.

Dễ chứ nhỉ?

# 2. Blend modes
Chúng tôi có thể thực hiện nhiều thứ hay ho trong CSS ngay bây giờ và một trong số đó là blend mode (chế độ hòa trộn). 

Có hai thuộc tính cho blend mode: 
* **mix-blend-mode**: xác định hoà trộn giữa phần tử và phần tử phía sau ,
* **background-blend-mode**: định nghĩa hoà trộn giữa hình nền và màu nền của phần tử. 

Hãy xem cách nó hoạt động:

{@codepen: https://codepen.io/annafromduomly/pen/NWWdOPN}

Trong đoạn code trên, chúng tôi đặt hình ảnh và tiêu đề bằng text. Text là một yếu tố được pha trộn với hình ảnh. Chúng tôi sử dụng giá trị overlay, nhưng có 15 giá trị khác có thể được sử dụng. Bây giờ, hãy kiểm tra ví dụ code background-blend-mode:

{@codepen: https://codepen.io/annafromduomly/pen/JjjEmyx}

Trong trường hợp này, chúng ta có thể thấy hình ảnh nền đã được pha trộn với màu sắc như thế nào. Hình ảnh đầu tiên là trước khi trộn, và hình ảnh thứ hai là sau khi trộn.

Chúng ta có thể làm gì với CSS không?

# 3. Parallax scrolling
Parallax là một xu hướng rất phổ biến trong thiết kế web hiện đại. Đó là về việc scroll nội dung background ở tốc độ khác với nội dung background trước khi chúng ta cuộn trang.

Chúng ta hãy xem làm thế nào phép thuật này có thể được thực hiện bằng CSS:

{@codepen: https://codepen.io/annafromduomly/pen/oNNBQeL}

Trong ví dụ này, bạn có thể thấy text và hình nền đang di chuyển khác nhau như thế nào. Chúng tôi đã sử dụng ***TransformZ***, để buộc chặt một yếu tố và làm chậm một yếu tố khác. Có vẻ tốt, phải không?

# 4. Shape outside
Có một tính năng tuyệt vời khác đi kèm với CSS và nó không phổ biến lắm. đó là thuộc tính ***shape-outside***. Nó quyết định cách nội dung sẽ bao quanh phần tử nổi. 

Hãy xem cách nó hoạt động:

{@codepen: https://codepen.io/annafromduomly/pen/MWWJZyw}

Trong đoạn code trên, bạn có thể thấy rằng text tràn ra vòng tròn. Chúng tôi đặt giá trị của ***shape-outside*** thành ***circle*** 50%, nhưng cũng có thể đặt hình ảnh, hình tam giác, hình vuông, v.v. Hãy kiểm tra và chơi với nó!

# 5. Clip path
Đôi khi designer sáng tạo hơn một chút, và bây giờ bạn phải đặt một hình ảnh trong một hình dạng cụ thể, như hình tam giác hoặc khác. Đối với điều này, bạn có thể sử dụng thuộc tính ***clip-path***. 

Hãy xem nhanh cách thức hoạt động của nó:

{@codepen: https://codepen.io/annafromduomly/pen/KKKaJyX}

Trong ví dụ trên, tôi đã tạo một hình tròn, nhật thực và hình dạng đa giác tùy chỉnh.

# 6. Image filters

Chơi với hình ảnh có thể mang lại nhiều hiệu ứng tuyệt vời cho layout và giúp tạo ra kết quả tuyệt đẹp. CSS cho phép sử dụng nhiều filter trên hình ảnh để giúp các developer chơi với đồ họa mà không thay đổi nó trong Photoshop. 

Chúng ta hãy xem các filter chúng ta có thể sử dụng:

{@codepen: https://codepen.io/annafromduomly/pen/PooKweE}

Trong ví dụ trên, bạn có thể thấy 7 filter khác nhau được sử dụng trong cùng một hình ảnh.

# 7. CSS animations
Animation có thể thu hút sự chú ý của người dùng trên trang web và đây là lý do tại sao nó được sử dụng trong thiết kế web rất thường xuyên. Tạo nó trong CSS làm cho mọi thứ dễ dàng hơn nhiều, hãy xem xét kỹ hơn một hoạt hình mẫu trong CSS:

{@codepen:https://codepen.io/annafromduomly/pen/abbyzeZ}

Trong đoạn code trên, tôi đã tạo một hình tròn nhỏ thay đổi vị trí và độ mờ cứ sau 25% cho đến khi nó nhận được 100% và sau đó bắt đầu lại. Cũng có thể thay đổi màu sắc và các thuộc tính khác của các yếu tố.

# 8. Element rotation
Một loại animation khác có thể được thực hiện trong CSS là rotation, nó có tính năng động hơn một chút và thật tuyệt vời khi thêm một số phần tử vào element loader, logo hoặc hình ảnh trong bộ sưu tập.

Hãy kiểm tra những gì chúng ta có thể làm với rotation:

{@codepen:https://codepen.io/annafromduomly/pen/GRRvJjB}

Trong ví dụ này, chúng ta có thể thấy một ngôi sao quay bốn lần trong một chu kỳ của animation.

# 9. Mask
Nếu bạn đã từng làm thiết kế đồ họa, có lẽ bạn biết mask hữu ích như thế nào. Nó cũng có thể sử dụng mask hình ảnh trong CSS. Hãy cùng cố gắng làm masks cho hình ảnh:

{@codepen:https://codepen.io/annafromduomly/pen/qBBXdxp}

Trong ví dụ trên, tôi đã tạo mask gradient hình tròn, nhưng bạn cũng có thể sử dụng đồ họa SVG làm mask, bằng cách thêm URL vào file.


# Kết luận
Tôi hy vọng bạn sẽ thấy những mẹo và thủ thuật này hữu ích và hữu ích cho việc code trong tương lai của bạn. Nếu bạn biết bất kỳ thủ thuật thú vị nào trong CSS, hãy chia sẻ yêu thích của bạn với tôi trong các bình luận hoặc trên mạng xã hội, tôi thực sự muốn biết.