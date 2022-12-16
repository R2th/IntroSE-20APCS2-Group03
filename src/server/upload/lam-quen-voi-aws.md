Trong series này mình sẽ cùng các bạn tìm hiểu về AWS (Amazon Web Services), ở bài viết này chúng ta sẽ cùng chia sẻ về những vấn đề cơ bản nhất nhé
Khi mới bắt đầu với AWS, mình có tạo tài khoản rồi đăng nhập vào màn console của AWS, mình khá choáng với khối lượng chữ trên màn, quả thật nó có rất nhiều thứ để mày mò và tìm hiểu, cứ mò mãi rồi cũng quen, mình rút ra được đối với những người mới nên quan tâm đến những thứ sau
## Billing
Quan trọng nhất vẫn là kinh tế đúng không các bạn, đoạn này rất cần thiết nhé, đề phòng không là nếu dùng thẻ credit thì tiền ra như nước sông đà đó các bạn
Trước tiên bạn cần hover vào username của bạn bên góc phải màn hình, tiếp đến sẽ nhấn chọn mục "My Billing Dashboard"
![image.png](https://images.viblo.asia/98e69f22-5dfc-49e2-b154-e317d68424f7.png)

Sau đó bạn sẽ vào đến màn hình này
![image.png](https://images.viblo.asia/b4bf3b13-e565-462d-8fdb-4497b25486d3.png)

Ở màn này bạn sẽ có thể làm chủ được tài chính của mình
Phần biểu đồ bên tay trái chính là biểu đồ tài chỉnh của bạn, sẽ có 3 cột, trong đó cột đầu tiên là số tiền tháng trước bạn đã sử dụng, cột thứ 2 là mức sử dụng hiện tại trong tháng này tại thời điểm hiện tại và cột cuối cùng sẽ là ước tính cho đến cuối tháng, bạn sẽ cần chi trả bao nhiêu cho hóa đơn.

Về phần biểu đồ còn lại bên tay phải, bạn sẽ được liệt kê danh sách các service bạn đã và đang sử dụng, kèm theo đó là chi phí đã sử dụng cho mỗi dịch vụ đó,  ví dụ như với dịch vụ EC2, tháng này mình đã không để ý và đã mất tiêu 0,78$ rồi đó :laughing:

Tiếp theo bạn cần quan tâm một vấn đề nữa sẽ có thể cứu rỗi ví của bạn phòng trường hợp bạn bất cẩn dẫn đến mất tiền, đó chính là yêu cầu AWS gửi mail cảnh báo về khi sắp sử dụng quá mức miễn phí
Bạn cần chọn vào mục Billing preference ở menu dọc bên tay trái, sau đó bạn sẽ chuyển đến màn này
![image.png](https://images.viblo.asia/72833019-f43d-47da-82f4-e59a10c83710.png)

Ở màn này bạn cần tích chọn 2 mục là "Receive Free Tier Usage Alerts" và "Receive Billing Alerts"
Mục "Receive Free Tier Usage Alerts" sẽ giúp bạn nhận được cảnh báo như đã nói ở trên, còn với mục "Receive Billing Alerts" thì sẽ giúp bạn theo dõi bill theo định kỳ, việc này sẽ giúp bạn chủ động hơn trong việc quản lý tài khoản của mình

Tiếp theo chỉ cần save lại là xong rồi.

Còn một mục nữa mình thấy khá hay đó là mục "Budgets", ở đây bạn có thể tạo ra và quy định budget theo chu kỳ mà bạn mong muốn
![image.png](https://images.viblo.asia/fc1654a2-38e1-46e2-b4ac-fa26178d84d6.png)

## AZ (Availability Zone)
Tiếp theo là đến AZ, chúng ta có thể hiểu là AWS rải rác các máy chủ của họ ở khắp các nơi trên thế giới, theo mình thì ví có những nguyên do như sau
- Tốc độ đường truyền: Bạn tưởng tượng bạn ngồi ở Việt Nam mà kết nối đến server tận nửa còn lại của trái đất, liệu delay time sẽ là bao nhiêu, sẽ ảnh hưởng rất nhiều đến tốc độ đường truyền và dẫn đến trải nghiệm người dùng đi xuống đúng không. Vì vậy họ đặt máy chủ ở khắp nơi, để ở những khu vực địa lý khác nhau có thể có những kết nối tốt nhất có thể. Như mình ở Việt Nam có thể sử dụng AZ Singagore, Hong Kong,...
- An toàn với những vấn đề phát sinh: AWS có hỗ trợ một dịch vụ gọi là "Load Balancing", hay còn gọi là "Cân bằng tải", dịch vụ này sẽ giúp bạn thực hiện việc như động chia băng thông cho các server có cùng chức năng, dịch vụ này mình sẽ giới thiệu kỹ hơn ở bài viết sau. Cái chúng ta cần quan tâm đến ở đây chính là việc AWS đã tính đến trường có thể trụ sở họ đặt các máy chủ xảy ra vấn đề ngoài ý muốn như: hỏa hoạn, thiên tai dẫn đến việc hệ thống ở đó bị hỏng, không còn phục vụ được nữa => Nếu không khắc phục kịp thời sẽ dẫn đến hậu quả rất nghiêm trọng, vì vậy họ đặt các trạm máy chủ ở các AZ khác nhau, về mặt vật lý có thể nói là riêng biệt, tách riêng hoàn toàn, vì vậy nếu server ở AZ xảy ra sự cố có vấn đề, AWS có thể tự xử lý vấn đề đó 1 cách tự động bằng cách sao chép server đó sang một AZ khác và sẽ vẫn phục vụ một cách bình thường.

## Services menu
![image.png](https://images.viblo.asia/2645e902-1d6e-4638-920f-425b652075de.png)

Ở bên góc trái màn hình bạn sẽ thấy mục "services", click vào đó bạn sẽ thấy màn hình như trên, Ở bên tay phải của menu này, đây là list các dịch vụ của AWS được chia theo các category khác nhau như: Compute, Database,...
Bên trong các dịch vụ đó còn rất nhiều các feature con, quả thực là kiến thức cần tìm hiểu về AWS là rất nhiều, cái này mình và các bạn đều cần nhiều thời gian nữa để nghịch dần nhé.

Còn bên tay trái sẽ là danh sách các service mà bạn mới xem gần nhất, cũng khá tiện cho việc tìm kiếm đúng không.

Bài viết này của mình chỉ dừng lại tại đây, nhằm mục đích cùng các bạn làm quen với màn hình console của AWS, ở các bài viết sau mình sẽ cùng các bạn tìm hiểu về một số dịch vụ chính của AWS nhé !