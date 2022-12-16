Bài viết này sẽ đề cập đến 10 lỗi kiểm tra ứng dụng di động phổ biến cần tránh khi bạn là người kiểm thử phần mềm làm việc trong môi trường phát triển và kiểm tra ứng dụng di động. 10 điểm có thể giúp bạn bắt đầu các hoạt động thử nghiệm di động của mình nếu bạn chưa quen với thử nghiệm di động hoặc chúng có thể giúp bạn tóm tắt lại các phương pháp thử nghiệm di động hiện tại của bạn.

![](https://images.viblo.asia/530f9af3-a76a-4a2a-a7ba-a4b20e94fd9c.png)


**1. Bỏ lỡ các hướng dẫn UI / UX nền tảng:**

Bất kể bạn đang thử nghiệm ứng dụng điện thoại Android, iOS hay Windows, bạn là người thử nghiệm phải biết các nguyên tắc nền tảng khác nhau. Những hướng dẫn này bao gồm sự tương tác và thiết kế cũng như các mô hình phát triển chung. Nếu bạn không biết họ, bạn có thể kiểm tra ứng dụng của mình theo những yêu cầu đó. Tuy nhiên, mọi ứng dụng phải được liên kết với các nguyên tắc nền tảng khác nhau.

**2. Thử kiểm tra mọi thứ:**

Đây không chỉ là một cạm bẫy cho các ứng dụng di động mà còn cho mọi phần mềm ngoài kia. Kiểm tra mọi thứ là không thể và cũng không hiệu quả. Khi bạn chưa quen với một ứng dụng, hãy bắt đầu khám phá các tính năng được cung cấp và chơi với ứng dụng để tìm hiểu về nó. Cố gắng thu hẹp các thay đổi trong ứng dụng và cố gắng tập trung vào những thay đổi đó, ví dụ: sử dụng phương pháp thử nghiệm theo ngữ cảnh để lập kế hoạch cho các hoạt động thử nghiệm của bạn. Sử dụng kinh nghiệm của bản thân để được tập trung trong các hoạt động thử nghiệm của bạn.

**3. Di động không phải là web:**

Điểm này đặc biệt khó đối với những người kiểm thử phần mềm chuyển từ kiểm thử phần mềm ứng dụng web sang di động. Trường hợp sử dụng di động hoàn toàn khác với cách tiếp cận web. Người dùng di động đang di chuyển thay vì trước máy tính đứng yên với một vị trí cố định. Các ứng dụng di động được sử dụng trong các môi trường khác nhau, ví dụ: trong các hoạt động thể thao, trong khi đi du lịch hoặc tại nơi làm việc. Hơn nữa, các ứng dụng di động được tối ưu hóa cho màn hình nhỏ hơn và có quyền truy cập vào các cảm biến phần cứng đặc biệt. Do đó, điều rất quan trọng đối với người kiểm thử phần mềm là phải di chuyển trong khi kiểm tra ứng dụng và giữ các trường hợp sử dụng di động khác nhau cũng như các môi trường khác nhau trong tâm trí.

**4. Chỉ cần nhìn vào UI:**

Thật không may, đó là những gì nhiều người kiểm thử phần mềm đang làm. Hãy nhìn vào UI nếu mọi thứ đều đẹp. Tuy nhiên, các ứng dụng di động không chỉ là một giao diện người dùng với mọi thứ hoàn hảo. Các ứng dụng di động đang sử dụng nhiều API và chính các API đó đáng để kiểm tra. API có cung cấp phản hồi chính xác cho cuộc gọi được yêu cầu không? API xử lý các cuộc gọi sai với dữ liệu sai như thế nào? Bên cạnh việc kiểm tra API, các ứng dụng di động dựa trên nhiều backend services. Nó chắc chắn là giá trị kiểm tra chức năng backend. Vậy backend services là đủ để xử lý các yêu cầu chậm đến từ ứng dụng di động trong EDGE network? Bản thân mạng có ảnh hưởng rất lớn đến các ứng dụng di động và do đó, các ứng dụng cũng phải được thử nghiệm ở các mạng khác nhau. Kiểm tra sự tích hợp với các tính năng phần cứng như các cảm biến khác nhau. Có nhiều thứ nữa để kiểm tra ngoài UI.

**5. Không kiểm thử trong môi trường thực tế:**

Ứng dụng di động được khách hàng của bạn sử dụng khi họ đang di chuyển trong các mạng di động khác nhau. Người kiểm tra di động phải rời khỏi văn phòng để kiểm tra ứng dụng trong môi trường thực tế để bắt một số lỗi chỉ có thể xảy ra trong các điều kiện mạng khác nhau.

**6. Cố gắng tự động hóa càng nhiều càng tốt:**

Viết kiểm tra tự động cho phần mềm là không dễ dàng. Viết kiểm tra tự động cho các ứng dụng di động thậm chí còn phức tạp hơn với tất cả các phụ thuộc vào API, mạng, cảm biến và hệ thống phụ trợ. Tự động hóa thử nghiệm 100% là không thể và cũng không hiệu quả! Viết séc tự động rất tốn kém nếu bạn nhớ rằng những séc đó cần thời gian phát triển và bảo trì. Kiểm tra tự động cũng không có gì nên làm, chỉ vì phải có một số kiểm tra tại chỗ. Kiểm tra tự động phải được coi là mã sản xuất và điều này đòi hỏi những người có kỹ năng và có học thức nên làm việc theo chủ đề đó. Có sẵn kim tự tháp thử nghiệm di động khi bạn muốn bắt đầu thử nghiệm tự động hóa cho các ứng dụng di động của mình.

**7. Chỉ kiểm tra một thiết bị duy nhất:**

Như chúng ta đã biết thị trường di động rất phân tán khi kết hợp phần cứng và phần mềm. Đây không còn là vấn đề của Android nữa, vấn đề tương tự tồn tại trên tất cả các nền tảng di động. Do đó, điều rất quan trọng là thử nghiệm trên các thiết bị di động khác nhau để có độ bao phủ cao hơn của các thiết bị khác nhau. Tuy nhiên, sẽ không có ý nghĩa khi thử nghiệm trên các thiết bị Android hoặc iOS không được khách hàng của bạn sử dụng. Tập trung vào những thiết bị được sử dụng bởi đối tượng mục tiêu của bạn.

**8. Không lắng nghe khách hàng của bạn:**

Kiểm tra đánh giá cửa hàng ứng dụng của các nền tảng di động một cách thường xuyên để xem khách hàng nói gì về ứng dụng của bạn. Đôi khi có những phản hồi có giá trị có thể giúp bạn tìm và khắc phục sự cố. Cũng đáng để kiểm tra các nền tảng truyền thông xã hội để tìm lỗi, báo cáo lỗi hoặc phản hồi trực tiếp chỉ ra vấn đề. Nếu công ty có bộ phận hỗ trợ khách hàng, hãy đến gặp đồng nghiệp của bạn và nói chuyện với họ về những vấn đề có thể xảy ra. Nếu bạn có cơ hội nói chuyện hoặc trả lời khách hàng, hãy sử dụng công cụ đó để liên lạc với họ. Theo cách đó, khách hàng cảm thấy được đánh giá cao và hoan nghênh và họ có thể thay đổi suy nghĩ về sản phẩm và sẽ cung cấp phản hồi tốt hơn khi vấn đề được giải quyết. Nếu có những khách hàng cung cấp phản hồi tuyệt vời, hãy yêu cầu họ trở thành người thử nghiệm beta ứng dụng của bạn để sử dụng sự tham gia của họ vào sản phẩm để biến họ thành một nguồn có giá trị.

**9. Không kiểm tra cập nhật / cài đặt:**

Cài đặt và cập nhật kiểm tra một ứng dụng là rất quan trọng đối với mọi người thử nghiệm di động. Việc cài đặt là điều đầu tiên khách hàng sẽ nhìn thấy từ sản phẩm của bạn và từ công ty của bạn. Nếu ấn tượng đầu tiên là ấn tượng xấu, rất có thể họ sẽ xóa ứng dụng chỉ bằng một cú chạm từ thiết bị của họ. Do đó, điều quan trọng là phải kiểm tra quá trình cài đặt và cập nhật ứng dụng của bạn.

**10. Không kiểm tra bảo mật:**

Hầu hết chúng ta đều biết rằng bảo mật là một chủ đề rất quan trọng đối với mọi sản phẩm phần mềm hiện có. Chúng tôi cũng biết rằng kiểm tra bảo mật là không dễ dàng và do đó, điều thực sự quan trọng là nói chuyện với các chuyên gia để hỏi họ trong các chủ đề liên quan đến bảo mật. Điểm khởi đầu đầu tiên cho tất cả các bạn có thể là các trang OWASP, họ cung cấp danh sách đẹp và tổng quan về các vấn đề bảo mật tiềm ẩn trong phần mềm. Tuy nhiên, sử dụng các danh sách đó để đặt câu hỏi cho ứng dụng của bạn và kiến trúc mà ứng dụng dựa vào. Sau đó liên hệ với các chuyên gia để kiểm tra các ứng dụng di động cho các vấn đề bảo mật. Đáng buồn nhưng sự thật, kiểm tra bảo mật đến trong nhiều trường hợp quá muộn khi những thứ thực sự tồi tệ xảy ra.

Bây giờ bạn đã đọc 10 lỗi kiểm tra ứng dụng di động phổ biến, bạn nên kiểm tra các hoạt động kiểm tra của mình nếu bạn bỏ lỡ điều gì đó trong công việc hàng ngày. Có thể tổng quan sẽ giúp bạn trở thành một người thử nghiệm di động tốt hơn.

Bài viết được dịch từ website: https://www.logigear.com/magazine/mobile-testing/top-10-mobile-app-testing-mistakes-to-avoid/