Nhiều nhóm phát triển sẽ không thực hiện để tạo ra những tính năng và tự động hóa các bộ kiểm thử cho tính năng đó trong cùng sprint vì hai hoạt động phát triển này có thể dễ dàng chiếm toàn bộ 2 tuần của sprint. Tuy nhiên nếu bạn không tự động hóa các bộ kiểm tra cho những tính năng trước khi hết sprint thì nhóm của bạn đang tạo rủi ro.

Bất cứ việc kiểm thử thủ công được hoàn thành trong sprint thường tập trung chủ yếu vào chức năng chính trong sprint và không kiểm tra hồi quy các tính năng khác , nhiệm vụ tự động hóa các bộ kiểm tra liên quan đến phần tồn đọng như một việc cần làm sau này.

Ngày càng có nhiều tính năng được giới thiệu mà không có bất cứ regression testing thích hợp nào - kiểm thử tự động hoặc thủ công được thực hiện trên các tính năng được cung cấp, Trong khi đó những người kiểm thử tự động đang tập trung vào phần còn sót lại của sprint trước đó
#  Vậy làm thế nào để bạn hoàn thành kiểm thử tự động trong một sprint đặc biệt là khi tất cả có quá nhiều việc để hoàn thành trong cùng một thời gian như vậy ?
## 1. Phối hợp với những người khác
Các kĩ sư kiểm thử phải giao tiếp với các thành viên trong nhóm bao gồm cả BA, Tester và Dev
### A) BA
Một lý do để hợp tác với BA là để xác định rõ phạm vi tự động hóa, nếu như bạn đang  tự động hóa trong sprint thì bạn không thể và không nên tự động hóa mọi thứ.
Để đảm bảo bạn đang tự động hóa những thứ phù hợp, BA có thể cung cấp cái nhìn sâu sắc về những tính năng mà khách hàng yêu cầu, tính năng này sẽ được sử dụng như thế nào và bất cứ dữ liệu gì , với cái nhìn sâu sắc này việc đưa ra những quyết định đúng đắn về việc kiểm thử tự động sẽ dễ dàng hơn nhiều.
### B) Tester
Bằng việc hợp tác với Tester, bạn sẽ có cái nhìn rộng hơn về tính năng sẽ được chuyển giao cho khách hàng, Tester sẽ giúp bạn đưa ra kịch bản tích hợp quan trọng về luồng business đó là việc quan trọng để tự động những tính năng.
### C) Dev
Hợp tác sớm với Dev sẽ cung cấp cơ hội tuyệt vời để chỉ cho họ về tính tự động kiểm thử mà cần để xây dựng trong tính năng như là APIs , những định danh cho element . cho ví dụ này , tôi khuyên bạn nên lên lịch họp với Dev và để thiết kế những gì cần thiết để có thể kiểm thử tự động 
![](https://images.viblo.asia/c60a9d33-ec3f-4230-a4d0-e5b227fd8045.png)

Mockup này cung cấp như một hợp đồng giữa Dev và automation engineer
Với mockup này, Automation engineer có thể sớm đáp ứng được mọi thứ cần thiết trước khi bắt đầu coding , điều này có nghĩa rằng kiểm tra tự động có thể bắt đầu trước khi dev bắt đầu viết code vì thế cả  Dev và automation engineer có thể code song song
## 2. Tự động hóa chiến lược
Nếu như tính năng đã được chuyển giao liên quan đến giao diện người dùng thì việc tự động hóa tính năng này ở lớp UI để đảm bảo rằng giao diện người dùng hoạt động như mong đợi là điều đương nhiên

Để tăng tốc độ thời gian phát triển tự động hãy thực hiện cách tiếp cận lai để tự động hóa các kịch bản, xác định xem những kịch bản nào có thể được thực hiện ở mức unit test hoặc ở service layer trong mô hình kim tự tháp ngoài ra có thể sử dụng APIs để giảm các bước trong kịch bản của bạn

Ví dụ : bạn cần tự động hóa một kịch bản để xóa sản phẩm ra khỏi giỏ hàng, có rất nhiều các bước điều kiện trước khi bạn thực hiện test : 
1. Tìm kiếm sản phẩm 
2. Xác định vị trí của sản phẩm trong kết quả tìm kiếm
3. Click vào sản phẩm
4. Click vào nút “thêm vào giỏ hàng”
5. Click vào icon của giỏ hàng
6. Click vào nút “xóa” sản phẩm
7. Verify giỏ hàng

Ở bước 1->5 chuyển đến giao diện người dùng thì không cần thiết, bằng việc sử dụng API để thêm sản phẩm vào giỏ hàng , kịch bản test của bạn có thể bỏ từ bước 1->4 và bằng việc chạy trực tiếp từ trang giỏ hàng bước 5 có thể loại bỏ

Kịch bản lúc này sẽ là : 
1. Call API để thêm sản phẩm vào giỏ hàng
2. Vào trang giỏ hàng
3. Click vào nút xóa sản phẩm 
4. Verify giỏ hàng

Việc tự động ở bước này nhanh hơn so với cách tiếp cận đầu tiên, code của bạn cần viết cũng ít hơn 
## 3. Dựng dần dần
Khi một trang giao diện được giao, bạn có thể thực hiện dựng automation framework cho tất cả các phần tử của trang đó , để tránh điều này vì nó sẽ mất thời gian hơn bạn có. Chỉ dựng những gì cần thiết cho những bộ kiểm tra mà bạn sẽ tự động hóa


Bài viết được dịch từ nguồn : https://techbeacon.com/app-dev-testing/3-ways-get-test-automation-done-within-your-sprints