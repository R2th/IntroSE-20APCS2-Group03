*Có khi nào các bạn mắc sai lầm, hoặc thắc mắc về những quy tắc cơ bản quan trọng của quá trình kiểm thử mà QA cần chú ý khi tham gia một dự án chưa?, bản thân mình vẫn rất hay bị nhầm lẫn, sau một thời gian tìm hiểu, mình muốn giới thiệu đến các bạn những quy tắc cơ bản đó và cùng mọi người thảo luận về vấn đề này, hy vọng bản thân mình sẽ khắc phục tốt cũng như có thể góp phần gợi ý giúp các bạn có thể nhận ra vấn đề của bản thân nếu gặp phải như mình.*

   Chúng ta cần xác định mục tiêu chính của công việc QA là gì? có thể hiểu QA (Quality assurance) là đảm bảo chất lượng phần mềm, là một quá trình hoạt động song song với việc phát triển phần mềm, tập trung vào việc cải thiện quá trình phát triển phần mềm để các vấn đề có thể được ngăn chặn trước khi chúng trở thành một vấn đề lớn. Với những công việc như vậy đòi hỏi QA cần nắm rõ những quy tắc trong công việc đặc biệt là về quy trình làm việc như vậy chúng ta mới đảm bảo kết quả công việc đạt kết quả như mong đợi.
   ![](https://images.viblo.asia/caeca5d3-24cc-4089-8a7a-00709dbe842e.jpg)
   
   **Các quy tắc cơ bản của quy trình kiểm thử:**
   
   Lấy một ví dụ, trước khi tham gia vào dự án, các bạn QA không biết mình cần làm những gì và bắt đầu công việc từ đâu, như vậy chắc chắn sẽ dẫn đến kết quả dự án gặp rất nhiều khó khăn, cũng như thiếu sót, do đó để không xảy ra vấn đề như trên, QA Leader phải cùng các member của đội QA chuẩn bị tốt hơn, đảm bảo các quy tắc được thực hiện kỹ lưỡng và bài bản hơn khi tham gia vào dự án, mình cũng đã tìm hiểu và liệt kê ra được những quy tắc đó, bao gồm:

1. Lập kế hoạch và giám sát việc kiểm thử (Test planning and control).
2. Phân tích và thiết kế kiểm thử (Test analysis and design).
3. Thực hiện và Thực thi kiểm thử (Test implementation and execution)
4. Đánh giá Tiêu chuẩn kết thúc và báo cáo (Evaluating Exit criteria and reporting).
5. Các hoạt động kết thúc kiểm thử (Test closure activities)
![](https://images.viblo.asia/e1e70006-dc76-4509-9665-379ec46ede45.png)

   **Chúng ta sẽ cùng phân tích từng nguyên tắc cơ bản này nhé!**

**1. Lập kế hoạch và giám sát việc kiểm thử (Test planning and control).**

   Lập kế hoạch kiểm tra là một Quy trình kiểm tra cơ bản xác định mục tiêu và là mục tiêu của quy trình kiểm tra. Bao gồm các công việc:
*    Xác định phạm vi, các rủi ro và xác định các mục tiêu của việc kiểm thử.
*    Xác định cách tiếp cận kiểm thử ( các công nghệ, item test, phạm vi bao quát, xác định và liên kết giữa các nhóm tham gia kiểm thử, testware).
*    Thực thi chính sách kiểm thử và chiến lược kiểm thử.
*    Xác định yêu cầu về nguồn lực test như con người, môi trường test, PCs…
*    Lập kế hoạch phân tích việc kiểm thử, nhiệm vụ thiết kế, thực thi việc kiểm thử, thi hành và đánh giá.

**2. Phân tích và thiết kế kiểm thử (Test analysis and design).**

   Phân tích và thiết kế kiểm thử là hoạt động mà tại đó các mục tiêu kiểm thử tổng quát được chuyển đổi thành các điều kiện kiểm thử và thiết kế kiểm thử hữu hình.
   
   Phân tích và thiết kế kiểm thử có các nhiệm vụ chính sau đây:
* Xem xét nền tảng kiểm thử (như phân tích rủi ro của sản phẩm, các yêu cầu, kiến trúc, thiết kế các chi tiết kỹ thuật và giao diện).
* Xác định các điều kiện kiểm thử: dựa trên việc phân tích các item test, các chi tiết kỹ thuật, hành vi và cấu trúc phần mềm.
* Thiết kế test case
* Đánh giá tính khả thi trong việc kiểm thử của yêu cầu cũng như của hệ thống.
* Thiết kế thiết lập môi trường kiểm thử và xác định bất kỳ yêu cầu cơ sở hạ tầng và các công cụ kiểm thử tương ứng.
 
**3. Thực hiện và Thực thi kiểm thử (Test implementation and execution)**

   Trong quá trình thực thi và thực hiện kiểm thử, chúng ta đưa ra các điều kiện kiểm thử trong mỗi trường hợp kiểm thử, phần mềm test (testware) và thiết lập môi trường kiểm thử.
   
   Thực thi và thực hiện kiểm thử có những nhiệm vụ sau đây:
   
 -**Thực thi(Implementation):**
* Phát triển và ưu tiên các testcase bằng cách sử dụng các kỹ thuật và tạo dữ liệu cho những kiểm thử đó. 
* Tạo test suites từ các trường hợp kiểm thử để thực hiện kiểm thử hiệu quả.
* Thực hiện và xác minh lại môi trường: đảm bảo rằng môi trường đã được thiết lập chính xác, thậm chí có thể chạy kiểm thử trên đó.


-**Thực hiện (Execution):**
* Thực thi test suites và trường hợp kiểm thử riêng lẻ theo các phương thức kiểm thử.
* Ghi lại kết quả của việc thực hiện kiểm thử: tên, phiên bản của các testware, công cụ kiểm thử.
* So sánh kết quả thực tế với kết quả mong đợi.
* Viết báo cáo đối với những trường hợp có sự khác biệt giữa kết quả thực tế và kết quả mong đợi.
* Xác nhận kiểm thử hoặc tái kiểm thử: cần thực hiện lại các kiểm thử mà trước đó đã thất bại để xác nhận lại lỗi đấy đã được sửa chữa hay chưa và đảm bảo không phát sinh lỗi khác.

**4. Đánh giá Tiêu chuẩn kết thúc và báo cáo (Evaluating Exit criteria and reporting).**

   Đánh giá tiêu chí kết thúc là một quá trình xác định khi nào nên dừng thử nghiệm. Nó phụ thuộc vào phạm vi bảo hiểm của code, chức năng hoặc rủi ro. Về cơ bản, nó cũng phụ thuộc vào rủi ro kinh doanh, chi phí và thời gian.

**5. Các hoạt động kết thúc kiểm thử (Test closure activities)**

   Các hoạt động closure kiểm tra là quá trình cuối cùng trong quy trình kiểm tra cơ bản. Trong quá trình này thu thập dữ liệu từ quá trình thử nghiệm đã hoàn thành và các sản phẩm thử nghiệm.
* Đảm bảo rằng có thể giao được hay không
* Báo cáo sự cố kết thúc
* Tài liệu tất cả các hệ thống
* Lưu trữ tất cả các phần mềm kiểm tra, môi trường thử nghiệm và cơ sở hạ tầng.

    `Bên cạnh đó bản thân mỗi bạn QA cũng cần rèn luyện cho bản thân các kỹ năng về sắp xếp và quản lý thời gian hiệu quả, đặc biệt là khi xử lý các task được giao sao cho hợp lý và phù hợp với thời gian biểu đã được nhận, tránh trường hợp bị overload do không xác định được tầm quan trọng và độ ưu tiên của các task. Nếu quản lý và sắp xếp tốt bạn sẽ thấy hiệu quả công việc được đẩy cao, khả năng hoàn thành tốt các task được giao sẽ cao hơn.`

> Mỗi dự án để đảm bảo rằng sản phẩm được thiết kế và thực hiện với các quy trình chính xác cần QA nắm rõ các quy tắc cơ bản cấu thành nên quy trình toàn vẹn. Điều này giúp giảm các vấn đề về lỗi, đảm bảo sản phẩm cuối cùng sẽ là sản phẩm chất lượng và đạt yêu cầu hơn cả mong đợi từ phía khách hàng.
> 
Chúc các bạn sẽ nắm được phần nào về nguyên tắc cơ bản về quy trình của công việc QA trong dự án và thực hiện công việc với thành quả đạt được hơn cả mong đợi nhé!

**Tài liệu tham khảo:**
https://softwaretestingbooks.com/what-is-fundamental-of-test-process-in-software-testing