Trong bài viết này, mình sẽ giới thiệu với các bạn một số mẹo và gợi ý về cách viết unit test cho code của bạn sao cho hiệu quả. Hãy cùng tìm hiểu vào áp dụng vào việc viết unit test của các bạn nhé.

## 1. Tiến hành test trong sự cô lập

Đây có lẽ là quy tắc cơ bản để tuân theo khi nói đến các unit test. Tất cả các lớp nên được kiểm tra trong sự cô lập. Chúng không nên phụ thuộc vào bất cứ điều nào khác ngoài mocks và stubs.

Với mỗi unit test, không nên phụ thuộc vào kết quả của bất kỳ bài kiểm tra nào. Chúng có thể chạy trên bất kỳ máy nào, máy của bạn, hoặc máy của những thành viên trong team của bạn mà vẫn cho ra cùng 1 kết quả.

## 2. Thực hiện theo Quy tắc AAA: Arange, Act và Assert

Khi nói đến unit test, AAA là viết tắt của Arange, Act và Assert. Đó là mô hình chung để thực biệt cái bài unit test, giúp cho chúng đơn giản, dễ đọc, dễ hiểu hơn.

Đầu tiên, bạn sắp xếp. Trong bước này, chúng ta sẽ thiết lập mọi thứ sẽ được kiểm tra. Bạn đặt các biến, trường và thuộc tính để cho phép chạy thử cũng như xác định kết quả mong đợi.

Sau đó, là thực hiện hành động, bạn gọi hành động mà bạn đang tiến hành thử nghiệm.

Cuối cùng, bạn khẳng định. Bạn gọi các framework kiểm tra để xác minh rằng "Hành động" của bạn là đúng như mong đợi. Hãy tuân thủ theo quy tắc AAA, để giúp các bài unit test của mình rõ ràng và dễ đọc hơn nhé.

## 3. Thực hiện các bài test đơn giản "Fastball-Down-the-Middle"

Các bài kiểm tra đầu tiên bạn viết nên đơn giản nhất - con đường hạnh phúc. Chúng nên là những thứ gì đó dễ dàng và nhanh chóng minh họa chức năng các bạn đang cố gắng viết.

Nếu các bạn đang viết thuật toán thực hiện phép tính cộng, các thử nghiệm đầu tiên mà bạn viết sẽ đảm bảo rằng mã của bạn có thể thực hiện `2 + 2 = 4`. Sau đó, khi các bài test đã đúng, bạn nên viết các bài test phức tạp hơn theo các khía cạnh khác nhau theo code của bạn.

## 4. Thực hiện kiểm tra qua các điểm biên

Unit test nên kiểm tra cả hai mặt của một ranh giới nhất định. Nếu bạn đang xây dựng một số thử nghiệm cho các tiện ích ngày và thời gian. Hãy thử kiểm tra một giây trước và 1 giây sau nửa đêm. Kiểm tra giá trị ngày của 0.0.

Nếu bạn đang xử lý một cấu trúc chứa một hình chữ nhật, thì hãy kiểm tra xem điều gì xảy ra với các điểm bên trong và bên ngoài hình chữ nhật. Những gì về trên hoặc dưới? Bên trái hay bên phải? Trên và bên phải? Dưới và bên trái?

Di chuyển qua các điểm biên là những nơi mà mã của bạn có thể thất bại hoặc thực hiện theo những cách không thể đoán trước.

## 5. Hãy kiểm tra tất cả các khả năng xảy ra cho chức năng của bạn

Nếu nó thực tế, hãy kiểm tra toàn bộ các khả năng cho chức năng của bạn. Nếu nó liên quan đến một kiểu liệt kê, hãy kiểm tra chức năng với từng mục trong bảng liệt kê.

Có thể không thực tế để kiểm tra mọi chuỗi hoặc mọi số nguyên, nhưng nếu bạn có thể kiểm tra mọi khả năng, hãy thực hiện nó.

## 6. Hãy bảo đảm các case của logic được kiểm tra

Đây cũng là một thách thức, nhưng nếu mã của bạn được thiết kế để thử nghiệm và bạn sử dụng một công cụ bao phủ mã, bạn có thể đảm bảo rằng mỗi dòng mã của bạn được bao phủ bởi unit test ít nhất một lần.

Nếu ngôn ngữ các bạn sử dụng có công cụ bao phủ mã, hãy sử dụng nó cùng với các unit test của bạn. Bao trùm mọi con đường code có thể không đảm bảo rằng không có lỗi nào, nhưng nó chắc chắn cung cấp cho bạn thông tin có giá trị về trạng thái của mỗi dòng mã.

## 7. Hãy tiến hành thiết kế các bài test lỗi và tiến hành sửa nó

Đây là một kỹ thuật mạnh mẽ và hữu ích. Nếu bạn tìm thấy một lỗi, viết một bài kiểm tra để thể hiện nó. Sau đó, bạn có thể nhanh chóng sửa lỗi bằng cách gỡ lỗi kiểm tra. Sau đó, bạn có một bài kiểm tra hồi quy để đảm bảo rằng nếu lỗi đó quay trở lại vì bất kỳ lý do gì, bạn sẽ phát hiện ra nó ngay lập tức. Nó dễ dàng sửa lỗi khi bạn có một bài kiểm tra đơn giản, đơn giản để chạy trong trình gỡ lỗi.

Một lợi ích phụ ở đây là bạn đã "tested your test". Bởi vì bạn đã thấy thử nghiệm thất bại và sau đó đã thấy nó vượt qua, unit test này hợp lệ ở chỗ nó đã được chứng minh là hoạt động chính xác. Điều này làm cho nó một bài kiểm tra hồi quy thậm chí tốt hơn.

## 8. Unit test độc lập

Các bài test không bao giờ nên phụ thuộc vào nhau. Nếu các bài test của bạn phải được chạy theo một thứ tự cụ thể, thì bạn cần thay đổi các bài test của mình. Thay vào đó, bạn nên sử dụng đúng các tính năng Thiết lập và Phá Bỏ đặc trưng của khung bài test của bạn để đảm bảo mỗi thử nghiệm đã sẵn sàng để chạy riêng lẻ.

Các framework unit test không đảm bảo rằng các bài kiểm tra sẽ được chạy theo bất kỳ thứ tự cụ thể nào. Nếu các unit test của bạn phụ thuộc vào các unit test chạy theo một thứ tự cụ thể, thì bạn có thể thấy code của mình sẽ có một số lỗi tinh vi, khó theo dõi và kiểm soát trong các unit test của mình.

Hãy chắc chắn rằng mỗi unit test đều được thực hiện riêng rẽ và bạn sẽ không có bất kỳ vấn đề gì với nó.

## 9. Đặt tên cho unit test của bạn một cách rõ ràng và đừng sợ tên dài

Khi bạn đang thực hiện một xác nhận cho mỗi unit test, mỗi unit test có thể sẽ rất cụ thể. Do đó, đừng ngần ngại về việc sử dụng tên dài, đầy đủ cho nó. Nó là tốt hơn để có `TestDivisionWhenNumPositiveDenomNegative` so với `DivisionTest3`.

Một tên dài, đầy đủ cho phép bạn biết ngay thử nghiệm nào thất bại và chính xác những gì bài test của bạn đã cố gắng làm. Các bài kiểm tra được đặt tên dài, rõ ràng cũng có thể ghi lại các bài kiểm tra của bạn.

Ví dụ: một bài kiểm tra có tên `DivisionByZeroShouldThrowException` cung cấp chính xác những gì mã của bạn thực hiện khi bạn cố gắng chia cho số không.

## 10. Kiểm tra mọi ngoại lệ được đưa ra

Nếu mã của bạn đưa ra các ngoại lệ, thì hãy viết các bài kiểm tra để đảm bảo rằng mọi ngoại lệ bạn nêu ra sẽ được đưa ra khi được yêu cầu.

Hầu hết các framework kiểm tra xUnit có thể kiểm tra ngoại lệ được nêu ra, vì vậy bạn nên sử dụng tính năng đó để đảm bảo rằng mọi ngoại lệ mà mã của bạn đưa ra thực sự được xuất hiện trong các trường hợp thích hợp.


## 11. Tránh sử dụng Assert.IsTrue

Tránh việc kiểm tra với điều kiện boolean.

Chẳng hạn, thay vì kiểm tra xem hai thứ có bằng nhau hay không, hãy sử dụng `Assert.AreEqual` thay thế. Tại sao? Bởi vì điều này:

```
Assert.IsTrue(Expected = Actual);
```

Bạn sẽ nhận được kết quả `Some test failed: Expected True, but the actual result was False.`  Điều đó không cho bạn biết bất cứ điều gì. Thay vào đó, bạn hãy sử dụng `Assert.AreEqual`

```
Assert.AreEqual(Expected, Actual)
```

Điều này sẽ cho bạn biết các giá trị thực tế có liên quan, chẳng hạn như `Some test failed: Expected 7, but the actual result was 3`, nó sẽ mang lại giá trị hơn nhiều so với cái giá trị bạn nhận được ở phía trên.

## 12. Các bài test cần được thực hiện liên tục

Các unit test của bạn được thực hiện trong quá trình bạn đang viết mã. Các unit test của bạn sẽ chạy nhanh, cho phép bạn chạy chúng sau những thay đổi nhỏ. 

Nếu có thể, bạn chạy các unit test của mình như là một phần của quá trình phát triển, thì có điều gì đó không ổn - các unit test sẽ cho bạn thấy được gần như ngay lập tức. Nếu nó không được như vậy, thì có lẽ vì bạn không chạy chúng trong sự riêng rẽ.

## 13. Chạy bài test của bạn như là một phần của mỗi bản build tự động

Bạn nên chạy các bài test của mình như là bạn đang phát triển vậy, chúng cũng là một phần không thể thiếu trong quá trình tích hợp liên tục của bạn. Một thử nghiệm thất bại có nghĩa là bản build của bạn bị hỏng.

Đừng để thử nghiệm thất bại kéo dài - coi đó là một lỗi trong quá trình build và bạn hãy khắc phục nó ngay lập tức.

**Phần kết luận**

Trên đây là 13 cách hữu ích để viết unit test. Hãy nhớ rằng, nếu bạn đang không viết unitest, code của bạn sẽ khó bảo trì và khó sửa. Các unit test được viết tốt, kỹ lưỡng sẽ là bước đầu dẫn đến thành công của bạn, giúp cho những dòng code bạn viết ra ít bug, ứng dụng của bạn sẽ gặp ít lỗi và được sự đánh giá cao của mọi người.

**Nguồn tài liệu**

https://medium.com/better-programming/13-tips-for-writing-useful-unit-tests-ca20706b5368