Đây là một chủ đề trong *Phân tích thiết kế hệ thống*. Hiện tại mình đang nghiên cứu về phần này nên cũng chia sẻ với mọi người luôn.

Đối với các bạn làm gia công phần mềm, có lẽ công việc này gần như chẳng bao giờ phải động đến, cái *specs* mà các bạn được đưa cho thực chất chính là kết quả của quá trình này, mà ở đó khách hàng là người thực hiện. Hiếm có khi nào khách hàng lại để ta triển khai phần này. 

Tuy nhiên khi các bạn làm product, thì việc phân tích và thiết kế hệ thống là việc mà các bạn cần phải nắm chắc.

Việc phân tích và thiết kế hệ thống, tuy có khác nhau về nhiệm vụ, mục tiêu hay mức độ trừu tượng hoá, nhưng chúng có chung những đặc điểm:
- Đều phải đối đầu với sự phức tạp.
- Đều là những quá trình *nhận thức* và *diễn tả* những thứ phức tạp ấy thông qua các mô hình.

# Mô hình hoá là gì?

*Mô hình* là một dạng trừu tượng hóa của một hệ thống thực. Hay nói một cách khác, mô hình là một hình ảnh hay một biểu diễn của một hệ thống thực, qua đó diễn tả hệ thống:
- Ở một mức trừu tượng hóa nhất định.
- Theo một quan điểm hay một góc nhìn.
- Bởi một hình thức diễn tả hiểu được (văn bản, hình khối, phương trình, bảng, đồ thị,…).

Việc dùng các mô hình để làm sao nhận thức và diễn tả nên được hệ thống thì người ta gọi đó là *mô hình hóa*. Do vậy mà quá trình phân tích và thiết kế hệ thống cũng thường được gọi chung là quá trình mô hình hóa hệ thống.

# Mô hình hóa có tác dụng gì?

Việc mô hình hóa thì có ba mục đích:

- *Để hiểu*: Muốn không bị mơ hồ với những ý tưởng thì người ta cần hình dung được nó. Hiểu tức là hình thành được một hình ảnh xác thực và giản lược (dù ở trong đầu hay ở trên giấy) về đối tượng được tìm hiểu. Không thể nói rằng hiểu mà chưa có mô hình. Ngược lại, cũng nhờ vào việc sử dụng các mô hình, ta có thể nhận thức được vấn đề dễ dàng và nhanh chóng hơn.
- *Để trao đổi*: Khi nó giúp con người hiểu được, thì nó sẽ giúp ta có thể trao đổi. Mô hình giống như một loại ngôn ngữ để nói chuyện giữa những người cùng quan tâm tới một vấn đề hay một hệ thống chung.
- *Để hoàn chỉnh*: Nhờ sự minh bạch của mô hình mà ta có thể dễ dàng nhận thấy hệ thống đã phù hợp với nhu cầu hay chưa, có chặt chẽ, đầy đủ chưa và từ đó có thể hoàn thiện thêm. Ngoài ra, mô hình còn giúp ta kiểm định, mô phỏng và thực hiện.

Do đó, một mô hình tốt phải đạt các yêu cầu:
- Dễ đọc
- Dễ hiểu
- Dễ trao đổi
- Xác thực
- Chặt chẽ
- Đầy đủ
- Dễ thực hiện

# Phương pháp mô hình hóa

Ngày nay, tồn tại rất nhiều phương pháp mô hình hóa (hay gọi là phương pháp phân tích và thiết kế) các hệ thống thông tin.

Tuy nhiên, tất các phương pháp mô hình hóa đều là sự kết hợp của ba thành phần:

- Một *ký pháp* (notation) bao gồm các khái niệm và mô hình được đề ra. Mỗi phương pháp đều phải dựa trên một số không nhiều các khái niệm cơ bản và sử dụng một số mô hình diễn tả các khái niệm trên, kèm với các kỹ thuật triển khai hay biến đổi các mô hình đó.
- Một *tiến trình* (process) bao gồm các bước, các hoạt động cần làm, các sản phẩm qua từng giai đoạn (như tư liệu, mô hình…), cách điều phối tiến trình đó và cách đánh giá chất lượng của các kết quả thu được.
- Một số *công cụ hỗ trợ*. Cụ thể là các phần mềm hỗ trợ cho quá trình mô hình hóa, thường có các khả năng sau:
    - Sinh mô hình và biểu đồ.
    - Chỉnh sửa các mô hình và biểu đồ.
    - Kiểm tra cú pháp, sự chặt chẽ, sự đầy đủ.
    - Kiểm thử và đánh giá.
    - Mô phỏng và thực hiện mô hình.

# Hai xu hướng chính của mô hình hóa

Có rất nhiều phương pháp mô hình hóa khác nhau, tuy nhiêu ta có thể phân loại chúng theo hai xu hướng:

- Mô hình hóa hướng chức năng, lấy chức năng làm đơn vị phân rã hệ thống.
- Mô hình hóa hướng đối tượng, lấy đối tượng làm đơn vị phân rã hệ thống.

Hai xu hướng mô hình hóa trên cũng phản ánh tương ứng với hai programming paradigm khác biệt: lập trình hướng thủ tục và lập trình hướng đối tượng.

Về cơ bản, sau này mình cũng chỉ viết về mô hình hóa hướng đối tượng, kèm theo đó là cách sử dụng các biểu đồ của UML. Hy vọng sau bài viết này các bạn sẽ bổ sung được những kiến thức hữu ích.

-----

*Phần kiến thức trong bài được tham khảo từ cuốn sách "Phát triển hệ thống hướng đối tượng với UML 2.0 và C++" của Nguyễn Văn Ba*