Google Analytics là một trong những công cụ phổ biến nhất  để theo dõi & phân tích người dùng sử dụng web. Công cụ này cung cấp cho người chủ website dữ liệu dồi dào về người dùng, cũng như các tính năng nâng cao để theo dõi, phân tích dữ liệu một cách chiến lược, giúp chủ website đánh  giá được mức độ hiệu quả của việc thu hút traffic & tỷ lệ conversion. 
Trước khi bắt tay vào sử dụng Google Analytics (GA), người sử dụng công cụ cần nắm được những khái niệm cơ bản của GA & cách lựa chọn các chỉ số (metrics) phù hợp với câu hỏi kinh doanh (business questions).

### 1. Google Analytics thu thập dữ liệu gì? Đơn vị phân tích (Unit of analysis) là gì?

Dữ liệu từ  GA  có thể chia theo 4 loại đơn vị phân tích: visitor, sesssion, page view, & event.
* **Visitor**: là mỗi người dùng đã tiếp cận với website. Thông tin về vistior bao gồm tuổi, giới tính, vv 
* **Session**: mỗi lần người dùng (visitor) truy cập website được tính là 1 session. Một người dùng có thể có nhiều session trên một website. Thông tin về 1 session bao gồm độ dài của session, vị trí truy cập, nguồn session (vd. link trực tiếp, công cụ tìm kiếm, hay mạng xã hội)
* **Pageview**: mỗi lần người dùng truy cập 1 trang trên website được tính là 1 pageview. Mỗi session có thể bao gồm 1 hoặc nhiều pageview. Thông tin về pageview bao gồm đường link, thời gian người dùng dừng lại ở mỗi pageview, trình tự truy cập giữa các page (vd. người dùng thường bắt đầu ở homepage, sau đó tới trang danh sách sản phẩm, sản phẩm chi tiết, vv)
* **Event**: mỗi hành động (action) người dùng thực hiện trên 1 page & được thiết lập theo dõi bằng GA  được tính là 1 action, ví dụ như hành động click chọn "Mua Hàng", điền form "Liên Hệ". Thông tin về 1 event bao gồm tần suất event được thực hiện, thời  điểm event được thực hiện. 

Ví dụ, để trả lời câu hỏi "Traffic của website đến từ đâu?", người chủ website có thể phân tích theo session hoặc visitor.

Phân tích theo session để hiểu được hành vi của người dùng mỗi khi truy cập website, nguồn traffic đến từ kênh nào, thời gian lưu lại trên website, vv từ đó thiết kế giao diện, luồng trên website sao cho tối ưu trải nghiệm người dùng trên mỗi session.

Mặt khác, phân tích theo visitor cũng cần thiết để nắm được tập người dùng chính của website là ai (vd. phần lớn visitor là Nam, độ tuổi 25-34), vv từ đó xây dựng các kế hoạch marketing, thiết kế hình ảnh đánh đúng vào tập người dùng mà website đang hướng tới 

### 2. Khái niệm metrics & dimensions khác nhau như thế nào? Hai khái niệm này giúp ích gì trong việc trả lời câu hỏi kinh doanh?

**Metrics** là các chỉ số giúp người chủ website đánh giá trải nghiệm của  người dùng trên sản phẩm của mình. Metrics được tính toán dựa trên các số liệu được nêu ở mục đầu tiên. 
Một số metrics  phổ biến thường được sử dụng
* **Total Session**: Số lượt truy cập của người dùng trên website. Một session được coi là kết thúc sau khi người truy cập không thực hiện bất cứ hành động nào trên website trong vòng 30 phút. 
* **Bounce Rate**:  Tỷ lệ người dùng truy cập trang chủ website & bỏ đi trước khi truy cập bất cứ trang nào khác trên website. 
* **Session Duration/PageView Duration**: Độ dài trung bình của 1 sesssion hoặc 1 pageview mà người dùng thực hiện trên  website  
* **Pages/Session**: Số trang trung bình 1 người dùng truy cập trong 1 session 
* **Conversion Rate**: Tỷ lệ người dùng thực hiện hành động chuyển đổi trên website. Hành động chuyển đổi (conversion session) là hành động mà  người chủ website kỳ vọng người truy cập sẽ thực hiện, ví dụ như thực hiện đặt mua hàng, tạo tài khoản mới, đăng ký nhận bản tin, vv. Metrics này cần các bước setup thêm trên GA console. 
* **Total Revenue**: Doanh thu mà người truy cập tạo ra trên website. Metrics này cần các bước setup thêm trên GA console. 

Các metrics giúp người chủ website trả lời các câu hỏi tổng quát nhất về hiệu quả hoạt động & trải nghiệm người dùng trên website. Ví dụ như:
* Website có đang thu hút được lượng truy  cập tốt không: thông qua theo dõi Total session & Total users
* Người dùng sau khi truy cập có thường xuyên quay  lại website không: thông qua theo dõi Returning users, Sessions per user
* Người dùng có tiếp tục tìm hiểu website không sau khi truy cập trang chủ: thông qua theo dõi Bounce rate 
* Website có giúp tôi đạt được mục tiêu kinh doanh, như tăng lượng đơn đặt hàng, tăng số lượng tài khoản đăng ký không: thông qua theo dõi Conversion rate.

Tuy nhiên, các metrics chỉ phần nào chỉ ra được thành công hoặc vấn đề mà website đang có, mà không chỉ ra được nguyên nhân dẫn tới các chỉ số này.
Để có cái nhìn sâu hơn về người sử dụng website, chúng ta cần phân tích các dimension.

**Dimension** là các thuộc tính giúp người phân tích mổ xẻ các kết luận ban đầu có được từ tổng hợp metrics. 
Các dimension phổ biến trong GA bao gồm:
* **Demographics**: thuộc tính nhân khẩu học của người dùng, như tuổi, giới tính, sở thích 
* **Location**: vị trí địa lý của người dùng, như thành phố, đất nước, lục địa.
* **Behavior**: hành vi người dùng, như tỷ lệ người truy cập mới vs người truy cập quay lại
* **Devices**: thiết bị người dùng sử dụng, như điện thoại, máy tính bảng, máy tính cá nhân
* **Channels**: nguồn dẫn của người dùng, như link trực tiếp, công cụ tìm kiếm, mạng xã hội

Các câu hỏi cần tới việc phân tích người dùng theo dimension:
* Nguyên nhân traffic giảm trong 3 tháng liên tiếp: có thể tìm hiểu xem traffic giảm mạnh nhất ở phân khúc nào dựa vào demographics, channels 
* Hành vi sử dụng khác nhau giữa người dùng ở Nhật & người dùng ở Việt Nam: thông qua theo dõi location, behavior 
* Có nên chú trọng vào việc phát triển giao diện thân thiện với các màn hình điện thoại cỡ nhỏ, từ ip5 trở xuống: thông qua tính toán tỷ lệ người dùng trên mỗi loại device

### 3. Lựa chọn theo dõi metrics nào để áp dụng cho doanh nghiệp của mình

GA cung cấp rất nhiều metrics để theo dõi, nhưng không phải tất cả metrics đều phù hợp với mọi loại hình doanh nghiệp. 
Trên thực tế, chỉ nên lựa chọn khoảng 10 metrics để theo dõi & đánh giá mà thôi. Việc lựa chọn sai metrics dẫn tới lãng phí nguồn lực, đưa ra kết luận sai, thiếu thuyết phục hoặc định hướng tới các chính sách thiếu đúng đắn.

Nhìn chung, một metrics tốt cần có các đặc điểm sau:
* **Có khả năng so sánh**: metrics giúp người chủ website so sánh được sản phẩm của mình so với các đối thủ cạnh tranh ra sao & với chính bản thân sản phẩm trong các tháng/năm trước thế nào. 
* **Dễ hiểu**: metrics cần thông dụng, dễ hiểu, công thức rõ ràng để dễ dàng truyền tải & phân tích cho các stakeholder liên quan
* **Thiết thực**: metrics cần gắn liền với mục tiêu kinh doanh. Ví dụ mục tiêu kinh doanh là tăng doanh thu mảng bán hàng online, thì metric về tỷ lệ người dùng đăng ký nhận tin khuyến mãi sẽ không thiết thực bằng tỷ lệ người dùng đặt mua hàng trên website
* **Định tính**: metrics nên thể hiện dưới dạng con số & tỷ lệ để dễ dàng so sánh đối chiếu 


Source: https://medium.com/analytics-for-humans/3-fundamentals-to-know-about-google-analytics-before-doing-analysis-e727d57189ca