Không còn nghi ngờ gì nữa **Test execution (thực hiện kiểm thử)** là giai đoạn quan trọng nhất, 'xảy ra' trong vòng đời kiểm thử phần mềm (STLC) và cả vòng đời phát triển phần mềm (SDLC).

Tại sao lại nói vậy ?  

Bởi sự đóng góp công việc của mỗi đội và các thành viên trong đội qua những câu hỏi: 

* Nhà phân tích nghiệp vụ có giải thích các yêu cầu một cách chính xác không?
* Nhóm lập trình đã biên dịch các yêu cầu nghiệp vụ thành yêu cầu chức năng và mã hóa chính xác chưa?
* Kĩ sư về Databasse và Database Administrator (DBA) có thiết kế hệ thống back-end phù hợp không?

Thực hiện kiểm thử là nơi chúng ta có thể tìm thấy tất cả các câu trả lời cho những câu hỏi này. Điều đó khiến chúng ta-QA trở thành những anh hùng của toàn bộ quá trình xây dựng phần mềm, phải không? :)

**Test Execution cũng là một phần “Test” của vòng đời phát triển phần mềm SDLC.**

Khi các trường hợp kiểm thử được viết ra, chia sẻ với BA và nhóm lập trình , được xem xét bởi họ, các thay đổi sẽ được thông báo cho nhóm QA (nếu có), nhóm QA thực hiện các sửa đổi cần thiết - Giai đoạn thiết kế kiểm thử hoàn tất. Bây giờ, các trường hợp Test đã sẵn sàng nhưng không có nghĩa là chúng ta có thể bắt đầu chạy testcase. Chúng ta cần phải có một ứng dụng đã sẵn sàng cũng như một số điều kiện khác như: môi trường test sẵn sàng , thời gian , không gian test...

# 1. Hướng dẫn thực hiện kiểm thử

Bây giờ chúng ta sẽ tạo ra một danh sách tất cả những điều quan trọng để hiểu rõ hơn về giai đoạn thực hiện kiểm thử:

**1**. The build (mã được viết bởi nhóm lập trình được đóng gói ,được gọi là build- đây không là gì ngoài phần mềm có thể cài đặt (AUT), sẵn sàng triển khai vào môi trường QA. Đang được triển khai, được cài đặt và tạo sẵn cho môi trường QA là một trong những khía cạnh quan trọng nhất cần phải thực hiện để bắt đầu thực hiện kiểm thử.

**2**. Việc thực hiện kiểm thử xảy ra trong môi trường dành cho QA. Để đảm bảo rằng công việc của nhóm lập trình vẫn được thực hiện trên một môi trường khác với môi trường nhóm QA đang kiểm thử, mô hình chung là phải có môi trường dành cho nhóm lập trình và dành cho nhóm QA chuyên dụng. (Ngoài ra còn có một môi trường sản xuất để lưu trữ các ứng dụng trực tiếp). Điều này về cơ bản nhằm bảo toàn tính toàn vẹn của ứng dụng ở các giai đoạn khác nhau trong vòng đời phát triển phần mềm (SDLC). Nếu không tất cả 3 môi trường sẽ đều giống nhau về bản chất.

**3**. Số lượng thành viên trong nhóm kiểm thử không phải cố định ngay từ đầu dự án. Khi kế hoạch kiểm thử được bắt đầu, nhóm có thể chỉ có một trưởng nhóm. Trong giai đoạn thiết kế kiểm thử, một vài người được thêm vào dự án. Thực hiện kiểm thử là giai đoạn khi nhóm có số lượng tối đa.

**4**. Việc thực hiện kiểm thử cũng xảy ra trong ít nhất 2 chu kỳ (3 chu kỳ trong một số dự án). Thông thường trong mỗi chu kỳ, tất cả các trường hợp kiểm thử (toàn bộ kiểm thử) sẽ được thực thi. Mục tiêu của chu kỳ đầu tiên là xác định bất kỳ sự ngăn chặn nào, các khiếm khuyết nghiêm trọng và hầu hết các defects cao. Mục tiêu của chu kỳ đầu tiên là xác định bất kỳ lỗi nào làm khóa hệ thống, các lỗi đặc biệt nghiêm trọng và hầu hết các lỗi có mức độ ảnh hưởng lớn đến hệ thống. Mục tiêu của chu kỳ thứ hai là xác định các lỗi còn lại có mức độ ảnh hưởng lớn và trung bình đến hệ thống, sửa lại các lỗ hổng trong các kịch bản lệnh và thu thập kết quả.


**5**. Giai đoạn thực hiện kiểm thử bao gồm - Thi hành các kịch bản kiểm thử + bảo trì tập lệnh kiểm thử (các khoảng trống chính xác trong các kịch bản) + báo cáo (lỗi, trạng thái, số liệu, v.v.) Do đó, khi lập kế hoạch lịch trình và nỗ lực này cần được xem xét các khía cạnh và không chỉ thực thi tập lệnh.

**6**. Sau khi kịch bản kiểm thử được thực hiện và AUT(Application under test- Ứng dụng đang được kiểm thử ) được triển khai - và trước khi bắt đầu thực hiện kiểm thử, có một bước trung gian. Điều này được gọi là “Đánh giá sự sẵn sàng kiểm thử (TRR)”. Đây là một bước chuyển tiếp sẽ kết thúc giai đoạn thiết kế kiểm thử và giúp chúng tôi thực hiện kiểm thử.


**7**. Ngoài TRR, có rất ít kiểm thử bổ sung trước khi đảm bảo rằng có thể tiếp tục với việc chấp nhận bản build hiện tại được triển khai trong môi trường dành cho QA để thực hiện kiểm thử.

Đó là smoke và sanity tests. Thông tin chi tiết mình sẽ viết trong bài sau.

**8**. Khi hoàn thành TRR, kiểm thử smoke và sanity, các chu kỳ kiểm thử chính thức bắt đầu.

**9**. Kiểm thử thăm dò sẽ được thực hiện sau khi build đã sẵn sàng để kiểm thử. Mục đích của loại kiểm thử này là để đảm bảo các defect quan trọng được loại bỏ trước khi các cấp độ kiểm thử tiếp theo có thể bắt đầu. Kiểm thử thăm dò này được thực hiện trong ứng dụng mà không cần bất kỳ tập lệnh kiểm thử và tài liệu nào. Nó cũng giúp làm quen với AUT.

**10**. Cũng giống như với các giai đoạn khác của STLC, công việc được chia cho các thành viên trong nhóm trong giai đoạn thực hiện kiểm thử. Việc phân chia có thể dựa trên nhiều cách như phân chia theo chức năng hoặc số trường hợp kiểm thử hoặc bất kỳ cách khác có ý nghĩa.

**11**. Kết quả chính của giai đoạn thực hiện kiểm thử là ở dạng báo cáo - chủ yếu là báo cáo lỗi và báo cáo trạng thái thực hiện kiểm thử. Bạn có thể tìm thấy quy trình chi tiết để báo cáo tại các báo cáo thực hiện kiểm thử.

# 2. Cột mới trong tài liệu kiểm thử

Tài liệu kiểm thử bây giờ sẽ được mở rộng với hai cột sau đây - Trạng thái và kết quả thực tế.

**Cột trạng thái:**
Sử dụng các bước kiểm thử trên AUT, cung cấp dữ liệu kiểm thử (như được xác định trong tài liệu) và quan sát hành vi của AUT để xem liệu nó có đáp ứng kết quả mong đợi hay không. Nếu kết quả mong đợi không được đáp ứng, nó có thể được hiểu là khiếm khuyết. Trạng thái của các trường hợp này trở thành "failed", nếu kết quả mong đợi được đáp ứng, trạng thái sẽ là "pass" và nếu trường hợp này không thể được thực thi vì bất kỳ lý do nào (một lỗi hiện tại hoặc môi trường không hỗ trợ) thì trạng thái sẽ là “blocked”. Trạng thái của một trường hợp kiểm thử chưa được chạy có thể được đặt thành Không chạy / không được thực hiện hoặc có thể để trống.

Đối với một số trường hợp kiểm thử có nhiều bước, nếu một bước nhất định (ở giữa các bước trong kiểm thử) kết quả mong đợi không được đáp ứng, trạng thái kiểm thử có thể được đặt thành "Failed" ngay tại lúc đó và các bước tiếp theo không cần thực hiện.
Trạng thái "Failed" có thể được biểu thị bằng màu đỏ, nếu bạn muốn thu hút sự chú ý đến nó ngay lập tức.

**Cột kết quả thực tế:**

Đây là một vị trí mà sau khi thực hiện kiểm thử sẽ ghi lại độ chênh lệch so với kết quả mong đợi . Khi kết quả mong đợi được đáp ứng (hoặc một trường hợp kiểm thử có trạng thái là "Pass") thì có thể để trống. Bởi vì, nếu kết quả mong đợi được đáp ứng có nghĩa là kết quả thực tế = kết quả mong đợi, việc viết lại nó trong cột kết quả thực tế sẽ là một sự lặp lại và dư thừa.

Hình ảnh dẫn chứng thể hiện độ chêch lệch có thể được gắn vào cột này để tăng cường sự rõ ràng của vấn đề.

# 3. Làm thế nào để tăng tốc độ thực hiện kiểm thử của bạn ?

Các nhóm phát triển liên tục cảm thấy áp lực khi phải cung cấp phần mềm nhanh hơn mà không ảnh hưởng đến chất lượng. Với sự phổ biến ngày càng tăng của các phương pháp phát triển nhanh, đã giúp việc cân bằng cả hai trở lên dễ dàng.

Tuy nhiên, điều quan trọng nhất là phải xác định, giải quyết những vấn đề quan trọng cản trở tiến trình và làm chậm quá trình.

Kết hợp các nền tảng kiểm thử tự động hóa phù hợp và tận dụng các kỹ thuật kiểm thử song song có thể làm giảm bớt tắc nghẽn bằng cách cắt giảm thời gian thực hiện kiểm thử đi một nửa cũng như cho phép các nhóm sửa lỗi nhanh chóng như chúng được tìm thấy.

## 3.1 Kiểm thử tự động

Phần lớn kiểm thử phần mềm bao gồm thời gian chờ để xây dựng hoặc nâng cấp. Đây là nơi kiểm thử tự động vượt trội.

Phương pháp này sử dụng các công cụ và giải pháp phần mềm đặc biệt để tăng cường và kiểm soát việc thực hiện các kết quả kiểm thử dự kiến. Việc này được thực hiện với ít hoặc không có sự can thiệp từ kỹ sư QA - loại bỏ các nhiệm vụ không có kỹ năng, lặp đi lặp lại và loại bỏ dư thừa.

Ngay cả trong quá trình kiểm thử hồi quy - phụ thuộc nhiều vào các hành động “click-click-inspect” cổ điển - kiểm thử tự động có thể tiết kiệm tới 15 phần trăm thời gian của người kiểm thử.

**Kỹ thuật để tăng tốc độ kiểm thử**

Đối với tất cả các ưu điểm của nó, kiểm thử tự động vẫn đòi hỏi một mức độ nhất định của trình độ để viết kịch bản cũng như bảo trì tập tin dữ liệu. Và ngay cả các chuyên gia về QA kỳ cựu cũng có thể trở thành nạn nhân của việc phạm sai lầm và bỏ qua các bước cần thiết.

Bằng cách tinh chỉnh chiến lược tự động hóa liên tục, điều chỉnh các quy trình hiện tại của bạn, việc kiểm thử nhanh hơn có thể dễ dàng đạt được.

**Không tự động hóa mọi thứ**

Tự động hóa các bài kiểm thử của bạn sẽ làm cho mọi thứ nhanh hơn và dễ dàng hơn. Điều đó nói rằng, tự động hóa các trường hợp kiểm thử sai sẽ làm chậm tiến trình của bạn. Mỗi công ty thực hiện kiểm thử tự động vẫn thực hiện một số kiểm thử thủ công. Hiểu được các trường hợp tốt nhất cho tự động hóa sẽ ngăn bạn lãng phí thời gian quý báu.

**Giảm tỷ lệ thực hiện kiểm thử hồi quy**

Như đã đề cập trước đó, các phép kiểm thử hồi quy có thể - và nên - được tự động hóa. Những kỳ vọng của lập trình viên có thể khác xa so với khách hàng, vì vậy hãy đảm bảo có đầy đủ kiểm thử đơn vị và kết quả mong đợi của họ. Các kiểm thử dịch vụ này sẽ cắt giảm các rào cản giao tiếp giữa những người kiểm thử, người phát triển và tạo ra một kiểm thử giao diện toàn diện hơn.

**Tìm và loại bỏ các flakey test (theo cách nói dân dã là test bị failed một cách "hên xui")**

Các vấn đề không đúng sẽ làm chậm tiến độ của bạn ( ví dụ: Như khi bạn kiểm thử trên ứng dụng thực thì bị lỗi nhưng trên local thì lại không sao ). Để tránh những điều này, hãy đối phó với chúng bằng cách cô lập các flakey test đã tồn tại, trước khi chạy kiểm thử lại lần nữa. Bất cứ điều gì thất bại sau đó bạn sẽ biết vấn đề lỗi có thực sự tồn tại không .

## 3.2. Kiểm thử song song

Các nỗ lực kiểm thử thường tụt lại phía sau do các vấn đề về khả năng mở rộng thời gian cần thiết để tạo và duy trì chúng. Khi ngày càng nhiều công ty kết hợp các quy trình kiểm thử tự động, họ cũng cần phải chạy kiểm thử thủ công song song để cung cấp phản hồi nhanh hơn.

Bằng cách đồng thời xác minh tính tương thích của các chức năng mới được phát triển so với các chức năng cũ, kiểm thử song song tiết kiệm thời gian, tăng mức độ phù hợp và tăng tốc các kiểm thử. Điều này có nghĩa là không cần thêm nỗ lực nào khi các kịch bản kiểm thử thích hợp đã được phát triển.

### Kỹ thuật để tăng tốc độ kiểm thử

Để viết các bài kiểm thử song song tốt có một số hướng dẫn đơn giản để làm theo.

**Rõ ràng và súc tích**

Như với bất kỳ dự án nào, quy hoạch rõ ràng là một yếu tố then chốt. Làm vậy, đảm bảo phạm vi của mỗi bài kiểm thử là ngắn gọn và dễ hiểu. Giải thích nhu cầu, chẳng hạn như liệu các kiểm thử có dành cho một hay nhiều tính năng hay không, cũng như cách theo dõi các thay đổi mã cần thiết và kết quả toàn diện.

**Kiểm thử thăm dò**

Trong khi bạn có thể tự động hóa các kỳ vọng rõ ràng, các nhóm không bao giờ có thể dự đoán tất cả các kịch bản. Do đó, điều quan trọng là phải bao gồm kiểm thử khảo sát, khám phá để tìm hiểu thêm thông tin về cách phần mềm thực sự hoạt động. Chạy các kiểm thử này cùng với các xác nhận tự động mà bạn mong đợi phản hồi từ phần mềm.

**Đừng sáng tạo lại các kiểm thử đã tồn tại**

Cũng như trong kiểm thử tự động, các khung công tác đã tồn tại. Thay vì dành thời gian quý báu để tạo tập lệnh và kiểm thử cho mỗi lần thực thi, hãy sử dụng lại các quy trình mà bạn đã tạo hoặc tìm một quy trình trực tuyến phù hợp với nhu cầu của bạn.

### Cách xác định những vùng vấn đề sự cố

Các dự án phần mềm ngày càng phức tạp hơn bao giờ hết và việc tổ chức phù hợp là điều cần thiết để thành công. Quy trình quản lý dự án tiêu chuẩn có thể làm giảm bớt một số căng thẳng và nhầm lẫn.

* Giao tiếp là chìa khóa.

* Các file được tổ chức sắp xếp.

* Chất lượng sản phẩm không chỉ do nhóm QA mà tất cả các bộ phận liên quan đều phải đảm bảo. 

* Chiến lược kiểm thử chắc chắn.

* Kiểm thử cần nhiều thời gian thực hiện.

## 3.3. Bắt đầu

Đẩy nhanh thời gian ra thị trường là một yêu cầu tiêu chuẩn cho tất cả các tổ chức. Các phương pháp và quy trình kiểm thử chính xác có thể thực sự làm tăng tốc độ triển khai sản phẩm trong quá trình đảm bảo chất lượng.

# Tài liệu tham khảo

https://testlio.com/blog/accelerate-test-execution/
https://www.softwaretestinghelp.com/test-execution-software-testing-qa-training-on-a-live-project-day-5/