![](https://images.viblo.asia/36a5a6bf-c0aa-4e76-9308-4be545febac2.png)

> Cohort analysis is a kind of behavioral analytics that breaks the data in a data set into related groups before analysis. These groups, or cohorts, usually share common characteristics or experiences within a defined time-span  - [Wikipedia](https://en.wikipedia.org/wiki/Cohort_analysis)

> Bạn có thể xem bài viết đầy đủ tại [200Lab Education](https://200lab.io/blog/cohort-analysis-la-gi-ung-dung-phan-tich-customer-retention/)

## Cohort Analysis là gì?

Theo như Wikipedia định nghĩa thì Cohort Analysis (gọi là phân tích cohort) là một dạng phân tích hành vi người dùng. Trong đó thì chúng ta chia khách hàng thành từng nhóm có các đặc điểm chung.

Mình lấy một ví dụ đơn giản đó là vùng miền, độ tuổi,... Đến phần áp dụng thực tế mình sẽ giải thích rõ hơn cho các bạn dễ nắm bắt.

## Vì sao cần Cohort Analysis

Câu hỏi tiếp theo là Cohort Analysis mang lại những lợi ích như thế nào ? Và tại sao nhiều người lại quan tâm đến nó như vậy, cá nhân mình thấy đây là một kiến thức cực kì quan trọng không thể bỏ qua với Data Analyst (DA).

Mình có viết một bài chia sẽ liên quan đến các kỹ năng cần thiết của DA các bạn có thể xem qua tại đây:

https://200lab.io/blog/data-analyst-nhung-ky-nang-can-thiet-cho-nguoi-moi/

Nếu các bạn đã từng làm Report, vẽ Dashboard  rồi thì các bạn cũng quá quen thuộc với giá trị Average (trung bình) mình gọi tắt là AVG. Cũng phải vài lần gặp trường hợp là số AVG hầu như không mang lại nhiều insight và hỗ trợ ra quyết định.

![image.png](https://images.viblo.asia/e7e4666b-b705-4511-a191-1a8971c3fa67.png)

Hình bên trên cho chúng ta biết được sự tăng giảm của AOV (Average Order Value) theo tháng, nhưng chúng ta lại không biết được sự thay đổi này đến từ chi tiêu của khách hàng cũ hay khách hàng mới. Thay vì như vậy chúng ta sẽ theo dõi bảng ở dưới đây

![image.png](https://images.viblo.asia/3681d99b-21cd-4ce6-b29f-1867c42aa837.png)

Cách phân chia thành các Cohort ở trên của mình dựa vào  tháng mà khách hàng có mua đơn hàng đầu tiên (khác với ngày tạo của khách hàng). Jan cohort bao gồm các khách hàng  có mua đơn hàng đầu tiên trong tháng 1, nhóm họ lại tính AOV (200k).

Sau đó theo dõi nhóm này ở tháng thứ 2 , vẫn giữ nguyên số lượng người nha các bạn, vì họ có đặt điểm chung là mua hàng lần đầu vào tháng 1 (đương nhiên là có kèm theo năm, VD: 01-2021). Như vậy AOV của họ lại giảm từ 200k xuống 150k, tương tự như vậy cho các cohort tiếp theo. Dễ nhận thấy rằng các ô màu xanh là OAV của khách hàng mới và màu cam là của khách hàng cũ => Đôi khi số OAV không thay đổi là vì khách hàng mới thì chi tiêu nhiều hơn và khách hàng cũ thì chi ít lại

Việc phân tích này cho thấy hiệu quả của team Marketing, khi họ đã nâng được số tiền chi tiêu trung bình trên mỗi đơn hàng của khách hàng mới từ 200k lên 223k. Nhưng nhìn theo một góc độ khác thì AOV của khách hàng cũ đang giảm, đối với một số công ty thì chi phí để có được một khách hàng mới rất tốn kém nên họ rất muốn giữ chân và khiến bạn chi tiêu nhiều hơn.

Tuy nhiên đó chỉ là trường hợp lí tưởng, trong bối cảnh mà công ty bạn đang muốn đẩy mạnh quảng bá thương hiệu, hạ giá thành sản phẩm để thu hút người mua thì khi không còn hạ giá nữa, một số khách hàng thích săn hàng giảm giá có thể sẽ rời bỏ bạn => Giá trị cohort sẽ giảm dần, nhưng bạn biết đây là điều tất yếu.

## Ứng dụng Cohort Analysis trong phân tích Retention

Như các bạn cũng đã thấy Cohort Analysis cho ta thấy được hành vi, độ gắn kết với thương hiệu (engagement) của khách hàng qua thời gian (Retention) (ngày, tháng, năm, quý), nên mọi người thường gọi là Retention Analysis để cho dễ hiểu. Nhờ nó mà bạn biết được khách hàng có đang thích sản phẩm của mình hay không?!

Bảng phân tích dưới đây cho thấy số lượng Active Users (Khách hàng có dùng ứng dụng) qua các ngày, nếu những ai chưa hiểu thì mình sẽ giải thích nó. Vì thật sự đây là bảng cohort mà hầu như đi công ty nào mình cũng làm, nó thật sự có 100% độ hữu dụng đấy.

* Các hàng là khung thời gian phân tích từ ngày 25/01 -> 03/02
* Các cột là số ngày, từ  25/01 -> 03/02 là 11 ngày đó là lí do tại sao có Day 0->Day 10. Thực ra bạn cũng có thể để Jan 25 vào Day 0 nhưng để cho người nhìn có thể dễ năm bắt được thì chúng ta nên để nguyên. Vì sếp bạn sẽ hỏi là khi lauching ứng dụng thì ngày thứ 2 (Day 1) chúng ta còn khoảng bao nhiêu % user sử dụng app ?
* Lý do tại sao không dùng số mà lại dùng phần trăm ? Nó tuỳ thuộc vào yêu cầu của sếp bạn và mục đích phân tích, theo kinh nghiệm của mình thì phần trăm giúp bạn so sánh được với công ty đối thủ. Mặc dù lượng khách hàng của bạn không nhiều nhưng số retention của bạn lại lớn thì hoàn toàn có thể khẳng định bạn đang làm khách hàng cực kì hài lòng

![image.png](https://images.viblo.asia/e78b2620-3c3f-426a-bd4a-461c845f36ea.png)

## Kết

Chúng ta đã nắm được khái niệm và tầm quan trọng của Retention Analysis rồi, việc còn lại là làm sao ứng dụng vào môi trường nơi mình làm việc, cũng có khả năng bạn sẽ phải loại outliner, yếu tố mùa vụ trong năm, ... để kết quả phân tích được chính xác hơn.

Với ngành data mà nói thì làm sao ứng dụng được những mô hình phân tích thống kê vào giải quyết được các bài toán cho doanh nghiệp là quan trọng nhất. Không quan trọng bạn biết rộng đến đâu, mà quan trọng là bạn nắm vững kiến thức, hiểu nó thật sâu và nhạy bén trong việc ứng dụng, thì chắc chắn bạn là người được các doanh nghiệp luôn luôn chào đón.

Chúc bạn thành công trên con đường sự nghiệp!