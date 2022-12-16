# I. Kiểm thử cơ sở dữ liệu (Database Testing) là gì?
Kiểm thử cơ sở dữ liệu là đi vào kiểm tra biểu đồ, các bảng và trigger… của cơ sở dữ liệu. Bao gồm việc tạo ra các truy vấn phức tạp để kiểm thử tải / nén và kiểm tra các phản hồi của dữ liệu. Và kiểm tra tính toàn vẹn và nhất quán của dữ liệu.

## II. Sự khác biệt cơ bản giữa kiểm thử giao diện người dùng và dữ liệu.
![](https://images.viblo.asia/418dafe2-3915-40b9-8434-dac1ee78fae8.png)
| **Kiểm thử giao diện người dùng** | **Kiểm thử cơ sở dữ liệu/dữ liệu** | 
| -------- | -------- | -------- |
| Loại kiểm thử này còn được gọi là kiểm thử giao diện đồ họa người dùng hay kiểm thử Font-end | Loại kiểm thử này còn được gọi là kiểm thử dữ liệu hay kiểm thử Back-end | 
| Kiểu kiểm thử này chủ yếu được sử dụng cho tất cả các items được mở cho người dùng xem và tương tác tới nó như Forms, Presentation, Menus, Graphs và Reports,... (được tạo ra thông qua VB, VB.NET, VC++, Các công cụ Delphi–Frontend)  | Kiểu kiểm thử này chủ yếu được sử dụng cho tất cả các items mà người dùng không nhìn thấy. Chúng bao gồm các tiến trình và lưu trữ như Asembly, DBMS như Oracle, SQL server. MYSQL,... | 
| Kiểu kiểm thử này thực hiện kiểm tra: textbox, selectbox, calendars và buttons, phân trang, hiển thị hình ảnh cũng như nhìn và cảm nhận tổng quan từ ứng dụng. | Kiểu kiểm thử này thực hiện kiểm tra: schema (giản đồ), các bảng cơ sở dữ liệu, các cột, các khóa và index (chỉ mục), xác thực cơ sở dữ liệu máy chủ, xác thực sự trùng lặp data. | 
| Tester phải hiểu về các yêu cầu nghiệp vụ cũng như sử dụng các công cụ phát triển, framework và các tool tự động để kiểm thử. | Để thực hiện được kiểm thử back-end tester cần phải có kiến thức nền tảng vững chắc trong cơ sở dữ liệu và cấu trúc câu lệnh truy vấn trong cơ sở dữ liệu. |

# III. Các loại kiểm thử cơ sở dữ liệu
![](https://images.viblo.asia/0d319a06-5f08-4e1c-8501-9f7874d6856e.png)
Có 3 kiểu kiểm thử dữ liệu đó là:
1. Structural testing (Kiểm thử cấu trúc)
2. Functional testing (Kiểm thử chức năng)
3. Non-Functional testing (Kiểm thử phi chức năng)

Tìm hiểu chi tiết về mỗi loại và từng loại nhỏ hơn của Database testing.
## 1. Kiểm thử cấu trúc cơ sở dữ liệu
Kiểm thử cấu trúc dữ liệu bao gồm việc xác nhận tính hợp lệ của tất cả các yếu tố bên trong kho lưu trữ dữ liệu được sử dụng chủ yếu để lưu trữ dữ liệu và không cho end user thao tác trực tiếp. Việc xác nhận sự hợp lệ của cơ sở dữ liệu cũng là sự cân nhắc quan trọng trong các loại kiểm thử này. Các tester thành thạo các truy vấn SQL sẽ hoàn thành kiểm thử này.

## 2. Kiểm thử giản đồ (Schema testing)
Khía cạnh chính schema testing là đảm bảo rằng việc lập schema giữa front end và back end sẽ như nhau. Do đó, chúng ta cũng có thể tham khảo schema testing như là kiểm thử ánh xạ (**mapping testing**). 

Một số điều quan trọng trong schema testing:
* Xác nhận các định dạng schema khác nhau liên kết với cơ sở dữ liệu. Nhiều định dạng mapping của bảng có thể không tương thích với định dạng mapping có trong giao diện người dùng của ứng dụng.
* Cần xác minh trong trường hợp các bảng /các view/ cột chưa được ánh xạ.
* Cũng cần phải xác minh xem cơ sở dữ liệu không đồng nhất trong một môi trường có phù hợp với ứng dụng mapping tổng thể hay không. 

Một số công cụ thú vị để xác nhận các giản đồ cơ sở dữ liệu:
* DBUnit được tích hợp với Ant rất phù hợp cho việc kiểm thử ánh xạ.
* SQL Server cho phép Tester có thể kiểm tra và truy vấn schema của cơ sở dữ liệu bằng cách viết các câu truy vấn đơn giản và không thông qua mã code. 
Ví dụ: nếu developer muốn thay đổi cấu trúc bảng hoặc xóa nó, Tester sẽ muốn đảm bảo rằng tất cả các Stored Procedures và Views được sử dụng bảng sẽ tương thích với sự thay đổi đó. 
Một ví dụ khác: Tester muốn kiểm tra các thay đổi schema giữa 2 cơ sở dữ liệu, họ có thể làm điều đó bằng cách sử dụng các câu truy vấn đơn giản.

## 3. Kiểm thử bảng và cột cơ sở dữ liệu 
Những cách để kiểm thử cơ sở dữ liệu:
1. Kiểm tra các ánh xạ trong các trường và các cột của cơ sở dữ liệu trong back end có tương thích với những ánh xạ trong front end hay không.
2. Xác nhận độ dài và quy ước đặt tên của các trường  và các cột của cơ sở dữ liệu như  mô tả yêu cầu.
3. Xác nhận xem có bất kỳ bảng / cột cơ sở dữ liệu nào không sử dụng / chưa được khai thác không.
4. Xác nhận tính tương thích của:
     * Kiểu dữ liệu
     * Độ dài trường 
     của các cột cơ sở dữ liệu back end với các cột dữ liệu front end của ứng dụng.
5. Kiểm tra xem các trường cơ sở dữ liệu có cho phép người dùng cung cấp đầu vào mà người dùng mong muốn theo yêu cầu đặc tả nghiệp vụ hay không.

## 4. Kiểm thử các Khóa và các chỉ mục
Tầm quan trọng của việc kiểm tra các khóa và các chỉ mục:
1. Kiểm tra sự ràng buộc giữa các bảng:
     * Khóa chính - Primary Key 
     * Khóa ngoại - Foreign Key
2. Kiểm tra sự hợp lệ của khóa ngoại
3. Kiểm tra xem kiểu dữ liệu của khoá chính và khoá ngoại của hai bảng có tương thích không
4. Kiểm tra các quy ước đặt tên có được tuân thủ cho tất cả các khóa và chỉ mục hay không. 
5. Kiểm tra xem kích cỡ và chiều dài của các trường và các chỉ mục được yêu cầu.
6. Kiểm tra xem các Clustered index và Non clustered index được tạo ra trong các bảng đã đúng theo yêu cầu nghiệp vụ chưa

## 5. Kiểm thử chức năng (Functional database testing)
Việc kiểm thử cơ sở dữ liệu chức năng theo đặc tả yêu cầu cần đảm bảo hầu hết các giao dịch và hoạt động được thực hiện bởi end user phải phù hợp với thông số kỹ thuật.
Các điều kiện cơ bản để xác thực cơ sở dữ liệu:
* Các trường là bắt buộc thì có cho phép giá trị NULL không?
* Độ dài của mỗi trường đã đúng chưa?
* Các trường tương tự nhau có cùng tên trong các bảng không?
* Trong cơ sở dữ liệu có trường nào được tính toán không?
Qui trình này nhằm xác nhận tính hợp lệ của việc mapping các trường từ quan điểm của end user. Trong kịch bản cụ thể, Tester sẽ thao tác với các dữ liệu cơ bản và tiếp theo sẽ chuyển tới giao diện người dùng có liên quan để xác thực tính hợp lệ của các trường?
Ngược lại, Tester cũng có thể kiểm tra giao diện người dùng và sau đó xác nhận từ phía back end cũng có thể coi là một hoạt động hợp lệ.

## 6. Kiểm tra tính toàn vẹn và nhất quán của dữ liệu
Cần follow theo nhưng quan điểm sau:
1. Dữ liệu có được sắp xếp hợp lý hay không
2. Các dữ liệu được lưu trữ trong các bảng có chính xác và theo yêu cầu nghiệp vụ hay không.
3. Có bất kỳ dữ liệu không cần thiết nào trong ứng dụng đang được kiểm thử hay không. 
4. Dữ liệu đã được cập nhật từ giao diện người dùng có được lưu trữ theo đúng yêu cầu không
5. Dữ liệu có được TRIM trước khi chèn dữ liệu vào cơ sở dữ liệu không.
6. Các giao dịch đã được thực hiện theo các thông số yêu cầu nghiệp vụ hay chưa và kết quả có chính xác không
7. Dữ liệu đã đúng chưa nếu giao dịch được thực hiện thành công theo các yêu cầu nghiệp vụ.
8. Nếu end user thực hiện giao dịch không thành công thì dữ liệu có được roll back đúng không 
9. Khi giao dịch thực hiện không thành công thì dữ liệu và nhiều dữ liệu không đồng nhất đã tham gia vào giao dịch có được roll back thành công không
10. Các giao dịch đã được thực hiện bằng cách sử dụng các thủ tục cần thiết phải theo đúng yêu cầu nghiệp vụ của hệ thống

## 7. Kiểm thử thủ tục (Stored procedures testing)
Những điểm nhất cần được xác nhận cho các Store procedure.
1. Xác thực xem đội phát triển đã tuân thủ các yêu cầu về:
* coding conventions
* Ngoại lệ và xử lý lỗi
cho tất cả các Stored Procedure cho tất cả các modules cho ứng dụng đang kiểm tra hay không.
2. Kiểm tra xem đã kiểm soát được tất cả điều kiện/vòng lặp bằng cách nhập dữ liệu được yêu cầu cho ứng dụng.
3. Kiểm tra xem dữ liệu có được TRIM đúng khi được lấy từ các bảng yêu cầu trong cơ sở dữ liệu hay chưa.
4. Việc thực thi thủ công của Stored Procedure có cung cấp cho end user kết quả được yêu cầu hay không.
5. Việc thực thi thủ công của Stored Procedure có đảm bảo các trường trong bảng được cập nhật theo yêu cầu của ứng dụng đang kiểm tra hay không.
6. Kiểm tra xem việc thực thi Stored Procedure có cho phép ẩn các trình kích hoạt được yêu cầu hay không.
7. Xác nhận xem có bất cứ Stored Procedures không còn được sử dụng không.
8. Xác nhận điều kiện Allow Null có thể được thực thi ở bất kỳ cấp độ cơ sở dữ liệu nào.
9. Xác nhận là tất cả các thủ tục và hàm được lưu trữ đã được thực hiện thành công khi Cơ sở dữ liệu đang thử nghiệm là blank.
10. Xác nhận sự tích hợp tổng thể của các mô-đun Stored Procedure theo yêu cầu của ứng dụng đang được kiểm tra.
Một vài công cụ hỗ trợ cho kiểm thử stored procedures là: LINQ, SP,…

## 8. Trigger testing (kiểm tra trình kích hoạt)
1. Kiểm tra xem các quy ước mã hóa (coding convension) được yêu cầu có được tuân theo trong suốt giai đoạn coding của các Trigger hay không.
2. Kiểm tra xem các trigger được thực thi cho các giao dịch DML (Data Manipulation Language: ngôn ngữ thao tác dữ liệu)tương ứng đã hoàn thành các điều kiện yêu cầu hay chưa.
3. Kiểm tra xem trigger có cập nhật dữ liệu một cách chính xác khi thực thi hay không.
4. Xác nhận các chức năng Update/Insert/Delete Triggers được yêu cầu trong phạm vi ứng dụng đang được kiểm tra.

## 9. Xác thực cơ sở dữ liệu máy chủ 
![](https://images.viblo.asia/568f93eb-d95b-4c7a-84c2-27f4e87910ac.png)
1. Kiểm tra cấu hình cơ sở dữ liệu server theo các yêu cầu nghiệp vụ.
2. Kiểm tra quyển truy cập của người dùng được khi người dùng chỉ thao tác được ở cấp độ mà ứng dụng yêu cầu.
3. Kiểm tra xem database server có thể đáp ứng số lượng giao dịch người dùng tối đa được chỉ định bởi các đặc tả yêu cầu nghiệp vụ hay không

## 10. Đăng nhập và bảo mật người dùng
Việc xác thực thông tin đăng nhập và bảo mật người dùng cần phải xem xét những điều sau đây.
1. Kiểm tra xem ứng dụng có chặn người dùng tiếp tục thực thi trong ứng dụng trong trường hợp:
* tên người dùng không hợp lệ nhưng mật khẩu hợp lệ
* tên người dùng hợp lệ nhưng mật khẩu không hợp lệ.
*  tên người dùng không hợp lệ và mật khẩu không hợp lệ.
*  tên người dùng hợp lệ và mật khẩu hợp lệ.
2. Kiểm tra xem người dùng có được phép chỉ thực hiện những hoạt động theo các yêu cầu nghiệp vụ hay không.
3. Kiểm tra xem dữ liệu có được bảo vệ khỏi truy cập trái phép hay không
4. Kiểm tra xem có các vai trò người dùng khác nhau được tạo thông qua các quyền khác nhau hay không
5. Kiểm tra xem tất cả người dùng có được cấp quyền truy cập vào Cơ sở dữ liệu được chỉ định theo yêu cầu của các thông số kỹ thuật nghiệp vụ hay không.
6. Kiểm tra xem dữ liệu nhạy cảm như mật khẩu, số thẻ tín dụng đã được mã hóa và không được lưu trữ dưới dạng văn bản thuần túy trong cơ sở dữ liệu. Đó là 1 phương pháp tốt để đảm bảo tất cả các tài khoản nên có mật khẩu phức tạp và không dễ đoán.

### Kiểm thử phi chức năng
Kiểm thử phi chức năng trong bối cảnh kiểm tra cơ sở dữ liệu có thể được phân loại thành các loại khác nhau theo yêu cầu nghiệp vụ. Có thể là: Load Testing, Stress Testing, Security Testing, Usability Testing và Compatibility Testing và còn một số loại khác nữa. Load testing cũng tương tự như stress testing, nó có thể được nhóm lại dựa trên Performance Testing nhằm phục vụ hai mục đích cụ thể khi nói đến vai trò của kiểm thử phi chức năng.

### Định lượng rủi ro 
Định lượng rủi ro thực sự giúp các các bên liên quan xác định các yêu cầu về thời gian đáp ứng của hệ thống khác nhau theo các mức tải được yêu cầu. Đây là mục đích
ban đầu của bất kỳ nhiệm vụ đảm bảo chất lượng nào. Cần lưu ý rằng kiểm thử tải không giảm thiểu rủi ro trực tiếp, nhưng thông qua các quá trình xác định rủi ro và định lượng rủi ro sẽ thể hiện các cơ hội khắc phục và động lực để khắc phục sẽ giúp giảm thiểu rủi ro.

### Yêu cầu tối thiểu của hệ thống thiết bị 
Sự hiểu biết mà chúng ta quan sát thông qua việc kiểm tra chính thức, cấu hình tối thiểu của hệ thống sẽ cho phép hệ thống đáp ứng các mong đợi về hiệu suất được nêu bởi các bên liên quan. Vì vậy, phần cứng, phần mềm không liên quan và chi phí sở hữu liên quan có thể được giảm thiểu. Yêu cầu cụ thể này có thể được phân loại là yêu cầu tối ưu hóa nghiệp vụ tổng thể.

## 11. Kiểm thử tải (Load testing)
Mục đích của bất kì kiểm thử tải nào cũng nên rõ ràng dễ hiểu và đủ tài liệu dẫn chứng.

Các loại cấu hình sau đây là cần thiết để Kiểm thử tải.
1. Các giao dịch người dùng được sử dụng thường xuyên nhất có thể ảnh hưởng đến hiệu suất của tất cả các giao dịch khác nếu chúng không hiệu quả.
2. Cần có ít nhất một giao dịch người dùng không chỉnh sửa trong bộ kiểm thử cuối cùng phải, do đó hiệu suất của các giao dịch này có thể được phân biệt với các giao dịch phức tạp khác.
3. Các giao dịch quan trọng hơn nhằm tạo thuận lợi cho các mục tiêu chính của hệ thống cần được đưa vào, vì theo định nghĩa, sự thất bại trong các giao dịch này có ảnh
hưởng lớn nhất.
4. Cần phải có ít nhất một giao dịch có thể chỉnh sửa để có thể phân biệt được các giao dịch đó với các giao dịch khác.
5. Quan sát thời gian đáp ứng tối ưu theo số lượng lớn người dùng ảo cho tất cả các yêu cầu tương lai.
6. Việc quan sát thời gian cần có để tìm kiếm các bản ghi khác nhau.

Công cụ kiểm thử tải quan trọng là: load runner, win runner và JMeter.

## 12. Kiểm thử nén (Stress testing)
Stress testing còn được xem là kiểm tra giày vò nhất vì nó nén ứng dụng đang kiểm tra với lượng tải lớn các công việc rồi dẫn đến hệ thống gặp lỗi. Điều này giúp xác định các lỗi của hệ thống.

Một số công cụ kiểm thử nén quan trọng như là: loaod runner, win runner và JMeter.
Các vấn đề thường xảy ra nhất trong khi kiểm tra cơ sở dữ liệu là:
1. Chi phí có thể phát sinh để xác định trạng thái của các giao dịch cơ sở dữ liệu.
2. Giải pháp: cần có kế hoạch và thời gian cho tiến trình tổng thể để không có vấn đề nào về thời gian và chi phí xuất hiện.
3. Dữ liệu kiểm tra mới phải được thiết kế sau khi dọn dẹp dữ liệu kiểm tra cũ.
4. Giải pháp: có kế hoạch và phương pháp cho việc tạo dữ liệu kiểm tra.
5. Một trình tạo SQL là cần thiết để xác nhận tính hợp lệ của SQL nhằm đảm bảo các truy vấn SQL sẽ thích hợp cho việc xử lý các trường hợp kiểm tra cơ sở dữ liệu cần thiết.
6. Giải pháp: Bảo trì các truy vấn SQL và cập nhật liên tục là một phần quan trọng của quá trình kiểm tra tổng thể và nên là một phần của chiến lược kiểm tra tổng thể.
7. Điều kiện tiên quyết được đề cập ở trên đảm bảo rằng việc thiết lập quy trình kiểm tra cơ sở dữ liệu có thể tốn kém cũng như tốn thời gian.
8. Giải pháp: Cần có sự cân bằng giữa chất lượng và thời gian biểu dự án tổng thể.
![](https://images.viblo.asia/3f473b9a-d9b6-4f7d-8dac-e0db7cd69c3d.png)

# IV. Quan niệm sai lầm liên quan đến kiểm tra cơ sở dữ liệu
1. Kiểm tra cơ sở dữ liệu đòi hỏi rất nhiều chuyên môn và đây là một công việc rất tẻ nhạt
* Thực tế: Kiểm tra cơ sở dữ liệu hiệu quả mang đến sự ổn định chức năng lâu dài cho ứng dụng tổng thể, do đó rất cần thiết để đưa nó vào công việc khó khăn đằng sau.
2. Kiểm tra cơ sở dữ liệu mang lại thêm nút thắt công việc
* Thực tế: Ngược lại, kiểm tra cơ sở dữ liệu bổ sung thêm giá trị cho công việc tổng thể bằng cách tìm ra các vấn đề ẩn và do đó tích cực giúp cải thiện ứng dụng tổng thể.
3. Kiểm tra cơ sở dữ liệu làm chậm quá trình phát triển tổng thể
* Thực tế: kiểm tra cơ sở dữ liệu giúp cải thiện đáng kể tổng thể chất lượng cho ứng dụng cơ sở dữ liệu.
4. Kiểm tra cơ sở dữ liệu có thể quá tốn kém
* Thực tế: Bất kỳ chi phí nào cho việc kiểm tra cơ sở dữ liệu đều là đầu tư dài hạn, dẫn đến sự ổn định lâu dài và tính bền vững của ứng dụng. Do đó chi tiêu cho việc kiểm tra cơ sở dữ liệu là cần thiết.

# V. Bài học  
1. Tất cả dữ liệu bao gồm siêu dữ liệu cũng như dữ liệu chức năng cần phải được xác thực theo ánh xạ của chúng bằng các tài liệu thông số kỹ thuật được yêu cầu.
2. Việc xác minh dữ liệu kiểm thử đã được tạo ra bởi / tham vấn với nhóm phát triển cần phải được xác nhận.
3. Xác nhận dữ liệu đầu ra bằng cách sử dụng cả thủ tục tự động cũng như thủ công.
4. Triển khai các kỹ thuật khác nhau như kỹ thuật vẽ đồ thị hiệu ứng nguyên nhân, kỹ thuật phân vùng tương đương và kỹ thuật phân tích giá trị biên để tạo ra các điều
kiện dữ liệu thử nghiệm bắt buộc.
5. Các quy tắc xác nhận tính toàn vẹn tham chiếu cho các bảng cơ sở dữ liệu cũng cần phải được xác nhận hợp lệ.
6. Việc lựa chọn các giá trị bảng mặc định để xác nhận tính nhất quán của cơ sở dữ liệu là rất quan trọng. Đó là các event log đã được thêm
thành công vào cơ sở dữ liệu cho tất cả các event đăng nhập được yêu cầu
7. Các công việc theo lịch trình có thực thi đúng lúc không?
8. Thực hiện sao lưu kịp thời Cơ sở dữ liệu.

Link reference: https://www.guru99.com/data-testing.html