![](https://images.viblo.asia/c3368c6d-e288-4aa5-9c96-ba872206b584.png)
Unit testing(UT), một từ khoá quá quen thuộc với những anh em lập trình. Giống như cái tên của nó thì mục đích của UT là xác minh, xác nhận lại những đoạn code mà developer viết đã thoả mãn được yêu cầu đặt ra trước đó chưa và có cover được những trường hợp exception hay không. Và những đoạn code dùng để xác minh, xác nhận đó do chính developer viết trước khi thực hiện UT (yaoming). Và hầu như, hầu hết developer họ đều ngao ngán khi nhắc tới UT =)).



Hôm nay mình sẽ nói một chút về tầm quan trong của UT trong quy trình phát triển phần mềm nhé!


## 1. Tại sao lại phải viết UT?
![](https://images.viblo.asia/27605c44-7134-4830-a2bb-bdb631bdf7c5.jpg)
Nếu nhắc đến UT cho 10 developer thì chắc khoảng đâu đó 8, 9 người sẽ làm bộ mặt ngao ngán =)). Những tại sao chúng ta vẫn phải viết nó ...zzz. Vì UT mạng lại những lợi ích thiết thực cho chúng ta trong quy trình phát triển phần mềm.

Mục đích chính của duy trì chất lượng tốt nhất của những đoạn code và cũng phòng tránh những issues/bugs có thể gặp phải sau khi coding. Đóng góp một phần quan trọng trong vòng đời phát triển hệ thống(SDLC), UT rất quan trọng để có thể tìm cũng như phát hiện bug sớm và điều đó sẽ làm giảm thiểu chi phí phải bỏ ra để testing cũng như cover bugs về sau này.

Như mọi người cũng biết việc testing không chỉ dừng lại ở UT mà còn integration testing, system test, ... Càng test về sau thì chi phí cũng tăng theo. Và khi nó đi đến tay khách hàng thì mọi người cũng hiểu chuyện gì sẽ xảy ra rồi đấy (facepalm). Vì thế mà tại sao chúng ta vẫn phải viết UT. UT giúp giảm chi phí testing của những công đoạn sau này, làm dự án phát sinh ít vấn đề hơn, ít nhất là ở chất lượng code được đảm bảo, giảm thời gian cho các công đoạn testing kế tiếp.

Giờ thì các bạn đã biết tại sao phải viết UT rùi đó =)). Mặc dù có người nói việc có issues/bugs là chuyện rất bình thường nhưng việc dự án phát sinh nhiều issues/bugs thì chả ai vui cả. Bên đội dự án thì phải OT, thậm chí ON để cover issues và fix bug. Khi coding hãy nghĩ đến những gì chúng ta sẽ phải đối mặt và hãy chấp nhận UT nhé (yaoming).

Tiếp theo mình sẽ trình bày một số lợi ích chi tiết khi viết UT nhé!
## 2. Những lợi ích của Unit Testing
- Việc testing có thể được hoàn thành sớm của vòng đời phát triển phần mềm khi mà những module khác chưa sẵn sàng để tích hợp vào.
- Việc xử lý những vấn đề sớm khi UT có thể xử lý rất nhiều vấn đề khác có thể xảy ra sau này trong quá trình development và testing.
- Chi phí cho UT thì ít hơn nhiều so với các phase testing sau như là system testing, acceptance testing và nhất là chi phí khi issues/bus qua đến bên khách hàng.
- Đo lường được những đoạn code nào đã pass, những đoạn code nào chưa pass. Và developer có thể cover ngay đoạn code đó sau khi chạy UT.
- Giảm lượng bugs phát sinh ở các giai đoạn testing tiếp theo(system testing, acceptance testing, ...).
- Một đoạn code đầy đủ có thể được xác minh thông qua việc viết UT và execute UT. Nó còn mang lại rất nhiều lợi ích khi chạy trong những quy trình cần sự lanh lẹ.
- Để viết UT thì developer cần phải hiểu rõ requirement, giúp developer tránh miss requirement trong quá trình develop. Nếu có trường hợp miss sẽ có thể dể dàng nhận ra và cover sớm nhất có thể.
- Dễ dàng phát hiện developer nào đang đi sai flow. Ví dụ như việc [CI](https://en.wikipedia.org/wiki/Continuous_integration) sẽ run UT test và trả về result pass or fail từ đó sẽ quyết định deploy code hay không.
- Tiết kiệm thời gian development. Việc viết UT và execute có thể sẽ tốn nhiều thời gian nhưng nó làm cho code đầy đủ hơn và phát sinh ít issues/bugs hơn. Thay vì coding nhanh và phát sinh rất nhiều issues thì hay coding song song với viết UT và execute, có thể sẽ tốn nhiều thời gian hơn bình thường nhưng sẽ hạn chế những phát sinh sau này.

Bên trên đây mình đã nêu một số lợi ích của Unit Testing, có lẽ còn chưa đầy đủ nhưng cũng sẽ là những lợi ích chính. Vì vậy hãy cân nhắc việc viết UT, execute UT có mang lại hiệu quả không và sử dụng trong quá trình phát triển phần mềm nhé!

![](https://images.viblo.asia/d8de5d51-061b-4388-b413-ed225b8907c0.png)



Thôi...! Bài trình bày của mình đến đây là hết! Cảm ơn mọi người đã bỏ thời gian lướt qua vài post này. Hay tập sống với Unit Testing nhé. Đó là chìa khoá dẫn đến thành công dành cho developer chúng ta =)). Một lần nữa cảm ơn và hẹn gặp lại mọi người trong bài post kế tiếp.