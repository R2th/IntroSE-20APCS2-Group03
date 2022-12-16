[Tại sao ngôn ngữ lập trình C lại ít được sử dụng ?](https://hoovada.com/question/tai-sao-ngon-ngu-lap-trinh-c-lai-it-duoc-su-dung) Đây là một câu hỏi từ một bạn trên [Hoovada](https://hoovada.com/) - nền tảng hỏi và đáp chuyên nghiệp trên nhiều lĩnh vực khác nhau giúp giải đáp thắc mắc của mọi người.

Đáp án đến từ bạn [binkaa2](https://hoovada.com/profile/binkaa2) - một thành viên của [Hoovada](https://hoovada.com/)

Mình xin trả lời như sau:

**Tràn vùng nhớ**
![](https://codelearn.io/Media/Default/Users/baduyflex/StrengthAndWeakness/leakmemory.JPG)
Như đã đề cập ở trên C++ cho phép bạn tự quản lý vùng nhớ, giúp cho việc tái sử dụng vùng nhớ một cách hiệu quả nhưng nếu như anh em quản lý không tốt việc tràn vùng nhớ sẽ xảy ra. Ví dụ anh em cấp phát một vùng nhớ cho một pointer nhưng lại quên xóa vùng nhớ thì sao, cùng tôi demo nhé.

Code của tôi đang dùng hàm malloc() để cấp phát 1000000 ô nhớ có kiểu int, sizeof(int) là 4 bytes tương đương tôi đã cấp phát 4000000 bytes cho con trỏ ptr. Tôi dùng vòng lập for vô hạn với mỗi lần lặp tôi lại cấp phát 4000000 bytes vùng nhớ nữa. Điều này chắc chắn sẽ làm tràn RAM và chỉ có cách shutdown máy thôi :D

Vì thế C++ cung cấp cho bạn hàm free() và hàm delete để giải phóng vùng nhớ cho con trỏ khi không cần dùng tới nữa

**OOP trong C++ khá phức tạp và khó hiểu**

Thật vậy, trong C++ chúng ta không có khái niệm Interface. Chúng ta có thêm khái niệm hàm thuần ảo, hàm bạn, lớp bạn, hàm hủy(destructor), đa kế thừa,... Đối với cá nhân tôi thì OOP trong C++ khá phức tạp và khó hiểu. Trong C++ chúng ta phải khai báo phạm vi truy cập của class, phương thức, biến trong file header(file .h) và implement chúng trong file .cpp. Một số anh em nếu quen với OOP trong Java như tôi thì khi chuyển qua C++ sẽ khá bỡ ngỡ vì có một số khái niệm mới.

**Con trỏ là một cái gì đó rất chi là... khó**
![](https://codelearn.io/Media/Default/Users/baduyflex/StrengthAndWeakness/pointermeme.jpg)
Con trỏ là một biến mang địa chỉ của một vùng nhớ mà biến đó trỏ tới. Những anh em ban đầu tiếp cận với C++ thì khi học tới con trỏ rất dễ nản vì với những ngôn ngữ bậc cao khác chúng đã lược bỏ khái niệm này để làm ngôn ngữ thân thiện và dễ hiểu hơn. Nhưng cái gì cũng có cái lý do của nó, con trỏ sinh ra để giúp cho việc thao tác trực tiếp với vùng nhớ, tăng tốc độ thực thi của chương trình với tốc độ bàn thờ :D nên khó học thì cũng đi đôi với lợi ích đó.

Bạn [Heggman](https://hoovada.com/profile/heggman) - một thành viên khác của [Hoovada](https://hoovada.com/) - đã trả lời

C++ không hề ít được sử dụng. Tùy mục đích, C++ rất được trọng dụng, thậm chí là sự lựa chọn duy nhất.

C++ về bản chất nó là một ngôn ngữ bật thấp. Yêu cầu người dùng phải hiểu rõ về các "concepts" lập trình như quản lý bộ nhớ, cấu trúc dữ liệu...

Điều đó có nghĩa là việc sử dụng nó để phát triển không chỉ đơn giản như việc sử dụng các framework, ngôn ngữ bật cao phổ biến (C#, Java,...), khi mà mọi thao tác nêu trên đều đã được thực hiện một cách tự động.

Còn đây là câu trả lời của bạn [9mat](https://hoovada.com/profile/9mat) - cũng là một thành viên của [Hoovada](https://hoovada.com/)

Thực ra nói C (tính riêng C hoặc gộp chung C++) ít dùng thì không đúng lắm. Theo khảo sát của TIODE, dựa trên lượng tiền kiếm trên trang tìm kiếm lớn, C là ngôn ngữ phổ cập nhất năm 2020, chiếm 17.4% lượng tìm kiếm. Một vài năm trước C cũng chiếm top 2-3 trên bảng xếp hạng, và đây là chưa tính đến chỉ số của C++. Một chỉ số khác là PYPL, tính theo số lượng khoá học cho các ngôn ngữ, C/C++ cũng xếp thứ 5, chí sau Python, Java, JavaScript và C#. Dựa trên chỉ số này thì khó thể nói C là "ít dùng" được.

Tất nhiên, trong C/C++ được dùng nhiều hơn trong một số chuyên môn và ít hơn trong các chuyên môn khác. Một số lý do khiên cho C/C++ "có vẻ" ít phổ biến hơn thực tế:

* Quản lý bộ nhớ: C/C++ không có sẵn công cụ quản lý bộ nhớ như phần lớn các ngôn ngữ hiện đại khác (Java, Python, C#). Lập trình viên phải tự kiểm soát việc xin và giải phóng bộ nhớ. Việc này giúp tối ưu việc sử dụng bộ nhớ, nhưng đồng thời tạo ra gánh nặng khá cao cho lập trình viên, và có khả năng tạo ra rất nhiều lỗi rò rỉ bộ nhớ. Việc có sẵn trình quản lý bộ nhớ của Java, python giúp lập trình viên tiết kiệm thời gian phát triển lúc đầu cũng như xử lý lỗi lúc sau, thế nên trong những trường hợp mà thời gian chạy và bộ nhớ không quá quan trọng, C/C++ hơi yếu thế hơn so với các ngôn ngữ khác.
* Trình biên dịch: C/C++ là ngôn ngữ biên dịch tức là viết code xong phải chạy qua trình biên dịch để dịch ra mã máy. Điều này có thể làm chậm tiến độc lập trình và phát triển so viết các ngôn ngữ diễn giả (interpreted) và ngôn ngữ script, như Python hoặc Java script. Một số chuyên môn cần phải thay đổi liên tục trong quá trình phát triển sản phấm (ví dụ: phân tích dữ liệu cần cập nhật tham số liên tục, hoặc front-end cần điều chỉnh liên tục), thời gian biên dịch của C/C++ là một điểm yếu
* Marketing: C/C++ thực chất không có một tổ chức hoặc tiêu chuẩn chính thức, mà bao gồm nhiều tiêu chuẩn và phiên bản khác nhau (GNU C, Intel C, Borland C, etc..,). Đã có nhiều nỗ lục nhằm tiêu chuẩn hoá C/C++, nhưng quá trình phát triển và marketing có lẽ còn chậm và không đồng bộ như các ngôn ngữ khác được đỡ đầu một tổ chức hoặc cộng đồng mạnh như Java hay Python
* C/C++ mạnh ở linh hoạt trong quản lý bộ nhớ và thời gian chạy, nên thường được ứng dụng trong các lĩnh vực cần nhiều xử lý tính toán, như trong nghiên cứu khoa học, hay games, mềm nhúng, hệ điều hành) và những lĩnh vực này người ngoài ít có dịp tìm tòi bên trong, nên sinh ra cảm giác C/C++ ít được dùng

Đây là các câu trả lời của những bạn[binkaa2](https://hoovada.com/profile/binkaa2), [Heggman](https://hoovada.com/profile/heggman) và [9mat](https://hoovada.com/profile/9mat) - đều là những thành viên của [Hoovada](https://hoovada.com/). Các bạn có thể kết nối với nhau thông qua [Hoovada trên Facebook](https://www.facebook.com/groups/144206164549707). Những câu hỏi hay khác trên [Hoovada](https://hoovada.com/):

* [Những phần mềm thiết kế hình ảnh tốt trên smartphone?](https://hoovada.com/question/nhung-phan-mem-thiet-ke-hinh-anh-tot-tren-smartphone)
* [Vì sao càng ngày ngành công nghệ thông tin lại được quan tâm và trở thành mục tiêu của nhiều bạn trẻ ?](https://hoovada.com/question/vi-sao-cang-ngay-nganh-cong-nghe-thong-tin-lai-duoc-quan-tam-va-tro-thanh-muc-tieu-cua-nhieu-ban-tre)
* [Lịch sử hình thành youtube?](https://hoovada.com/question/lich-su-hinh-thanh-youtube)