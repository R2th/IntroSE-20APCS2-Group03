*System testing* và *Acceptance Testing* đều là *dynamic testing* và đều được dùng để validate tất cả các yêu cầu của hệ thống, phần mềm.
### System testing - Kiểm thử hệ thống là gì? 
- **System testing** - Kiểm thử hệ thống là một loại kiểm thử hộp đen được thực hiện trên ứng dụng khi nó đã được phát triển hoàn chỉnh (đã dev xong).  Vì vậy, kiến thức về internal design hoặc structure hoặc code là không cần thiết cho loại thử nghiệm này. 
- Đây là một loại kiểm thử ứng dụng mà khi test sẽ không có giao diện thực sự. Kiểm tra hệ thống ở đây có thể là kiểm tra chức năng và kiểm tra phi chức năng. Trong loại thử nghiệm này việc test tập trung nhiều hơn vào chức năng của toàn bộ hệ thống. Hành vi của ứng dụng được kiểm tra để kiểm tra xem nó có đáp ứng các yêu cầu đã đưa ra hay không. Các test case và data test sẽ được áp dụng test ở loại thử nghiệm này. Trong thử nghiệm tích hợp hệ thống, tester sẽ tích hợp các modules khác nhau và kiểm tra giao diện giữa chúng để kiểm tra tính toàn vẹn dữ liệu.

- Các kỹ thuật kiểm thử được sử dụng trong System testing là:
    - Functional testing - Kiểm thử chức năng
    - GUI testing/Usability testing - Kiểm thử GUI/Kiểm thử khả năng sử dụng
    - Security testing - Kiểm thử bảo mật
    - Performance testing - Kiểm thử hiệu suất
### Acceptance Testing - Kiểm thử chấp nhận là gì?
- Đây là kiểm thử chính thức - *formal testing* liên quan đến nhu cầu, yêu cầu của end-user và quy trình nghiệp vụ của hệ thống nhằm mục đích xác định xem hệ thống có đáp ứng được các yêu cầu đã đặt ra trước đó và có được end-user chấp nhận hay không?
- **Acceptance Testing** - Kiểm thử chấp nhận là một thử nghiệm chức năng thuần túy để kiểm tra hành vi hệ thống với dữ liệu thực. Nó cũng được gọi là thử nghiệm người dùng nghiệp vụ - *business user testing*. 
- Việc kiểm thử này được thực hiện bởi người dùng cuối - *end-user* để kiểm tra xem hệ thống đã xây dựng có phù hợp với yêu cầu của khách hàng hay không? 
- Trong thử nghiệm này, tất cả các giao diện sẽ được kết hợp lại với nhau và sẽ tiến hành kiểm tra trên hệ thống được code hoàn chỉnh. Các kỹ thuật kiểm tra chức năng được sử dụng cho loại thử nghiệm này là phân tích giá trị biên, chia phần tương đương, bảng quyết định. Loại thử nghiệm này tập trung chủ yếu vào thử nghiệm xác nhận của hệ thống - *validation testing of system*.
- Trong quá trình test này chúng ta sẽ chia thành 2 level:
    1. **Alpha Testing**: trong quá trình test này team test sẽ verify ứng dụng với môi trường giả lập gần giống nhất với môi trường thật sử dụng ứng dụng cùng với sự có mặt của end-user.
    2. **Beta testing**: Quá trình test này sẽ được thực hiện bởi end-user và ứng dụng sẽ được test trong môi trường thật cùng với sự có mặt của team release.
### Sự khác nhau giữa System Testing và Acceptance Testing


| **System Testing** | **Acceptance Testing** | 
| -------- | -------- | 
| System Testing là kiểm tra end to end được thực hiện để kiểm tra hệ thống có hoạt động đúng với spec đã đề ra hay không?     |  Acceptance Testing là kiểm tra các chức năng của phần mềm xem nó có đáp ứng đúng yêu cầu của khách hàng đã đề ra hay không?     |
|  Được thực hiện bởi dev và tester | Được thực hiện bởi tester, stakeholder và khách hàng  |
|  Bao gồm kiểm thử chức năng và phi chức năng     |   Là kiểm thử chức năng thuần túy   |
|  Kiểm tra phần mềm hoạt động như thế nào?    | Kiểm tra xem phần mềm có đáp ứng nhu cầu kinh doanh của khách hàng hay không, tính khả dụng của sản phẩm     |
|   Chỉ thực hiện test với data demo, không test với data production   | Thực hiện test với data thật - real data, data production     |
| Validate toàn bộ hệ thống với các thông số kỹ thuật phần mềm, phần cứng đã được xác định trước     |  Validate việc thực hiện các yêu cầu của người dùng trong hệ thống phần mềm    |
| Bao gồm System Testing và System Integration testing     |Bao gồm alpha testing và beta testing      |
|   System testing được thực hiện trước khi thực hiện Acceptance testing  |   Acceptance testing được thực hiện trước khi thực hiện System testing   |
| Liên quan đến Non-Functional testing sẽ kiểm tra là: performance load - hiệu suất và stress testing - khả năng chịu tải     |  Liên quan đến Functional testing sẽ kiểm tra là: boundary value analysis - phân tích giá trị biên, equivalence partitioning - phân vùng tương đương và decision table - bảng quyết định    |
| Do được thực hiện bởi team test, nên nó sẽ bao gồm các case negative test     |    Bao gồm các case positive test  |
|  Kiểm tra hệ thống với tất cả (các kết hợp) đầu vào có thể xảy ra   Kiểm tra hệ thống với tất cả (các kết hợp) đầu vào có thể xảy ra | Kiểm tra hệ thống với dữ liệu đầu vào random    |
| Không có sự tương tác với các giao diện bên ngoài. Ví dụ như hệ thống, phần cứng, phần mềm khác,..     |  Có sự tương tác với các giao diện bên ngoài    |
|  Các loopholes hoặc error được tìm thấy trong quá trình system testing được coi là lỗi/defect và nó sẽ được fix ở local của dev    |    Các defect được tìm thấy trong quá trình test này thường sẽ được xem là failures  |
### System Testing và Acceptance Testing được tiến hành như thế nào?


|  | **System Testing** | **Acceptance Testing**|
| -------- | -------- | -------- |
|**Điều kiện tiên quyết**      |    1. Unit test đã được hoàn thành  |  1. System Testing đã được hoàn thành    |
|      |    2. Phần mềm đã được phát triển hoàn chỉnh  |   2. Các yêu cầu về nghiệp vụ hệ thống đã được hoàn chỉnh   |
|      |    3. Môi trường dành cho System Testing đã được chuẩn bị  |     3. Môi trường dành cho UAT đã được chuẩn bị |
| **Quy trình**     |  1. Tạo system test plan    |   1. Phân tích yêu cầu nghiệp vụ   |
|      |    2. Tạo system test cases  |   2. Tạo UAT test plan   |
|      |    3. Tạo data test |  3. Xác định các kịch bản UAT test    |
|      |  4. Execute test    | 4. Tạo UAT test cases     |
|      |  5. Log và fix bug    | 5. Execute test UAT     |
|      |   6. Lặp lại các bước trên   |    6. Confirm lại các đối tượng nghiệp vụ  |
|  **Tiêu chí**  |  1. Các bug có tag “Fix immediately”,”fix on priority”,.. sẽ được ưu tiên fix và verify ngay lập tức    |    1.Không có các critical defects và các case liên quan  |
|      |  2. Bất kỳ lỗi nào có độ ưu tiên là medium sec được approve bởi project manager/ business analyst    |  2. Flow nghiệp vụ hoạt động tốt   |
|      |   3. Tất cả các test cases đều passed   |   3. Việc approve của UAT sẽ được thực hiện bởi khách hàng hoặc stakeholders   |
|      |   4. Không có case test liên quan đến security   |      |



----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

*Link tham khảo:*
- https://www.softwaretestingclass.com/difference-between-system-testing-and-acceptance-testing/ 
- http://www.professionalqa.com/system-testing-vs-acceptance-testing
- https://www.quora.com/What-is-the-difference-between-system-integration-testing-and-user-acceptance-testing
-https://www.javatpoint.com/system-testing-vs-acceptance-testing