Trong bài viết này mình xin trình bày một số tìm hiểu của mình về Test Matrix

**Khái niệm Test Matrix là gì?**

**Các nguyên tắc xây dựng Test Matrix dựa vào kỹ thuật nào?**

**Ưu điểm của Test Matrix**

**Nhược điểm của Test Matrix**

Let's go...

**1. Test Matrix là gì?**

Là bản quản lý theo dõi test cases và lỗi. Là một kiểu test case được **viết theo chiều dọc**. 

Ban đầu khi mới tiếp cận thì khá là khó viết, khó cả khi training cho mọi người. Nhưng khi đã viết quen thì thấy cũng thân thiện và tiện lợi.
![](https://images.viblo.asia/b3b2fb98-cbdc-4b35-bcb6-8fcd62890476.PNG)

Bảng quyết định ngoài việc sử dụng 2 giá trị T,F còn có loại mở rộng sử dụng lớn hơn 2 giá trị. Tuy nhiên số giá trị càng lớn thì lại càng làm bảng quyết định cồng kềnh và không hiệu quả.

Cách tiếp cận TC loại này:
1. Tư duy như viết TC thông thường.
2. Với từng case thì list hết input.
3. Chuẩn bị data với từng input đó.
4. List hết các output có thể xảy ra với input và data đó.
5. Check vào các input và output để tạo ra 1 case hoàn chỉnh.

**2. Các nguyên tắc xây dựng Test Matrix dựa vào kỹ thuật nào?**

Nếu các bạn làm việc với người Nhật thì người Nhật rất chú trọng đến việc kiểm tra chất lượng của phần mềm. Làm sao để đảm bảo được sản phẩm là tiện ích nhất, tốt nhất. Vì vậy, họ các kỹ thuạt khác nhau trong việc chọn và thiết kế testcase sao cho hiện quả nhất, tốn ít thười gian mà vẫn đảm bảo được các trường hợp test cần thiết.

Một trong những kỹ thuật thiết kế testcase áp dụng phổ biến nhất là **Decision Table** hay còn gọi là **Test matrix.**

Vậy nguyên tắc làm việc của test matrix là như thế nào? Tôi tin rằng bạn không nắm được nguyên tắc này thì chỉ làm cho test ma trận thêm rối bời, lúng túng và khó hiển hơn các kỹ thuật khác mà bạn vẫn hay dùng. Hôm nay, tôi sẽ giúp bạn làm rõ nguyên tắc cây dựng test matrix này nhé.

Ví dụ sau nhé: **Phân quyền cho nhân viên**

**Đề bài:** Hệ thống máy tính của trường đại học cho phép sinh viên phân bổ dung lượng đĩa tùy thuộc vào dự án của họ. Nếu họ đã sử dụng tất cả dung lượng được phân bổ, họ chỉ được phép truy cập hạn chế, tức là xóa tệp, không được tạo. Điều này giả sử họ đã đăng nhập bằng tên người dùng và mật khẩu hợp lệ.

**Bước 1**: Lập matrix giữa input condition và ouput condition theo decision table(Full decision)

**Bước 2**: Tiến hành tối ưu các trường hợp chúng ta còn số test case thực sự cần(Collapse decision)

![](https://images.viblo.asia/7f081be9-adbb-48c4-8765-72da6f2e706a.png)

**3. Ưu điểm của Test Matrix**
- Ngắn gọn, kiệm lời
- Dễ dàng review
- Dễ dàng kiểm soát case viết ra đủ hay không
- Thuận tiện khi sử dụng viết UTC, FTC

Note: 
UTC ( UTC testcase, UTC report, UTC evidence) là:
- Validate từng unit/function đang thực hiện đúng.
- Tất cả các thành phần(screen) kiểm tra ít nhất 1 lần.
- Lỗi được phát hiện sớm
- Scope nhỏ, dễ dàng fix errors

**4. Nhược điểm của Test Matrix**
- Viết các testcase có tính logic, khó phân tách input thì thể hiện vào testcase được là cả 1 vấn đề
- Nếu sử dụng tool quản lý testcase như Testlink thì không sử dụng được loại test case này, hay nói cách khác, loạn test này sẽ không phát huy hết tác dụng của nó trên tool này.
- Decision table ngoài việc dùng 2 giá trị T,F còn có loại mở rộng dùng lớn hơn 2 giá trị. Tuy nhiên số giá trị càng lớn thì lại càng làm Decision table cồng kềnh và không hiệu quả.

Mời các bạn đón đọc nha!!!