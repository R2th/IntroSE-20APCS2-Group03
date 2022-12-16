Là một IT trước đây khi mình còn học năm 2 mình cũng từng làm helpdesk một thời gian, tất nhiên quản trị hệ thống sẽ đòi hỏi nhiều kinh nghiệm và sự cẩn thận rất lớn, nếu bạn nào muốn học về bảo mật thì đầu tiên mình khuyên hãy thử đi làm helpdesk.

**1. Luôn tạo backup**

Cái  này với những bạn đã có kinh nghiệm thì không nói, nhưng những sinh viên mới thì chắc khá là lau tau, ví dụ muốn sửa một file kịch bản cứ trực tiếp mở file đó lên và sửa thôi và lỗi thì đình chỉ cả hệ thống. Cách giải quyết vấn đề là gì? Đơn giản thôi nén file gốc lại, ví dụ như mình hay nén file liên quan đến ngày đó chẳng hạn. Vi dụ tên file Script_05_05_2020.zip đó là file gốc rồi bạn cứ trực tiếp mà sửa thôi. Tất nhiên hệ thống luôn backup hàng ngày, nhưng bạn đâu có thể vì file sai mà backup lại đúng không?  Vì vậy bạn phải chủ động tạo file backup.

**2. Không được ghi đè database**

Lỗi này mình đã gặp phải. Rất may lúc đó mình mới chỉ được dùng local data chứ chưa connect ra hệ thống. Lúc đó mình đang viết file quản lý hệ thống khách hàng, thì trong store có nhiều file không hiển thị đúng yêu cầu như khách hàng mong muốn, mình mới bắt đầu sửa lại, và tất nhiên dùng local thì cứ sửa thôi, nhưng đen thay khi mình sửa thì lại lỗi, đỏ lòm cả hệ thống, lúc đó mới rút ra được bài học không được viết đè trực tiếp như vậy, thay vào đó bạn nhân đôi file đó lên bằng cách thêm đuôi _ đằng sau đó, ví dụ System_header_1 rồi sửa trên store tự tạo này, và nếu tất cả ngon nghẻ thì bạn lúc đó có thể sửa code ( dùng cho web nội bộ) không thì lúc đó bạn mới được phép đè lên data cũ.

**3. Tiếng Anh là một vấn đề thiết yếu**

Cái này thì quá là quan trọng rồi, không chỉ helpdesk mà tất cả lĩnh vực khác đều cần thiết. Việc có kinh nghiệm tiếng Anh, bạn sẽ dễ dàng giao tiếp với người nước ngoài, đọc tài liệu, Việt Nam mình tài liệu còn nhiều hạn chế, bên cạnh đó cộng đồng người nước ngoài luôn lớn, bạn có thể join vào những trang nước ngoài để hỏi kinh nghiệm, vừa học trong nước, vừa học "ngoài nước" phải tốt hơn đúng không?