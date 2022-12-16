# CI và Các công cụ CI phổ biến hiện nay.

Trong quá trình làm việc, anh em ít nhiều được nghe và nhắc đến CI. CI được sử dụng rộng rãi  trong phát triển dự án công nghê. Chắc nhiều anh em tự hỏi CI là gì và tại sao lại được sử dụng rộng rãi đến vậy.? 
Bài hôm nay chúng ta sẽ cùng đi tìm hiểu CI cũng như ứng dụng như thế nào trong dự án và các công cụ CI phổ biến hiện nay.

## CI là gì? 

Tích hợp liên tục (CI – continuous intergration) là phương pháp phát triển phần mềm đòi hỏi các thành viên trong nhóm tích hợp công việc thường xuyên. Mỗi ngày, các thành viên đều phải theo dõi và phát triển công việc của họ ít nhất một lần. Việc này sẽ được một nhóm khác kiểm tra tự động, nhóm này sẽ tiến hành kiểm thử truy hồi để phát hiện lỗi nhanh nhất có thể. Cả nhóm thấy rằng phương pháp tiếp cận này giúp giảm bớt vấn đề về tích hợp hơn và cho phép phát triển phần mềm gắn kết nhanh hơn.

![](https://images.viblo.asia/33bcff4d-dbdb-465e-9736-e4ceac23f01d.png)

Nói một cách ngắn gọn hơn thì CI là phương pháp mà các team Agile sử dụng để đảm bảo code của toàn dự án luôn build được, luôn chạy đúng. Đồng thời thông báo cho team phát triển nếu như có vấn đề xảy ra một cách sớm nhất.

CI chỉ là phương pháp phát triển phần mềm, cũng là mô hình giải quyết tuy nhiên để thực hiện nó người ta phải tạo ra các công cụ để hỗ trợ và triển khai. Việc triển khai hệ thống CI giúp cho tốc độ phát triển tăng lên do hệ thống tự động thực hiện build test và có thể dễ dàng để biết được tình trạng của một branch hay của một commit nào đó mà không cần lấy về chạy thử hay test.

Một số trường hợp hay sử dụng CI hay gặp nhất:
+ Cài đặt hệ thống kiểm tra coding standards (lint, style..)
+ Thực thi automation test(unit test, configuration test, e2e test….)
+ Đóng gói phần mềm (build file cài đặt)
….



## Cơ chế hoạt động của CI

![](https://images.viblo.asia/663980e3-ee17-4013-a1a4-03a6808d01ec.png)

+ Các developer thực hiện các ticket và đẩy code lên thư mục nơi sẽ lưu giữ code của Project.

+ Hệ thống CI sẽ lắng nghe và thực hiện kéo code về (server CI), build rồi test code.

+ Trong trường hợp build, test thất bại, các thành viên trong team sẽ nhìn thấy ngay được lỗi phát sinh và các developer sẽ chịu trách nhiệm sửa lỗi và đẩy code sửa lỗi đó lên repo.


## Các công cụ CI phổ biến hiện nay

Qua tìm hiểu thì hiện nay có khá nhiều công cụ CI cụ thể như:
* Jenkins
* TeamCity
* GitLab CI/CD
* CircleCI
* Travis CI
......

Chúng ta sẽ đi tìm hiểu mỗi loại và điểm mạnh của chúng để có thể nhìn nhận và áp dụng phù hợp theo yêu cầu dự án của chúng ta

## Jenkin

![](https://images.viblo.asia/58a01a43-a0fc-4556-b66b-af9ffc06d792.png)

Jenkins là công cụ CI mã nguồn mở được viết bằng Java. Nó có nguồn gốc như là một nhánh của Hudson khi mà Oracle mua Sun Microsystems. - ----- Jenkins là công cụ CI platform và nó cung cấp cấu hình thông qua cả giao diện GUI và các câu lệnh điều khiển.

 Theo thống kê thì jenkin:
*  Chiếm 71% thị trường với cộng đồng sử dụng cũng như sự hỗ trợ lớn
*  có khoảng hơn 1400 plugin nên dễ dàng mở rộng

Jenkin sẽ phù hợp với dự án:
* Code lưu ở 1 server riêng
* Muốn toàn quyền kiểm soát CI/CD
* Yêu cầu 1 máy chủ tại chỗ
* Yêu cầu quy trình công việc có thể tuỳ biến cao.
*  Có thể chỉ định 1 hay nhóm người quản lí và duy trì Jenkin.
*  Tiết kiệm tiền.

Đánh giá: Jenkins là một trong những giải pháp tốt nhất cho CI, mạnh mẽ và linh hoạt.

## TeamCity

![](https://images.viblo.asia/d0daa234-f52c-4c47-9c9e-41026ba89c55.png)

TeamCity là máy chủ CI thật, đến từ công ty JetBrains. JetBrains đã xây dựng bản quyền trên thị trường phát triển phần mềm trên toàn thế giới, và công cụ của họ giống như WebStorm và ReSharper được các lập trình viên sử dụng phổ biến trên toàn thế giới.

 Đặc điểm:
*  Cung cấp toàn bộ các tính năng trong phiên bản miễn phí
*  Giới hạn 20 cấu hình và 3 bản build máy chủ(2018) và 2020 bản miễn phí tăng lên 100 cấu hình nên muốn dùng thêm thì phải trả phí.
*  Hoạt động trên nhiều nền tảng khác nhau và có sự hỗ trợ cho rất nhiều các công cụ và framework
*  Bảo mật và cung cấp plugin cực kỳ ổn định.

Sẽ phù hợp với dự án:
* Teamcity dùng sv riêng nên nếu cần giải pháp làm việc mà không gặp rắc rối về bảo trì thì đây là lựa chọn tốt.
* Có thể chỉ định 1 hay nhóm người quản lí hay phụ trách nó
* Có thể hỗ trợ khách hàng nhanh chóng.
* Có nhiều dự án với cấu hình tương tự nhau, mỗi dự án tiến triển khác nhau


Đánh giá: Đây là giải pháp tổng thể tuyệt vời, nhưng do sự phức tạp và giá cả, nó dường như phù hợp hơn cho nhu cầu của doanh nghiệp. Với quy mô nhỏ thì Teamcity là lựa chọn hợp lí.

## Gitlab CI/CD
![](https://images.viblo.asia/3ecd4b3e-9b1e-45ab-97d3-979d3ac4155a.png)

GitLab CI là một phần của dự án mã nguồn mở GitLab, được đưa ra bởi công ty GitLab inc. GitLab được lưu trữ trên GitLab.com, một dịch vụ được lưu trữ miễn phí và cung cấp quản lý kho lưu trữ git chi tiết với các tính năng như kiểm soát truy cập, theo dõi các vấn đề, đánh giá mã code và nhiều hơn nữa.

Đặc điểm:
* Công cụ có sẵn và tích hợp trên giblab mà mọi người dùng gitlab có thể sử dụng
* Cho phép mở rộng dễ dàng vì hệ thống máy chủ nhiều
* Cho phép lưu trữ một số tính năng Gitlab trên máy chủ và phân bố nhãn cho chúng.

Sẽ phù hợp nếu:
* Code lưu trên git lab
* Bỏ qua config lằng nhằng của các công cụ khác.
* Không cần plugin.
* Khi cần đăng kí tích hợp docker
* Liên tục phát hành tính năng  ổn định và mình hưởng lợi từ đó

Đánh giá: Công cụ hiện tại được tổ chức với danh sách các tính năng ấn tượng, cung cấp cả miễn phí và giải pháp mức doanh nghiệp.


## CircleCi

![](https://images.viblo.asia/761f28a0-51da-458a-aa8e-783a076afea8.png)

Đặc điểm:
* Có khả năng lưu trữ mạnh mẽ và quy trình làm việc tuỳ biến cao
* Dễ dàng thiết lập và chạy.
* Có thể cấu hình và gửi kết quả trực tiếp đến Slack….
* CircleCI hiện chỉ hỗ trợ GitHub và BitBucket và danh sách các ngôn ngữ bao gồm Java, Ruby/Rails, Python, Node.js, PHP, Haskell và Skala.
* Khung giá chính của CircleCI là "container".
* Có 5 mức song song (1x, 4x, 8x, 12x, 16x). Vì vậy, bắt đầu với 16 container, bạn có thể đạt được tối đa song song 16x trên một bản build. Hoặc bạn có thể chạy 4 bản builds trên 16 containers với 4x song song.

Sẽ phù hợp nếu:
* Cần hỗ trợ sẵn và song song với việc develop.
* Code lưu trữ trên Github hay BitBucket.
* Làm việc trên Mac hay Linux.
* Nhóm bao gồm nhiều nhà phát triển dùng chung 1 CI.
* Ưu tiên tốc độ hơn các thứ khác.
* Cần chung 1 quy trình và quy trình công việc tuỳ biến cao, tương thích nhiều test tool, không giới hạn repo, user…


Đánh giá: Nếu chi phí không phải vấn đề và cần nhanh thì CircleCI là 1 lựa chọn không thể bỏ qua.

## Travis CI
![](https://images.viblo.asia/133f3be6-cf7f-4b2d-b6c9-17cabd56af9a.png)

Travis CI là một trong những giải pháp lưu trữ lâu đời nhất hiện nay và nó đã giành được sự tin tưởng của nhiều người. Mặc dù phần lớn được biết đến với giải pháp được lưu trữ trên máy chủ, nó cung cấp phiên bản tiền đề trên dưới dạng gói doanh nghiệp.

Đặc điểm:
* Travis CI là miễn phí cho tất cả các dự án mã nguồn mở được lưu trên trên GitHub và cho 100 bản build đầu tiên khác. Có một vài kế hoạch về việc lựa chọn giá, sự khác biệt chính là số lượng các bản build bạn có thể đồng thời chạy cùng 1 lúc.
* Cho phép kiểm tra trên hệ điều hành Mac và linux cùng 1 lúc.
* Thiết lập dễ dàng và nhanh chóng.

Sẽ phù hợp nếu:
* Code lưu trên github.
* Cần hỗ trợ nhiều ngôn ngữ khác nhau (hơn 20 ngôn ngữ).
* Không dùng window.
* Cần 1 giải pháp linh hoạt.
* Cần các máy chủ cơ sở dữ liệu được cài sẵn.
* Không yêu cầu nhiều tích hợp từ bên thứ 3.

Đánh giá: Là giải pháp tốt cho cả máy chủ và biến thể On-premises, được rất nhiều team yêu thích và là một tài liệu tốt.

Trên đây là những khái niệm cũng như cơ chế của CI để chúng ta có cái nhìn chung nhất về nó. Bên cạnh đó cũng là nhận định các công cụ CI phổ biến hiện nay có những điểm mạnh và khác nhau như thế nào để trong quá trình xây dựng dựng án có dùng CI chúng ta có thể lựa chọn và triển khai cho hợp lí. Hi vọng bài này sẽ giúp ích phần nào được cho anh em.

Trong bài sau tôi sẽ hướng dẫn các bạn xây dựng hệ thống Ci với TeamCity trong lập trình IOS. Hi vọng được anh em ủng hộ.