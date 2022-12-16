[GitHub](https://github.com/) có lẽ là một trong những nền tảng nổi tiếng nhất trong cộng đồng dev, một trong những nền tảng được sử dụng nhiều nhất (nằm ngay bên cạnh những nền tảng khác như Stackoverflow). Nó cho phép công khai các dự án của bạn, quản lý chúng  và thậm chí tìm những người khác để giúp đỡ về những nỗ lực nguồn mở của họ.
Một điều chúng ta thường không thực sự chú ý là khả năng tích hợp vào các hệ thống khác của nó. Đúng vậy, GitHub không chỉ là nơi bạn đặt các dự án của mình cho người khác xem, nó có thể đóng vai trò là bước đệm cho rất nhiều nền tảng và hệ thống khác ngoài đó và trong bài viết này, tôi sẽ giới thiệu cho bạn. Đâu là những tích hợp hàng đầu với GitHub bạn có thể tìm thấy (và có thể sử dụng là tốt).

## 1. IDE integration

Mọi nhà phát triển đều cần cho mình 1 IDE hay Text Editor, bạn sẽ không thể lập trình nếu như thiếu nó. Vậy hãy bắt đầu với những tích hợp trong IDE
Sẽ có rất nhiều IDE, Text editor ngoài kia, tùy thuộc vào ngôn ngữ lập trình của bạn, nhưng một số IDE phổ biến nhất có khả năng bao gồm các plugin hoặc tiện ích mở rộng và do đó người dùng đã quyết định thêm một số tính năng tích hợp với GitHub

### VSCode

Bỏ qua rất nhiều tiện ích mở rộng chỉ tương thích với Git, có một số tiện ích cho phép bạn giao tiếp với GitHub's PR Api, chẳng hạn như: [GitHub Pull Requests](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)

![](https://images.viblo.asia/8c75c5a3-2422-45b5-bcbc-16a4041e3505.gif)

Tiện ích mở rộng này cho phép bạn xem xét và quản lý PR của bạn ngay tại đó, từ bên trong IDE. Nếu bạn đang chạy các dự án có khối lượng PR lớn, đây có thể là một lựa chọn thú vị để xem xét.

### Sublime Text

Đây là một trong những Text editor rất phổ biến trước VSCode và tôi nghĩ nhiều người vẫn sử dụng nó.

Và như trước đây, có rất nhiều plugin dành riêng cho git mà bạn có thể sử dụng, nhưng thứ tôi muốn giới thiệu là: [sublime-github](https://packagecontrol.io/packages/sublime-github)

![](https://images.viblo.asia/cf16b9a2-1d47-40e2-917b-9fc23acd7de6.png)

Điều này cho phép bạn truy cập vào các tính năng như mở một gist direclty trên cửa sổ soạn thảo hoặc tạo một gist mới từ mã bạn đã chọn. Rất hữu ích cho các hành động nhanh chóng và dễ dàng mà thông qua plugin này có thể giúp bạn tiết kiệm rất nhiều thời gian.

### IntelliJ

IDE cuối cùng tôi muốn trình bày là [IntelliJ](https://www.jetbrains.com/idea/) một IDE rất phổ biến khác tương thích với nhiều ngôn ngữ lập trình khác nhau.

![](https://images.viblo.asia/c72bdd1e-4cef-4e6a-849e-f464cb7828c4.png)

IDE này cung cấp nhiều tích hợp, tất cả những gì bạn cần làm là nhập thông tin tài khoản GitHub của bạn và sau đó bắt đầu tương tác với các tính năng khác nhau. Bạn có thể tạo hoặc sao chép các dự án, mở phiên bản của tệp trực tiếp trong GitHub (tức là nếu bạn đang làm việc trên một tệp cụ thể và cần kiểm tra phiên bản GitHub ban đầu, bạn có thể thực hiện bằng vài cú nhấp chuột) cũng như tạo gist directly trực tiếp từ IDE.

## 2. Issue tracker

Một tính năng thú vị khác mà GitHub cung cấp, là khả năng xử lý các issue của dự án bằng API của họ, có nghĩa là có một số tùy chọn ngoài giúp bạn có thể sử dụng để mở rộng khái niệm và có trình theo dõi issue trên GitHub.

### [GitKraken Glo Boards](https://www.gitkraken.com/glo)

Đây có lẽ là một trong những nền tảng tốt nhất hoạt động dựa trên các issue GitHub và mở rộng các tính năng của nó.

Với Glo Boards, bạn không chỉ có thể hình dung các vấn đề trên bảng kanban, bạn còn có thể trực tiếp lên lịch cho chúng bằng giao diện người dùng rất trực quan bằng cách kéo và thả các issue vào lịch.

![](https://images.viblo.asia/fb9818c0-10e6-4919-bc0b-0e8f7c5c16f8.png)

Nếu bạn đang cố gắng xử lý một nhóm (đặc biệt là bây giờ với nhu cầu cao về kỹ năng quản lý nhóm từ xa) thì tùy chọn này là một cách đơn giản và mạnh mẽ để sắp xếp công việc cần thực hiện.

## 3. Bots

### [Bit.dev (BitDevBot)](https://bit.dev/)

Bit.dev là một trung tâm component đám mây phổ biến. Nó là nơi để xuất bản, tài liệu và sắp xếp các thành phần JS (React, Angular, Vue, v.v.)

Bằng việc sử dụng Bit, các thành phần riêng lẻ có thể được xuất bản từ bất kỳ kho lưu trữ / cơ sở mã nào. Điều đó có nghĩa là nó không chỉ là một công cụ để xây dựng các hệ thống thiết kế mà còn là một công cụ để hợp tác thành phần.

Bit gần đây đã ra mắt với BitDevBot mới, bot Github tự động hóa các yêu cầu PR vào kho lưu trữ với các thành phần được import. Vì vậy, bất cứ khi nào một thành phần được cập nhật, tất cả các kho lưu trữ có liên quan đều được nhắc hợp nhất các thay đổi mới.
Đây không chỉ là một cách để đảm bảo người dùng của các thành phần không bao giờ bỏ lỡ các bản cập nhật quan trọng mà còn là cách để nhận các bản cập nhật thành phần trong khi vẫn giữ các thay đổi cục bộ được thực hiện cho một thành phần trong một dự án cụ thể.

![](https://images.viblo.asia/bb8b5cb3-3e84-4a19-9a5c-5b3226f08bf0.png)


### Slack

Một nền tảng rất phổ biến cho loại tương tác này là Slack, sau tất cả, nhiều công ty có xu hướng sử dụng các slack rooms để nhân viên của họ trò chuyện với nhau và chia sẻ thông tin dựa trên chủ đề của từng phòng.

![](https://images.viblo.asia/4468c02e-4ee8-4495-9931-27aeb46d2a0d.png)

Các nhà phát triển từ GitHub đã phát hành một [tích hợp](https://github.com/marketplace/slack-github) với Slack, cho phép bạn xem chi tiết từ một repo dựa trên một liên kết duy nhất, đăng ký vào một kho lưu trữ với một lệnh duy nhất hoặc quản lý các vấn đề như thể bạn đang có một cuộc trò chuyện với đồng nghiệp.

## 4. Continuous Integration

Khi nói đến các giải pháp tích hợp liên tục, thị trường có một số tùy chọn tuyệt vời và hầu hết tất cả chúng đều có một số loại tích hợp với GitHub.

### [Circle CI](https://circleci.com/product/#features)

CI / CD này tích hợp với GitHub cho phép bạn giám sát các pipelines của chúng trực tiếp từ bên trong UI GitHub. Bạn có thể tìm thấy sự tích hợp trực tiếp trong [GitHub’s marketplace.](https://github.com/marketplace/circleci).

![](https://images.viblo.asia/83ae545c-afa2-479f-bc49-eab56c8bf179.png)

### [TravisCI](https://travis-ci.com/plans)

Một tùy chọn khác cho một nền tảng tích hợp và triển khai liên tục là TravisCI.

![](https://images.viblo.asia/7288ef5c-ac18-4b7d-b3e2-dcb87d4e5d15.png)

Nếu nhóm của bạn đang sử dụng GitHub cho nền tảng kiểm soát phiên bản chính của họ, việc tích hợp nó vào một pipeline TravisCI và tự động hóa toàn bộ quá trình tích hợp & triển khai cũng dễ dàng như nhấp vào một vài liên kết.

### 5. Vulnerability

Đôi khi có ai đó trong nhóm của bạn kiểm tra mã của bạn để biết các lỗ hổng bảo mật từng tồn tại hoặc thậm chí các mô hình có thể bị khai thác. May mắn cho bạn, có một số tùy chọn tích hợp với nền tảng kiểm soát phiên bản yêu thích của chúng ta.

### [LGTM](https://github.com/marketplace/lgtm)

![](https://images.viblo.asia/f96d62bc-cbae-4dc3-9f87-42307f91a69b.png)

Tương thích với sáu ngôn ngữ lập trình khác nhau (bao gồm JavaScript và Python), công cụ này sẽ tự động kiểm tra mã của bạn để tìm hơn 1600 lỗ hổng tiềm năng khác nhau trước khi chúng được sản xuất.

### [Prisma Cloud](https://github.com/marketplace/prisma-cloud)

Thay vì tập trung vào các nhà phát triển, việc tích hợp này dành cho các nhà phát triển, để giúp họ kiểm tra các lỗ hổng trên các tệp cấu hình của họ.

![](https://images.viblo.asia/531e2970-9863-4b84-8dad-45106e7dcadb.png)

Chẳng hạn, nó sẽ tìm kiếm những thứ như AWS CloudFormation Templates, HashiCorp Terraform templates, v.v. và quét chúng để kiểm tra các khiếm khuyết tiềm ẩn. Đây là điều bắt buộc, đặc biệt nếu bạn đang cố gắng tự động hóa toàn bộ quá trình triển khai thông qua GitHub và bất kỳ nền tảng triển khai nào tích hợp với nó.

## 6. Code review

GitHub đã có một số tính năng review code đi kèm, đặc biệt là một phần của giao diện PR.

Điều đó đang được nói, không có gì sai khi tích hợp một số ứng dụng có thể tự động hóa quy trình và ít nhất, kiểm tra mã của bạn để biết các vấn đề rõ ràng và reviewer rảnh hơn để xem xét mã của bạn và tìm các vấn đề thực sự có liên quan (chẳng hạn như các vấn đề với logic dự định cho chức năng).

![](https://images.viblo.asia/e1c25b0d-4915-463d-808d-fce5fb6013c8.png)

Một ứng dụng như vậy là [DeepSource](https://github.com/marketplace/deepsource-io), giúp phân tích mã của bạn và kiểm tra một số vấn đề tiềm ẩn, nhưng không giống như LGTM và Prisma Cloud, những vấn đề này có liên quan đến lỗi tiềm ẩn, vấn đề về hiệu suất và các vấn đề khác. Họ thậm chí còn đi xa đến mức tự động tạo ra các vấn đề cho các issue của bạn và đề xuất giải pháp cho một số vấn đề đó.

## 7. Dependency management

Quản lý phụ thuộc là một phần lớn trong các nhiệm vụ hàng ngày của chúng ta với tư cách là nhà phát triển, cho dù chúng ta nhận ra hay không. Người ta phát minh ra chiếc  bánh xe, và bạn sử dụng nó, nhưng bạn có chắc rằng bánh xe đó tốt và tốt ưu nhất?

Không ai có thể nói rằng chúng ta có thể tin tưởng chủ sở hữu của những Dependency? Ai nói rằng mã là hoàn hảo và không có lỗi hoặc vấn đề hiệu suất?
Mặc dù không phải là ngôn ngữ duy nhất có, nhưng ở đây tôi sẽ nói về Node.js và đây là một sự tích hợp mà bạn có thể quan tâm: [DepChecker-Bot](https://github.com/marketplace/depchecker-bot)

![](https://images.viblo.asia/585335b4-4706-4bfa-b2f2-af21a20917d8.png)

Nó sẽ phân tích sự phụ thuộc npm của bạn và đưa ra cảnh báo về những điều nguy hiểm tiềm tàng.

## 8. Heroku
Sự tích hợp cuối cùng với GitHub mà tôi muốn đề cập, đó là [Heroku](https://devcenter.heroku.com/articles/github-integration), nền tảng này cho phép bạn triển khai và chạy ứng dụng của mình mà không phải lo lắng về bất kỳ loại cơ sở hạ tầng hoặc tập lệnh triển khai tùy chỉnh nào.

![](https://images.viblo.asia/0a359c3e-f3d8-4a20-9b72-d9e7302ed036.png)

Heroku sẽ lo tất cả mọi thứ cho bạn và với sự tích hợp này, bạn có thể tự động hóa các nhánh hợp nhất thành công để triển khai hoặc thậm chí có các ứng dụng đánh giá, được biên dịch từ mỗi PR nhận được để bạn kiểm tra thủ công trong trường hợp đó là một phần của quy trình triển khai của bạn.

Nguồn: [https://blog.bitsrc.io/](https://blog.bitsrc.io/)