## What is CI/CD? 
CI / CD là một phương pháp thường xuyên cung cấp ứng dụng cho khách hàng bằng cách đưa tự động hóa vào các giai đoạn phát triển ứng dụng.  Khái niệm chính CI / CD là continuous integration, phân phối liên tục và triển khai liên tục.  CI / CD là một giải pháp khăc phục các vấn đề  khi tích hợp, deploy code mới trong quá trình dự án vận hành và phát triển

CI / CD giúp tự động hóa, giám sát liên tục trong suốt vòng đời phát triển phần mềm, từ giai đoạn tích hợp và thử nghiệm đến phân phối và triển khai. Đây gọi là "CI / CD pipeline" và được hỗ trợ bởi các team vận hành và phát triển làm việc cùng nhau theo Agile, DevOps. 
DevOps là một tập hợp các practice kết hợp quá trình phát triển (Dev - Bao gồm những việc của designer, developer, QA QC) và vận hành (Ops - Có sự tham gia của system engineer, system administrator, operation executive, release engineer, DBA, network engineer, security engineer).  Mục đích nhằm rút ngắn vòng đời phát triển hệ thống và delivery liên tục với chất lượng phần mềm cao.

## Sự khác biệt giữa CI và CD là gì?
CI / CD có một số ý nghĩa khác nhau. 
CI trong CI / CD là continuous integration, là một quá trình tự động hóa cho các developer.  Code mới thường xuyên được xây dựng, thử nghiệm và hợp nhất vào một repository.  Đó là một giải pháp cho vấn đề có quá nhiều nhánh của một app được phát triển cùng một lúc có thể xung đột với nhau.
CD trong CI / CD đề cập đến delivery hoặc deploy code liên tục, những khái niệm liên quan đôi khi được sử dụng thay thế cho nhau.  Cả hai đều nhằm mục đích tự động hóa các giai đoạn tiếp theo của quy trình, nhưng đôi khi chúng được sử dụng riêng biệt để minh họa mức độ tự động hóa đang diễn ra.

Continuous delevery có nghĩa là code được tự động upload đến kho lưu trữ (như GitHub), nơi chúng có thể được team vận hành deploy đến môi trường production(Continuous deployment).  Đó là giải pháp cho những hạn chế tầm nhìn và giao tiếp giữa dev và business teams.  Vì vậy, mục đích của continuous delevery là để đảm bảo rằng việc triển khai code mới sẽ tốn đỡ công sức.

Continuous deployment là tự động release những thay đổi của dev từ repository lên môi trường production (nơi khách hàng sử dụng). Nó xử lí vấn đề quá tải hệ cho team vận hành từng sử dụng quy trình thủ công chậm chạp.

## Continuous integration
Trong quá trình phát triển phần mềm hiện đại, có nhiều dev cùng phát triển app trên các feature khác nhau. Tuy nhiên nếu có nhiều pull request cần merge vào branch một lần sẽ mệt mỏi và tốn thời gian để build và test. Lý do là dev thay đổi code trên môi trường riêng của mình không xung đột với ai cả nhưng sẽ có khả năng xung đột khi đưa lên branch chung của team có những thay đổi của những dev khác.
Continuous intergration giúp các developer có thể dễ dàng merge code của họ vào shared branch thường xuyên hơn mà không mất nhiều công sức. Khi có code mới (pull request), chúng sẽ được validate bằng việc tự động build và chạy nhiều loại test khác nhau, phố biến nhất là unit và intrgration test để đảm bảo những thay đổi đó không gây ra lỗi nào cho app. Trong quá trình đó nếu có lỗi xảy ra thì các dev sẽ được thông báo để chỉnh sửa lại tiếp tục cho đến khi thành công app sẽ chuyển sang giai đoạn continuous delivery (CD)
![](https://images.viblo.asia/cdd93d37-9ef1-477a-9650-cf17e307c958.png)

## Continuous delivery
Sau khi CI chạy hoàn tất thì continuous delivery bắt đầu tự động delivery app từ repo sang các server môi trường được chọn. Thông thường sẽ có 3 môi trường chính là development, testing và production environment. CI / CD tool giúp lưu trữ các biến môi trường cụ thể được đóng gói mỗi lần delivery. Sau đó chúng chạy các service liên quan đến web server, database và các service khác để start server.