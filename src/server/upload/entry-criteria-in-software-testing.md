Kiểm thử phần mềm, một phần thiết yếu của vòng đời phát triển phần mềm, là một quá trình rộng và phức tạp  để xác nhận chất lượng và hiệu quả của sản phẩm phần mềm. Quá trình này, có những yêu cầu đa dạng cần được xem xét và kiểm tra, chủ yếu liên quan đến điều kiện bắt đầu và kết thúc test . Để tránh sự nhầm lẫn này, các điều kiện và yêu cầu cụ thể được QA thiết lập , trước khi bắt đầu kiểm thử, giúp QA trong suốt vòng đời kiểm thử. Những điều kiện này được gọi là tiêu chí vào và ra , đóng một vai trò quan trọng trong vòng đời kiểm thử phần mềm. Bài viết này sẽ đưa ra một góc nhìn tổng quan về các tiêu chí đầu vào.
![](https://images.viblo.asia/7c6e8be2-f61b-462a-89c8-7a1f92f9cbbf.png)
 
## 1.  Tiêu chí đầu vào trong kiểm thử phần mềm là gì?
   Tiêu chí đầu vào là một tập hợp các điều kiện hoặc yêu cầu, được yêu cầu phải được đáp ứng hoặc đạt được để tạo ra một điều kiện phù hợp và thuận lợi để kiểm thử. Được hoàn thành & quyết định sau khi phân tích kỹ lưỡng các yêu cầu nghiệp vụ và phần mềm, tiêu chí đầu vào đảm bảo tính chính xác của quy trình kiểm thử. Bỏ qua tiêu chí đầu vào có thể ảnh hưởng đến chất lượng của cả qui trình. Một số tiêu chí đầu vào, thường được sử dụng để đánh dấu sự bắt đầu kiểm thử, là:
* 	Code hoàn chỉnh hoặc code cho 1 phần chức năng hoàn chỉnh.
* 	Requirements được xác định và phê duyệt.
* 	Có đủ test data.
* 	Test cases đã được viết và sẵn sàng triển khai.
* 	Môi trường kiểm thử đã được thiết lập và tất cả các tài nguyên cần thiết khác như công cụ và thiết bị đều khả dụng.
  Cả hai giai đoạn phát triển và kiểm thử đều được sử dụng làm nguồn để xác định tiêu chí đầu vào cho quy trình kiểm thử phần mềm, như:
* 	Giai đoạn / quy trình phát triển cung cấp thông tin hữu ích liên quan đến phần mềm, thiết kế, chức năng, cấu trúc và các tính năng có liên quan khác, hỗ trợ trong việc quyết định các tiêu chí đầu vào chính xác như yêu cầu chức năng và kỹ thuật, thiết kế hệ thống, v.v.
* 	Từ giai đoạn kiểm thử, các đầu vào sau được xem xét:
        o	Test Plan.	
        o	Test Strategy.
        o	Test Data và Test Tools .
        o	Môi trường kiểm thử ( Test Environment).
 
    Các tiêu chí đầu vào chủ yếu được xác định cho bốn cấp độ kiểm thử cụ thể: Unit Testing, Integration Testing, System Testing, Acceptance Testing. Mỗi cấp độ kiểm thử này yêu cầu các tiêu chí đầu vào riêng biệt để xác định mục tiêu của chiến lược kiểm thử và để đảm bảo đáp ứng các yêu cầu sản phẩm.
    
    
### 1.1 Entry criteria of Unit Testing
* 	Giai đoạn lập kế hoạch đã hoàn thành.
* 	Thiết kế hệ thống, thiết kế kỹ thuật và các tài liệu liên quan khác được xem xét, phân tích và phê duyệt hợp lý.
* 	Yêu cầu nghiệp vụ và chức năng được xác định và phê duyệt.
* 	Testable code hoặc Units có sẵn.
* 	Môi trường kiểm thử đã sẵn sàng.



### 1.2 Entry criteria of Integration Testing
* 	Hoàn thành Unit Testing .
* 	Priority bugs được tìm thấy trong Unit Testing đã được sửa và đóng.
* 	Kế hoạch tích hợp và môi trường kiểm thử để thực hiện kiểm thử tích hợp đã sẵn sàng.
* 	Mỗi mô-đun đã trải qua kiểm thử đơn vị trước quá trình tích hợp.


### 1.3 Entry criteria of System Testing
* 	Hoàn thành quá trình kiểm thử tích hợp.
* 	Priority bugs được tìm thấy trong các hoạt động kiểm thử trước đó đã được sửa và đóng.
*   Có sẵn môi trường kiểm thử hệ thống.
* 	Test cases có sẵn để thực hiện.


### 1.4 Entry criteria of Acceptance Testing
* 	Hoàn thành giai đoạn kiểm thử hệ thống.
* 	Priority bugs được tìm thấy trong các hoạt động kiểm tra trước đó đã được sửa và đóng.
* 	Yêu cầu chức năng và nghiệp vụ đã được đáp ứng.
* 	Môi trường kiểm thử chấp nhận đã sẵn sàng.
* 	Hoàn thành viết Test Cases.


## 2. Conclusion
Xác định tiêu chí đầu vào cho quá trình kiểm thử là một bước cần thiết, nó giúp QA hoàn thành các nhiệm vụ kiểm tra trong thời hạn quy định mà không ảnh hưởng đến chất lượng, chức năng, hiệu quả, hiệu quả của phần mềm.


## 3. References
https://www.thinksys.com/qa-testing/entry-exit-criteria/