> **Phần 7 - User Story and Requirement**

User Story và Requirement là những thuật ngữ phổ biến được sử dụng trong ngành công nghiệp phần mềm. Nhưng chính xác chúng là những gì? Chúng có gì khác hay giống nhau không? Chúng ta cơ bản sẽ trả lời được những câu hỏi đó thông qua bài viết này.

### User Story là gì?
User Story là một cách đơn giản để thu thập yêu cầu của người dùng phục vụ cho dự án Agile. Là mô tả ngắn về chức năng được kể từ quan điểm của người dùng. Trọng tâm là về lý do và cách người dùng tương tác với phần mềm. User Story về cơ bản là một định nghĩa cấp cao về những gì phần mềm nên có khả năng làm. 

User story do khách hàng, hoặc đại diện của khách hàng, người thực sự hiểu nghiệp vụ và nắm bắt được chính xác yêu cầu của mình đối với nhóm phát triển viết ra. Thông thường, bất kỳ phản hồi hoặc yêu cầu nào đến từ doanh nghiệp hoặc người dùng cuối có thể được viết như một User Story.

Một User Story được coi là tốt là khi nó được viết bằng ngôn ngữ đơn giản, nói lý do và cụ thể về một chức năng của phần mềm. Chúng thường được viết theo một mẫu như sau:
![](https://images.viblo.asia/6facccc8-96a3-4b8e-b886-bf8c6cc7026d.jpg)
```
As a <type of user>, I want <some desired outcome> so that <some reason>.
```
Dưới đây là ví dụ về User Story cho trang web thương mại điện tử cơ bản:
```
As a customer, I want to be able to view the items in my cart so that I know for sure what I’m purchasing.
```
Các tiêu chí chấp nhận thường đi kèm với User Story. Các tiêu chí này là các tính năng mà  User Story đề cập đến và chủ yếu chúng xác định khi nào User Story này được thi hành. Các tiêu chí chấp nhận cũng sẽ là những gì mà tester sẽ phân tích để làm rõ và thực hiện kiểm thử trên chúng.

Chúng ta có thể nghĩ đến các tiêu chí chấp nhận như các yêu cầu chức năng hỗ trợ một User Story. Chúng được xác định độ ưu tiên dựa trên quan điểm của người dùng và cách tiếp cận của nhóm phát triển.
    
### Requirement là gì?
Requirement mô tả cách thức mà phần mềm hoạt động, mục đích của hệ thống, đi vào trọng tâm chính. Tài liệu Requirement đi sâu vào chi tiết về cách một chức năng của phần mềm nên làm việc. Chúng thường phục vụ mục đích hướng dẫn cách nhóm phát triển phần mềm sẽ xây dựng một cái gì đó.

Trong khi các User Story là đơn giản và ngắn gọn, tài liệu Requirement đi sâu vào chi tiết. Các tài liệu Requirement thường chứa đựng những điều như nội dung tóm lược, phạm vi, rủi ro, và nhiều hơn nữa. Chúng đặt độ ưu tiên để thể hiện mức độ và để đánh giá chất lượng cho các tính năng, hiệu suất và trải nghiệm người dùng.

Dưới đây là ví dụ về một vài Requirement đối với một trang web thương mại điện tử cơ bản:
```
Display the name of each item in the shopping cart.
Display the quantity of each item in the shopping cart.
Allow the user to remove any items in the shopping cart.
```

 Requirement gồm 3 mức (level) được mô tả trong hình dưới
 ![](https://images.viblo.asia/be9ae768-83fc-4261-9906-94e6ffabaf5a.png)
 
* Business system level: yêu cầu về vấn đề nghiệp vụ của hệ thống. Ví dụ hệ thống bán hàng sẽ định nghĩa các loại hình thức thanh toán, hình thức giao hàng thế nào, có sử dụng số may mắn hay không, ...
* User level: mô tả tổng quan các chức năng của hệ thống mà người sử dụng mong muốn cũng như định nghĩa những gì mà hệ thống phải cung cấp để đạt được các mục tiêu của người sử dụng. Mức này thường được viết cho khách hàng nên thường sử dụng ngôn ngữ tự nhiên, các bảng và hình vẽ để khách hàng có thể hiểu một cách dễ dàng.
* Product level (SAS): mô tả chi tiết các chức năng và ràng buộc của hệ thống, ở mức này là viết cho các nhà phát triển phần mềm. Ví dụ về chức năng hình thức thanh toán sẽ mô tả chi tiết những gì sẽ được hiển thị cho mỗi hình thức.

Requirement có thể chia thành 2 loại chính:

* Functional: mô tả chức năng mà hệ thống cần phải cung cấp, mô tả dữ liệu mà hệ thống cần xử lý.
* Non-functional: Mô tả ràng buộc hệ thống, các thuộc tính và môi trường của hệ thống. Ví dụ yêu cầu về giao diện, yêu cầu về bảo mật, về hiệu năng, ... 
### Sựa khác nhau giữa User Story và Requirement?
![](https://images.viblo.asia/3a3ddc93-26d7-489d-8481-c6db62045b38.png)
Nhìn chung, User Story được sử dụng phổ biến hơn trong mô hình Agile, trong khi Requirement thường liên quan đến mô hình thác nước.

Do tính chất đơn giản, gọn nhẹ của User Story, chúng thúc đẩy team cần tổ chức nhiều cuộc họp để thảo luận, vì vậy nó mang tính hợp tác hơn khi làm Requirement. 

User Story tập trung vào trải nghiệm người dùng - người sử dụng muốn sản phẩm có thể làm gì. Một Requirement sẽ tập trung vào chức năng - những gì sản phẩm nên làm.


|  | User Story | Requirement |
| -------- | -------- | -------- |
| Nó được viết ra như thế nào?     | User Story nên được viết bằng một hoặc hai câu về tính năng kể từ quan điểm của người mong muốn tính năng mới, thường là người dùng hoặc khách hàng của hệ thống. Tuy ngắn gọn nhưng nắm bắt được người dùng là ai, họ muốn gì và tại sao.    | Requirement có xu hướng rất chi tiết và mất nhiều thời gian để viết. Chúng thường đi vào chi tiết cụ thể (đôi khi rất kỹ thuật) về cách phần mềm hoạt động. Những Requirement chi tiết này sẽ cung cấp thông tin cho nhóm phát triển về cách làm thế nào để xây dựng một tính năng hoặc chức năng mới.  |
| Ai viết nó?    | User Story có thể được viết bởi bất cứ ai hiểu rõ phần mềm - có thể  là các developer đưa ra các vấn đề cần được giải quyết, hay là một tester người kiểm tra chất lượng, người phát hiện ra các vấn đề UX - miễn là nó đại diện cho quan điểm của người dùng cuối với mong muốn làm cho phần mềm tốt hơn. Hoặc cũng có thể là product manager hoặc chủ sở hữu sản phẩm, người sẽ điều phối product backlog nơi mà các User Story được lưu giữ.    | Requirement được viết bởi product manager, product owner, hay business analyst. Technical leader cũng sẽ tham gia cũng như các kỹ sư để chịu trách nhiệm trong việc hiểu và thực hiện các tính năng, chức năng hoặc cải tiến chúng.   |
| Khi nào nó được viết?    | User Story được viết trong suốt quá trình xây dựng một sản phẩm.Và việc cập nhật (hoặc thêm mới) User Story có thể xảy ra bất cứ lúc nào. Trong mô hình Agile, product backlog đóng vai trò là danh sách ưu tiên của chức năng cần được phát triển, xây dựng. Đây là nơi mà các User Story được lưu trữ cho đến khi chúng được thực hiện - thường là trong quá trình phát triển (các sprint).   | Requirement cũng có thể được tạo ra bất cứ lúc nào. Tuy nhiên, tốt nhất là cần phải xác định được cái gì là mong muốn từ quan điểm của người dùng nếu cả User Story và Requirement đều đã được tạo ra bắt buộc dùng chúng để thực hiện 1 chức năng.   |

### Kết luận
Mặc dù của User Story và Requirement là khác nhau, nhưng bản chất tương tự và mục tiêu luôn giống nhau - chúng liên quan đến cách tiếp cận khác nhau đối với phần mềm trong xây dựng một sản phẩm với mục tiêu làm khách hàng hài lòng. 

Trong mô hình Aglie thường sử dụng User Story nhiều hơn các Requirement vì nó cho phép sự linh hoạt và thể hiện tính hợp tác. Trong khi mô hình thác nước sử dụng các Requirement để xác định được chi tiết của các chức năng tốt hơn trong thời gian ngắn.

Cho dù chúng ta sẽ viết User Story hay Requirement, chúng ta cần phải tập trung vào những gì quan trọng nhất: mô tả kết quả mong muốn cho khách hàng và phát triển những gì họ cần để xây dựng nó thành công.

Và có thể dễ gây nhầm lẫn khi quyết định nên viết gì, thì sau đây là một hướng dẫn đơn giản để thực hiện lựa chọn: Nếu những gì bạn yêu cầu để xây dựng có lợi ích trực tiếp cho người dùng cuối của bạn, hãy viết User Story. Nếu nó là trung tâm của cốt lõi của một sản phẩm hoặc cơ sở hạ tầng, hãy viết Requirement cho nó.

>  Bài viết đươc tham khảo từ ngồn **[ TestLodge](https://blog.testlodge.com/user-story-vs-requirements/)**
###
**Những phần trước cùng chủ đề "Make a Different in Software Testing Basics":**

>* Phần 1 - **[Functional Testing and Non-Functional Testing](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-1-djeZ1awQZWz)**
>* Phần 2 - **[Re-testing and Regression testing](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-2-1Je5EMg15nL)**
>* Phần 3 - **[Boundary value analysis and Equivalence partitioning](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-3-4P856XvRZY3)**
>* Phần 4 - **[Verification and Validation](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-4-oOVlYdXvZ8W)**
>* Phần 5 - **[Test Case and Test Scenario](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-5-6J3Zg2xEKmB)**
>* Phần 6 - **[Quality Assurance and Quality Control](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-6-oOVlY12yl8W)**