Mô hình hóa nghiệp vụ là cụm từ được nhắc rất nhiều trong khi anh em làm spec, làm tài liệu.  Chúng ta có thể định nghĩa như sau: Mô hình hóa là sự trừu tượng hóa sự vật, hiện tượng trong thế giới thực. Trong đó mô hình hóa quy trình nghiệp vụ là sự mô tả bằng hình vẽ chuỗi các hoạt động của quy trình nghiệp vụ thực tế. Khi chúng ta làm công việc này thì chúng ta một phần nào đó cũng diễn tả một hay nhiều khía cạnh của hệ thống, xác định diễn biến những hành động có thể xảy ra của hệ thống giúp cho đội phát triển có thế dev một cách chính xác hơn. 

Khoảng cách giữa người làm kỹ thuật và người biết nghiệp vụ đó chính là người làm kỹ thuật thì chỉ hiểu các ngôn ngữ kỹ thuật, cài đặt và làm thế nào đó cho hệ thống thực thi; còn người làm nghiệp vụ chỉ hiểu ngôn ngữ nghiệp vụ của họ thôi. Vì vậy để giải quyết vẫn đề này thì chúng ta cần có mô hình nào giảm thiểu sự nhập nhằng về ngôn ngữ giúp cho cả hai bên đều có thể hiểu được và đạt được mục đích cuối cùng là làm ra một sản phẩm vừa đáp ứng được nhu cầu nghiệp vụ, vừa có thể thực thi được. Từ đó đưa ra giải pháp là mô hình BPMN - *Business Process Model Notation*.
# 1. BPMN là gì ?
**BPMN** là cụm từ viết tắt `Business Process Modeling Notation`, chúng ta có thể hiểu BPMN là tập hợp các ký hiệu để mô hình hóa trực quan các quy trình nghiệp vụ xử lý.

![](https://images.viblo.asia/23991ea6-6731-447e-ba41-44b45a359172.png)

Mục đích chính là cung cấp các ký hiểu để giúp cả người không làm kỹ thuật lần người làm kỹ thuật dễ hểu, dễ đọc. Đối với dân lập trình viên thì có trách nhiệm trong việc cài đặt, triển khai, vận hành, sử dụng công nghệ. Đối với dân business thì sẽ chịu trách nhiệm quản lý, giám sát quy trình và nghiệm thu kết quả.



Nhìn vảo ảnh trên chúng ta có thể thấy được **BPMN** được coi như là công cụ để kết nối giữa việc phân tích quy trình nghiệp vụ và việc triển khai, cài đặt.

# 2. Lịch sử phát triển
BPMN được phát triển bới Business Process Management Initiative (BPMI).

Phiên bản 1.0 được release vào 5-2004.

6-2005, BPMI sát nhập với OMG-Object Management Group. `BPMN Specification document` được release bởi OMG vào 2-2006. 

Phiên bản 2.0 được phát triển vào năm 2010, và nó được release vào 12-2013.

Phiên bản mới nhất 2.0.2 được ISO chính thức xuất bản dưới dạng tiêu chuẩn ISO/IEC 19510 với một số tính năng mở rộng như sau:
*  Hình thức hóa được ngữ nghĩa
*  Có sự tương quan giữa các sự kiện
*  Thêm nhiều ký hiệu tương tác với user
*  Choreography model

Các phiên bản 1.2 trở về trước thì các ký hiệu chưa nhất quán, một số ký hiệu bị nhập nhằng về ngữ nghia.
![](https://images.viblo.asia/70e0869d-da04-4715-bc2e-2c67a9804792.png)


# 3. Lợi ích
Khi chúng ta lấy yêu cầu trong buổi họp với khách hàng, một điều đặc biệt khi chúng ta làm việc với khách hàng có rất nhiều sự khó khăn khi tiếp cận với quy trình nghiệp vụ của họ. Nhiều khi chúng ta chưa mường tượng nó ra cái gì nhưng vẫn phải lắng nghe và take not vào. Sau đó về phải làm document lại. Mỗi khách hàng, mỗi doanh nghiệp lại khác nhau về quy trình nghiệp vụ, phức tạp. Document sao cho ngắn gọn, dễ đọc, dễ hiểu mà vẫn đảm bảo được đúng nội dung mà khách hàng yêu cầu. BPMN chính là giải pháp cho chúng ta.

![](https://images.viblo.asia/d73777de-4e77-4642-8c91-428ac0b5fab8.png)

Ưu điểm :
*  Nhiều ký hiệu gần gũi quen thuộc với đời sống hằng ngày nên nhìn vào có thể hiểu được 70-80% nó đang làm cái gì cho cả dân biết tech và non-tech.
*  Mô tả rõ ràng, hạn chế nhập nhằng, dễ đọc, dễ hiểu.
*  Phát sinh ra ngôn ngữ thực thi BPEL(cái này mình sẽ nói trong một bài khác).

# 3. Đối tượng có thể sử dụng
**BPMN** dành cho cả người dùng `high level` lần `lower level` đọc.   Tức là người quản lý cấp trên, họ chỉ quan tâm tới cái tổng quan, cái chung nhất và nắm được quy trình nghiệp vụ chứ không cần biết dùng công nghệ gì để triển khai dự án, không quan tâm cài đặt bằng cái gì. Ví dụ khách hàng muốn làm chức năng order thì những người high level  chỉ cần biết à cần có mấy bước, tương tác với những đối tượng nào, hoặc có những document nào liên quan ...


![](https://images.viblo.asia/1e68aef5-4893-4cb6-861e-a3c2d3af709c.png)

Cón `lower level` là những người dùng trực tiếp (developer), họ nhìn vào sẽ thấy được là quy trình họ cần làm như thế nào. Do đó, `BPMN` cho những đối tượng này thường rất chi tiết và phải bao quát được tất cả các trường hợp có thể xảy ra.

# 4. Phân biệt với UML
Trước hết chúng ta phải định nghĩa **UML** nó là cái gì, **UML** được viết tắt bởi **Unified Modeling Language**, chúng ta tạm dịch là ngôn ngữ mô hình thống nhất. Như các bạn đã biết đấy, UML là nhiều các diagram và các ký hiệu để mô tả phần mềm.

![](https://images.viblo.asia/dc8cfe9c-e8e7-4c64-9947-d5ead5f3bfa1.png)

Như các bạn biết đấy, `BPMN` tiếp cận theo hướng **process-oriented** tức là trả lời cho hàng loại câu hỏi user phải làm bao nhiêu bước, đó là những bước gì trong khoảng thời gian cho phép là bao lâu để hoàn thành được mục tiêu, còn `UML` tiếp cận theo hướng **object-oriented** tập trung cho việc xây dựng `object` theo nhiều góc khía cạnh, giúp cho việc xây dựng và thiết kế hệ thống rõ ràng hơn.

Cho nên là khi chúng ta đi xây dựng UML cho một object nào đó thì chúng ta cần biết là object đó nó có những thuộc tính gì, relationship với các object khác ra sao, có thể làm những tính năng gì, tương tác với các đối tượng khác ra sao, hoạt động của object đó theo trình tự thời gian như thế nào, ...

Trong khi như các bạn biết đấy BPMN thì chỉ thấy 1 diagram duy nhất vởi vì nó chỉ có mục đích thể hiện được quy trình nghiệp vụ.

Tóm lại là UML và BPMN là hai loại hoàn toàn khác nhau, nó không đối nghịch nhau mà còn bổ trợ nhau trong quá trình làm dự án. Một dự án nên cần kết hợp cả 2 loại này vào thì sẽ cover được hết những trường hợp.

# 5. Kết luận
Qua một vài những chia sẻ của mình ở trên thì mong rằng các bạn cũng hiểu một phần nào về khái niệm **BPMN**. Mong rằng những chia sẻ trên sẽ giúp ích cho các bạn, cảm ơn các bạn đã bớt chút thời gian ra đọc bài viết của mình.
# 6.Tham khảo
https://www.trisotech.com/blog/bpmn-introduction-and-history
https://en.wikipedia.org/wiki/Business_Process_Model_and_Notation