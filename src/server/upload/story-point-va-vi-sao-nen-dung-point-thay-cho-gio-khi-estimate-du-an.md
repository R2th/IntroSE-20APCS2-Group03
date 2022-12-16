### I. Tổng quan
*  Trong trường hợp thực tiễn, luôn có những trường hợp spent time sẽ quá thời gian so lúc estimate, và điều này cực kì phổ biến, nó không hề bỏ qua cho cá nhân hay tổ chức nào cả.
*  Đối với những task có độ khó và nhiệm vụ phức tạm, như logic về chuyển tiền, ... thì việc không thể ước tính và ước tính các thành phần nhỏ sai lầm dễ làm ảnh hưởng tới tổng thể công việc.
*  Nếu ta dùng đơn vị là giờ để estimate thì việc bị khách hàng cho "ăn chửi" là điều dễ xảy ra :v . Nên việc dùng story point để thay thế để giúp giảm thiểu độ cam kết và tách rời nó ra khỏi ước tính theo thời gian.

### II. Story point là gì?
*  Nói đơn giản nó là một đơn vị để tính độ khó của task để hoàn thành.
*  Đối với point ta sẽ không cần phải phân biệt người mới, người cũ, senior, junior, ... Vì đơn giản point không phải giờ nên đối với người này thì một ngày họ làm được tổng cộng 5 point - tương ứng 2 task, người khác thì là 3 point - tương ứng 1 task.
*  Nó sẽ được tính theo với mỗi sprint thì team mình sẽ giải quyết được bao nhiêu point, với bao nhiêu task.
*  Như vậy sẽ đỡ bị áp lực cho những người mới vào dự án, hay những người còn chưa chắc tay, họ vẫn sẽ hoàn thành tốt công việc của mình với đúng khả năng ở hiện tại mà họ có. Và khi nói chuyện với cấp trên về task của mình, nó sẽ dễ nói hơn so với việc estimate bằng giờ.

### III. Tại sao không nên sử dụng giờ?
* Như đã nói ở trên, khi ta estimate bằng giờ, thì việc mình chưa định hình cụ thể công việc mà đã có số giờ cụ thể cho task đó, vô hình chung nó như deadline cứa cổ chúng ta, làm cho việc stress liên tục diễn ra nếu task đó có issue xảy ra đột xuất và ta không thể cover kịp.
* Một số lựa chọn là chỉ cần nỗ lực nhiều hơn để làm cho ước tính của bạn chính xác, nhưng để thực hiện điều này một cách chính xác, bạn cần nghiên cứu, sửa đổi, dự báo những cạm bẫy tiềm ẩn và thường bị mắc kẹt để đưa ra một con số thực tế. Điều này khiến bạn mất đi sự nhanh nhẹn, chiếm nhiều thời gian hơn và cuối cùng vẫn có thể sai.
* Khi làm task ta chỉ cần 90% để tạo ra những dòng code, còn 10% còn tại thì dành cho việc fix bug, fix issue, tìm lỗi, cover logic, ... Nhưng 90% thì chỉ mất 10 phút, còn 10% thì lại mất tới 17 giờ.
* Story point thì cho phép để lại sai sót và tính đến các yếu tố không xác định này.

### IV. Cân nhắc về story point
* Nghe thì có vẻ khá là rối nhưng nó thực sự có thể dễ dàng khắc họa một loạt các yếu tố khó có thể xác định được với time alone (từ này không biết dịch nên để tạm :v)
    * Effort
    * Amount of work
    * Risk
    * Uncertainty
    * Complexity
    * Different departments point of view
* Tất cả những điều trên gần như là tiêu chuẩn chung để đánh giá task có bao nhiêu point.
* Không phải lúc nào trong team cũng có số point thống nhất với nhau, nó còn tùy thuộc vào việc tiếp cận vấn đề của mỗi người trong task đó
* Trong một planning poker, các lập trình viên trong nhóm có thể ước tính câu chuyện này chỉ có hai điểm, vì việc thêm một cột vào bảng cơ sở dữ liệu là một thay đổi nhỏ đối với họ. Tuy nhiên, đối với những tester có thể ước tính câu chuyện này ở mức 13 điểm, vì nó đủ gây ra một issue gây chết app nếu dữ liệu không chuẩn xác như cột đó nó có liên kết khóa ngoại và không null.

### V. Làm sao ước tính story point
* Mỗi công ty, mỗi dự án sẽ có những cách áp dụng khác nhau, còn riêng với mình cách áp dụng này khá ok là ta sẽ tìm ra 3 story point với các tiêu chí 1 dễ, 1 trung bình, 1 khó. Rồi từ 3 tiêu chí này ta sẽ xác định các task khác nó có độ khó ngang bằng, dễ hơn hay khó hơn rồi từ đó đưa ra số point phù hợp cho task

### VI. Kết
Story point cho phép không chính xác, trong một thế giới nơi các ước tính chính xác là khó khăn, tốn thời gian và không thể thực hiện được. Điều quan trọng là chuyển sự tập trung ra khỏi thời gian, thành một đơn vị trừu tượng ngăn chặn sự gắn bó và lãng phí cảm xúc. Hãy chắc chắn rằng bạn tính đến nỗ lực cần thiết, bất kỳ tiềm năng nào cho sự không chắc chắn và rủi ro thực sự thực hiện nhiệm vụ khi xem xét số lượng  story point. Điều này cho phép nhóm của bạn nhanh chóng ước tính các câu chuyện, làm nổi bật những cạm bẫy tiềm ẩn và đảm bảo cách tiếp cận tâm trí nhạy bén để ước tính. Planning poker được cải thiện bằng tranh luận lành mạnh và chia sẻ ý kiến hay giải pháp cấp cao (high level solutions).

### VII. Tham khảo
https://medium.com/scrumi/story-point-estimation-eli5-a1309a12775e