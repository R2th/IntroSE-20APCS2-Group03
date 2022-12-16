Trong quy  trình phát triển phần mềm, giai đoạn đầu tiên vô cùng quan trọng cần làm là phân tích tài liệu đặc tả. Đây cũng là giai đoạn chúng ta sẽ đưa ra rất nhiều câu hỏi với khách hàng nhằm đảm bảo việc hiểu rõ tài liệu đặc tả. Vậy làm thế nào để phân tích được requirement một cách hiệu quả? hỏi thế nào ngắn gọn nhưng khách hàng vẫn có thể hiểu được và tiết kiệm thời gian trả lời cho khách hàng? Trong bài viết này mình sẽ chia sẻ với các bạn một số kinh nghiệm của bản thân về cách phân tích yêu cầu và Q&A với khách hàng một cách hiệu quả.

# 1. Software requirement là gì?
## 1.1 Định nghĩa
Trước tiên chúng ta cần hiểu software requirement là gì? Hiểu một cách đơn giản software requirement là tài liệu miêu tả những yêu cầu của khách hàng về sản phẩm phần mềm, những hành vi của đối tượng trong sản phẩm đó, đó là những yêu cầu về chức năng hoặc phi chức năng mà sản phẩm phần mềm cần đáp ứng được.
## 1.2 Một số loại software requirement
* Tài liệu SRS (Software requirement specification)

    Là tài liệu đặc tả những yêu cầu của phần mềm, bao gồm những yêu cầu về chức năng và phi chức năng.
    
    Ví dụ về tài liệu đặc tả dự án các bạn có thế xem thêm [tại đây](https://krazytech.com/projects/sample-software-requirements-specificationsrs-report-airline-database) nhé.
* UI/UX

   Là những thiết kế về giao diện người dùng và trải nghiệm người dùng. Để hiểu hơn về khái niệm UI/UX các bạn có thể tìm hiểu thêm [tại đây](https://www.webico.vn/uiux-la-gi-tim-hieu-ve-cong-nghe-thiet-ke-ux-ui/) nhé.
* Use case diagram

  Là sơ đồ thể hiện các hành động, sự tương tác của user cho từng chức năng trên hệ thống phần mềm. Để hiểu hơn về Use case diagram, các bạn tìm hiểu thêm [tại đây](https://www.linkedin.com/pulse/use-case-diagram-nguyen-duong-hai) nhé.

* Business rule diagram/Data flow diagram

  Là sơ đồ thể hiện các logic nghiệp vụ, các luồng dữ liệu của hệ thống phần mềm. 

* Data dictionary and Glossary

  Khi phát triển phần mềm liên quan đến những lĩnh vực mới, có rất nhiều ngôn ngữ chuyên ngành khó hiểu. Do đó tài liệu đặc tả thường đình kèm Data dictionary and Glossary - văn bản liệt kê các từ ngữ chuyên ngành sử dụng trong tài liệu đặc tả nhằm giúp thành viên trong dự án hiểu rõ hơn. 

* User stories

  Yêu cầu của khách hàng có khi không phải là một văn bản mà còn có thể được viết trên các công cụ quản lý dự án như Jira, Redmine,...Thường được viết dưới dạng ngôn ngữ Gherkin rất dễ hiểu. 
  ![](https://images.viblo.asia/cc185cfb-b8b3-45c9-8888-53a441cdfc82.png)
# 2. Tại sao phân tích requirement cẩn thận lại quan trọng?
## 2.1 Ví dụ
Để trả lời được câu hỏi này, trước tiên hãy cũng mình phân tích một ví dụ dưới đây cho việc phân tích requirement sơ sài nhé:
![](https://images.viblo.asia/25aff0fa-192e-471f-8d6a-c121a685f260.png)

![](https://images.viblo.asia/5a3b619f-ec2c-4ac6-bcb9-51ab0e85be5b.png)

Từ hình ảnh trên có thể thấy, phân tích requirement sơ sài dẫn tới việc sản phẩm cuối cùng không đáp ứng được yêu cầu khách hàng, số tiền phải trả cho việc phát triển dự án là rất lớn.
Do đó, khi phân tích requirement cần phân tích một cách cẩn thận, rõ ràng và chi tiết.

## 2.2 Lợi ích của việc phân tích requirement cẩn thận
*  Phát hiện và tránh được các lỗi trong tài liệu đặc tả.
*  Đưa ra những gợi ý để nâng cao chất lượng sản phẩm.
*  Phân tích requirement kỹ càng giúp QA đưa ra được tập hợp test case có độ bao phủ tốt nhất, tránh trường hợp thiếu các quan điểm test.
*  Giúp lập trình viên hiểu yêu cầu và bao phủ được các luồng nghiệp vụ trong code.
*  Ngăn chặn lỗi từ giai đoạn sớm.
*  Tiết kiệm thời gian và tiền bạc trong phát triển phần mềm.

# 3. Phân tích requirement như thế nào cho hiệu quả?
## 3.1 Hiểu overview về dự án
Khi bắt đầu tham gia một dự án, trước hết cần có cái nhìn khái quát về dự án như khách hàng là ai? sản phẩm phần mềm làm về lĩnh vực gì? ngữ cảnh? nghiệp vụ chung.
## 3.2 Tìm hiểu về nghiệp vụ, các chứng năng chính
Các thành viên trong dự án cần tìm hiểu và phân tích các yêu cầu về chức năng của phần mềm:
* Trước tiên, mỗi người nên dành thời gian tự nghiên cứu tài liệu trước, tập trung nghiên cứu các logic về nghiệp vụ.
*  Sau đó, nên có một buổi họp tóm tắt ngắn gọn các yêu cầu để chắc chắn cả đội dự án hiểu rõ, đúng và đủ về tài liệu yêu cầu.
*  Tập trung phân tích các màn hình, phân tích các luồng hoạt động của sản phẩm phần mềm, các biểu đồ (nếu có)...
*  Nghiên cứu các use case, các luồng dữ liệu,...
## 3.3 Tìm hiểu các yêu cầu khác
Bên cạnh các yêu cầu về chức năng, thành viên trong dự án cũng cần tìm hiểu về các yêu cầu liên quan đến giao diện, cơ sở dữ liệu, các yêu cầu phi chức năng ...
# 4. Q&A file là gì? Nên đưa ra câu hỏi như thế nào?
Trong quá trình nghiên cứu yêu cầu khách hàng, chắc chắn sẽ có rất nhiều câu hỏi phát sinh cần được giải đáp. Bạn không thể chạy đi chạy lại hỏi khách hàng luôn tục, và việc quản lý lưu lại các câu hỏi và câu trả lời đó như thế nào cũng là một việc bạn cần quan tâm.
Đó là lý do vì sao chúng ta cần phải có tài liệu Q&A cho dự án.

## 4.1 Q&A file
Q&A  là từ viết tắt của Question and Answer (hỏi và trả lời), thường được viết dưới dạng tệp excel. Tệp này bao gồm tất cả các câu hỏi trong dự án, đặc biệt là các câu hỏi về tài liệu yêu cầu của khách hàng về sản phẩm phần mềm.

Khi nghiên cứu yêu cầu của sản phầm phần mềm, nếu có câu hỏi gì thì đều nên viết vào file Q&A. File này cũng được coi là một nhật ký quan trọng.

## 4.2 Q&A file mẫu
Mỗi tổ chức, công ty đều có mẫu file Q&A riêng. Tuy nhiên, tựu chung lại thì đều có những thành phần dưới đây:

* Reference: Link đến tài liệu đặc tả dự án
* ScreenID: Mã màn hình design nếu có
* Title: Tiêu đề ngắn gọn của câu hỏi
* Question: Nội dung câu hỏi
* Answer: Phần trả lời câu hỏi
* Priority: Mức độc ưu tiên trả lời các câu hỏi
* Create date: Ngày tạo câu hỏi
* Create by: Người tạo câu hỏi
* Assign to: Người được assign trả lời câu hỏi      
* Status: Trạng thái của câu hỏi

![](https://images.viblo.asia/b0bf0c36-4400-46d4-902f-94ab93c71166.png)


## 4.3 Gợi ý các câu hỏi tiếng anh sử dụng để hỏi khách hàng
Do đặc thù dự án hiện nay thường sử dụng ngôn ngữ tiếng anh, một số bạn cũng khá bối rối khi sử dụng ngôn ngữ này để hỏi đáp với khách hàng. Do đó, mình gợi ý một số câu hỏi tiếng anh bên dưới.

Để đặt câu hỏi một cách dễ hiểu, ngắn gọn và tiết kiệm thời gian trả lời cho khách hàng, chúng ta nên đặt câu hỏi dưới dạng câu hỏi lựa chọn (multiple choice) và dạng câu hỏi nghi vấn (Yes/No question) để khách hàng chỉ cần trả lời Yes/No là đủ.

Một điều chú ý khi hỏi khách hàng là không nên khỏi khách hàng muốn gì, cũng không nên hỏi khách hàng giải thích ý nghĩa trình bày trong requirement. Thay vào đó, chúng ta nên đưa ra ý hiểu của mình và hỏi khách hàng xác nhận lại ý hiểu đó.
1. Yes/No question
* Should we …? Chúng ta có nên...
* I have a question below regarding function A,...Could you please confirm?

  Tôi có một câu hỏi liên quan đến chức năng A, (*....giải thích ý hiểu của mình ở đây*...), Làm ơn xác nhận giúp tôi?
* From my point of view, ….Do you agree? 

  Theo quan điểm của tôi thì, (*...giải thích quan điểm ở đây...)*, Ông có đồng ý như vậy không?
* I think that…, Could you please share me your thought?

  Tôi nghĩ rắng (...*nêu lên ý nghĩ ở đây*...), Ông có thể chia sẻ cho tôi suy nghĩ của ông được không ạ?
2. Multiple choice question 

   I have below case with 2 expected behavior:....
   
   Tôi có trường hợp bên dưới với 2 kết quả mong đợi như sau: (....*giải thích trường hợp ở đây.*..):
   
   Expected result 1:... / Kết quả mong đợi 1

   Expected result 2:.../ Kết quả mong đợi 2
   
   Could you please share me your expected result. If you have better option, please let me know.

   Ông chọn kết quả mong đợi nào? Nếu ông có lựa chọn khác hay hơn, làm ơn hãy cho tôi biết.

# 5. Quản lý những yêu cầu được thay đổi
## 5.1 Tại sao có yêu cầu thay đổi
Trong quá trình làm dự án, nếu có sự bất hợp lý trong tài liệu yêu cầu, QA và các thành viên khác trong đội dự án cũng có thể thảo luận với khách hàng để thay đổi yêu cầu cho phù hợp.
Những yêu cầu thay đổi có thể đến từ đội dự án hoặc từ khách hàng. Những thay đổi đó có thể là thay đổi về giao diện, thay đổi về nghiệp vụ hoặc cấu trúc dữ liệu.

## 5.2 Quy trình yêu cầu thay đổi và quản lý các thay đổi
1. Đưa ra yêu cầu thay đổi

   Trước tiên, khách hàng hoặc đội dự án (Lập trình viên, kiểm thử viên, nhóm trưởng...) đưa ra các yêu cầu thay đổi.
3. Phân tích yêu cầu thay đổi

   Đội dự án cần phân tích những yêu cầu thay đổi đó, phần nghiệp vụ...thay đổi này có khả năng ảnh hưởng đến những chức năng nào? ước lượng effort bỏ ra để thay đổi, liệu có ảnh hưởng đến thời gian release sản phẩm hay không?...
5. Đưa ra quyết định thay đổi hay không

   Dựa trên những phân tích trên, khách hàng sẽ là người quyết định có nên thay đổi hay không.
7. Thực hiện các thay đổi


   Sau khi khách hàng quyết định thay đổi, đội dự án sẽ bắt tay vào thực hiện thay đổi đó (coding, testing...)


Trên đây, mình đã chia sẻ với các bạn một số kinh nghiệm của bản thân về cách phân tích yêu cầu, cách Q&A với khách hàng một cách hiệu quả và quy trình thực hiện các yêu cầu thay đổi. Hi vọng bài viết này sẽ hữu ích đối với các bạn.

## Tài liệu tham khảo:
* https://krazytech.com/projects/sample-software-requirements-specificationsrs-report-airline-database
* https://www.webico.vn/uiux-la-gi-tim-hieu-ve-cong-nghe-thiet-ke-ux-ui/
* https://www.linkedin.com/pulse/use-case-diagram-nguyen-duong-hai