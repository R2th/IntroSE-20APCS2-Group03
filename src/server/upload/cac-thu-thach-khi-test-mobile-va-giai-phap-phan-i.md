Ngày nay, sự bùng nổ di động là rất rõ ràng trên thế giới. Điện thoại thông minh đang nhanh chóng trở thành phương thức tương tác chính cho người tiêu dùng và doanh nghiệp trên toàn thế giới, với hàng ngàn ứng dụng được tạo ra mỗi ngày. Điện thoại di động đã phát triển xa ở mảng điện thoại thông minh và máy tính bảng. Các ứng dụng hiện đang được tích hợp vào ô tô, các vật dụng cá nhân (wearable tech) và thiết bị gia dụng

Sự tăng trưởng phi thường của các thiết bị di động đã mở ra con đường cho các tổ chức, tập đoàn, công ty tích hợp chúng vào môi trường điện toán (computing environment). Ngày nay, các ứng dụng di động cung cấp tính năng phức tạp trên các nền tảng có tài nguyên hạn chế cho máy tính. Sự đa dạng mang lại những thách thức độc đáo đòi hỏi các chiến lược thử nghiệm độc đáo.

Bạn sẽ đạt được gì ở bài chia sẻ này?
Sau khi đã nắm được những hướng dẫn cơ bản cho người mới bắt đầu về mobile testing, chúng ta sẽ tiếp tục tìm hiểu về các thử thách khác nhau khi bắt tay vào tiến hành mobile tesing và các giải pháp hiện có trên thị trường để giải quyết các vấn đề phức tạp đó. 
Theo Báo cáo chất lượng của Cap Gemini (mobile testing), 18% các công ty trả lời rằng họ không có đủ thời gian để tiến hành test app trên mobile và 65% không có công cụ phù hợp. Ngoài ra, 52% công ty chia sẻ rằng do thiếu thiết bị là lý do không tiến hành mobile testing. Đây đều là những thử thách thời gian thực (real-time challenges) mà các tổ chức phải đối mặt để thực hiện thành công mobile testing.

### Multitude Mobile Devices: Đa đạng thiết bị di động
Hơn 500 triệu thiết bị Android được phân phối kể từ Android 1.0, khoảng 220 triệu thiết bị iOS đã được xuất xưởng kể từ năm 2007. Số lượng thiết bị di động khổng lồ này có sẵn từ điện thoại đến điện thoại thông minh, cho đến tablet, thiết bị đeo (wearable tech) cung cấp nhiều môi trường mà các ứng dụng di động phải tương thích. 

Hơn nữa, nhóm đảm bảo chất lượng không thể đảm bảo rằng nếu một ứng dụng được thử nghiệm hoạt động tốt trên một thiết bị nhất định, nó sẽ hoạt động chuẩn 100% trên một thiết bị khác ngay cả khi nó thuộc cùng một dòng sản phẩm vì độ phân giải màn hình, CPU, bộ nhớ, tối ưu hóa hệ điều hành và phần cứng có thể khác nhau. 
Câu hỏi đặt ra ở đây là: Liệu tiến hành mobile testing trên 5 đến 8 thiết bị có đủ không? Câu trả lời là Có, nếu việc test đó đảm bảo cover được 25% số lượng khách hàng đang sử dụng những devices đó. 
### Device Fragmentation & Various OS Platforms: Phân mảng thiết bị và đa dạng nền tảng hệ điều hành 
Có lẽ khía cạnh khó khăn nhất của ma trận kiểm thử di động là phân mảng thiết bị. Mặc dù ma trận thiết bị iOS đang phát triển hơn bao giờ hết, sự phân mảng là một vấn đề đặc biệt khó khăn đối với hệ điều hành Android.
![](https://images.viblo.asia/e587dc80-2eea-4232-be84-03350d24eb33.jpg)
Đây là biểu đồ dữ liệu của OpenSignal trong số gần 12.000 mẫu thiết bị Android riêng biệt vào tháng 7 năm 2013. (So sánh, cùng một biểu đồ từ năm 2012 đã tìm thấy gần 4.000 thiết bị.) Nếu bạn quan tâm đến chất lượng trên các ứng dụng đa nền tảng, bạn sẽ gặp một ma trận phức tạp tương tự. Mặc dù ít đáng ngại hơn so với ma trận phần cứng, sự đa dạng của các hệ điều hành di động cũng đặt ra thách thức cho các nhóm kỹ thuật có mục tiêu là cung cấp trải nghiệm người dùng nhất quán trên các nền tảng. 
Kiểm thử ứng dụng di động (Mobile application testing) cũng đầy thách thức do các vấn đề tương thích, vì một ứng dụng di động có thể được triển khai trên các thiết bị có sự khác biệt về các hệ điều hành như iOS, Android, Blackberry, Windows, v.v. hay các phiên bản của một hệ điều hành như iOS 4.X, iOS 5.X, BB 4.X, 5.X và 6.X.
### Different Mobile App Types: Các loại ứng dụng di động khác nhau
Một ứng dụng mobile app có thể là native app, web app hoặc là hybird app. Việc tiến hành kiểm thử từng loại ứng dụng như vậy là khác nhau vì việc triển khai của chúng khá khác nhau.
![](https://images.viblo.asia/a80f2ee8-2ed2-4a47-8bee-1f03c665a225.jpg)
Mỗi hành vi ứng dụng (app behaviour) từ việc cài đặt cho đến tính năng hoạt động là khác nhau đối với các app khác nhau, dẫn đến việc test và phạm vi test cũng sẽ khác nhau. 
### Numerous Test Interfaces: Đa dạng giao diện test 
Trình giả lập (Mobile emulators) và mô phỏng di động (simulators) là công cụ kiểm tra quan trọng và chúng cho phép xác minh chức năng chính và thực hiện kiểm thử hồi quy thường xuyên. Khi tiến hành test trên  trình giả lập và giả lập có nghĩa là việc kiểm thử đang được tiến hành trong một môi trường không có thật.
Những lợi thế của các công cụ như vậy bị giới hạn trong phạm vi và không bao giờ được coi là sự thay thế cho thiết bị thực tế. Sử dụng trình giả lập và giả lập song song với test mobile trên thiết bị thực sẽ cho ra kết quả tốt nhất.
### Variety of Testing Tools: Đa dạng tool test 
Sự phức tạp của mobile test automation chưa là gì so với sự sẵn có rất lớn của các công cụ khi tiến hành mobile test automation trên thị trường: các tool miễn phí  hay là có tính phí. Tool sử dụng cho native app hoặc web app? Tool cho Android hay iOS ? Vậy automation tool nào phù hợp cho nhu cầu tiến hành mobile test automation của bạn, hoặc câu hỏi là liệu có một công cụ duy nhất cho nhu cầu mobile test automation của chúng ta không?
![](https://images.viblo.asia/5bd39df1-955c-4165-82f7-72cd69ad8868.jpg)

Preferences: https://www.softwaretestinghelp.com/5-mobile-testing-challenges-and-solutions/