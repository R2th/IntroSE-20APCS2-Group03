**Hãy tập trung vào chất lượng!**

![](https://images.viblo.asia/e9bb973a-3cc2-43e0-be0f-f98f098a2d65.jpg)

Điều mà tổ chức của bạn thực sự muốn nhắc tới khi họ nói rằng họ muốn **tập trung vào chất lượng** là gì?

Có phải họ muốn nhắc tới việc:

– Chất lượng tiến trình tốt hơn?

– Các tools và frameworks tốt hơn?

– Người kiểm thử tốt hơn?

Hiếm khi họ nhắc tới những điều trên trong khi họ nên thực sự nhắc tới chúng.

Thông thường, điều họ tập trung thực sự là vào các test tools và frameworks chứ không tập trung nhiều vào các nhân viên kiểm thử đa kỹ năng người mà có thể mang lại nhiều thứ hơn cho tổ chức hơn là chỉ dùng tới những kiến thức kỹ thuật và cài đặt các tool và framework kiểm thử.

Tin mình đi, vì tool và framework thì cũng là do người làm ra mà thôi. Không thể thay thế hoàn toàn người thật được. Mà nhất là mình đang nhắc tới là những nhân viên kiểm thử đa kỹ năng nhé. 
![](https://images.viblo.asia/43f7f502-3299-4335-a7f5-4451ee39f003.jpg)

# Khi Test tools vượt quá cả các kỹ năng của các nhân viên kiểm thử

Để giúp việc xác định xem một tổ chức thực sự cần gì, mình sẽ liệt kê ra 1 số vai trò cơ bản liên quan tới chất lượng và một số gợi ý về những vị trí trong tổ chức mà họ có thể tạo ra các giá trị thực sự.

# Các nhân viên kiểm thử thủ công
![](https://images.viblo.asia/bc9a6298-983e-48af-af8e-ef8626c9f15c.jpg)

Những nhân viên kiểm thử này có những kỹ năng chính là kiểm thử thủ công sản phẩm hay ứng dụng. Họ tập trung vào những cú click chuột và các phương pháp kiểm thử. Kiểm thử thủ công chỉ phù hợp trong những trường hợp sau:

* Úng dụng được kiểm thử (AUT) là rất nhỏ, nhẹ với độ ổn định cao
* Smoke test và kiểm thử hồi quy những thay đổi mới liên quan tới những cái đã tồn tại tốn ít thời gian
* Nhân viên kiểm thử thủ công tham gia nhiều vào việc thu thập yêu cầu và tiến trình phát triển phần mềm
* Các nhân viên kiểm thử có cái nhìn sâu sắc và ảnh hưởng tới những gì đề cập trong kiểm thử đơn vị và tích hợp do dev viết ra

Điều này cơ bản nghĩa là việc kiểm thử thủ công sẽ đem lại nhiều lợi ích ở những chỗ mà chức năng là rất nhỏ. Tuy nhiên khi mà độ phức tạp của ứng dụng và sản phẩm tăng lên thì việc chỉ kiểm thử thủ công không thôi sẽ dẫn tới một số thách thức như sau:

* Khi mà dự án lớn dần lên, nhu cầu kiểm thử tăng lên thì nhiều nhân viên kiểm thử được thêm vào hơn => tăng chi phí của tổ chức.
* Chi phí tiền bạc cũng như thời gian tăng lên do phải kiểm thử lặp lại các chức năng đã phát triển.
* Tăng rủi ro của việc không kiểm thử các chức năng cũ đã tồn tại trong 1 thời gian bởi giả định việc chức năng mới chưa ảnh hưởng gì tới chức năng đã có.
* Giảm động lực và tăng sự buồn chán khi mà nhân viên kiểm thử cứ phải test lặp đi lặp lại các chức năng giống nhau.

Để giải quyết 1 số vấn đề này thì các nhóm bắt đầu thêm kiểm thử tự động vào với sự giúp đỡ của 1 số tool/framework.

# Các kỹ sư kiểm thử tự động
![](https://images.viblo.asia/2a54d0e4-d672-446f-9a0f-c53614010ced.jpg)

Đây là những người nhân viên kiểm thử tập trung nhiều vào các công cụ kiểm thử. Họ quan tâm nhiều đến tự động hóa thử nghiệm bằng cách sử dụng các tool và framework khác nhau. Các tổ chức gọi họ bằng các tên khác nhau như:  “Software Developer in Test”, “Technical QA”, “Test Automation Engineer”, v.v. 

Trong nhiều trường hợp, đây là các dev được thuê để viết ra các trường hợp thử nghiệm. Các kỹ sư tự động hóa kiểm thử sẽ đem lại nhiều giá trị nhất khi họ làm việc cùng với những người kiểm tra thủ công để đảm bảo:

* Giảm tải việc kiểm thử thủ công thông qua việc tự động hóa kiểm thử chức năng mới và chức năng đã tồn tại
* Hầu hết các test cases được đề cập thông qua kiểm thử tự động hoặc kiểm thử thủ công

So với phương pháp chỉ kiểm thử thủ công, thì việc có thêm một nhóm tự động hóa kiểm tra chỉ tập trung vào việc viết các trường hợp kiểm thử sẽ dẫn tới 1 số thách thức riêng:

* Rào cản trở thành 1 dev để viết code tự động hóa kiểm tra chức năng
* Chi phí bảo trì cho số lượng lớn các trường hợp kiểm thử đã viết 
* Kiến thức tập trung về tự động hóa kiểm thử trong nhóm
* Thiếu tập trung vào chiến lược kiểm thử toàn bộ

Mặc dù việc kết hợp kiểm thử tự động và thủ công là tốt, thế nhưng việc các nhóm tiếp cận hai loại thử nghiệm khác nhau cùng lúc sẽ dẫn đến việc nhân viên kiểm thử sẽ không có nhiều kỹ năng và sẽ làm tăng chi phí tuyển dụng vì cần hai vai trò khác nhau cho cùng một chức năng.

Tức là, khi mà trong dự án có đội auto rồi thì đương nhiên là đội manual không cần quan tâm tới việc nâng cao kỹ năng của mình (tức sẽ có suy nghĩ là không cần học thêm auto nữa vì có đội auto làm rồi). 

Đồng nghĩa với việc này thì để cần áp dụng auto vào dự án thì phải tuyển người biết auto riêng -> mà lương của kiểm thử tự động thì thường là cao hơn manual khá là nhiều -> tốn chi phí thôi ^^

# Nhân viên kiểm thử đa kỹ năng
Những nhân viên kiểm thử này có thể kiểm thử theo nhu cầu khác nhau ở các nhóm khác nhau và họ không tập trung vào 1 loại kiểm thử cụ thể nào cả.

Các kỹ năng của họ nằm ở việc hiểu UAT và tất cả (hoặc hầu hết tất cả) các yếu tố ảnh hưởng tới chất lượng của ứng dụng đó. Họ có kỹ thuật đủ để hiểu code, có khả năng thiết lập các tool và framework để giải quyết các nhu cầu chất lượng khác nhau trong một nhóm. Điều này có ý nghĩa như sau:

* Họ có khả năng thúc đẩy các thực hành thử nghiệm, bao gồm nhưng không giới hạn ở việc tập trung vào các khía cạnh khác nhau của việc kiểm thử như hiệu suất, khả năng sử dụng và bảo mật, khả năng ảnh hưởng đến cách tiếp cận chất lượng trong nhóm và cũng như trong cả tổ chức, việc lựa chọn framework kiểm thử dựa trên một số yếu tố (không được đề cập ở đây), bảo trì kiểm thử, quản lý  lỗi, CI / CD xung quanh các kiểm thử chức năng và kiểm thử tích hợp, v.v.
* Họ có khả năng hiểu một ứng dụng ở nhiều cấp độ. Điều này bao gồm khả năng đặt được độ ưu tiên xem cái gì được tự động hóa và cái gì được kiểm thử thủ công dựa trên nhiều yếu tố khác nhau.
* Họ có  khả năng hiểu các số liệu và ảnh hưởng của những thay đổi trong các phương pháp tiếp cận dev/testing dựa trên phân tích các xu hướng.

Nói chung nhóm này biết vân vân và mây mây, là siêu nhân và thực sự hiếm có khó tìm. 

Dựa trên sự phân loại ở trên, chúng ta hãy xem lại câu hỏi ở phần đầu: Điều mà tổ chức của bạn thực sự muốn nhắc tới khi họ nói rằng họ muốn tập trung vào chất lượng? Nếu câu trả lời là ‘Hãy kiếm một số công cụ và một số dev viết các trường hợp thử nghiệm ở trong những công cụ đó…’, thì họ đang lỡ 1 điều gì đó rồi.

Một sản phẩm có chất lượng tốt chỉ khi mà việc kiểm thử được diễn ra cùng với việc phát triển. Nếu tổ chức đang xem việc kiểm thử như là một việc cần phải cân nhắc lại hoặc như một thứ chỉ cần thực hiện như một bước kiểm tra cuối cùng, thì sẽ không có bộ công cụ nào có thể giải quyết hay đáp ứng được vấn đề về chất lượng mà sẽ được nhìn thấy trong sản phẩm cả đâu.

# Kết luận

Điều cần thiết là sự hiểu biết sâu sắc hơn về ý nghĩa của việc xây dựng ra những sản phẩm chất lượng - và sự hiểu biết đó đi kèm với một số người mà người đó tiếp cận chất lượng một cách hệ thống.

Các tools và frameworks có ý nghĩa trong việc đạt được các mục tiêu của việc kiểm thử. Các nhân viên kiểm thử đa kỹ năng sẽ sử dụng 1 các kết hợp 3 thứ – con người, tiến trình và công cụ và thêm vào là kinh nghiệm của họ nữa – để đảm bảo việc kiểm thử được đưa vào vòng đời phát triển phần mềm 1 cách trơn tru nhất.

Bài viết được dịch từ link: 
https://www.softwaretestinghelp.com/tools-over-skills-are-we-missing-the-point/