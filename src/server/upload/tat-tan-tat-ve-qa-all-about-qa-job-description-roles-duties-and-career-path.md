## I. QA là gì ?
![image.png](https://images.viblo.asia/3b3963aa-7be1-4cd2-8262-d0a68fa167c0.png)([image source](https://www.techentice.com/the-future-of-quality-assurance-qa/))
- QA viết tắt của Quality assurance, là kỹ sư đảm bảo chất lượng, ở đây chúng ta sẽ chỉ đề cập về lĩnh vực phần mềm.
- QA là một chuyên gia đảm bảo, cải thiện quy trình phát triển phần mềm bằng cách ngăn ngừa và phát hiện lỗi trong sản phẩm.
## II. QA làm gì?
![2021-08-16_23-21-08-removebg-preview.png](https://images.viblo.asia/21d05763-c805-4647-827e-eab3fbffed1e.png)([image source](https://u-tor.com/topic/what-does-qa-engineer-do))
- Nhìn ảnh phía trên, bạn thấy rất đơn giản phải không ? QA cần thực hiện 6 công việc cơ bản trong dự án:
### 1. Phân tích yêu cầu đặc tả
- Là bạn sẽ tham gia vào việc đọc, hiểu, phân tích và làm rõ yêu cầu đặc tả với khách hàng hoặc BA (business analyst) của dự án.
### 2. Tạo Test plan
- Thiết kế plan quy trình kiểm thử sản phẩm: Tất nhiên phải dựa vào yêu cầu đặc tả, nguồn lực về con người và thời gian để tạo được một plan phù hợp với từng dự án, sản phẩm.
- Ở giai đoạn này, bạn phải nắm được tổng quan về tất cả chức năng hiện thời của sản phẩm. Có khả năng về estimation để có thể tạo nên một kế hoạch đầy đủ chức năng cùng thời gian phù hợp.
### 3. Tạo Test case
- Thiết kế các trường hợp kiểm thử tương ứng với từng chức năng của sản phẩm
### 4. Thực hiện kiểm thử
- Thực hiện kiểm thử khi bên dev đã lên được một phần hoặc toàn bộ chức năng, sản phẩm (quy trình khi nào thực hiện test sẽ phụ thuộc vào dự án của bạn đang thực hiện theo mô hình nào (V-model, Water fall, Agile,...)
### 5. Báo cáo bug/defect
- Trong quá trình thực hiện kiểm thử, tất nhiên dù ít hay nhiều bạn cũng sẽ phát hiện lỗi trong phần mềm, báo cáo lỗi lên các công cụ quản lý mà dự án bạn đang dùng (Github, Jira, Backlog, Redmine,...)
- Tiếp theo sẽ làm gì nhỉ ? Tất nhiên là báo cáo lỗi thường sẽ được ghi theo format chung theo từng dự án và kế đến bạn chỉ cần nhẹ nhàng gửi ticket đó sang cho developer để fix.
- Xong rồi sao? No,... bạn cần phải có các hành động sau đó nữa.
    - Vỗ vai, vò đầu, bứt tóc, đấm bốc, bla,..bla... developer để họ có thể sửa lỗi đó (đùa đấy)
    - Thông thường chúng ta sẽ gặp kha khá trường hợp "It's not a BUG, Its a Feature". Tôi có 1 người đồng nghiệp cũ, anh ấy là một coder (dinhcuadinh) trên tay "tha thu" một cái ảnh như bên dưới, chắc là để mỗi lần cãi nhau với QA thì lại xoắn tay áo lên =))

![image.png](https://images.viblo.asia/35e09ab3-1dd2-47a4-bec6-220a2fef5628.png)([image source](https://society6.com/product/its-not-a-bug-its-a-feature2169329_print))
- Đừng lo lắng, nếu bạn đã chắc chắn nó là bug hãy đưa ra các tài liệu đặc tả, design, knowlegde để chứng minh. 
- Dù sao thì cũng nhẹ nhàng với nhau trước, sau khi đã chốt được vấn đề thì cùng nhau triển tiếp, còn nếu vẫn lấn cấn thì "đưa nhau lên tòa" để nhờ BA hay người trao đổi thông tin trực tiếp với khách hàng để xác nhận lại.
### 6. Xác minh lại bug/defect đã được sửa xong
- Sau khi developers đã sửa lỗi, bạn cần phải xác minh lại bug đã được loại bỏ và việc sửa lỗi không ảnh hưởng đến những chức năng khác.
- Đóng ticket trên công cụ quản lý và cập nhật kết quả test lúc trước là OK rồi.
- Bạn có đang nghĩ " À, QA chỉ làm những việc như vậy thôi nhỉ ? Easy". Đúng, nhưng mà thiếu rồi. Lý thuyết sẽ là tạo kế hoạch, thực hiện kiểm thử và đóng lỗi đã được fix, nhưng thực tế như vậy chưa đủ để giúp dự án hạ cánh an toàn.
- Chúng ta cần nhớ, ngoài việc kiểm thử để phát hiện bug, QA còn cần phải tham gia vào quá trình cải thiện, phát triển quy trình cùng team dự án. Vậy QA sẽ làm gì nữa ?

![image.png](https://images.viblo.asia/4ccc5ad1-3762-40c4-b80f-bf948a67dfea.png)([image source](https://reetro.io/retrospective-email-course.html))
### 7. Phân tích quy trình kiểm thử 
- Với plan, testcase, requirement hiện tại có đảm bảo được chất lượng sản phẩm, dự án ở mức tốt nhất chưa ? có những khiếm khuyết nào bạn có thể nhận thấy không ? 
- Tiếp sau khi đã nhìn nhận được ưu điểm và khuyết điểm về quy trình, chất lượng bạn sẽ phải cùng QA team đưa ra các giải pháp để tối ưu lại quy trình kiểm thử, tài liệu kiểm thử. 
- Những việc này thường sẽ được thực hiện trong các buổi retrospective của testing team.
### 8. Phân tích quy trình làm việc team dự án
- Ngoài việc cải thiện quy trình testing của QA team, điều cần thiết nữa là nâng cao chất lượng cùng team dự án. 
- Trong các buổi **retrospective**, **Keep-Problem-Try meeting** để cùng phân tích ưu, khuyết điểm trong quy trình làm việc giữa các team như team dự án với khách hàng, team dự án với bên thứ 3, team developer với QA,...
## III. Các vai trò chính của QA
![blog-goram-and-vincent-qa-removebg-preview.png](https://images.viblo.asia/1cb82aaf-9602-4e52-81c1-a9380ba15bc4.png)([Image source](https://www.goramandvincent.com/blog/seeking-qa-manager))
- Dựa vào các công việc trong team QA chúng ta có thể chia thành 4 roles như sau:
- **Test Analysis**: Tham gia vào hoạt động Static testing để kiểm tra bất kỳ dạng tài liệu nào, bao gồm source code, design, models hoặc các tài liệu đặc tả nhằm đảm bảo tính hoàn chỉnh và nhất quán, tìm ra các lỗi sớm.
    - Bạn có thể tham khảo chi tiết hoạt động Static testing ở [đây.](https://viblo.asia/p/static-testing-Eb85orqOl2G)
- **Test Designer:** Là người sẽ tạo các trường hợp kiểm thử (test case, checklist, scennario,...)
- **Test Executor:** Thực hiện kiểm thử các trường hợp được tạo từ Test Designer, mô tả và ghi lại các lỗi đã tìm thấy, tái hiện và xác minh lại sau khi chúng được fix.
- **Test Manager:** Lên kế hoạch, giám sát hoạt động testing để có thể đảm bảo được deadline, đi theo đúng schedule, kiểm soát được các thay đổi, phát sinh để re-plan một cách hợp lý. Triển khai các nhiệm vụ cho từng thành viên trong QA team và giao tiếp với các bên liên quan.
- Các roles trên có thể được phân biệt từng thành viên hoặc một người cũng có thể đảm nhiệm tất cả các công việc trên trong dự án.
## IV. Tại sao lại chọn QA ?
Có lẽ ngày nay, QA là một nghề mà "ai cũng có thể làm được". Tôi thường nghe mọi người nói, học ngành nào cũng được, chỉ cần học một khóa về kiểm thử là có thể trở thành một QA thực thụ.
- Điều đó có vẻ chưa đúng lắm, bạn có thể trở thành một tester - người kiểm thử, sau khi hoàn thành khóa học và có thể test được một số phần mềm. 
- Nhưng để có thể đi đúng trên con đường của Quality assurance engineer, bạn cần có mindset về chất lượng sản phẩm cũng như quy trình phát triển phần mềm.
### Chọn QA vì ? 
Theo khảo sát thì đại đa số, chúng ta có những lý do dưới đây: 
- Chọn QA vì thích IT, nhưng không muốn trở thành một developer
    - Tất nhiên bạn phải là người thích việc đào sâu, tìm kiếm các lỗi mà BA hoặc developer có thể bỏ sót. 
    - Developer sẽ làm việc với mindset là tìm kiếm giải pháp nhanh chóng, hoàn thành công việc và chuyển sang công việc tiếp theo. 
    - Còn QA phải tỉ mỉ hơn, xác minh kỹ lưỡng các trường hợp có thể bị bỏ sót và nhất là các trường hợp kết hợp. ([Integration testing](https://viblo.asia/p/integration-testing-kiem-thu-tich-hop-maGK7v7O5j2))
- Công việc QA sẽ giúp bạn:
    - Góp phần nâng cao chất lượng, 
    - Được tiếp cận với các công nghệ mới, khác nhau một cách chi tiết nhờ quá trình đi sâu vào kiểm tra sản phẩm. 
    - Nghề này cần sử dụng thường xuyên các kỹ năng phân tích, giúp bạn không ngừng học hỏi các công nghệ và lĩnh vực kiến thức mới.
- Làm QA là cơ hội để bạn gia nhập thế giới công nghệ phần mềm
    - Mức lương cũng có thể gọi là cao hơn so  với một số ngành nghề khác
    - Và quan trọng hơn là việc bắt đầu để trở thành QA sẽ dễ hơn so với developer.

## V.Triển vọng, con đường phát triển của QA
![image.png](https://images.viblo.asia/5c9234e8-8594-4eb3-82a7-33bc73149d44.png)([image source](https://blog.qatestlab.com/2017/03/27/senior-qa-engineer/))
- Con đường phát triển **QA**: junior QA → middle QA → senior QA → QA team lead → QA manager → head of QA department.
- Nếu bạn thấy thích mảng automation, có thể học code và trở thành **QA automation engineer**. Nó đòi hỏi kiến thử kỹ thuật chuyên sâu hơn so với manual QA.
- Có thể phát triển theo hướng **BA (business analyst)** hoặc trở thành **developer**. Tất nhiên bạn cần nâng cấp kiến thức và kỹ năng để phù hợp với ngành nghề đó.

-----

**Tài liệu tham khảo**
- https://u-tor.com/topic/what-does-qa-engineer-do