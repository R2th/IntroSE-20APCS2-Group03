### Agile Testing là gì?
AGILE TESTING là thực hiện kiểm thử tuân theo các quy tắc và nguyên tắc của phát triển phần mềm agile. Không giống như phương pháp Waterfall, Agile Testing có thể bắt đầu khi bắt đầu dự án với sự tích hợp liên tục giữa phát triển và kiểm thử. Phương pháp Agile Testing không tuần tự (nghĩa là nó chỉ được thực thi sau giai đoạn phát triển) mà là liên tục.
Trong bài viết này, chúng ta sẽ thảo luận về:

- Kế hoạch kiểm thử Agile.
- Các chiến lược kiểm thử Agile.
- Phần tư thử nghiệm Agile.
- Thách thức của QA với phát triển phần mềm Agile.
- Rủi ro về Tự động hóa trong Quy trình Agile.
### I. Agile Test Plan

Agile test plan bao gồm các loại thử nghiệm được thực hiện trong lần lặp đó như yêu cầu dữ liệu thử nghiệm, cơ sở hạ tầng, môi trường thử nghiệm và kết quả thử nghiệm. Không giống như mô hình waterfall, trong mô hình agile, một kế hoạch thử nghiệm được viết và cập nhật cho mỗi bản phát hành. Các kế hoạch thử nghiệm điển hình trong agile bao gồm:

1. Phạm vi thử nghiệm
2. Các chức năng mới đang được thử nghiệm
3. Mức độ hoặc Các loại thử nghiệm dựa trên độ phức tạp của tính năng
4. Kiểm tra tải và hiệu suất
5. Xem xét cơ sở hạ tầng
6. Kế hoạch giảm thiểu hoặc rủi ro
7. Nguồn lực
8. Chuyển giao và các cột mốc

### II. Agile Testing Strategies
Vòng đời kiểm thử Agile trải dài qua bốn giai đoạn

![](https://images.viblo.asia/4659a330-89d0-4d90-bb1d-c3ef25dfb50b.png)

**Iteration 0**

Trong giai đoạn đầu tiên hoặc lần lặp 0, bạn thực hiện các tác vụ thiết lập ban đầu. Nó bao gồm xác định những người để kiểm tra, cài đặt công cụ kiểm tra, lập lịch tài nguyên (phòng thí nghiệm kiểm tra khả năng sử dụng), v.v. Các bước sau được thiết lập để đạt được trong Lặp lại 0

a) Thiết lập nghiệp vụ cho dự án

b) Thiết lập các điều kiện ranh giới và phạm vi dự án

c) Vạch ra các yêu cầu chính và các trường hợp sử dụng sẽ thúc đẩy sự đánh đổi thiết kế

d) Phác thảo một hoặc nhiều kiến trúc ứng viên

e) Xác định rủi ro

f) Dự toán chi phí và chuẩn bị một dự án sơ bộ

**Construction Iterations**

Giai đoạn thứ hai của phương pháp kiểm thử nhanh là Lặp lại xây dựng, phần lớn kiểm thử xảy ra trong giai đoạn này. Giai đoạn này được quan sát như một tập hợp các lần lặp lại để xây dựng phần gia tăng của giải pháp. Để làm được điều đó, trong mỗi lần lặp lại, nhóm thực hiện kết hợp các phương pháp thực hành từ XP, Scrum, mô hình Agile và dữ liệu nhanh, v.v.

Trong quá trình lặp lại xây dựng, nhóm nhanh nhẹn tuân theo thực tiễn yêu cầu ưu tiên: Với mỗi lần lặp, họ lấy các yêu cầu thiết yếu nhất còn lại từ ngăn xếp hạng mục công việc và thực hiện chúng.

Quá trình lặp lại xây dựng được phân thành hai, thử nghiệm xác nhận và thử nghiệm điều tra. Thử nghiệm xác nhận tập trung vào việc xác minh rằng hệ thống đáp ứng mục đích của các bên liên quan như đã mô tả cho nhóm cho đến nay và được thực hiện bởi nhóm. Trong khi thử nghiệm điều tra phát hiện vấn đề mà nhóm xác nhận đã bỏ qua hoặc bỏ qua. Trong thử nghiệm Điều tra, người thử nghiệm xác định các vấn đề tiềm ẩn dưới dạng các câu chuyện lỗi. Thử nghiệm điều tra giải quyết các vấn đề chung như thử nghiệm tích hợp, thử nghiệm tải / căng thẳng và thử nghiệm bảo mật.

Một lần nữa, thử nghiệm xác nhận có hai khía cạnh là thử nghiệm dành cho nhà phát triển và thử nghiệm chấp nhận nhanh. Cả hai đều được tự động hóa để cho phép kiểm tra hồi quy liên tục trong suốt vòng đời. Thử nghiệm xác nhận là tương đương nhanh của thử nghiệm đối với đặc điểm kỹ thuật.

Kiểm thử chấp nhận Agile là sự kết hợp giữa kiểm thử chức năng truyền thống và kiểm thử chấp nhận truyền thống khi nhóm phát triển và các bên liên quan cùng thực hiện. Trong khi thử nghiệm nhà phát triển là sự kết hợp giữa thử nghiệm đơn vị truyền thống và thử nghiệm tích hợp dịch vụ truyền thống. Thử nghiệm nhà phát triển xác minh cả mã ứng dụng và lược đồ cơ sở dữ liệu.

**Release End Game Or Transition Phase**

Mục tiêu của “Release, End Game” là triển khai thành công hệ thống của bạn vào sản xuất. Các hoạt động bao gồm trong giai đoạn này là đào tạo người dùng cuối, người hỗ trợ và người vận hành. Ngoài ra, nó bao gồm tiếp thị việc phát hành sản phẩm, sao lưu và phục hồi, hoàn thiện hệ thống và tài liệu người dùng.

Giai đoạn thử nghiệm phương pháp nhanh cuối cùng bao gồm thử nghiệm toàn bộ hệ thống và thử nghiệm chấp nhận. Để hoàn thành giai đoạn thử nghiệm cuối cùng của bạn mà không gặp bất kỳ trở ngại nào, bạn phải kiểm tra sản phẩm nghiêm ngặt hơn khi nó đang trong quá trình lặp lại xây dựng. Trong khi trò chơi kết thúc, người kiểm tra sẽ làm việc với các câu chuyện lỗi của nó.

**Production**

Sau giai đoạn xuất xưởng, sản phẩm sẽ chuyển sang giai đoạn sản xuất.
### III. The Agile Testing Quadrants

![](https://images.viblo.asia/47af446a-0e16-470d-9174-90d8ec85841f.png)

Các góc phần tư kiểm thử agile phân tách toàn bộ quá trình thành bốn Góc phần tư và giúp hiểu cách kiểm tra nhanh được thực hiện.

**Agile Quadrant I** 

Chất lượng mã nội bộ là trọng tâm chính trong góc phần tư này và nó bao gồm các trường hợp thử nghiệm theo hướng công nghệ và được triển khai để hỗ trợ nhóm, nó bao gồm

1. Bài kiểm tra đơn vị
2. thử nghiệm thành phần

**Agile Quadrant II**

Nó chứa các trường hợp thử nghiệm theo hướng kinh doanh và được triển khai để hỗ trợ nhóm. Góc phần tư này tập trung vào các yêu cầu. Loại thử nghiệm được thực hiện trong giai đoạn này là

1. Kiểm tra các ví dụ về các tình huống và quy trình công việc có thể xảy ra
2. Kiểm tra trải nghiệm người dùng chẳng hạn như nguyên mẫu
3. Thử nghiệm theo cặp

**Agile Quadrant III**

Góc phần tư này cung cấp phản hồi cho góc phần tư một và hai. Các trường hợp kiểm thử có thể được sử dụng làm cơ sở để thực hiện kiểm thử tự động hóa. Trong góc phần tư này, nhiều vòng đánh giá lặp đi lặp lại được thực hiện để tạo niềm tin vào sản phẩm. Loại thử nghiệm được thực hiện trong góc phần tư này là

1. Kiểm tra khả năng sử dụng
2. Thử nghiệm thăm dò
3. Ghép nối thử nghiệm với khách hàng
4. Thử nghiệm cộng tác
5. Kiểm tra sự chấp nhận của người dùng

**Agile Quadrant IV**

Góc phần tư này tập trung vào các yêu cầu phi chức năng như hiệu suất, bảo mật, độ ổn định, v.v. Với sự trợ giúp của góc phần tư này, ứng dụng được tạo ra để cung cấp các chất lượng phi chức năng và giá trị mong đợi.

1. Kiểm tra phi chức năng như kiểm tra căng thẳng và hiệu suất
2. Kiểm tra bảo mật liên quan đến xác thực và hack
3. Kiểm tra cơ sở hạ tầng
4. Thử nghiệm di chuyển dữ liệu
5. Kiểm tra khả năng mở rộng
6. Kiểm tra tải

### V. QA challenges with agile software development

a) Khả năng xảy ra lỗi nhiều hơn trong linh hoạt, vì tài liệu được ưu tiên ít hơn, cuối cùng gây áp lực nhiều hơn cho nhóm QA

b) Các tính năng mới được giới thiệu nhanh chóng, làm giảm thời gian có sẵn cho các nhóm thử nghiệm để xác định xem các tính năng mới nhất có phù hợp với yêu cầu hay không và nó có thực sự phù hợp với doanh nghiệp không

c) Người kiểm tra thường được yêu cầu đóng vai một nhà phát triển bán được chuyển

d) Các chu kỳ thực hiện kiểm tra được nén nhiều

e) Rất ít thời gian để chuẩn bị kế hoạch kiểm tra

f) Đối với thử nghiệm hồi quy, chúng sẽ có thời gian tối thiểu

g) Thay đổi vai trò của họ từ vai trò người gác cổng về chất lượng thành đối tác về Chất lượng

h) Các thay đổi và cập nhật yêu cầu vốn có trong một phương pháp nhanh nhẹn, trở thành thách thức lớn nhất đối với QA


### VI. Risk of Automation in Agile Process

- Giao diện người dùng tự động cung cấp mức độ tin cậy cao, nhưng chúng thực thi chậm, dễ bảo trì và tốn kém để xây dựng. Tự động hóa có thể không cải thiện đáng kể năng suất kiểm tra trừ khi người kiểm tra biết cách kiểm tra
- Các thử nghiệm không đáng tin cậy là một mối quan tâm lớn trong thử nghiệm tự động. Việc khắc phục các thử nghiệm không đạt và giải quyết các vấn đề liên quan đến thử nghiệm giòn phải là ưu tiên hàng đầu để tránh dương tính giả
- Nếu kiểm tra tự động được bắt đầu theo cách thủ công thay vì thông qua CI (Tích hợp liên tục) thì có nguy cơ chúng không chạy thường xuyên và do đó có thể gây ra lỗi kiểm tra
- Kiểm tra tự động không thay thế cho kiểm tra thủ công thăm dò. Để có được chất lượng mong đợi của sản phẩm, cần có sự kết hợp của các loại và cấp độ thử nghiệm
- Nhiều công cụ tự động hóa có sẵn trên thị trường cung cấp các tính năng đơn giản như tự động hóa việc chụp và phát lại các trường hợp thử nghiệm thủ công. Công cụ như vậy khuyến khích thử nghiệm thông qua giao diện người dùng và dẫn đến một thử nghiệm vốn đã giòn và khó bảo trì. Ngoài ra, việc lưu trữ các trường hợp kiểm thử bên ngoài hệ thống kiểm soát phiên bản tạo ra sự phức tạp không cần thiết
- Để tiết kiệm thời gian, nhiều khi kế hoạch kiểm tra tự động hóa được lập kế hoạch kém hoặc không có kế hoạch dẫn đến việc kiểm tra không thành công
- Quy trình thiết lập và loại bỏ thử nghiệm thường bị bỏ qua trong quá trình tự động hóa thử nghiệm, trong khi Thực hiện thử nghiệm thủ công, quy trình thiết lập và loại bỏ thử nghiệm nghe có vẻ liền mạch
- Các chỉ số về năng suất, chẳng hạn như một số trường hợp thử nghiệm được tạo hoặc thực hiện mỗi ngày có thể gây hiểu lầm đáng kể và có thể dẫn đến việc đầu tư lớn vào việc chạy các thử nghiệm vô ích
- Các thành viên của nhóm tự động hóa nhanh phải là những nhà tư vấn hiệu quả: dễ tiếp cận, hợp tác và tháo vát, nếu không hệ thống này sẽ nhanh chóng bị lỗi
- Tự động hóa có thể đề xuất và cung cấp các giải pháp thử nghiệm yêu cầu bảo trì liên tục quá nhiều so với giá trị được cung cấp
- Thử nghiệm tự động có thể thiếu chuyên môn để hình thành và đưa ra các giải pháp hiệu quả
- Kiểm thử tự động có thể thành công đến mức họ hết các vấn đề quan trọng cần giải quyết và do đó chuyển sang các vấn đề không quan trọng.

### Conclusion

Phương pháp Agile trong kiểm thử phần mềm liên quan đến việc kiểm tra càng sớm càng tốt trong vòng đời phát triển phần mềm. Nó đòi hỏi sự tham gia của khách hàng cao và mã thử nghiệm ngay khi có sẵn. Mã phải đủ ổn định để thử nghiệm hệ thống. Kiểm tra hồi quy mở rộng có thể được thực hiện để đảm bảo rằng các lỗi đã được sửa và kiểm tra.

Nguồn tham khảo: https://www.guru99.com/agile-testing-a-beginner-s-guide.html
https://reqtest.com/testing-blog/agile-testing-principles-methods-advantages/