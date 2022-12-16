Trong kiểm thử phần mềm, các thuật ngữ như trường hợp kiểm thử (test case) và lỗi được đề cập thường xuyên.  Khi lập kế hoạch kiểm thử ứng dụng, người ta ước tính rằng 70% công việc dành cho viết test case và thực hiện test case.

Tuy nhiên, chính xác một test case là gì? Chúng tôi định nghĩa một test case là một tài liệu bằng văn bản cung cấp thông tin toàn diện về kiểm tra cái gì và cách kiểm tra. Một test case bao gồm các thông tin như mục tiêu, mô tả, các bước chính xác và quan trọng nhất là đầu ra dự kiến của thử nghiệm theo kế hoạch.

![](https://images.viblo.asia/fbbc4f34-a08f-4807-bd60-cad9385357f8.png)

### Một test case tốt mang lại hiệu quả gì?

Ai làm nghề QA, Tester cũng nhận thức được tầm quan trọng của các test case và viết test case là một giai đoạn thiết yếu của chu trình kiểm thử. Tuy nhiên, đôi khi các test case không được viết cẩn thận dẫn đến test case có chất lượng kém. Nếu các test case được viết tốt và cẩn thận sẽ mang lại nhiều lợi ích cho cá nhân chạy test case, cũng như cho dự án, lợi ích như:

- Giảm công sức xem xét test case và thực hiện test case

Một test case được viết tốt sẽ dễ hiểu và do đó mất ít thời gian hơn để xem xét và thực hiện. Trong một nhóm, nhiều khả năng việc thực hiện test case sẽ  bởi một thành viên trong nhóm không phải là người viết test case, do đó các test case tốt luôn tiết kiệm thời gian và giảm giao tiếp qua lại giữa các thành viên.

- Xác định sớm các thiếu sót trong vòng đời dự án 

Thiết kế test case yêu cầu nắm bắt tất cả các kịch bản tích cực cũng như tiêu cực. Ghi lại những chi tiết đó đòi hỏi một quá trình suy nghĩ có tổ chức và sự hiểu biết đầy đủ về ứng dụng được thử nghiệm, từ đó giúp xác định các thiếu sót trong  thiết kế và chức năng.

- Giúp đạt được phạm vi kiểm tra tối đa 

Test case chính là chỉ số phản ánh phạm vi kiểm tra theo kế hoạch. Trong các dự án định hướng quy trình, mỗi test case sẽ được xem xét  để xác định phạm vi  trước khi được phê duyệt để thực hiện. Việc viết test case sẽ đảm bảo rằng các chức năng và quan điểm kiểm thử, phạm vi kiểm thử sẽ không bị bỏ sót.

### Một test case bao gồm những gì?

Tùy vào yêu cầu của từng dự án mà test case có thể thiết kế khác nhau. Nhưng thông thường một test case thường có những nội dung chính sau

- Test Case Name/Title: Thể hiện đối tượng sẽ kiểm thử là gì (chức năng gì? màn hình nào? ...)
- Objective/Purpose of the test case: Thể hiện mục đích của test case này
- Preconditions: Thể hiện các điều kiện tiên quyết, ví dụ như các phụ thuộc hay các bước đã hoàn thành
- Data test: Điều này có thể không cần thiết cho mọi test case nhưng một số trường hợp thử nghiệm yêu cầu dữ liệu đầu vào đặc biệt. Do đó cần ghi lại những dự liệu này để kịch bản được thực hiện chính xác
- Test steps: Thể hiện chi tiết các thao tác thực hiện mà không được thiếu hoặc thừa thao tác nào
- Expected Results: Thể hiện mong muốn đầu ra của kịch bản
- Pass/Fail Status: Sau khi thực hiện kiểm thử sẽ cập nhật kết quả vào trường này
- Enviroment: Thể hiện môi trường kịch bản được thực hiện
- Comments: Những lưu ý cần lưu lại khi thực hiện test case này

### Làm sao để viết test case tốt hơn?

![](https://images.viblo.asia/6df48440-991e-449c-9373-ad59cf119509.jpg)

**1. Tạo các test case từ quan điểm của người dùng cuối**

Mục tiêu cuối cùng của việc tạo ra test case là đáp ứng yêu cầu của khách hàng. Nếu chúng ta viết test case mà không có trải niệm mình như là người dùng cuối thì khả năng cao chúng ta sẽ để lọt lỗi hoặc kịch bản viết ra không phù hợp với thế giới thực.
Bởi vậy hãy luôn thao tác với sản phẩm như một người dùng cuối, chúng ta sẽ thấy được nhiều luồng di chuyển có thể gây ra lỗi.

 
**2. Kiến thức về lĩnh vực của ứng dụng**


Kiến thức về lĩnh vực kinh doanh của phần mềm là cốt lõi của bất kỳ ứng dụng phần mềm nào. (ví dụ kiến thức về tài chính ngân hàng,, kiến thức về mảng y tế giáo dục hay tiền ảo...)
Các quy tắc kinh doanh có thể thay đổi  và có thể ảnh hưởng lớn đến các chức năng kinh doanh. Thiếu kiến thức về business ứng dụng sẽ dẫn đến việc không hiểu yêu cầu, chức năng của ứng dụng, viết sai mong muốn của test case sẽ ảnh hưởng lớn đến kinh doanh, có thể gây ra thua lỗ cho khách hàng.

Bởi vậy hãy tìm hiểu về lĩnh vực kinh doanh của ứng dụng để có cái nhìn chính các về các chức năng và các đặc tả yêu cầu của dự án.

**3. Tránh giả định**


Đừng giả sử bất cứ điều gì, hãy bám vào Tài liệu đặc điểm kỹ thuật. Giả sử tính năng và chức năng của ứng dụng phần mềm có thể tạo ra khoảng cách giữa thông số kỹ thuật  và sản phẩm đang được phát triển, điều này cũng có thể ảnh hưởng đến doanh nghiệp.

**4. Đính kèm tài liệu có liên quan**

Luôn có những tài liệu thể hiện sự thay đổi yêu cầu hay vấn đề có liên quan đến kịch bản cần thử nghiệm. 
Tốt hơn cả là bạn ghi lại những tài liệu đó vào test case. Nó giúp theo dõi những thay đổi lớn trong ứng dụng của bạn tại thời điểm giao sản phẩm hoặc giúp bạn hiểu những logic khó hiểu mà không thể giải thích bằng các bước kiểm tra.

**5. Tránh viết các thao tác lặp lại**

Nếu những kịch bản cần phải thực hiện nhiều lần, hãy nhờ đến sự trợ giúp của Test Automation. Nó cũng giúp giảm nỗ lực thủ công và tăng giá trị cho sản phẩm. Các trường hợp thử nghiệm nên được viết sao cho chúng có thể được sử dụng lại bởi bất kỳ nhóm nào khác cho bất kỳ dự án nào khác.


**6. Một test case chỉ kiểm tra một điều**

Luôn đảm bảo rằng test case chỉ kiểm tra một điều, nếu bạn cố kiểm tra nhiều điều kiện trong một trường hợp kiểm tra, việc theo dõi kết quả và lỗi sẽ trở nên rất khó khăn.


**8. Ngôn ngữ test case dễ hiểu**

Hãy dùng những thuật ngữ ngắn gọn và rõ nghĩa khi viết test case. Không nên diễn đạt các bước dài dòng như văn xuôi. Hãy bắt đầu thao tác bằng một động từ. Một test case cũng không nên có quá nhiều thao tác.

Với những test case về giao diện, hãy đính kèm hình ảnh. Với những test case về chức năng, hãy chia nhỏ chức năng thành từng phần và viết lần lượt từng phần đó.
Cấu trúc test case nên được chia nhỏ và rõ ràng, giúp quá trình thay đổi test case dễ dàng hơn.

**9. Viết test case độc lập**

Các test case không nên có sự phụ thuộc vào các test case khác, tức là bạn sẽ có thể thực hiện riêng trường hợp thử nghiệm của mình mà không phụ thuộc vào kết quả các trường hợp thử nghiệm khác.

Viết test case là một công việc tốn thời gian và khá thường xuyên lặp đi lặp lại, nhưng nếu thực hiện một cách cẩn thận thì sẽ giúp quá trình thực hiện kiểm tra dễ dàng hơn và hiệu quả hơn.

Tham khảo: 
https://www.tothenew.com/blog/top-9-tips-to-write-effective-test-cases/
https://qa.world/writing-good-test-cases/