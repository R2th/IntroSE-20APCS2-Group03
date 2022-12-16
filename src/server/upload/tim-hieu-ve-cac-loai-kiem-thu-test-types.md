![](https://images.viblo.asia/260af2e9-d556-4780-a74f-b539ab98bdff.jpg)
Trong kiểm thử Test Type được chia thành 4 loại:
1. Testing of function ( Functional testing)
2. Testing of software product characteristics (Non - Functional testing)
3. Testing of software structure/architecture ( Structural testing)
4. Testing related to changes (Confirmation and regression testing)
## 1. Testing of function ( Functional testing)
Kiểm thử chức năng là kiểm tra xem hệ thống có hoạt động theo đúng theo các yêu cầu nghiệp vụ không? Kiểm thử chức năng được thực hiện ở tất cả các mức kiểm thử.
* Kiểm thử chức năng có thể thực hiện theo 2 quan điểm: requirements-based và business - process - based <br/>
  + **Requirements - based:** Sử dụng các đặc tả  yêu cầu của hệ thống làm cơ sở để design test. Một cách tốt để bắt đầu là sử dụng bảng nội dung của đặc tả yêu cầu như một danh sách các mục kiểm thử và không kiểm thử. Chúng ta nên xét độ ưu tiên của yêu cầu dựa trên các tiêu chí rủi ro và sử dụng độ ưu tiên để kiểm thử. Điều này sẽ đảm bảo những phần quan trọng nhất sẽ được kiểm thử.
  + **Business - process - based:** sử dụng các kiến thức về quy trình nghiệp vụ. Quy trình nghiệp vụ mô tả các kịch bản liên quan đến nghiệp vụ hằng ngày của hệ thống.<br/>
  **Ví dụ:** Một hệ thống quản lý nhân sự và bảng lương có thể có quy trình nghiệp vụ như sau: người nào đó gia nhập vào công ty, họ được trả lương thường xuyên và cuối cùng họ rời khỏi công ty.<br/>
Các use case bắt nguồn từ hướng đối tượng, nhưng ngày nay phổ biến nhiều là dựa trên  vòng đời phát triển phần mềm. Chúng ta có thể lấy quy trình nghiệp vụ là điểm bắt đầu. Các use case là một cơ sở rất hữu ích tạo ra các trường hợp kiểm thử từ góc nhìn về nghiệp vụ.
* Kiểm thử chức năng bao gồm 5 bước:
  + Xác định các chức năng mà phần mềm mong muốn sẽ thực hiện.
  +  Tạo các dữ liệu đầu vào dựa trên các tài liệu đặc tả kỹ thuật của các chức năng.
  +  Xác định các kết quả đầu ra dựa trên các tài liệu đặc tả kỹ thuật của các chức năng.
  +  Thực hiện các trường hợp kiêm thử.
  +  So sánh kết quả thực tế và kết quả mong muốn.
*  Các loại kiểm thử chức năng bao gồm: 
   + Kiểm thử đơn vị (Unit Testing)
   + Smoke Testing
   +  Sanity Testing
   +  Kiểm thử giao diện (Interface Testing)
   +  Kiểm thử tích hợp (Integration Testing)
   +  Kiểm thử hệ thống (System Testing)
   +  Kiểm thử hồi quy (Regression Testing)
   +  Kiểm thử chấp nhận (Acceptance Testing)
## 2. Testing of software product characteristics (Non - Functional testing)
Kiểm thử phi chức năng là các đặc tính chất lượng của hệt thống sẽ được kiểm tra. Chúng ta quan tâm đến việc mọi thứ hoạt động tốt không? Hay nhanh như thế nào? Chúng ta sẽ kiểm tra những thứ cần phải đo như thời gian phản hồi, hay bao nhiêu người có thể đăng nhập cùng một lúc? Kiểm thử phi chức năng cũng giống như kiểm thử chức năng được thực hiện ở tất cả các cấp độ kiểm thử. 
* Kiểm thử phi chức năng bao gồm:
   + Kiểm thử hiệu năng  (Performance testing)
   +  Kiểm thử khả năng chịu tải (Load testing)
   +  Kiểm thử áp lực (Stress testing)
   +  Kiểm thử tính khả dụng (Usability testing)
   +  Kiểm thử bảo trì (Maintainability testing)
   +  Kiểm thử độ tin cậy (Reliability testing)
   +  Kiểm thử tính tương thích (Portability testing)
* Các đặc điểm và các đặc điểm phụ tương ứng:
  + **Chức năng** (Functionality) gồm 5 đặc điểm phụ: sự phù hợp, chính xác, bảo mật, khả năng tương tác và tuân thủ.
   +  **Độ tin cậy** (Reliability) gồm 4 đặc điểm phụ: độ bền, khả năng chịu lỗi, khả năng phục hồi và tuân thủ.
   +  **Khả năng sử dụng** (Usability) gồm 5 đặc điểm phụ: dễ hiểu, khả năng học hỏi, khả năng hoạt động, sự thu hút và tính tuân thủ.
   +  **Tính hiệu quả** (Efficiency) gồm 3 đặc điểm phụ: thời gia (hiệu suất), sử dụng tài nguyên và tuân thủ.
   +  **Khả năng bảo trì** (Maintainability) gồm 5 đặc điểm phụ: khả năng phân tích, khả năng thay đổi, tính ổn định, khả năng kiểm tra và tuân thủ.
   +  **Tính tương thích** (Portability) gồm 5 đặc điểm phụ: khả năng thích ứng, khả năng cài đặt, cùng tồn tại, khả thăng thay thế và tuân thủ.
## 3. Testing of software structure/architecture ( Structural testing)
* Kiểm thử cấu trúc thường được gọi là "hộp trắng" hoặc "hộp thủy tinh" vì chúng quan tâm đến những gì đang xảy ra bên trong hộp.
* Kiểm thử cấu trúc thường được sử dụng như một cách đo lường của kiểm thử thông qua độ bao phủ của một tập hợp các yếu tố cấu trúc hoặc các mục bao phủ.
* Nó có thể xảy ra ở bất kỳ mức độ kiểm thử nào chủ yếu ở kiểm thử thành phần, tích hợp.
* Ở cấp độ thành phần, và mức thấp hơn trong kiểm thử tích hợp thành phần có hỗ trợ công cụ tốt để đo mức độ bao phủ của mã. Các công cụ đo lường độ bao phủ đánh giá tỉ lệ phần trăm thực thi đã được thực hiện bởi một bộ kiểm thử. Nếu độ bao phủ không phải là 100% thì các kiểm thử bổ sung có thể cần phải được viết và chạy để bao phủ những phần chưa được thực hiện.
* Các kỹ thuật được sử dụng để kiểm tra cấu trúc là kỹ thuật kiểm thử hộp trắng, các mô hình luồng điều khiển thường sử dụng để hỗ trợ kiểm thử cấu trúc.
## 4. Testing related to changes (Confirmation and regression testing)
###  4.1. Confirmation testing (Kiểm thử xác nhận)
* Khi kiểm thử bị lỗi, và chúng ta xác định nguyên nhân lỗi là do lỗi phần mềm, lỗi được báo cáo, khi một phiên bản mới của phần mềm đã sửa lỗi. Trong trường hợp này chúng ta cần thực hiện kiểm tra một lần nữa để xác định rằng lỗi thực sự đã được sửa.
* Khi thực hiện kiểm tra xác nhận điều quan trọng là phải đảm bảo rằng thử nghiệm được thực hiện chính xác giống như lần đầu tiên, sử dụng cùng một đầu vào, dữ liệu và môi trường. Nếu bây giờ đúng có nghĩa là phần mềm chính xác. Chúng ta biết rằng ít nhất một phần của phần mềm là chính xác, nhưng điều đó là không đủ. Sửa lỗi có thể gây ra một lỗi khác trong phần mềm. Cách phát hiện các bất lợi ngoài ý muốn của việc sửa lỗi là thực hiện kiểm thử hồi quy.
### 4.2. Regression testing (Kiểm thử hồi quy)
* Giống như kiểm thử xác nhận kiểm thử hồi quy liên quan đến việc thực hiện các trường hợp kiểm thử đã được thực hiện trước đó. Sự khác biệt là đối với kiểm thử hồi quy, các trường hợp kiểm thử có thể đúng ở lần cuối cùng chúng được thực thi.
* Mục đích của kiểm thử hồi quy để xác minh rằng các sửa đổi trong phần mềm hoặc môi trường không gây ra bất lợi ngoài ý muốn và hệ thống vẫn đáp ứng các yêu cầu của nó.
* Bộ kiểm thử hồi quy hoặc gói kiểm tra hồi quy là một tập hợp các trường hợp kiểm thử được sử dụng đặc biệt để kiểm tra hồi quy. Chúng được thiết kế để thực hiện hầu hết các chức năng trong một hệ thống nhưng không chi tiết bất kỳ chức năng nào. Tất cả các trường hợp trong bộ kiểm thử hồi quy sẽ được thực thi mỗi khi một phiên bản mới của phần mềm được phát hành và điều này làm cho chúng trở lên lý tưởng cho tự động hóa. 
* Kiểm thử hồi quy được thực hiện khi phần mềm thay đổi, do sửa lỗi, chức năng mới. Nó cũng là một ý tưởng tốt để thực thi chúng khi một vài khía cạnh của môi trường thay đổi.<br><br>
Tài liệu tham khảo<br>
https://www.utcluj.ro/media/page_document/78/Foundations%20of%20software%20testing%20-%20ISTQB%20Certification.pdf <br>
https://www.softwaretestingclass.com/functional-testing-vs-non-functional-testing/