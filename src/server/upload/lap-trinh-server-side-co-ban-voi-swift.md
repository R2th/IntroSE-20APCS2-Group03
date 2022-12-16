Lập trình server với Swift đã và đang là một chủ đề thú vị kể từ khi Apple mã nguồn mở ngôn ngữ này.  Cho đến trước khi bài viết này được ra đời thì tôi chưa từng có chút kinh nghiệm lập trinh back end nào, nhưng nhờ sức mạnh của cộng đồng mã nguồn mở. Tôi đã chọn được một framework ưng ý cho mình, đó là Vapor của Tanner Nelson, một thư viện dễ cài đặt và Heroku.

## Cài đặt
Đầu tiên bạn cần một tài khoản Heroku và một bản cài đặt của Swift Development Snapshot. Tại thời điểm tôi đang viết thì module Swift Package Manager chưa được kèm theo, do vậy bạn cần phải download Swift Development Snapshot để tối ưu mọi thứ.

Nhiệm vụ của chúng ta ngày hôm nay là tạo một server bằng Swift và chạy trên Heroku. Server của chúng ta sẽ chạy local, điều đó có nghĩa chúng ta sẽ tạo một Xcode project và cấu hình nó chạy với swift package manager. Quá trình diễn ra trong 4 bước như sau:

Chuyển file main.swift tới Sources folder:

![](https://images.viblo.asia/fe0dbd85-7a95-4ecf-9a2b-185c81442c33.png)

Sau đó chúng ta thêm file Package.swift:

![](https://images.viblo.asia/7a980e3d-4e4c-4594-83e8-e259522cc830.png)

Thêm đường dẫn .build vào import paths
Đế hiển thị code completion và hightlight syntax cho những thư viện mà ta vừa import, đường dẫn của Swift Package Manager cần phải thêm import paths. Hãy chắc hắn rằng bạn đã import folder Debug cho phần cấu hình Debug và folder Release cho phần Release.

![](https://images.viblo.asia/1328dc99-a900-4f56-a35c-f291a8d591b9.png)

Chạy Xcode từ toolchain
Các bạn có thể vào mục Xcode -> Toolchains để mở một instance của Xcode để tối ưu một Swift Snapshot. Lưu ý là chúng ta vẫn chưa thể build trong Xcode. Để biên dịch bạn cần phải sử dụng lệnh swift build từ command line.

## Khởi tạo Server
Việc khởi tạo server thì rất là đơn giản chỉ với một vài dòng Code như sau:

![](https://images.viblo.asia/3a12ad0a-0555-4d85-a3fb-71ff376b6f33.png)

Từ đây chỉ với một dòng lệnh tại Command Line để chạy server

![](https://images.viblo.asia/cd2ed963-4575-4a44-bf37-f4513034d777.png)

Mọi thứ dường như đã ổn, chúng ta tiếp tục kiểm tra tại web browser, ở đây tôi sử dụng json formatter plugin để xem phản hồi trả về:

![](https://images.viblo.asia/e0f2f6b5-25a5-4951-be05-2be968405228.png)

Một số lỗi cơ bản có thể xảy ra

![](https://images.viblo.asia/1a3ceabe-f083-474e-9e2d-8b25a8dc61ff.png)

Buildpack đã tạo ra một file thực thi, nhưng Heroku đã ko nhận ra nó, do vậy chúng ta cần tới Procfile, với Procfile, Heroku có thể chạy đoạn mã thực thi SwiftServerIO như ở dưới đây:

![](https://images.viblo.asia/bced6b46-22bb-49dd-88fb-787fb858d7d0.png)

Bước cuối cùng đó là thiết lập dyno cho web app của mình. Gõ dòng lệnh sau vào command line:

"heroku ps:scale web=1"

![](https://images.viblo.asia/6686884b-2d81-4bb8-8fc8-e73cc76fe114.png)

Sau khi thực hiện đầy đủ các bước trên, mở browser và chúng ta lại có thể thấy server hoạt động bình thường 

## Lời kết
Bài viết trên giúp chúng ta có một cái nhìn tổng quan và cơ bản nhất về lập trình back end hay server-side bằng Swift. Hy vọng rằng với việc mã nguồn mở Swift và sự lớn mạnh của cộng đồng mã nguồn mở, bạn sẽ tìm được giải pháp back end tối ưu của mình bên cạnh những nền tảng phổ biến khác.

Nguồn bài viết : https://medium.com/@LogMaestro/server-side-swift-c965b7ebe6e7#.2yo074hf2