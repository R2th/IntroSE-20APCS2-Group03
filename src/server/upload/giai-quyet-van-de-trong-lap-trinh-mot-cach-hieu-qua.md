Giải quyết vấn đề là một kỹ năng quan trọng. Vấn đề luôn xuất hiện, và chúng ta luôn phải đối mặt và giải quyết chúng, có cả vấn đề đơn giản và vấn đề phức tạp.
Các vấn đề trong lập trình có thể là một trong những loại sau đây:
- Bạn làm theo tài liệu hướng dẫn để cài đặt phần mềm, nhưng phần mềm không hoạt động như mong đợi.
- Bạn gặp một lỗi lạ. Có một error message xuất hiện và bạn không biết lỗi đó có ý nghĩa là gì, hoặc khó hiểu hơn là phần mềm tư đóng và không có message nào cả.
- Trong dự án maintaince, bạn không biết phải phân chia code, ghép code vào phần nào trong project. Bạn ko biết dự án đó hoạt động như thế nào, không có ai hướng dẫn cho bạn cả.
- Bạn gặp khó khăn khi chọn library, framework, cái nào sẽ phù hợp hơn với dự án.
..
Qua các vấn đề bản thân và đồng nghiệp gặp phải, tôi có tích luỹ và tổng hợp lại vài gợi ý sau để bạn có thể tham khảo khi gặp phải các vấn đề.

Về cơ bản quy trình để chúng ta giải quyết vấn đề có 4 bước
1. Định nghĩa vấn đề
2. Thu thập thông tin
3. Thực thi giải pháp
4. Kiểm tra vấn đề đã được giải quyết hay chưa.

**1. Định nghĩa vấn đề**
Bạn cần phải biết rõ vấn đề mình đang gặp phải là gì, vấn đề trở nên khó khăn là do bạn không hiểu rõ về chúng.
Bạn cần trình bày, giải thích được vấn đề bạn gặp phải là gì. 
Trong một số trường hợp điều này khá dễ dàng. Bạn nhận được một thông báo lỗi và bạn dễ dàng nhận ra mình đã mắc một lỗi đơn giản. Do bạn đã hiểu được ý nghĩa error message thông báo, bạn đã quen với những lỗi tương tự như vậy. Nhưng trong một vài trường hợp khác, điều này là không dễ dàng.

VD: (1) Bạn làm theo tài liệu hướng dẫn để cài đặt phần mềm, nhưng phần mềm không hoạt động như mong đợi.
-> bạn cần xác định:
- Làm theo tài liệu đến bước nào thì có vấn đề, không giống như mô tả của tài liệu
- Có error hay warning message nào không
- Mục đích của từng bước step trong hướng dẫn là gì
- Step nào mình đã thực sự done, step nào mình thấy còn có vấn đề
- Lỗi bạn gặp có phải là phổ biến không? Có người gặp vấn đề tương tự không, hay bạn là trường hợp hiếm?

**2. Thu thập thông tin**
Mọi người thường thực hiện như sau:
- Có được error message, định nghĩa được vấn đề là gì -> sử dụng Google, Stack Overflow để search
- Copy and paste source code hoặc làm theo một hướng dẫn nào đó mà không hiểu chức năng của chúng, không hiểu mục đích tại sao lại có hướng dẫn như vậy.

Các bước trên dẫn đến việc "giải quyết" các vấn đề mà không cần hiểu đầy đủ về chúng, thay vì đó bạn lên tìm hiểu xem làm sao những chuyên gia trên có thể trả lời cho vấn đề của bạn, thường là ở trong phần trả lời, họ sẽ trích dẫn tài liệu nguồn có thông tin liên quan.

Những loại thông tin sau bạn có thể lên quan tâm và tìm hiểu:
- Nếu bạn biết chính xác chức năng, class hoặc end point API bạn đang sử dụng, bạn có thể đọc document, reference của nó để xem tất cả các tùy chọn khác nhau khi sử dụng nó. VD với C#, .Net tài liệu tham khảo đầu tiên là msdn.
- Nếu bạn đang gặp sự cố với một gói mã nguồn mở và không biết tại sao, hãy thử đọc mã nguồn cho tính năng có liên quan để đảm bảo rằng nó đang hoạt động chính xác những gì bạn nghĩ.
- Để có cái nhìn tổng quan về một công cụ hoặc một ngôn ngữ mới, bạn cần bắt đầu với trang tutorial hoặc một list video hướng dẫn trên youtube. Điều này giúp bạn bổ sung kiến thức basic bạn còn thiếu, giúp bạn làm quen và hiểu hơn về đối tượng bạn mới tiếp cận.
- Nếu bạn không hiểu tại sao một đoạn code lại được thiết kế như vậy, hãy thử xem lịch sử commit, thông tin ticket, thời điểm đoạn source code implement ...

**3. Thực thi giải pháp**
Khi bạn tìm được một ý tưởng, một lời chỉ dẫn, bạn áp dụng nó vào vấn đề của bạn, và không phải lúc nào sự áp dụng đó cũng thành công ngay lập tức. 
Bản bỏ qua nó một cách vội vàng thì có thể điều đó sẽ dẫn đến bạn đã bỏ qua lời giải cho vấn đề của bạn rồi.

- Thử một cái gì đó. Nó không nhất thiết phải hoàn hảo. Nếu bạn thấy kết quả là bất kỳ điều gì thay đổi, đó là một thành công. 
- Chia nhỏ “giải pháp” thành những phần nhỏ và thử từng phần một. Cố gắng kiểm tra hoạt động của từng phần đó.
- Cố gắng tìm kiếm và hiểu ý nghĩa của từng bước có trong chỉ dẫn, điều này sẽ giúp bạn có cơ hội thay thế một bước có trong chỉ dẫn bằng một bước khác tương đương hoặc loại bỏ nó nếu không cần thiết.
- Khi bạn gặp tiếp vấn đề trong lúc bạn thực thi một giải pháp, việc quan trọng bạn cần làm là xác định xem gỉai pháp này có khả thi hay không, lúc nào bạn nên dừng việc follow hướng đi này và chuyển sang hướng khác.

**4. Kiểm tra vấn đề đã được giải quyết hay chưa.**
Thường thì chúng ta làm điều này bằng manual, VD: fix bug xong -> build & deploy lại -> manual test, kiểm tra xem nó có chứa tất cả các yếu tố mà chúng ta mong đợi nó hiển thị hay không. Thử tái tạo các điều kiện dẫn đến lỗi và xác nhận rằng lỗi không còn xảy ra nữa. 

Một cách khác mà chúng ta hay thực hiện là với unit test hoặc automation test, viết các đoạn mã, các trường hợp có thể xảy ra, kiểm tra kết quả hoạt động có đúng mong muốn của chúng ta hay không.

Trong rất nhiều trường hợp thì việc kiểm tra vấn đề được giải quyết hay chưa có thể được thực hiện bằng manual hoặc các đoạn mã test như trên. Cơ bản là chúng ta cần xác định được:
- Điều chúng ta mong muốn là gì
- Các trường hợp kiểm tra có bao phủ hết các khía cạnh của vấn đề hay không
- Những chức năng nào liên quan, ảnh hưởng cần check