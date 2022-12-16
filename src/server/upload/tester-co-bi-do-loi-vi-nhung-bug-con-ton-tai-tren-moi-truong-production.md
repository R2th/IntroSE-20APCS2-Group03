Những tester luôn được cho là người làm rò rỉ các lỗi trên môi trường production và cấp trên nghĩ rằng tester đó vẫn chưa hoàn thành tốt công việc hoặc là hoàn thành công việc yếu kém. Kiểm thử không chỉ là trách nhiệm của một mình tester mà còn là trách nhiệm của những người tham gia phát triển sản phẩm như developer, UI, UX, Product owner.

Phát triển phần mềm là một công việc phức tạp mà một cá nhân hay một nhóm có thể thực hiện được. Trong vòng đời phát triển phần mềm, kiểm thử thường ở giai đoạn cuối trước khi sản phẩm được thực thi hoặc đưa ra thị trường. Trong quá trình phát triển có những lỗi xuất hiện ở giai đoạn cuối ảnh hưởng tới bảo mật của khách hàng. Kết quả là tester phải đối mặt với những vấn đề sau khi log bug: lỗi là gì ? Tại sao lại còn lỗi ở giai đoạn này…Thông thường người ta sẽ đổ lỗi cho các tester đã test ở giai đoạn đầu của kiểm thử.

Trong công ty phát triển phần mềm đã có nhiều trường hợp mà người chịu trách nhiệm kiểm thử bị triệu tập bởi các bên quản lý liên quan vì để rò rỉ bug ra môi trường production. Một câu hỏi mà các nhà quản lý hay sử dụng nhất đó là: Làm thế nào mà bug có thể lọt qua những người kiểm thử có kỹ năng và kinh nghiệm như vậy? Đây có lẽ là khoảnh khắc mà các tester cảm thấy lo sợ nhất khi đối mặt với sự tức giận của người quản lý.
![](https://images.viblo.asia/e737d2b3-7c61-4e46-80b8-75ef62b2a21b.jpg)

Đó là điều thông thường đối với các team  programmers, testers, analysts and management khi bàn giao sản phẩm cuối cùng tới khách hàng. Lúc này mỗi thành viên trong team có lẽ đang thở phào nhẹ nhõm và nghĩ về tương lai nơi mà sản phẩm của họ được đưa ra thị trường, về những sản phẩm thú vị mới họ sẽ làm .Nhưng điều mà tester lo ngại đó là trong trường hợp có bất kỳ bug nghiêm trọng nào được khách hàng trực tiếp gặp phải sau khi sản phẩm được đưa ra thị trường, như thường lệ tester sẽ bị coi là làm việc sơ suất và câu hỏi luôn thường trực đó là: Lỗi là gì? Tại sao lỗi?…

### Vậy ai là người đổ lỗi
Trong khi các tester được giao nhiệm vụ thử nghiệm và gỡ lỗi, họ không thể là một mạng lưới an toàn để nắm bắt tất cả các lỗi hiện diện trong ứng dụng.Thực sự là không có cách nào để nắm bắt tất cả các lỗi trong phần mềm điều đó có nghĩa là sản phẩm cuối cùng sẽ bị lỗi . Đó là trách nhiệm của những tester trong việc bắt các lỗi nghiêm trọng dựa vào phương pháp tiếp cận rủi ro (risk-base approach). Nhưng dù thế nào đi chăng nữa một vài lỗi vẫn có thể lọt qua nhóm phát triển và tới tay người dùng cuối.
Điều quan trọng cần lưu ý là không thể đổ lỗi tất cả lên những người phát triển đặc biệt là khi phát hiện ra lỗi. Những người phát triển cũng giống như những tester, họ cũng có thể mắc sai lầm.
Một phần của đổ lỗi là do các nhà phân tích, nhà quản lý phần mềm, những người đưa ra những yêu cầu không rõ ràng cũng là một vấn đề gây ra lỗi. Điều này là do yếu tố con người và các lỗi xảy ra ở các dạng khác nhau. Trách nhiệm về lỗi có thể được đặt lên tất cả mọi người. Có lỗi tồn tại là do nhầm lẫn nhưng việc đổ lỗi lên một cá nhân hay một nhóm người là không công bằng. 
Vì vậy mỗi lỗi được tìm thấy ở sản phẩm cuối cùng gây lên một sự tức giận và hoang mang với tất cả mọi người, đặc biệt là các cấp quản lý. Cách hợp lý nhất là tìm kiếm các giải pháp giải quyết vấn đề thay vì đổ lỗi cho ai đó.

Hãy tập trung vào tìm nguyên nhân và đưa ra giải pháp giải quyết triệt để vấn đề. Điều quan trọng là Manager phải công nhận rằng các nhóm đã cố gắng hết mình và một thỏa thuận đã được ghi nhận trước khi sản phẩm được bàn giao (ví dụ như biên bản UAT). Kinh nghiệm rút ra ở đây là bài học nhận được khi phát hiện lỗi ra sao? Nguyên nhân và cách khách phục thế nào nhằm tránh gặp phải các lỗi tương tự trong tương lai.

### Làm thế nào để loại trừ đổ lỗi

Một câu hỏi quan trọng mà tất cả mọi người nên hỏi đó là: Làm thế nào để tránh đổ lỗi?. Hãy thiết lập một mạng lưới an toàn, hãy liên lạc và  giải thích những gì đang xảy ra trong quá trình thử nghiệm với các bên liên quan. Điều này có nghĩa là tất cả mọi người liên quan đều phải làm vậy từ những lập trình viên, những nhà phân tích, thiết kế thậm trí là product owner. Hãy minh bạch các thông tin mà bạn chia sẻ, văn hóa đổ lỗi sẽ chấm dứt khi các nhóm hiểu được trách nhiệm của họ.
Để nhận được một sản phẩm chất lượng cao, cộng tác và chia sẻ là cần thiết. Lỗi có thể xảy ra ở những khu vực mà người thử nghiệm không kiểm tra đầy đủ, có thể được thực hiện đúng mục đích hay không. Không truyền đạt chiến lược và cách tiếp cận của bạn dẫn đến lỗi trong sản phẩm cuối cùng.
![](https://images.viblo.asia/034643ab-83b2-4bb5-8472-700a03f0168d.jpg)

### Học hỏi từ những sai lầm
Là một người chuyên nghiệp, quá trình phát triển phần mềm cho phép các team học hỏi lẫn nhau, học từ khách hàng và từ những sai lầm. Việc đổ lỗi sẽ không giúp giải quyết các sự cố, hãy chia sẻ cùng nhau cải thiện chất lượng kiểm thử. 
Dù nói thế nào đi chăng nữa thì là một tester mỗi cuối ngày bạn vẫn luôn tự hỏi? Tại sao mình lại để lọt một bug như vậy :D

Nguồn: https://www.testingexcellence.com/software-testers-get-blame-live-production-bugs/