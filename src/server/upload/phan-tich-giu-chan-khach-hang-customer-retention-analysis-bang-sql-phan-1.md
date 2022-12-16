Dù làm ở lĩnh vực bán lẻ, dịch vụ tài chính hay quản lý phòng gym, thu hút khách hàng là việc bình thường - giữ chân được khách hàng khiến họ quay lại nhiều lần mới khó. Nó là một trong những yếu tố quan trọng ảnh hưởng đến doanh thu. Điều này có thể được cải thiện bằng cách sử dụng SQL để phân tích. Trong bài viết này, mình sẽ hướng dẫn các bạn từng bước về cách thực hiện phân tích mức độ giữ chân khách hàng cơ bản, cải thiện tỉ lệ giữ chân khách hàng theo thời gian, phát triển đường cong duy trì khách hàng và tính toán phân tích duy trì trong đoàn hệ (cohorts retention analysis). 

Đường cong duy trì khách hàng là điều cần thiết cho bất kỳ doanh nghiệp nào muốn tìm hiểu khách hàng của mình. Nó là một cách dễ dàng để hình dung một sự tương tác quan trọng giữa khách hàng và doanh nghiệp, nghĩa là, liệu khách hàng có quay lại hay không - và ở mức nào - sau lần đầu tiên sử dụng dịch vụ.
Bước đầu tiên để xây dựng đường cong duy trì khách hàng là xác định những người đã ghé thăm doanh nghiệp của bạn trong thời gian tham chiếu, mình sẽ gọi là p1. Điều quan trọng là độ dài của khoảng thời gian được chọn là hợp lý và phản ánh tần suất truy cập dự kiến.
Các loại hình kinh doanh khác nhau sẽ mong đợi khách hàng của họ quay lại ở các mức giá khác nhau:
* Một quán cà phê có thể sử dụng tần suất ghé thăm dự kiến trong khoảng thời gian mỗi tuần một lần.
* Một siêu thị có thể chọn một khoảng thời gian dài hơn, có thể là 2 tuần hoặc một tháng.
Trong ví dụ sau, mình sẽ sử dụng trong phạm vi 1 tháng, và giả sử như mình đang xem xét việc giữ chân của những khách hàng đã truy cập vào tháng 1 năm 2016  và qua các năm tiếp theo.

Bước đầu tiên là xác định nhóm khách hàng ban đầu:
![](https://images.viblo.asia/76daefde-0216-4b69-8332-ca0f537b0483.JPG)

Sau đó, xem xét cư xử của khách hàng theo thời gian: ví dụ, có bao nhiêu trong số khách hàng quay lại trong những tháng còn lại trong năm?
![](https://images.viblo.asia/163bcbb2-25d0-48aa-ad8f-39cfa1b5f155.JPG)

Như các bạn có thể thấy, chức năng SELECT ban đầu được bao gồm cả trong bước thứ 2 này.
Nếu mình có 1000 khách hàng duy nhất vào tháng 1, thì kết quả mong đợi sẽ giống như thế này:
![](https://images.viblo.asia/1b921f7f-b1aa-4278-8534-4644da5ea6f9.JPG)

Biểu đồ đường cong sẽ như thế này:
![](https://images.viblo.asia/9411b347-7919-4f20-85aa-765ea107ba9f.JPG)

## Mức độ phát triển theo thời gian của việc giữ chân khách hàng
Những thứ ở trên chỉ là bước đầu tiên, chúng ta phải xem xét xem liệu còn bất kỳ xu hướng nào khác không. Ví dụ: trong số những người đến vào tháng 1, có bao nhiêu người trở lại vào tháng 2? Bao nhiêu người trở lại vào tháng 2 sẽ quay lại tiếp vào tháng 3?

Chúng ta cần thiết lập một mô hình lặp, được xây dựng trong vài bước đơn giản. Trước tiên, chúng ta cần tạo một bảng nơi mỗi lượt truy cập của người dùng được ghi lại theo tháng, cho phép khả năng những điều này sẽ xảy ra trong nhiều năm kể từ khi doanh nghiệp của chúng tôi bắt đầu hoạt động. Mình đã giả định ở đây rằng ngày bắt đầu là năm 2000, nhưng các bạn có thể điều chỉnh khi cần thiết.
![](https://images.viblo.asia/6ac469f5-35a9-4926-9423-944f7e909e1b.JPG)


Nó sẽ xuất ra như này:

![](https://images.viblo.asia/21e8d869-8ca9-45a9-a13e-7cb550451351.JPG)

Sau đó chúng ta cần tổ chức lại thông tin này để xác định khoảng thời gian giữa mỗi lần khách hàng đến. Vì vậy, đối với mỗi người và mỗi tháng, chúng ta sẽ xem coi nó như thế nào.
![](https://images.viblo.asia/05727cf6-3f9a-444e-82ee-aea1f6eafb8e.JPG)

Sau đó chúng ta phải tính khoảng thời gian giữa các lần khách hàng ghé thăm:
![](https://images.viblo.asia/6b9d1d21-09a2-4f59-a35d-934bac08a562.JPG)

Đây là một gợi ý nhỏ về các biện pháp giữ chân khách hàng: đó là tỷ lệ khách hàng quay lại sau một khoảng "x" thời gian. So sánh **số lượng khách hàng ghé thăm trong một tháng nhất định** vs **số lượng khách hàng quay lại trong tháng tiếp theo**. Xác định thêm những khách hàng trở lại sau một khoảng thời gian "x" vắng mặt nhất định và những khách hàng không quay lại. Để làm điều đó, chúng ta cần phân loại khách hàng tùy thuộc vào từng kiểu quay lại của họ.
![](https://images.viblo.asia/933c6332-114b-4282-95df-201bdda185bc.JPG)

Điều này cho phép chúng ta thiết lập số lượng khách hàng đã ghé thăm trong một tháng nhất định và số lượng khách hàng quay lại vào tháng tiếp theo.
![](https://images.viblo.asia/876ef581-b0fc-400b-a5ce-9899b47cbe83.JPG)

Tỷ lệ khách hàng quay lại trong từng tháng đây:
![](https://images.viblo.asia/5d342695-f540-43dc-a595-d95f87b78bd9.JPG)

## Các kỹ thuật khác để giữ chân khách hàng
Nếu trong p1 có 100 khách hàng và trong p2 có 80 trong số khách hàng quay lại,  liệu trong p3 chúng ta sẽ tập trung vào còn số 100 hay 80?

Ở ví dụ trên, mình chỉ đề cập đến việc duy trì theo từng giai đoạn, và mình cũng đã phân loại những người quay lại muộn, hoặc những khách hàng quay lại sau 1 tháng. Doanh nghiệp có thể đưa ra những khuyến mãi để níu chân họ lại, cũng có thể là thẻ thành viên, đi bao nhiêu lần trong 1 tháng thì được cái gì gì đó ví dụ vậy.

Chúng ta phải xem xét tỷ lệ khách hàng ghé thăm trong bất kỳ tháng nào, có bao nhiêu người quay lại và bao nhiêu khách hàng mới? Trong trường hợp này, chúng ta sẽ quay ngược lại những tháng trước thay vì những tháng tiếp theo:

![](https://images.viblo.asia/697f92b8-0818-4bd3-ab8d-7095261d0ffc.JPG)
![](https://images.viblo.asia/eb113f88-c7d2-4d4c-bd9b-9cb8b6afeb24.JPG)

Nó sẽ đơn giản hơn để đếm số lượng từng loại khách hàng trong bất kỳ tháng nào.
![](https://images.viblo.asia/eb113f88-c7d2-4d4c-bd9b-9cb8b6afeb24.JPG)

Xuất ra graph đây:
![](https://images.viblo.asia/9aa2fe5a-ee6e-4d6a-99ad-4032bf09f1c0.JPG)

(còn tiếp)

Các bạn hãy đón xem phần 2 nhé! À và bên mình cũng có cung cấp nhiều bài viết về [SQL](http://sqladvice.com/) và công nghệ trên trang: [SQL Advice](http://sqladvice.com/). Nếu được các bạn hãy ghé thăm để đọc những bài viết mới nhất được cập nhật thường xuyên nhé! Thanks a lot!