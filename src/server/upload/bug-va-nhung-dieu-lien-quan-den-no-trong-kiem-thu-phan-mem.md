Một trong những công việc mà tester manual cần phải làm thực hiện test và log bug nếu có. 
Vậy, có ai đã từng đặt ra câu hỏi về bug chưa nhỉ. Ví dụ như:
- Nó là gì, khái niệm thế nào ?
- Một template để có thể ghi lại bug sẽ như thế nào ?
-  Quy trình quản lý một con bug sẽ bao gồm những giai đoạn nào ?
- Nó có cần phải được phân loại không ?

Ngày xưa, khi mới bước vào ngành test. Tôi cũng đã từng thắc mắc như vậy.

Vì vậy, ngày hôm nay, với những kiến thức mà mình đã biết cũng như đã tìm hiểu thêm từ các loại tài liệu. Tôi sẽ ghi lại một chút về `Bug` để mọi người cùng biết nhé !
# 1. Bug là gì 
![](https://images.viblo.asia/f1bb82ad-d8ab-4380-b187-51e6b2d64e14.jpg)

`Bug` hay còn gọi là `Defect` là vấn đề xảy ra đối với một sản phẩm phần mềm khi developer xử lý một dòng hoặc một đoạn code bị lỗi ,mà kết quả đưa ra khác với yêu cầu của khách hàng hoặc người dùng.
# 2. Template của một con bug như thế nào?
![](https://images.viblo.asia/783be8d9-cb96-426c-a983-e591ab2a0f13.jpg)

Thông thường, trong quá trình Tester thực hiện test sẽ phát hiện ra bug  và  ghi lại nó trên một ứng dụng nào đó, có thể là trên gitlap, githup, excel... để có thể chuyển giao qua team development. Nó thường được gọi là 1 bug report.
Vậy 1 bug report có khái niệm như thế nào ?

Một Bug Report là một tài liệu chi tiết về lỗi tìm thấy trong các ứng dụng phần mềm. Báo cáo lỗi bao gồm từng chi tiết về lỗi như title, step thực hiện ra lỗi,expected result , actual resutl ,môi trường tìm thấy lỗi , tên người kiểm tra đã tìm thấy lỗi, tên nhà phát triển đã sửa lỗi, v.v. Báo cáo lỗi giúp xác định các lỗi tương tự trong tương lai để có thể tránh được lỗi đó.

1 bug report thường được viết theo 1 template cố định của dự án. Không phải dự án nào cũng có một template giống nhau. Nó sẽ biến tấu dựa trên như cầu và mong muốn của team.

Tôi chỉ có thể mô phỏng lại 1 template mà tôi thường hay dùng như sau:

- Title lỗi : Viết ngắn gọn về lôi đã xảy ra để mọi người nhìn vào có thể hình dung được nó là lỗi gì.
- Thông tin có thể reference tới : Mục này có thể có hoặc không. Nếu có thì thường sẽ là một thông tin, một link nào đó để có thể reference tới spec của KH.
- Step tái hiện lỗi : Các step cụ thể để developer fix bug có thể nhìn vào và tái hiện lại bug.
- Actual result : Là kết quả lỗi hiển thị ra sau khi thực hiện lại các step ở trên. 
- Expected result : Là kết quả cần phải hiển thị theo đúng spec khi người dùng thực hiện các step trên.
- Evidence : Có thể là hình ảnh hoặc video để có thể rõ hơn về lỗi đó.
- Môi trường testing : Là môi trường nơi tester thực hiện test cùng với các thông tin về nó
- Status : Có thể là new, inprogess, testing hoặc done.
- Milestone : là khoảng thời gian tìm thấy bug.
- Tên developer : Là tên của developer thực hiện sẽ fix bug.
-  Mức độ ưu tiên : Có thể cao/ trung bình/ thấp. dựa trên mức độ khẩn cấp của tác động mà tại đó lỗi cần được khắc phục tương ứng

1 số example về viết bug report 
**1.**
![](https://images.viblo.asia/2f75cddf-47d1-49f2-b541-85643a21694e.png)
**2.**
![](https://images.viblo.asia/6ffb327f-f2ef-4820-b252-48041f51223c.png)
**3.**
![](https://images.viblo.asia/be09f8eb-8c1e-4824-8d72-f080e6a11784.png)


# 3. Quy trình quản lý bug.
Quản lý lỗi là một quá trình có hệ thống để xác định và sửa lỗi. Một chu trình quản lý khiếm khuyết bao gồm các giai đoạn sau
1) Phát hiện ra khiếm khuyết, 
-  Ở tại giai đoạn này, bug sẽ được phát hiện ra, log lại và assign cho developer.
2) Sửa chữa khiếm khuyết bởi nhà phát triển 
- Đến giai đoạn này,developer sẽ phân tích 
  + Nếu lỗi này không phải là bug sẽ được trao đổi là chuyển lable là `Change` hoặc `Support`. Sau đó có thể fix ngay lúc đó hoặc sau đó tùy theo mức độ sau khi trao đổi với team.
  + Nếu là bug thì dev sẽ chuyển status sang `doing` để fix bug. 
- Sau khi dev fix xong, sẽ chuyển status sang `Testing` và assign ngược lại cho tester để tester có thể kiểm tra lại.
3)  Xác minh bởi người kiểm tra, 
- Ở giai đoạn này, tester sẽ thực hiện verify lại bug . 
  + Bug vẫn chưa được fix sẽ được reopen  và trả lại cho dev để dev có thể fix lại.
  +  Bug đã được fix và verify OK sẽ được close

#### Lưu ý
Trong giai đoạn testing lúc đầu được thực hiện bởi tester trước khi đưa qua cho khách hàng, team càng phát hiện ra nhiều bug thì càng tốt, để có thể giảm thiểu đi lương bug khách hàng có thể phát hiện ra tỏng quá trình họ dùng và thử nghiệm.

Một bug được cho là hợp lệ khi nó được team thừa nhận và chấp nhận.
# 4. Bug có cần được phân loại không ?
Ở phần trên, chúng ta đã nói nhiều về quy trình của bug. Vậy ngay dưới đây, chúng ta cùng tìm hiểu , bug có cần được phân loại không và nếu phân loại sẽ phân loại như thế nào nhé .

Tôi gỉa sử, trong một tình huống, khi test 1 web, tester đã phát hiện ra bug và log nó lại. Nhưng khi đưa qua team dev, thì lại xảy ra vấn đề như hình bên dưới. Vậy nếu bạn là Test manager. Bạn sẽ làm như thế nào.
![](https://images.viblo.asia/ecbe076e-e05e-4b0c-9095-f910b65d9dd4.jpg)

- Đồng ý với tester rằng nó là bug, cần fix sớm
- Đồng ý với developer , nó không phải là bug
- Xem xét lại vấn đề của bug đó trước khi đưa ra quyết định.

Các vấn đề nảy không đồng quan điểm của tester và developer là viêc xảy ra rất thường xuyên trong quá trình làm việc với nhau. 

Như vậy thì có lẽ, mọi người cũng sẽ đoán được sự lựa chọn của Test manager. 

Trong trường hợp đó, một quy trình giải quyết nên được áp dụng để giải quyết xung đột, bạn đóng vai trò như một thẩm phán để quyết định xem vấn đề trang web có phải là một khiếm khuyết hay không.

#### Phân loại
Thông thường bug sẽ được phân loại trước khi đưa qua developer để developer fix. Việc phân loại bug  giúp team develop sắp xếp thứ tự ưu tiên cho nhiệm vụ của họ. Điều đó có nghĩa là loại ưu tiên này sẽ giúp các developer sửa chữa những khiếm khuyết rất quan trọng trước tiên.
Các khiếm khuyết thường được Người quản lý kiểm tra hoặc team trao đổi, thảo luận với nhau và phân loại.
![](https://images.viblo.asia/b1e810ef-7642-49c5-98c7-fd59dc02f2b4.png)

# 5. Tổng kết. 
Cảm ơn mọi người đã đọc hết bài viết của tôi. Những kiến thức bên trên, có thể nó chỉ là một khía cạnh theo tự hiểu biết và đánh giá của riêng tôi. Sẽ không chắc chắn là nó hoàn toàn đúng và đầy đủ. Nhưng mong rằng, nó sẽ phần nào giúp mọi người có thể hiểu thêm về bug nhé. 
![](https://images.viblo.asia/cd2305ba-abb0-4fc9-941b-c47c6fd4c26b.jpg)

**Link references:**

https://www.guru99.com/defect-management-process.html

https://www.guru99.com/defect-life-cycle.html