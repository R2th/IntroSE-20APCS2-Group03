Bài viết này sẽ trả lời 4 câu hỏi: D
 - Detail design là gì? 
 - Tại sao lại cần detail design trong quá trình thiết kế phần mềm?
 - Ưu nhược điểm của detail desgin?
 - Có phương pháp nào thay thế được detail design hay không?

# Detail design là gì?
Khi nói về detail design, tức là chúng ta đang đề cập đến một quá trình được gọi là thiết kế top-down. Về cơ bản, khi bạn nghĩ về vấn đề bạn đang cố gắng giải quyết, bạn sẽ bắt đầu ở cấp độ cao nhất và sau đó tự mình nghiên cứu chi tiết các thành phần thấp hơn bên trong nó. Cách tiếp cận này hoạt động rất tốt. Khi bạn có một cấu trúc tổng thể mà bạn muốn ứng dụng của mình sẽ hoạt động theo cấu trúc đó . 

Ở cấp độ vĩ mô, bạn đang xem xét sẽ cần bao nhiêu bộ máy để lưu trữ ứng dụng của mình, bạn sẽ cần sử dụng dịch vụ nào, v.v. Khi bạn tìm hiểu sâu hơn, bạn đang xem xét kĩ các user-case và xử lý lỗi. Khi bạn đi sâu hơn vào chi tiết, bạn đang xem xét thuật toán của ứng dụng, chuyển trạng thái, chuỗi logic và cách các phần bên trong của code làm việc cùng nhau.


# Tại sao lại cần detail design trong quá trình thiết kế phần mềm?
Tài liệu thiết kế là một cách để bạn giao tiếp với mọi người trong dự án về những giải pháp được chọn lựa, trình bày lý do tại sao các giải pháp này là đúng đắn. Việc diễn tả được ý tưởng là một vấn đề. Để truyền đạt được những giải pháp trong thiết kế, bạn phải xác định đến đối tượng người đọc là ai.

Ngày nay, chúng ta thể làm được nhiều việc hơn trong thời gian ngắn hơn. Với những ngôn ngữ lập trình cao cấp, môi trường làm việc, các công cụ hỗ trợ và tư tưởng phát triển phần mềm, mọi người đều trở nên quen thuộc với việc cần phải tạo ra sản phẩm một cách cực kỳ nhanh chóng. Các Dev thường có xu hướng bắt tay ngay vào bước coding vì sợ không kịp thời gian, chậm deadline, over-time... Dẫn tới tình trạng các tài liệu liên quan đến dự án ít dần.

Một các đơn giản để tiếp cận với detail design là những gì được tìm hiểu với phương pháp waterfall(thác nước), hướng dẫn quy trình của IEEE, nhà cung cấp UML, trường đại học và CMMI. Trong nhiều quá trình nặng nề này, họ cung cấp cho bạn hai cách viết tài liệu thiết kế. 
Một là sơ đồ kiến trúc tổng thể (thiết kế cấp cao nhất/top level). Hai là thiết kế chi tiết nơi bạn đi sâu hơn vào từng vấn đề. 

Trong nhiều trường hợp, đó là cách tiếp cận duy nhất để thiết kế mà nhiều người biết đến. Đó là một cách tiếp cận rất hợp lý và có phương pháp để làm rõ từng vấn đề trong thiết kế phần mềm.

# Ưu nhược điểm của detail desgin?

Ưu điểm chính là bạn đã xác định được những phần quan trọng, có khả năng sẽ xảy ra trong quá trình thiết kế phần mềm. Nếu bạn cần bắt đầu làm việc về cách phần mềm của bạn sẽ sử dụng một dịch vụ hiện khác, bạn đã biên soạn danh sách các điểm tích hợp của mình. Bạn sẽ có thể bắt đầu các cuộc nói chuyện với chủ sở hữu của các dịch vụ đó để lên kế hoạch tích hợp cùng với cách xử lý các sự kiện bất ngờ.

Nhược điểm chính là nhiều lần mọi người đi quá xa lỗ hổng và tài liệu thiết kế có một cuộc sống riêng. Mặc dù có một tầm nhìn và kiến trúc tổng thể về cách ứng dụng sẽ hoạt động, nhưng bạn sẽ luôn thấy những suy nghĩ ban đầu của mình về các chi tiết cốt lõi bị sai. Khi điều đó xảy ra, tài liệu thiết kế bị bỏ qua hoặc bạn có cả nhóm duy trì giấy và làm chậm tiến độ trong công việc.