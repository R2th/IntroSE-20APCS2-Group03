Có hai loại kiểm thử phần mềm cơ bản đó là:

**1. Functional testing - kiểm thử chức năng.**

Danh sách các funtion testing phổ biến: 
- Unit testing - Kiểm thử đơn vị.
- Integration testing - Kiểm thử tích hợp.
- System testing - Kiểm thử hệ thống.
- Sanity testing. 
- Smoke testing.
- Interface testing - Kiểm thử giao diện.
- Regression testing - Kiểm thử hồi quy.
- Beta/Acceptance testing - Kiểm thử chấp nhận.

**2. Non-functional testing - Kiểm thử phi chức năng.**

Danh sách các non - funtion testing phổ biến: 
- Performance Testing - Kiểm thử hiệu năng.
- Load testing - Kiểm thử tải.
- Stress testing.
- Volume testing.
- Security testing - Kiểm thử bảo mật.
- Compatibility testing - Kiểm thử khả năng tương tác.
- Install testing - Kiểm thử cài đặt.
- Recovery testing - Kiểm thử phục hồi.
- Reliability testing - Kiểm thử độ tin cậy.
- Usability testing - Kiểm thử khả năng sử dụng.
- Compliance testing.
- Localization testing.

Hãy cùng tìm hiểu về chi tiết về các loại thử nghiệm:

**1. Alpha Testing**

Đây là loại test phổ biến nhất được sử dụng trong ngành công nghiệp phần mềm. Mục tiêu của thử nghiệm này là xác định tất cả các issue hoặc bug có thể xảy ra trước khi release sản phẩm (bản production).
Thử nghiệm Alpha được thực hiện vào cuối giai đoạn phát triển phần mềm nhưng trước khi thử nghiệm Beta được thực hiện. Trong giai đoạn Alpha này các bug có độ ưu tiên thấp được tìm thấy trong giai đoạn test trước đó sẽ được fix ở giai đoạn này. Thử nghiệm Alpha được thực hiện trên trang web của nhà phát triển. 

**2. Acceptance Testing**

Được thực hiện bởi khách hàng và mục đích là verify xem các flow làm việc của hệ thống có đúng theo spec hay nhu cầu của end-user hay không? Khách hàng chỉ chấp nhận phần mềm khi tất cả các tính năng và chức năng hoạt động tốt và đúng như mong đợi.
Đây là giai đoạn thử nghiệm cuối, sau giai đoạn này phần mềm sẽ được đẩy lên production. Giai đoạn này cũng được gọi là User Acceptance Testing (UAT).

**3. Ad-hoc Testing**

Đây là một loại thử nghiệm đặc biệt, nó sẽ không có các test case và cũng không có test plan hoặc document nào thay thế cho loại thử nghiệm này. Mục tiêu của thử nghiệm này là tìm ra các bug/defect và phá vỡ (break) ứng dụng bằng cách thực hiện bất kỳ flow nào của ứng dụng hoặc bất kỳ chức năng nào một cách ngẫu nhiên nhất. Và nó có thể được thực hiện bởi bất kỳ ai trong team dự án. Rất khó để xác định các bug/defetch nếu không có test case nhưng đôi khi có thể các bug được tìm thấy trong quá trình Ad-hoc Testing có thể không được tìm thấy bằng các test case mà tester đã viết.

**4. Accessibility Testing**

Mục đích của Accessibility Testing là để xác định xem phần mềm hoặc ứng dụng có thể truy cập được đối với người khuyết tật hay không? Ở đây khuyết tật có nghĩa là điếc, mù màu, khuyết tật tâm thần, mù, tuổi già và các nhóm khuyết tật khác. Các kiểm tra khác cũng được thực hiện như kích thước phông chữ cho người khiếm thị, màu sắc và độ tương phản cho mù màu,...

**5. Beta Testing**

Là một loại thử nghiệm phần mềm được thực hiện bởi khách hàng. Loại thử nghiệm này sẽ được thực hiện trong Real Environment trước khi release sản phẩm ra thị trường mà người dùng là end-user.

Thử nghiệm Beta được thực hiện để đảm bảo rằng không có bug lớn trong phần mềm hoặc sản phẩm và nó đáp ứng được các yêu cầu về nghiệp vụ từ góc nhìn của end-user. Thông thường, phiên bản Beta của phần mềm hoặc sản phẩm được phát hành sẽ  giới hạn với một số lượng người dùng nhất định trong một khu vực cụ thể.

**6. Back-end Testing**

Bất cứ khi nào một input đầu vào hoặc dữ liệu được nhập vào ứng dụng, nó sẽ lưu trữ trong cơ sở dữ liệu và việc kiểm tra cơ sở dữ liệu đó được gọi là Database Testing hoặc Backend testing. Có các hệ quản trị cơ sở dữ liệu khác nhau như SQL Server, MySQL và Oracle,...

Database testing bao gồm kiểm tra structure, schema, stored procedure, data structure,... của database. Kiểm tra back-end không bao gồm kiểm tra GUI, tester sẽ được làm việc trực tiếp với cơ sở dữ liệu với quyền truy cập phù hợp và tester có thể dễ dàng verify dữ liệu bằng cách chạy một vài query truy vấn trên cơ sở dữ liệu. Một số các issuse cần được xác định như mất dữ liệu, deadlock, data corruption,... Trong quá trình kiểm tra này các issue mang tính critical sẽ được fix trước khi hệ thống đi vào môi trường production.

**7. Browser Compatibility Testing**

Là một loại của Compatibility Testing và được thực hiện bởi team test.
Browser Compatibility Testing được thực hiện cho các ứng dụng web và nó đảm bảo rằng phần mềm có thể chạy với sự kết hợp giữa trình duyệt và các hệ điều hành khác nhau. Loại thử nghiệm này cũng verify xem ứng dụng web có chạy được trên tất cả các phiên bản của tất cả các trình duyệt hay không.

**8. Backward Compatibility Testing**

Mục đích của thử nghiệm này nhằm xác định xem phần mềm mới được phát triển hoặc phần mềm đã được cập nhật so với phiên bản cũ trên cùng một môi trường có hoạt động tốt hay không?

**9. Black Box Testing**

Thiết kế hệ thống nội bộ (Internal system design) không được xem xét trong loại thử nghiệm này. Việc test sẽ được thực hiện dựa trên requirement và chức năng.

**10. Boundary Value Testing**

Loại thử nghiệm này sẽ kiểm tra hành vi của ứng dụng ở cấp độ biên.
Boundary Value Testing được thực hiện để kiểm tra xem có tồn tại bug ở các giá trị biên hay không. Được sử dụng để kiểm tra phạm vi của các con số. Sẽ có một biên trên và dưới cho mỗi phạm vi test.

*Vi dụ:*
Nếu việc test được yêu cầu kiểm tra trong phạm vi các số từ 1 đến 500 thì các giá trị biên được thực hiện test sẽ là 0, 1, 2, 499, 500 và 501.

**11. Branch Testing**

Đây là một loại thử nghiệm hộp trắng và được thực hiện trong quá trình thực hiện unit test. 

**12. Comparison Testing**

So sánh điểm mạnh và điểm yếu của hệ thống/ứng dụng với các phiên bản trước đó hoặc các sản phẩm tương tự khác được gọi là Thử nghiệm so sánh.

**13. Compatibility Testing**

Compatibility Testing sẽ validate cách mà phần mềm hoạt động và chạy trong các môi trường khác nhau: web servers, hardware, and network environment. Compatibility Testing đảm bảo rằng phần mềm có thể chạy trên các cấu hình khác nhau, cơ sở dữ liệu khác nhau, các trình duyệt khác nhau và trên các phiên bản khác nhau của ứng dụng. Và nó được thực hiện bởi team test.

**14. Component Testing**

Chủ yếu được thực hiện bởi team dev sau khi hoàn thành giai đoạn unit test. Component Testing bao gồm kiểm tra các chức năng dưới dạng single code và mục đích là xác định xem sau khi connect các chức năng đó với nhau thì có gây ra bug hay không?

**15. End-to-End Testing**

Tương tự như kiểm tra hệ thống, End-to-End Testing bao gồm kiểm tra một ứng dụng hoàn chỉnh trên môi trường giả lập gần giống nhất với môi trường production, chẳng hạn như tương tác với cơ sở dữ liệu, sử dụng giao tiếp mạng hoặc tương tác với phần cứng, ứng dụng hoặc hệ thống khác.

**16. Equivalence Partitioning**

Đây là một trong những kỹ thuật kiểm tra của kiểm thử hộp đen. Trong Equivalence Partitioning - kỹ thuật phân vùng tương đương này, một tập các nhóm được chọn và một vài giá trị hoặc số được chọn để kiểm tra. Điều này được hiểu rằng tất cả các giá trị được chọn từ cùng một nhóm sẽ cho ra cùng một kết quả output. Mục đích của thử nghiệm này là để loại bỏ các trường hợp thử nghiệm dư thừa trong một nhóm các tập đầu vào cụ thể.

Giả sử, ứng dụng chấp nhận các giá trị trong khoảng từ -10 đến +10, vậy sử dụng phân vùng tương đương các giá trị được chọn để kiểm tra là 0, một giá trị dương, một giá trị âm ->Phân vùng tương đương cho thử nghiệm này là: -10 đến -1, 0 và 1 đến 10.

**17. Example Testing**

Nó có nghĩa là real-time testing. Example Testing bao gồm real-time scenario và nó cũng liên quan đến các kịch bản dựa trên kinh nghiệm của người kiểm tra.

**18. Exploratory Testing**

Là thử nghiệm không chính thức (informal testing) được thực hiện bởi team test. Mục tiêu của thử nghiệm này là khám phá ứng dụng và tìm kiếm các bug/defect tồn tại trong ứng dụng. Đôi khi các bug/defect có thể xảy ra trong quá trình test này, và đôi khi đó là các bug nghiêm trọng.
Trong quá trình test này, tester nên thực hiện theo flow với các output đầu ra đã test trước đó. Kỹ thuật này được thực hiện mà không cần có tài liệu hay test case.

**19. Functional Testing**

Loại thử nghiệm này bỏ qua các phần bên trong hệ thống và chỉ tập trung vào đầu ra để kiểm tra xem nó có đúng với spec hay không. Đây là một loại thử nghiệm hộp đen.

**20. Graphical User Interface (GUI) Testing**

Mục tiêu của kiểm tra GUI là xác nhận GUI theo yêu cầu nghiệp vụ. GUI của ứng dụng sẽ được thể hiện trong màn hình mockup và tài liệu thiết kế chi tiết (Detailed Design Document).

Kiểm tra GUI bao gồm kiểm tra kích thước của các nút và các trường nhập có trên màn hình, cách căn chỉnh tất cả văn bản, bảng và nội dung trong bảng, validate menu của ứng dụng. Sau khi chọn các item khác nhau trên menu/sub menu, GUI testing sẽ xác nhận xem trang có bị fluctuate hay không và căn chỉnh của trang vẫn được giữ nguyên sau khi di chuột trên menu chính hoặc sub-menu. (*còn tiếp*)

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
***Link tham khảo:***
- https://www.softwaretestinghelp.com/types-of-software-testing/