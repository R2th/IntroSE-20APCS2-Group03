# Phần 1: Chuẩn bị.
Phòng thì bao giờ cũng dễ hơn chống. Sự chuẩn bị kỹ lưỡng trước khi triển khai lên Production là một bước cốt tử, đảm bảo hệ thống chạy ngon lành cành đào. Bạn cũng có thể đọc bài viết của tôi (bị bên Techtalk copy) để khởi động tại đây: https://techtalk.vn/ve-mindset-va-toolset-trong-phat-trien-phan-mem-muon-thanh-cong-lap-trinh-vien-khong-nen-bo-qua.html

Tôi rất thích một câu nói của Mike Tyson, đó là “Ai cũng có một kế hoạch cho tới khi ăn một đấm vào mặt”, nhưng điều đó không có nghĩa sự chuẩn bị là vô ích. Sự chuẩn bị giúp cho chúng ta có nhiều lợi thế khi bị đẩy vào tính huống gian lao.

## 1. Luôn luôn thực hiện Clean Code.
Tất nhiên Clean Code là một điều nên làm trong mọi hoàn cảnh. Để chuẩn bị deploy lên production được tốt hơn, bạn hãy đảm bảo mã của bạn đã sạch sẽ và cực kỳ dễ hiểu. Nó không chỉ giúp cho người tiếp nhận mã của bạn (hoặc chính bạn) hiểu được ý nghĩa của dòng code, nó còn giúp cho việc ai đó sửa code của bạn khi nó đang ở trên production. Việc code viết khó hiểu sẽ làm cho việc sửa lỗi trên production diễn ra lâu hơn. Mà đã lên production thì thời gian là vàng là bạc, 1 phút chậm trễ cũng có thể gây ra nguy hiểm tai hại. Tôi đã không ít lần gặp trường hợp deploy code của đồng đội và gặp lỗi ở chính đoạn code đó trên production. Tôi nhấc máy gọi cho đồng đội thì họ không thể xử lý lúc đó được, buộc tôi phải nhẩy vào xem code và hot fix cho lẹ. Đen thay, code không dễ hiểu chút nào, thời gian thì gấp rút, khách hàng thì la ó khiến tôi toát mồ hôi và chỉ muốn chém đồng đội 1 nhát.

## 2. Rèn luyệt Defensive Programming.
Đây là một kỹ thuật lập trình mà tôi rất hứng thú. Nó được giới thiệu trong cuốn sách The Pragmatic Programmer (Lập trình viên thực dụng) – Dave Thomas, một trong 10 cuốn mà giới Coder trên thế giới phải đọc. Nhìn chung, chúng ta rất khó lường trước được mọi trường hợp có thể sẩy ra với code của chúng ta cũng như môi trường để chạy. Việc áp dụng các kỹ thuật của Defensive programming giúp ta có thể yên tâm hơn phần nào. Tôi rất ghét code của người Ấn, nó thường dài, rối rắm và nói chung là smell. Tuy nhiên điều làm tôi ngạc nhiên là phần mềm của họ viết ra chạy rất mượn mà, ít lỗi và thường trong code của họ Error Handling rất tốt.

## 3. Nên sử dụng Unit Test khi có thể.
Ở góc độ nào đó, sẽ không ai thèm ngó code của bạn cho tới khi nó gặp lỗi. Tự làm chủ khả năng xử lý lỗi ngay từ khi dòng code được viết ra là một điều nên làm. Nó cũng giúp cho bạn không phải test lại cả hệ thống khi phải sửa một bug, điều đó giúp tránh các bug degrade. Ngoài ra, một tác dụng thần kỳ của Unit Test đó là bạn sẽ được rèn luyện khả năng tư duy phán đoán rất tốt khi viết Code. Cover càng được nhiều case thì lỗi sẽ càng ít đi và bạn có thể an tâm hơn khi triên khai lên production.

## 4. Có thói quen Ghi Log
Việc ghi log rât có ích, cả khi đang code cho tới khi ở trên production. Việc bật mode debug trên production là một thảm họa mà tôi không biết phải diễn tả nó như thế nào. Hãy chịu khó ghi log các exception, thậm chí các info khi hệ thống chạy để có thể trace lỗi nhanh hơn sau này. Việc này còn giúp ích cho bạn khi bạn có đủ evident để biết code của bạn hoạt động hoàn hảo, và lỗi phát sinh không phải từ code mà là một chỗ chết mẹ nó đó. (Trừ khi việc ghi log của bạn dẫn đến lỗi. Haha. Tôi đã từng dính vài lần với Laravel và Docker – Laravel không thể ghi được Log vào file dẫn tới chết hệ thống).

## 5. Sử dụng CI nếu có thể.
Việc tích hợp liên tục giúp chúng ta tự động hóa được rất nhiều bước mà chúng ta thường lười làm như: Auto review code, automation testing… Sử dụng CI giúp chúng ta tăng tốc độ phát triển lên, từ đó có nhiều thời gian hơn để code tốt hơn.

## 6. Viết Deployment checklist.
Việc viết ra Deployment checklist là rất cần thiết để làm. Trong đó sẽ bao gồm những bước cần thực hiện trước, trong và sau khi deploy hệ thống. Nó giúp cho bạn không bị quên một bước quan trọng nào đó, cũng như cho bạn biết là mình đang thực hiện tới bước nào, mỗi bước mất bao lâu để thực hiện xong. Những dự án tôi tham gia khách hàng thường yêu cầu tôi viết checklist này, và họ sẽ theo dõi trong quá trình tôi deploy hệ thống. Việc cung cấp cho khách hàng khi họ không yêu cầu, cũng thể hiện sự chuyên nghiệp của một tay DevOps nghiệp dư như tôi.

## 7. Hãy chuẩn bị các môi trường Dev/Test/Staging trước khi triển khai lên Production.
Tùy thuộc vào yêu cầu dự án cũng như nguồn lực thực hiện việc này. Theo tôi, với các dự án quan trọng và có đủ nguồn lực thực hiện các bước của DevOps, chúng ta nên chia các phiên bản và chạy trên môi trường khác nhau. Hãy đảm bảo code của bạn sạch sẽ và chạy ngon lành trên Staging server trước khi nó được triển khai lên Production.

## 8. Hãy tạo Workflow và Pipeline cho việc Deployment.
Về cơ bản, 1 workflow hay Pipline cũng như việc bạn dùng Checklist, tuy nhiên nó có thiên hướng kỹ thuật nhiều hơn. Và trong Pipeline, bạn phải đảm bảo các node cần thực hiện xong mới có thể thực hiện được bước tiếp theo. Tôi ví dụ, nếu bước chạy Automation testing của bạn fail, bạn sẽ không thể chạy tiếp bước Deployment to test server. Hãy hiểu rằng Pipline và một dạng step-by-step còn Checklist chỉ là danh sách các công việc mà bạn cần làm, nó có thể làm song song hoặc không cần theo thứ tự nào.

Như vậy tôi đã gửi tới các bạn phần 1/3 của loạt bài. Hy vọng bạn thấy nó hữu ích.

## Biển Hoàng.