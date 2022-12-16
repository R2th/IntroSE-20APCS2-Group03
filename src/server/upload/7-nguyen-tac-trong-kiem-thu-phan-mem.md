Kiểm thử phần mềm cũng như các công việc khác đều có những nguyên tắc riêng của nó. Kiểm thử phần mềm có 7 nguyên tắc:

1. Kiểm thử chứng minh sự hiện diện của lỗi
2. Kiểm thử toàn bộ là không khả thi
3. Kiểm thử càng sớm càng tốt
4. Lỗi thường được phân bố tập trung
5. Nghịch lý thuốc trừ sâu
6. Kiểm thử phụ thuộc vào ngữ cảnh
7. Quan niệm sai lầm về việc “hết lỗi”

Hãy cùng lần lượt đi qua 7 nguyên tắc kiểm thử này nhé.

**1. Kiểm thử chứng minh sự hiện diện của lỗi**

Kiểm thử chỉ có thể chứng minh được rằng sản phẩm có lỗi và không thể chứng mình rằng sản phẩm không còn lỗi. Nghĩa là sản phẩm luôn có lỗi cho dù có kiểm thử nhiều bao nhiêu. Vì vậy, điều quan trọng là chúng ta phải thiết kế các trường hợp kiểm thử cũng như tìm ra các quan điểm test để có thể tìm được càng nhiều lỗi càng tốt.

**2. Kiểm thử toàn bộ là không khả thi**

Nguyên tắc này nói rằng kiểm tra mọi thứ trong phần mềm một cách trọn vẹn là không thể. Kiểm thử với tất cả các kết hợp đầu vào và đầu ra, với tất cả các kịch bản là không thể trừ phi nó chỉ bao gồm ít trường hợp thì có thể kiểm thử toàn bộ.

Do đó, việc chúng ta có thể làm là chọn thực thi những loại kiểm thử quan trọng nhất dựa trên phân tích rủi ro cũng như tầm quan trọng và độ ưu tiên của việc kiểm thử. Nghĩa là phải lên kế hoạch kiểm thử, thiết kế trường hợp kiểm thử, sử dụng các kỹ thuật kiểm thử (phân tích giá trị biên, vùng tương đương, bảng quyết định,...) sao cho có độ bao phủ nhiều nhất và giảm thiểu rủi ro sót lỗi khi đến tay người dùng.

**3. Kiểm thử càng sớm càng tốt**

Nguyên tắc này yêu cầu bắt đầu thử nghiệm phần mềm trong giai đoạn đầu của vòng đời phát triển phần mềm. Các hoạt động kiểm thử phần mềm từ giai đoạn đầu chẳng hạn như giai đoạn lấy yêu cầu khách hàng hay thiết kế tài liệu sản phẩm sẽ giúp phát hiện bug sớm hơn. Ngoài ra ai làm phần mềm cũng biết được rằng việc phát hiện lỗi càng trễ bao nhiêu thì chi phí để sửa lỗi càng cao bấy nhiêu. Tương tự, việc thay đổi yêu cầu không đúng ngay từ đầu thường tốn ít chi phí thay đổi tính năng trong hệ thống.

**4. Lỗi thường được phân bố tập trung**

Thông thường, lỗi tập trung vào những module, thành phần chức năng chính của hệ thống. Nếu xác định được điều này bạn sẽ tập trung vào tìm kiếm lỗi quanh khu vực được xác định. Điều này cũng thuận theo nguyên lý Pareto: 80% số lượng lỗi được tìm thấy trong 20% tính năng của hệ thống.

**5. Nghịch lý thuốc trừ sâu**

Trong kiểm thử phần mềm, nếu bạn cứ thực thi lặp đi lặp lại một bộ test case thì có khả năng rất thấp bạn sẽ tìm được lỗi từ những trường hợp kiểm thử này. Nguyên nhân là do khi hệ thống ngày càng hoàn thiện, những lỗi được tìm thấy lúc trước đã được sửa trong khi những trường hợp kiểm thử đã cũ. Do đó, khi một lỗi được sửa hay một tính năng mới được thêm vào, chúng ta nên tiến hành làm regression (kiểm thử hồi qui) nhằm mục đích đảm bảo những thay đổi này không ảnh hưởng đến những vùng khác của sản phẩm. Tuy nhiên, các trường hợp kiểm thử trong regression test cũng cần phải được cập nhật để phản ánh sự thay đổi tương ứng của hệ thống.

**6. Kiểm thử phụ thuộc vào ngữ cảnh**

Tùy vào loại cũng như bản chất của phần mềm mà chúng ta sẽ áp dụng những phương thức, kỹ thuật, cũng như loại kiểm thử khác nhau.

Chẳng hạn như phần mềm liên quan đến ngân hàng sẽ cần được kiểm thử kỹ lưỡng hơn một trò chơi điện tử. Tương tự, nếu bạn đang kiểm thử ứng dụng web và ứng dụng di động bằng cách sử dụng chiến lược kiểm thử giống nhau, thì đó là sai. Chiến lược để kiểm thử ứng dụng web sẽ khác với kiểm thử ứng dụng cho thiết bị di động của Android hay IOS.

**7. Quan niệm sai lầm về việc “hết lỗi”**

Có thể phần mềm không có lỗi 99% vẫn không sử dụng được. Điều này có thể xảy ra nếu hệ thống không đáp ứng nhu cầu & yêu cầu của người dùng. Kiểm thử phần mềm không chỉ là tìm ra các khiếm khuyết mà còn để kiểm tra xem phần mềm có đáp ứng được các nhu cầu của doanh nghiệp hay không. Sự vắng mặt của lỗi là Sai sót tức là Việc tìm kiếm và sửa chữa các khiếm khuyết sẽ không giúp ích gì nếu việc xây dựng hệ thống không sử dụng được và không đáp ứng nhu cầu & yêu cầu của người dùng.

**Kết luận**

Các Nguyên tắc Kiểm thử sẽ giúp bạn tạo Chiến lược Kiểm thử hiệu quả và  liệt kê các trường hợp kiểm thử để bắt lỗi. Việc dựa theo 7 nguyên tắc trên sẽ giúp cho chúng ta có cái nhìn tổng quát hơn về kiểm thử cũng như giúp chúng ta đánh giá được tính hiệu quả của hoạt động kiểm thử được thực thi.

**Tài liệu tham khảo**

https://www.guru99.com/software-testing-seven-principles.html

https://viblo.asia/p/7-nguyen-tac-quan-trong-trong-kiem-thu-phan-mem-Qbq5QrPEKD8