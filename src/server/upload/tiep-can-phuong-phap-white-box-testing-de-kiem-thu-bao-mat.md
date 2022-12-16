Internet đã phát triển từ cơ chế nội dung tĩnh đến những ứng dụng tuơng tác nhiều hơn cho thương mại điện tử. Một số lượng lớn các giao dịch đang diễn ra trên Internet và do đó bảo mật như là 1 chất lượng để đánh giá ứng dụng web. Dựa trên báo cáo của Gartner thì có trên 70% các cuộc tấn công về bảo mật được nhắm vào các ứng dụng trên web. Bảo mật về mạng và hệ thống không thể kiểm tra các khai thác nhắm vào các mục tiêu là các cấp ứng dụng. Có rất nhiều các đề xuất khác nhau được đề cập về việc kiểm thử bảo mật trog từng giai đoạn SDLC khác nhau. Một vài ý kiến cho rằng nên bắt đầu khi kiểm thử chức năng và load testing đã được hoàn thành. Tuy nhiên, bất lợi lớn nhất khi thực hiện như vậy là thời gian sửa lỗi bảo mật và chi phí liên quan sẽ rất lớn. Tôi nghĩ chúng ta nên bao gồm việc này từ giai đoạn yêu cầu và nên tiếp tục cho đến giai đoạn cài đặt, triển trai và bảo trì phần mềm. 

1. Security Testing (Kiểm thử bảo mật) là gì?

![](https://images.viblo.asia/ca565391-74e6-4b7c-b419-913f55dcebcc.png)

Có thể định nghĩa là quá trình xác minh các lỗ hổng bảo mật trong hệ thống bị phát hiện vì do thiếu sót trong kỹ thuật trong một ứng dụng.


2. White box Security Testing (Kiểm thử bảo mật hộp trắng) là gì?

Để có thể hiểu được White box Security Testing thì chúng ta cần phải hiểu được Security Testing và White box Testing. Ở trên chúng ta đã đề cập đến Security Testing. Tiếp theo sẽ giúp chúng ta hiểu về White box Testing.

White box Testing (Kiểm thử hộp trắng): là cách tiếp cận để xác thực và xác minh thiết kế của hệ thống, data flow, control flow, cách code, khả năng xử lý lỗi.

Vì vậy, White box Security Testing có thể được định nghĩa như một cách tiếp cận để xác minh việc cần triển khai code theo như thiết kế, để xác nhận đã triển khai các tính năng về bảo mật và phát hiện các lỗ hổng có thể khai thác.


3. Dữ liệu đầu vào cho White box Security Testing là gì?

Dưới đây là một vài đầu vào cho White box Security Testing:

Code

Các yêu cầu bảo mật

Tài liệu thiết kế

Tài liệu phân tích rủi ro thiết kế và kiến trúc

Ngoài ra, chúng ta cũng cần biết yêu cầu về chất lượng cho hệ thống đối với hiệu suất và phản hồi. Vì vậy, chúng ta duy trì mức độ bảo mật tối ưu với hiệu suất mong muốn. Điều này đặc biệt quan trọng trong các dịch vụ web. Tài liệu Phân tích rủi ro sẽ giúp xác định các Mối đe dọa/ Lỗ hổng trong các components, xác xuất xảy ra các mối đe dọa/ lỗ hổng và các biện pháp được đề xuất chống lại các rủi ro.

Tài liệu này sẽ là cơ sở để xây dựng chiến lược và lập kế hoạch cho kiểm thử bảo mật.

4. Làm thế nào để Design test?

Có nhiều kỹ thuật kiểm tra khác nhau sẽ giúp Design test. Một số trong số họ được giải thích dưới đây

* Data Flow Analysis
* Code Coverage Analysis
* Trust Boundary Mapping

Ngoài việc kiểm tra theo đặc điểm kỹ thuật, chúng ta cần phải thực hiện một số test với Data Mutation (Dữ liệu lạ), Môi trường, Component interface, Cấu hình. Ngoài ra kiểm tra cần phải dựa trên các tiêu chuẩn mã hóa và dữ liệu đầu vào. Điều này sẽ tránh các lỗ hổng khác nhau như tràn bộ đệm, Tập lệnh chéo trang web, Tấn công chuỗi định dạng, Từ chối dịch vụ, Tạo người dùng tự động, SQL Injection, LDAP và các lỗi khác xảy ra do các tiêu chuẩn mã hóa không phù hợp.

5. Các công cụ hữu ích trong White box Security Testing

* Source Code Analysis: Những tool này giúp xác định các lỗ hổng dựa trên tập hợp các quy tắc cố định. Một số tool cung cấp phân tích data-flow và control-flow. Đầu ra của những tool này có thể giúp trong việc phát triển testcase.
* Coverage Analysis: Những tool này giúp thống kê có bao nhiêu code được bao phủ khi chúng ta thực hiện kiểm thử. Điều này giúp tăng hiệu quả kiểm tra.
Các loại tool khác có thể được sử dụng như Profiling tool, Program Understandind tools, v.v.


6. Các thách thức chính: Đã nói về lợi ích của việc  White box Security Testing, có một số thách thức chính để đạt được điều đó:

* Các kỹ năng cần thiết là cần nhiều kỹ thuật hơn và yêu cầu logic tốt để tìm những unit code bị lỗi. 
* Truy cập vào mã nguồn không phải lúc nào cũng khả thi dành cho tester.
* Không thể nhìn vào từng bit của code.