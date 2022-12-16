Giao diện trong hầu hết các chức năng được các nhà thử nghiệm cũng như lập trình viên chú trọng nhất, bởi vì Giao diện người dùng là phần dễ thấy nhất của ứng dụng. Tuy nhiên, điều quan trọng ko chỉ là giao diện mà việc xác nhận thông tin được hiển thị có thể được coi là trái tim của ứng dụng hay còn gọi là DATABASE - cơ sở dữ liệu.

Hãy cùng thử xem xét một ứng dụng Ngân hàng, khi người dùng thực hiện giao dịch. Từ cơ sở dữ liệu Kiểm tra quan điểm quan trọng sau đây:

1. Ứng dụng lưu trữ thông tin giao dịch trong cơ sở dữ liệu ứng dụng và hiển thị chúng chính xác cho người dùng.
2. Không có thông tin bị mất trong quá trình.
3. Khi giao dịch chưa hoàn thành hoặc bị hủy bỏ, sẽ Không có thông tin hoạt động được thực hiện
4. Không có cá nhân trái phép được phép truy cập thông tin người dùng.

Để đảm bảo tất cả các mục tiêu trên, chúng tôi cần sử dụng xác thực dữ liệu hoặc kiểm tra dữ liệu.

## Kiểm thử cơ sở dữ liệu là gì?

Kiểm thửcơ sở dữ liệu là việc kiểm tra lược đồ (schema), bảng (table), trình kích hoạt (triggers), v.v. của cơ sở dữ liệu được kiểm tra. Nó có thể liên quan đến việc tạo các truy vấn phức tạp để kiểm tra cơ sở dữ liệu và kiểm tra mức độ đáp ứng của nó khi load/stress test. Nó kiểm tra tính toàn vẹn và nhất quán của dữ liệu.

## Sự khác biệt cơ bản giữa Kiểm thử giao diện người dùng và Kiểm thử cơ sở dữ liệu



| **Kiểm thử giao diện** | **Kiểm thử Cơ sở dữ liệu** |
| -------- | -------- |
| Loại thử nghiệm này còn được gọi là thử nghiệm Giao diện người dùng đồ họa hay thử nghiệm Front-end      | Loại thử nghiệm này còn được gọi là Thử nghiệm Back-end hoặc thử nghiệm dữ liệu.     |
| Loại thử nghiệm này chủ yếu xử lý tất cả các mục có thể kiểm tra, được mở cho người dùng xem và tương tác như Biểu mẫu, Trình bày, Đồ thị, Menu và Báo cáo, v.v. (được tạo thông qua VB, VB.net, VC ++, Delphi - Công cụ Frontend )     | Loại thử nghiệm này chủ yếu liên quan đến các mục thường được ẩn người dùng không thể xem. Chúng bao gồm quá trình lưu trữ và lưu trữ nội bộ như Assembly, DBMS like Oracle, SQL Server, MYSQL, v.v.     |
| Loại thử nghiệm này bao gồm xác nhận: <br>- Textbox<br>- Dropdowns<br>- Calendar và Button<br>- Điều hướng<br>- Hiển thị hình ảnh<br>- Oveview tổng thể ứng dụng     | Loại thử nghiệm này liên quan đến xác nhận:<br>- Schema<br- Tables<br>- Columns<br>- Keys, index<br>- Store procedure<br>- Triggers<br>- Server validation<br>- Validating dữ liệu trùng lặp     |
| Người kiểm thử phải có kiến thức về các yêu cầu kinh doanh cũng như việc sử dụng các công cụ phát triển và việc sử dụng framework và công cụ tự động hóa.     | Người kiểm thử để có thể thực hiện kiểm tra back-end phải có một nền tảng vững chắc về cơ sở dữ liệu và các khái niệm Ngôn ngữ truy vấn có cấu trúc.     |

## Các loại kiểm tra cơ sở dữ liệu

Kiểm thử cơ sở dữ liệu bao gồm 3 loại kiểm tra:
- Structural Testing (Kiểm tra kết cấu)
- Functional Testing (Thử nghiệm chức năng)
- Non-functional Testing (Thử nghiệm phi chức năng)

![](https://images.viblo.asia/44ce58f2-67a2-43eb-8acd-ab9681391057.jpg)

### 1. Structural Testing (Kiểm tra kết cấu)

Kiểm tra cấu trúc dữ liệu liên quan đến việc xác thực tất cả các yếu tố bên trong kho lưu trữ dữ liệu được sử dụng, chủ yếu để lưu trữ dữ liệu và không được phép sử dụng trực tiếp bởi người dùng cuối. Việc xác nhận các máy chủ cơ sở dữ liệu cũng rất quan trọng trong các loại thử nghiệm này. Việc hoàn thành giai đoạn này được thực hiện bởi những người thử nghiệm liên quan đến việc thành thạo các truy vấn SQL.

#### a. Schema testing (Kiểm tra lược đồ)

Khía cạnh chính của kiểm tra lược đồ là đảm bảo rằng ánh xạ lược đồ giữa Front-end và Back-end là tương tự nhau. Vì vậy, chúng tôi cũng có thể coi thử nghiệm lược đồ là thử nghiệm ánh xạ. 

Cụ thể cần:

- Xác nhận các định dạng lược đồ khác nhau liên quan đến cơ sở dữ liệu. Nhiều lần định dạng ánh xạ của bảng có thể không tương thích với định dạng ánh xạ có trong giao diện người dùng của ứng dụng.

- Cần xác minh trong trường hợp bảng / lượt xem / cột chưa được ánh xạ.
- Cần phải xác minh xem các cơ sở dữ liệu không đồng nhất trong một môi trường có phù hợp với ánh xạ ứng dụng tổng thể hay không.
Chúng ta cũng xem xét một số công cụ để xác nhận các lược đồ cơ sở dữ liệu như: 

+ DBUnit được tích hợp với Ant rất phù hợp để thử nghiệm ánh xạ.

+ SQL Server cho phép người kiểm tra có thể kiểm tra và truy vấn lược đồ của cơ sở dữ liệu bằng cách viết các truy vấn đơn giản và không thông qua mã.

Ví dụ: nếu các nhà phát triển muốn thay đổi cấu trúc bảng hoặc xóa nó, người kiểm thử sẽ muốn đảm bảo rằng tất cả các Quy trình và Chế độ xem được lưu trữ sử dụng bảng đó tương thích với thay đổi cụ thể. Một ví dụ khác có thể là nếu người kiểm tra muốn kiểm tra thay đổi lược đồ giữa 2 cơ sở dữ liệu, họ có thể làm điều đó bằng cách sử dụng các truy vấn đơn giản.

#### b. Database table, column testing (bảng cơ sở dữ liệu, cột)

- Việc ánh xạ của các trường và cột cơ sở dữ liệu ở Back-end có tương thích với các ánh xạ đó ở Front-end hay không. 
- Xác nhận quy ước về độ dài và cách đặt tên của các trường và cột cơ sở dữ liệu theo quy định của các yêu cầu.
- Xác nhận sự hiện diện của bất kỳ bảng / cột cơ sở dữ liệu chưa sử dụng / chưa được ánh xạ.
- Xác thực tính tương thích của các cột cơ sở dữ liệu phụ trợ với các cột có trong Front-end của ứng dụng: Kiểu dữ liệu và Độ dài của trường
- Liệu các trường cơ sở dữ liệu có cho phép người dùng cung cấp đầu vào như mong muốn trong yêu cầu nghiệp vụ của các tài liệu đặc tả hay không.
- Kiểm tra khóa và index, trong đó có xác định : Khóa chính, khóa ngoại, các ràng buộc đã được tạo ra trên các bảng yêu cầu
- Kiểm tra xem các tham chiếu cho khóa ngoại có hợp lệ không.
- Kiểm tra xem kiểu dữ liệu của khóa chính và khóa ngoại tương ứng có giống nhau trong hai bảng không.
- Kiểm tra xem các quy ước đặt tên cần thiết đã được tuân theo cho tất cả các khóa và chỉ mục hay chưa
- Kiểm tra kích thước và độ dài của các trường và chỉ mục cần thiết.
- Cho dù yêu cầu
- Liệu yêu cầu đã đc tạo trên các bảng như được chỉ định bởi các yêu cầu nghiệp vụ như: Clusster index, No Clusster index

#### c. Stored procedures testing (Thủ tục lưu trữ)

Cần kiểm tra các việc:
- Đã áp dụng yêu cầu cho tất cả các quy trình được lưu trữ cho tất cả các mô-đun cho ứng dụng đang được thử nghiệm hay chưa gồm: coding standard conventions, exception and error handling
         

- Đã bao gồm tất cả các điều kiện / vòng lặp hay chưa bằng cách áp dụng dữ liệu đầu vào cần thiết cho ứng dụng được thử nghiệm.
- Có áp dụng đúng các hoạt động TRIM bất cứ khi nào dữ liệu được tìm nạp từ các bảng cần thiết trong Cơ sở dữ liệu hay không?
- Việc thực hiện thủ công Thủ tục lưu trữ có cung cấp cho người dùng cuối kết quả chính xác hay không?
- Việc thực thi thủ công của Thủ tục lưu trữ có đảm bảo các trường trong bảng đang được cập nhật theo yêu cầu của ứng dụng đang thử nghiệm hay không?
- Việc thực thi các thủ tục được lưu trữ có cho phép gọi ngầm các kích hoạt được yêu cầu hay không.
- Xác nhận sự hiện diện của bất kỳ thủ tục lưu trữ không sử dụng.
- Xác thực cho điều kiện cho phép Null có thể được thực hiện ở cấp cơ sở dữ liệu.
- Xác thực thực tế là tất cả các Quy trình và Hàm được lưu trữ đã được thực hiện thành công khi Cơ sở dữ liệu được kiểm tra trống.
- Xác nhận tích hợp tổng thể của các mô-đun thủ tục được lưu trữ theo yêu cầu của ứng dụng được thử nghiệm.

Một số công cụ dùng để kiểm tra các thủ tục được lưu trữ là LINQ, SP Test tool, v.v.

#### d. Trigger testing  (Thử nghiệm kích hoạt)

- Các quy ước mã hóa cần thiết có được tuân theo trong giai đoạn mã hóa của Triggers hay không?
- Kiểm tra xem các kích hoạt được thực thi cho các giao dịch DML tương ứng có đáp ứng các điều kiện bắt buộc không.
- Liệu kích hoạt cập nhật dữ liệu chính xác một khi chúng đã được thực hiện?
- Xác thực yêu cầu kích hoạt Cập nhật / Chèn / Xóa trong lĩnh vực ứng dụng đang được thử nghiệm.

#### e. Database server validation (Xác thực máy chủ cơ sở dữ liệu)
 
![](https://images.viblo.asia/2f01966f-6423-4e67-a938-299ddcd53b77.png)

- Kiểm tra cấu hình máy chủ cơ sở dữ liệu theo quy định của các yêu cầu nghiệp vụ.
- Kiểm tra ủy quyền của người dùng được yêu cầu để chỉ thực hiện các mức hành động được yêu cầu bởi ứng dụng.
- Kiểm tra xem máy chủ cơ sở dữ liệu có thể phục vụ nhu cầu số lượng giao dịch người dùng tối đa được phép theo yêu cầu thông số kỹ thuật không

### 2. Functional Testing (Thử nghiệm chức năng)

Kiểm tra cơ sở dữ liệu chức năng theo quy định của đặc tả yêu cầu cần phải đảm bảo hầu hết các giao dịch và hoạt động được thực hiện bởi người dùng cuối phù hợp với thông số kỹ thuật yêu cầu.

Sau đây là các điều kiện cơ bản cần được quan sát để xác nhận cơ sở dữ liệu:

- Liệu trường có bắt buộc hay không trong khi cho phép giá trị NULL trên trường đó.
- Liệu chiều dài của mỗi trường có đủ kích thước?
- Liệu tất cả các trường tương tự có cùng tên trên các bảng?
- Liệu có bất kỳ trường tính toán nào có trong Cơ sở dữ liệu không?

Quá trình cụ thể này là xác nhận ánh xạ trường từ quan điểm người dùng cuối. Trong kịch bản cụ thể này, người kiểm thử sẽ thực hiện một thao tác ở cấp cơ sở dữ liệu và sau đó sẽ điều hướng đến mục giao diện người dùng có liên quan để quan sát và xác thực xem việc xác thực trường thích hợp đã được thực hiện hay chưa.

Điều kiện ngược lại, theo đó đầu tiên một thao tác được thực hiện bởi người kiểm thử tại giao diện người dùng và sau đó điều tương tự được xác nhận từ phía sau cũng được coi là một tùy chọn hợp lệ.

#### a. Kiểm tra tính toàn vẹn và nhất quán của dữ liệu

Những mục kiểm tra sau rất quan trọng, cần chú ý:

- Dữ liệu có được tổ chức hợp lý hay không
- Dữ liệu được lưu trữ trong các bảng là chính xác và theo yêu cầu kinh doanh hay chưa?
- Liệu có bất kỳ dữ liệu không cần thiết đang  có trong ứng dụng đang thử nghiệm.
- Liệu dữ liệu đã được lưu trữ theo yêu cầu đối với dữ liệu đã được cập nhật từ giao diện người dùng hay chưa.
- Các hoạt động TRIM được thực hiện trên dữ liệu trước khi chèn dữ liệu vào cơ sở dữ liệu được kiểm tra hay không?
- Các giao dịch đã được thực hiện theo đúng yêu cầu và liệu kết quả có chính xác hay không?
- Liệu dữ liệu đã đúng hay chưa khi giao dịch được thực hiện thành công theo yêu cầu kinh doanh.
- Liệu dữ liệu đã được khôi phục thành công hay chưa nếu giao dịch chưa được thực hiện thành công bởi người dùng cuối.
- Liệu dữ liệu đã được khôi phục hoàn toàn trong điều kiện giao dịch chưa được thực hiện thành công và nhiều cơ sở dữ liệu không đồng nhất có liên quan đến giao dịch được đề cập hay không.
- Các giao dịch đã được thực hiện bằng cách sử dụng các quy trình thiết kế được yêu cầu theo yêu cầu nghiệp vụ hệ thống hay chưa?

#### b. Đăng nhập và bảo mật người dùng

Các xác nhận của thông tin đăng nhập và bảo mật người dùng cần phải xem xét những điều sau đây:

- Ứng dụng có ngăn người dùng tiếp tục ứng dụng hay không trong trường hợp:
-Tên người dùng không hợp lệ nhưng mật khẩu hợp lệ
-Tên người dùng hợp lệ nhưng mật khẩu không hợp lệ.
-Tên người dùng và mật khẩu không hợp lệ.
-Tên người dùng hợp lệ và mật khẩu hợp lệ.
- Người dùng có được phép thực hiện những hoạt động cụ thể được chỉ định bởi các yêu cầu nghiệp vụ hay không (phân quyền)
- Liệu dữ liệu được bảo mật từ truy cập trái phép
- Liệu có các vai trò người dùng khác nhau được tạo với các quyền khác nhau không
- Liệu tất cả người dùng có yêu cầu cấp truy cập trên Cơ sở dữ liệu được chỉ định theo yêu cầu của thông số kỹ thuật nghiệp vụ hay không.
- Kiểm tra dữ liệu nhạy cảm như mật khẩu, số thẻ tín dụng được mã hóa và không được lưu trữ dưới dạng văn bản thuần túy trong cơ sở dữ liệu. Đảm bảo tất cả các tài khoản nên có mật khẩu phức tạp và không dễ đoán.

### 3. Non-functional Testing (Thử nghiệm phi chức năng)

Kiểm tra phi chức năng trong bối cảnh kiểm tra cơ sở dữ liệu có thể được phân loại thành các loại khác nhau theo yêu cầu kinh doanh. Chúng có thể là kiểm tra tải, Kiểm tra căng thẳng, Kiểm tra bảo mật, Kiểm tra khả năng sử dụng và Kiểm tra tương thích, v.v. Kiểm tra tải cũng như kiểm tra căng thẳng có thể được nhóm lại như Kiểm tra hiệu suất phục vụ hai mục đích cụ thể khi nói đến vai trò của kiểm tra phi chức năng.

Định lượng rủi ro - Định lượng rủi ro thực sự giúp các bên liên quan xác định các yêu cầu về thời gian đáp ứng hệ thống khác nhau theo các mức tải yêu cầu. Đây là mục đích ban đầu của bất kỳ nhiệm vụ đảm bảo chất lượng. Chúng ta cần lưu ý rằng thử nghiệm tải không giảm thiểu rủi ro trực tiếp, nhưng thông qua các quá trình xác định rủi ro và định lượng rủi ro, đưa ra các cơ hội khắc phục và động lực khắc phục sẽ giảm thiểu rủi ro.

Yêu cầu thiết bị hệ thống tối thiểu - Cấu hình hệ thống tối thiểu sẽ cho phép hệ thống đáp ứng mong đợi hiệu suất được nêu chính thức của các bên liên quan. Vì vậy, phần cứng, phần mềm bên ngoài và chi phí sở hữu liên quan có thể được giảm thiểu. Yêu cầu cụ thể này có thể được phân loại là yêu cầu tối ưu hóa kinh doanh tổng thể.

Thử nghiệm phi chức năng thường gồm: Load test, Stresstest
Để thực hiện load và stress test có thể sử dụng các tools sau để thực hiện: load runner, win runner and JMeter

## Quan niệm sai lầm hoặc hiểu lầm liên quan đến Kiểm tra cơ sở dữ liệu.

- Kiểm tra cơ sở dữ liệu đòi hỏi nhiều chuyên môn và nó là một công việc rất tẻ nhạt

Thực tế: Hiệu quả và Kiểm tra cơ sở dữ liệu hiệu quả cung cấp sự ổn định chức năng lâu dài cho ứng dụng tổng thể, do đó cần phải thực hiện công việc khó khăn đằng sau nó.

- Kiểm tra cơ sở dữ liệu thêm tắc nghẽn công việc thêm

Thực tế: Ngược lại, kiểm tra cơ sở dữ liệu tăng thêm giá trị cho toàn bộ công việc bằng cách tìm ra các vấn đề tiềm ẩn và do đó chủ động giúp cải thiện ứng dụng tổng thể.

- Kiểm tra cơ sở dữ liệu làm chậm quá trình phát triển tổng thể

Thực tế: Kiểm tra cơ sở dữ liệu giúp cải thiện chất lượng tổng thể cho ứng dụng cơ sở dữ liệu.

- Kiểm tra cơ sở dữ liệu có thể quá tốn kém

Thực tế: Bất kỳ chi phí nào cho kiểm tra cơ sở dữ liệu là một khoản đầu tư dài hạn dẫn đến sự ổn định lâu dài và mạnh mẽ của ứng dụng. Do đó, chi phí cho kiểm tra cơ sở dữ liệu là cần thiết.

**Tóm tắt**: 

Trên đây là những nội dung ngắn gọn về Kiểm thử cơ sở dữ liệu mà mình tìm hiểu được, hiểu đơn giản cũng giống như kiểm thử UI của hệ thống có khác chút là kiểm tra trên hệ thống cơ sở dữ liệu, và 1 phần tương tác giữ UI và dữ liệu. Mong rằng giúp ích ít nhiều cho những ai còn thiếu kinh nghiệm về mảng này

***Tài liệu tham khảo***: https://www.guru99.com/data-testing.html