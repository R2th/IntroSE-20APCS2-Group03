Trong hướng dẫn URLSession này, bạn sẽ học cách tạo các yêu cầu HTTP, cũng như thực hiện tải xuống nền có thể tạm dừng và tiếp tục.
Cho dù ứng dụng truy xuất dữ liệu ứng dụng từ máy chủ, cập nhật trạng thái phương tiện truyền thông xã hội của bạn hoặc tải các tệp từ xa vào đĩa, nó sẽ yêu cầu mạng HTTP nằm ở trung tâm của các ứng dụng di động khiến điều kỳ công việc. Để giúp bạn có nhiều yêu cầu đối với máy chủ, Apple cung cấp URLSession, hỗ trợ để tải lên và tải xuống nội dung qua HTTP.Trong hướng dẫn URLSession này, bạn sẽ học cách xây dựng ứng dụng Half Tunes, cho phép bạn truy vấn API tìm kiếm iTunes, sau đó tải xuống bản xem trước 30 giây của các bài hát. Ứng dụng sau khi hoàn thành sẽ hỗ trợ chuyển nền và cho phép người dùng tạm dừng, tiếp tục hoặc hủy tải xuống bài nhạc đang thực hiện

## Bắt đầu

Tải xuống project mẫu, nó sẽ chứa giao diện tìm kiếm và thể hiện kết quả tìm kiếm, lớp dịch vụ mạng, và các phương thức hỗ trợ tới việc lưu và phát nhạc. Vì vậy bạn có thể tập trung vào phát triển các vấn đề về mạng trong ứng dụng này.
Build và chạy ứng dụng, bạn sẽ thấy màn hình với thanh tìm kiếm ở phần trên và 1 table view rỗng phía dưới:

![](https://images.viblo.asia/be7a8b7a-b8a9-4401-b69c-0e3c90f83c07.png)

Viết vài thứ vào thanh tìm kiếm và bấm Search. Màn hình vẫn sẽ trống rỗng, nhưng đừng lo lắng, bạn sẽ thay đổi nó bằng việc gọi tới URLSession mới của bạn 

## Cái nhìn tổng quan về URLSession
Trước khi bạn bắt đầu, điều quan trọng là phải biết về URLSession và những lớp bên trong nó, vì vậy hãy nhìn nhanh tổng quan nhanh phía dưới: 
URLSession về mặt công nghệ gồm lớp và bộ các lớp dùng để xử lý yêu cầu HTTP/HTTPS cơ bản:

![](https://images.viblo.asia/3b09ef2a-573a-4e70-bdc1-69bddef178ac.png)

URLSession là đối tượng chính chịu trách nhiệm gửi và nhận các yêu cầu HTTP. Bạn tạo nó thông qua URLSessionConfiguration, có ba loại:

* .default: Tạo một đối tượng cấu hình mặc định sử dụng các đối tượng lưu trữ bộ đệm, thông tin xác thực và bộ nhớ cache .
* .ephemeral: Tương tự như cấu hình mặc định, ngoại trừ tất cả dữ liệu liên quan đến phiên được lưu trữ trong bộ nhớ. Hãy nghĩ về điều này như một phiên "riêng tư"
* .background: Cho phép phiên thực hiện các tác vụ tải lên hoặc tải xuống trong nền. Chuyển tiếp tục ngay cả khi ứng dụng bị treo hoặc chấm dứt bởi hệ thống.
`URLSessionConfiguration` cũng cho phép bạn định cấu hình các thuộc tính phiên như giá trị hết thời gian, chính sách bộ đệm và các header HTTP bổ sung. Tham khảo [tài liệu ](https://developer.apple.com/reference/foundation/urlsessionconfiguration)để biết danh sách đầy đủ các tùy chọn cấu hình.

`URLSessionTask` là một lớp trừu tượng biểu thị một đối tượng tác vụ. Một phiên tạo ra một hoặc nhiều tác vụ để thực hiện công việc thực tế là tìm nạp dữ liệu và tải xuống hoặc tải lên các tệp.

Có ba loại nhiệm vụ phiên cụ thể:

* URLSessionDataTask: Sử dụng tác vụ này cho các yêu cầu HTTP GET để truy xuất dữ liệu từ máy chủ vào bộ nhớ.
* URLSessionUploadTask: Sử dụng tác vụ này để tải tệp từ đĩa lên dịch vụ web, thường thông qua phương thức HTTP POST hoặc PUT.
* URLSessionD DownloadTask: Sử dụng tác vụ này để tải tệp từ dịch vụ từ xa đến vị trí tệp tạm thời.

![](https://images.viblo.asia/6f5349f1-df16-4494-8c37-c6745ba6df3b.png)

Bạn cũng có thể tạm dừng, tiếp tục và hủy bỏ task. URLSessionDownloadTask có khả năng tạm dừng bổ sung để nối lại trong tương lai.

Nói chung, URLSession trả về dữ liệu theo hai cách: thông qua trình xử lý hoàn thành khi tác vụ kết thúc, thành công hoặc có lỗi hoặc bằng cách gọi các phương thức trên một đại biểu mà bạn đã đặt khi tạo phiên.

Bây giờ bạn đã có cái nhìn tổng quan về những gì URLSession có thể làm, bạn đã sẵn sàng đưa lý thuyết vào thực tế!


# Data Task
Bạn sẽ bắt đầu bằng cách tạo một tác vụ dữ liệu để truy vấn API tìm kiếm iTunes cho cụm từ tìm kiếm của người dùng.

Trong **SearchVC + SearchBarDelegate.swift**, `searchBarSearchButtonClicky (_ :)` trước tiên cho phép chỉ báo hoạt động mạng trên thanh trạng thái, để cho người dùng biết rằng quá trình mạng đang chạy. Sau đó, nó gọi g`etSearchResults (searchTerm:  completion :)`, đó là khai báo trong **QueryService.swift.**

Trong **Networking / QueryService.swift**, thay thế `// TODO` đầu tiên bằng cách sau:

![](https://images.viblo.asia/35716065-6a23-4f53-987b-a02d1c7e4a6f.png)

Đây là những gì bạn đã làm:

1. Bạn đã tạo `URLSession` và khởi tạo nó với cấu hình phiên mặc định.
2. Bạn đã khai báo biến `URLSessionDataTask` mà bạn sẽ sử dụng để thực hiện yêu cầu HTTP GET cho dịch vụ web Tìm kiếm iTunes khi người dùng thực hiện tìm kiếm. Tác vụ dữ liệu sẽ được khởi tạo lại mỗi lần người dùng nhập chuỗi tìm kiếm mới.

Tiếp theo, thay thế `getSearchResults (searchTerm: hoàn thành :)` còn cơ bản bằng cách sau:

![](https://images.viblo.asia/864cdde2-b239-4a99-a4f9-f770964212d4.png)

Lần lượt đánh số từng bình luận:

1. Đối với truy vấn người dùng mới, bạn hủy tác vụ dữ liệu nếu nó đã tồn tại, vì bạn muốn sử dụng lại đối tượng tác vụ dữ liệu cho truy vấn mới này.
2. Để bao gồm chuỗi tìm kiếm của người dùng trong URL truy vấn, bạn tạo một đối tượng `URLComponents` từ URL cơ sở Tìm kiếm iTunes, sau đó đặt chuỗi truy vấn của nó: điều này đảm bảo các ký tự trong chuỗi tìm kiếm được xử lý đúng.
3. Thuộc tính `url` của `urlComponents` có thể là không, vì vậy bạn tùy chọn liên kết nó với url.
4. Từ phiên bạn đã tạo, bạn khởi tạo `URLSessionDataTask` với `url` truy vấn và trình xử lý hoàn thành để gọi khi tác vụ dữ liệu hoàn tất.
5. Nếu yêu cầu HTTP thành công, bạn gọi phương thức trợ giúp `updateSearchResults (_ :)`, để phân tích `dữ liệu`phản hồi vào mảng theo dõi.
6. Bạn chuyển sang hàng đợi chính để chuyển các `bản nhạc` đến trình xử lý hoàn thành trong **SearchVC + SearchBarDelegate.swift.**
7. Tất cả các tác vụ bắt đầu ở trạng thái treo theo mặc định; gọi `resume ()` bắt đầu nhiệm vụ dữ liệu.

Bây giờ lật ngược lại `getSearchResults (searchTerm: hoàn thành :)` trình xử lý hoàn thành trong **SearchVC + SearchBarDelegate.swift**: sau khi ẩn báo hoạt động, nó lưu kết quả trong `searchResults`, sau đó cập nhật table view:

>** Lưu ý**: Phương thức yêu cầu mặc định là GET. Nếu bạn muốn một tác vụ dữ liệu để POST, PUT hoặc DELETE, hãy tạo URLRequest bằng url, đặt thuộc tính yêu cầu của HTTP HTTPMethod một cách thích hợp, sau đó tạo một tác vụ dữ liệu bằng URLRequest, thay vì bằng URL.'

Build và chạy ứng dụng của bạn; tìm kiếm bất kỳ bài hát nào và bạn sẽ thấy table view được lấp đầy với kết quả có liên quan như sau:

![](https://images.viblo.asia/3a88c341-c6f0-40d1-8664-49a740de5855.png)

Với 1 chút "phép thuật" của `URLSession`, Half Tunes giờ đã có 1 chút chức năng!

# Download Task
Có thể xem kết quả bài hát là thể hiện tốt, nhưng sẽ tốt hơn nếu bạn có thể nhấn vào một bài hát để tải xuống? Đó chính xác là thứ tự tiếp theo của công việc. Bạn có thể sử dụng tác vụ tải xuống, giúp dễ dàng lưu đoạn trích bài hát trong tệp cục bộ.

## Download Class
Để dễ dàng xử lý tải đa nhiệm, đầu tiên cần tạo 1 đối tượng tùy chỉnh cho việc giữ trạng thái hoạt động tải.

Tạo 1 file Swwift tên **Download.swift** trong nhóm **Model**

![](https://images.viblo.asia/d9c50bcc-6ea7-4bac-8766-6392c69ed8f4.png)

Tại đây, một danh sách các thuộc tính của `Download`:

* **track**: Bản nhạc để tải về. Thuộc tính url của track track cũng hoạt động như một định danh duy nhất cho Tải xuống.
* **task** vụ: URLSessionD DownloadTask tải xuống bản nhạc.
* **isD Downloading**: Việc tải xuống đang diễn ra hay tạm dừng.
* **resumeData**: Lưu trữ Dữ liệu được tạo khi người dùng tạm dừng tác vụ tải xuống. Nếu máy chủ lưu trữ hỗ trợ, ứng dụng của bạn có thể sử dụng ứng dụng này để tiếp tục tải xuống bị tạm dừng trong tương lai.
* **progress**: Tiến trình phân đoạn của quá trình tải xuống: thả nổi giữa 0,0 và 1,0.

Tiếp theo, trong **Networking/DownloadService.swift,** thêm thuộc tính sau vào đầu lớp:

![](https://images.viblo.asia/1fa893ec-aabc-488b-9e60-fcc07a7faf30.png)

Dictionary này chỉ đơn giản duy trì ánh xạ giữa một URL và hoạt động `Download` của nó, nếu có.

## URLSessionDownloadDelegate

Bạn có thể tạo tác vụ tải xuống của mình bằng trình xử lý hoàn thành, giống như tác vụ dữ liệu bạn vừa tạo. Nhưng sau này trong hướng dẫn này, bạn sẽ theo dõi và cập nhật tiến trình tải xuống: vì thế, bạn sẽ cần phải thực hiện một ủy nhiệm tùy chỉnh, vì vậy bạn có thể làm điều đó ngay bây giờ.

Có một số giao thức ủy nhiệm phiên, được liệt kê trong tài liệu [URLSession](https://developer.apple.com/documentation/foundation/urlsession). `URLSessionDownloadDelegate` xử lý các sự kiện cấp độ nhiệm vụ cụ thể để tải xuống các tác vụ.

Bạn sẽ sớm đặt `SearchViewControll` làm đại biểu phiên, vì vậy trước tiên hãy tạo tiện ích mở rộng để tuân thủ giao thức ủy nhiệm phiên.

Tạo một tệp Swift mới có tên **SearchVC + URLSessionDelegates.swift** trong nhóm **Controller**. Mở nó và tạo phần mở rộng `URLSessionDownloadDelegate` sau:

![](https://images.viblo.asia/c4c21e7a-f94d-4cd3-9e61-db5c2db2eaf1.png)

Phương thức `URLSessionDownloadDelegate` không tùy chọn duy nhất là `urlSession (_: downloadTask: didFinishDoadingTo :`), được gọi khi quá trình tải xuống kết thúc. Hiện tại, bạn sẽ chỉ in một tin nhắn bất cứ khi nào quá trình tải xuống hoàn tất.

## Creating a Download Task
Với tất cả các công việc chuẩn bị đã sẵn sàng, giờ đây bạn đã sẵn sàng để thực hiện tải tệp. Trước tiên, bạn sẽ tạo một phiên dành riêng để xử lý các tác vụ tải xuống của mình.

Trong **Controller/SearchViewController.swift**, hãy thêm đoạn mã sau ngay trước `viewDidLoad ():`

![](https://images.viblo.asia/fddc4e1c-bafe-491c-a8d6-13b1a85f06c6.png)

Tại đây, bạn khởi tạo một phiên riêng với cấu hình mặc định và chỉ định một đại biểu, cho phép bạn nhận các sự kiện `URLSession` thông qua các cuộc gọi ủy nhiệm. Điều này sẽ hữu ích cho việc theo dõi tiến trình của nhiệm vụ.

Đặt chuỗi delegate thành `nil` sẽ khiến phiên tạo ra hàng đợi hoạt động nối tiếp để thực hiện tất cả các lệnh gọi đến phương thức ủy nhiệm và xử lý hoàn thành.

Lưu ý việc tạo lười biếng `downloadsSession`: điều này cho phép bạn trì hoãn việc tạo phiên cho đến khi bộ điều khiển chế độ xem được khởi tạo, cho phép `self` tự chuyển làm tham số ủy nhiệm cho trình khởi tạo phiên.

Bây giờ thêm dòng này vào cuối `viewDidLoad ():`

![](https://images.viblo.asia/e33cfbc5-3c29-4b32-bfd7-bc6102fece66.png)

Điều này đặt thuộc tính `downloadSession` của `DownloadService`.

Với phiên và đại biểu của bạn được định cấu hình, cuối cùng, bạn đã sẵn sàng tạo tác vụ tải xuống khi người dùng yêu cầu tải xuống bản nhạc.

Trong **Networking/DownloadService.swift**, thay thế `startDownload (_ :)` còn sơ khai bằng cách thực hiện sau:

![](https://images.viblo.asia/a29c0df2-5ee0-45d0-a367-af280107b2fb.png)

Khi người dùng chạm vào nút **Download**, `SearchViewControll`, đóng vai trò là `TrackCellDelegate`, xác định `Track` cho ô này, sau đó gọi `startDownload (_ :)` với `Track` này. Tại đây, những gì mà LỚP đang diễn ra trong `startDownload (_ :):`

1. Trước tiên, bạn khởi tạo `Download` với bản nhạc.
2. Sử dụng đối tượng phiên mới của bạn, bạn tạo một `URLSessionDoadTask` với URL xem trước theo dõi và đặt nó vào thuộc tính tác vụ của `Download`.
3. Bạn bắt đầu tác vụ tải xuống bằng cách gọi `resume()` trên đó.
4. Bạn chỉ ra rằng việc tải xuống đang được tiến hành.
5. Cuối cùng, bạn ánh xạ URL tải xuống tới Download của nó trong `activeDownloads` dictionary.

Build và chạy ứng dụng của bạn; tìm kiếm bất kỳ bản nhạc nào và nhấn nút Download trên một ô. Sau một thời gian, bạn sẽ thấy một thông báo trong bảng điều khiển gỡ lỗi biểu thị rằng quá trình tải xuống đã hoàn tất. Nút Download vẫn còn, nhưng bạn sẽ sớm khắc phục điều đó. Đầu tiên, bạn muốn chơi một số giai điệu!

## Saving and Playing the Track

Khi tác vụ tải xuống hoàn tất, `urlSession (_: downloadTask: didFinishDoadingTo :)` cung cấp URL tới vị trí tệp tạm thời: bạn đã thấy điều này trong thông báo chìm. Công việc của bạn là di chuyển nó đến một vị trí cố định trong thư mục bộ chứa data ứng dụng của bạn trước khi bạn quay lại từ phương thức.

Trong **SearchVC + URLSessionDelegates**, thay thế câu lệnh in trong `urlSession (_: downloadTask: didFinishDoadingTo :)` bằng mã sau:

![](https://images.viblo.asia/3d44b067-3e48-4e53-88db-ad7814f1517d.png)

Đây là những gì bạn làm trong mỗi bước 

1. Bạn trích xuất URL yêu cầu ban đầu từ tác vụ, tra cứu `Download` tương ứng trong các tải xuống đang hoạt động của bạn và xóa nó khỏi dictionary đó.
2. Sau đó, bạn chuyển URL tới phương thức trình trợ giúp `localFilePath (for :)` trong **SearchViewControll.swift**, tạo đường dẫn tệp cục bộ vĩnh viễn để lưu vào, bằng cách nối thêm `LastPathComponent` của URL (tên tệp và phần mở rộng của tệp) vào đường dẫn của thư mục Tài liệu của ứng dụng.
3. Sử dụng `FileManager`, bạn di chuyển tệp đã tải xuống từ vị trí tệp tạm thời của nó sang đường dẫn tệp đích mong muốn, trước tiên xóa bất kỳ mục nào tại vị trí đó trước khi bạn bắt đầu tác vụ sao chép. Bạn cũng đặt thuộc tính tải xuống theo dõi download thành `true`.
4. Cuối cùng, bạn sử dụng thuộc tính `index` theo dõi tải xuống để tải lại ô tương ứng.

Xây dựng và chạy dự án của bạn. Chạy một truy vấn, sau đó chọn bất kỳ bài hát và tải về nó. Khi quá trình tải xuống kết thúc, bạn sẽ thấy vị trí đường dẫn tệp được trỏ đến bảng điều khiển của bạn:

![](https://images.viblo.asia/0b9b6253-80e9-4354-9f15-6bee2963f27f.png)

Nút Download giờ đã biến mất, bởi vì phương thức delegate chỉnh thuộc tính `downloaded` thành `true`. Chạm vào bài hát và bạn sẽ nghe nó chạy trong trình biên `AVPlayerViewController` như phía dưới:

![](https://images.viblo.asia/b32da860-564b-4cfa-8e55-beff2cf4f9e5.png)

## Pausing, Resuming and Cancelling Downloads

Điều gì xảy ra nếu người dùng muốn tạm dừng tải xuống hoặc hủy bỏ hoàn toàn? Trong phần này, bạn sẽ thực hiện các tính năng tạm dừng, tiếp tục và hủy để cung cấp cho người dùng quyền kiểm soát hoàn toàn quá trình tải xuống.

Bạn sẽ bắt đầu bằng cách cho phép người dùng hủy tải xuống đang hoạt động.
Trong **DownloadService.swift**, thay thế `cancelDownload(_:)` với code phía dưới

![](https://images.viblo.asia/0f0538b9-e386-4f1e-8dbb-b2b38dd55d32.png)

Để hủy tải xuống, bạn truy xuất tác vụ tải xuống từ Download tương ứng trong dictionary tải xuống đang hoạt động và gọi `cancel()` trên đó để hủy tác vụ. Sau đó, bạn xóa đối tượng tải xuống khỏi từ điển tải xuống đang hoạt động.

Tạm dừng tải xuống về mặt khái niệm tương tự như hủy: tạm dừng hủy tác vụ tải xuống, nhưng cũng tạo ra **resume data**, chứa đủ thông tin để tiếp tục tải xuống sau đó, nếu máy chủ lưu trữ hỗ trợ chức năng đó.

> **Lưu ý**: Bạn chỉ có thể tiếp tục tải xuống trong một số điều kiện nhất định. Chẳng hạn, tài nguyên không được thay đổi kể từ lần đầu tiên bạn yêu cầu. Để biết danh sách đầy đủ các điều kiện, hãy xem tài liệu ở [đây](https://developer.apple.com/reference/foundation/urlsessiondownloadtask/1411634-cancel).

Bây giờ, thay thế `pauseDownload (_ :)` còn sơ khai bằng mã sau:

![](https://images.viblo.asia/8c37793e-9f58-4016-977d-3eb528b55ea0.png)

Sự khác biệt chính ở đây là bạn gọi `cancel(bySubingResumeData :)` thay vì `cancel ()`. Bạn cung cấp một tham số đóng cho phương thức này, nơi bạn lưu dữ liệu tiếp tục vào `Download` thích hợp để nối lại trong tương lai.

Bạn cũng đặt thuộc tính `isDownloading` của `Download` thành `false` để chỉ ra rằng quá trình tải xuống bị tạm dừng.

Khi chức năng tạm dừng hoàn thành, thứ tự tiếp theo của doanh nghiệp là cho phép nối lại tải xuống bị tạm dừng.

Thay thế `resumeDonwload (_ :)` còn sơ khai với mã sau:

![](https://images.viblo.asia/282d4bfc-7715-44c4-98ae-517203c3946d.png)

Khi người dùng tiếp tục tải xuống, bạn kiểm tra Tải xuống thích hợp để biết sự hiện diện của dữ liệu tiếp tục. Nếu tìm thấy, bạn tạo một tác vụ tải xuống mới bằng cách gọi `downloadTask (withResumeData :)` với dữ liệu tiếp tục. Nếu vì lý do nào đó, dữ liệu tiếp tục vắng mặt, bạn tạo một tác vụ tải xuống mới với URL tải xuống.

Trong cả hai trường hợp, bạn bắt đầu tác vụ bằng cách gọi `resume() `và đặt cờ `isDownloading` của `Download` thành `true`, để cho biết quá trình tải xuống đã được tiếp tục.

Ở đó, chỉ còn một việc phải làm để ba chức năng này hoạt động chính xác: bạn cần hiển thị hoặc ẩn các nút Tạm dừng / Tiếp tục và Hủy, nếu phù hợp. Để thực hiện việc này, phương thức `TrackCell configure(track: download)`  cần biết liệu bản nhạc đó có tải xuống đang hoạt động hay không và liệu nó có đang tải xuống hay không.

Trong **TrackCell.swift**, thay đổi `cofigure (track: download :)` để `configure (track: download: download :):`

![](https://images.viblo.asia/65cfc5ad-f924-469a-8dc3-2bf4ef212643.png)

Trong **SearchViewController.swift**, sửa phương thức trong `tableView(_:cellForRowAt:)`:

![](https://images.viblo.asia/46218b46-33e7-4fed-8bd0-1fd1843b716e.png)

Tại đây, bạn trích xuất đối tượng tải xuống track track từ dictionary `activeDownloads`.

Quay lại **TrackCell.swift**, tìm hai TODO trong `configure(track: download: download :)`. Thay thế // TODO đầu tiên bằng thuộc tính này:

![](https://images.viblo.asia/6bde0b1d-9812-42b6-825c-dd314b7b15f9.png)

Và thay thế // TODO thứ 2 bằng:

![](https://images.viblo.asia/15d8e161-92c0-44e0-9d88-54e886ce95b3.png)

Như các ghi chú ghi chú, một đối tượng tải xuống không phải là số không có nghĩa là quá trình tải xuống đang diễn ra, do đó, ô sẽ hiển thị các điều khiển tải xuống: Tạm dừng / Tiếp tục và Hủy. Vì các chức năng tạm dừng và tiếp tục chia sẻ cùng một nút, bạn chuyển đổi nút giữa hai trạng thái, nếu phù hợp.

Bên dưới if-đóng này, thêm mã sau đây:

![](https://images.viblo.asia/6c6b8068-6207-4e0d-b389-067315e9c069.png)

Tại đây, bạn chỉ hiển thị các nút cho một ô nếu tải xuống được kích hoạt.

Cuối cùng, thay thế dòng cuối cùng của phương pháp này:

![](https://images.viblo.asia/542d8c98-db3d-4c2f-b79d-02c5efe2f8c4.png)

cùng với những code sau:

![](https://images.viblo.asia/40c096f1-b665-4169-8f64-124fc6196a66.png)

Tại đây, bạn nói với ô để ẩn nút Tải xuống nếu bản nhạc của nó đang tải xuống.

Xây dựng và chạy dự án của bạn; tải xuống một vài bản nhạc đồng thời và bạn có thể tạm dừng, tiếp tục và hủy chúng theo ý muốn:

> **Lưu ý**: Nếu bản tải xuống của bạn bị treo sau khi bạn nhấn Tiếp tục, hãy nhấn Tạm dừng, sau đó Tiếp tục lại. Đây là một lỗi bí ẩn sẽ biến mất khi bạn thay đổi cấu hình phiên tải xuống thành URLSessionConfiguration.background (withIdentifier: "bgSessionConfiguration")

![](https://images.viblo.asia/81e8d11b-49bd-4111-b645-142df2cf2db1.png)

# Enabling Background Transfers

Ứng dụng của bạn khá hoạt động vào thời điểm này, nhưng có một cải tiến lớn còn lại để thêm: chuyển nền. Trong chế độ này, tải xuống tiếp tục ngay cả khi ứng dụng của bạn bị nền hoặc gặp sự cố vì bất kỳ lý do nào. Điều này thực sự cần thiết cho các đoạn bài hát, khá nhỏ; nhưng người dùng của bạn sẽ đánh giá cao tính năng này nếu ứng dụng của bạn chuyển các tệp lớn.

Nhưng nếu ứng dụng của bạn không chạy, làm thế nào để nó hoạt động? HĐH chạy một trình nền riêng biệt bên ngoài ứng dụng để quản lý các tác vụ chuyển nền và nó sẽ gửi các thông báo đại biểu thích hợp đến ứng dụng khi các tác vụ tải xuống chạy. Trong trường hợp ứng dụng chấm dứt trong quá trình chuyển hoạt động, các tác vụ sẽ tiếp tục chạy không bị ảnh hưởng trong nền.

Khi một tác vụ hoàn thành, trình nền sẽ khởi chạy lại ứng dụng trong nền. Ứng dụng được khởi chạy lại sẽ tạo lại phiên nền, để nhận các thông báo ủy nhiệm hoàn thành có liên quan và thực hiện bất kỳ hành động bắt buộc nào như lưu tệp đã tải xuống vào đĩa.

> **Lưu ý**: Nếu người dùng chấm dứt ứng dụng bằng cách thoát khỏi trình chuyển đổi ứng dụng, hệ thống sẽ hủy tất cả các lần chuyển nền của phiên bản và giành chiến thắng trong nỗ lực khởi chạy lại ứng dụng.
> Bạn truy cập phép thuật này bằng cách tạo một phiên với **background**.

Trong **SearchViewControll.swift**, trong quá trình khởi tạo tải xuốngSession, hãy tìm dòng mã sau:

![](https://images.viblo.asia/acbf44b0-4439-46e6-ab74-3a4c021e8bc9.png)

...và thay thế nó bằng dòng sau:

![](https://images.viblo.asia/6e05ee33-97ab-466c-9a0b-0256bc595287.png)

Thay vì sử dụng cấu hình phiên mặc định, bạn sử dụng cấu hình phiên nền đặc biệt. Lưu ý rằng bạn cũng đặt một mã định danh duy nhất cho phiên ở đây để cho phép ứng dụng của bạn tạo phiên nền mới, nếu cần.

> **Lưu ý**: Bạn không được tạo nhiều hơn một phiên cho cấu hình nền, vì hệ thống sử dụng mã định danh của cấu hình để liên kết các tác vụ với phiên.

Nếu một tác vụ nền hoàn thành khi ứng dụng không chạy, ứng dụng sẽ được khởi chạy lại trong nền. Bạn cần phải xử lý sự kiện này từ đại biểu ứng dụng của bạn.

Chuyển sang **AppDelegate.swift** và thêm đoạn mã sau gần đầu lớp:

![](https://images.viblo.asia/555991a8-184e-4d54-a31a-9d89f31c0e4d.png)

Tiếp theo thêm phương thức sau cho **AppDelegate.swift**:

![](https://images.viblo.asia/e353c398-13bb-4645-b4c7-182320f9b009.png)

Tại đây, bạn lưu `comletionHandler` được cung cấp dưới dạng biến trong đại biểu ứng dụng của bạn để sử dụng sau.

`application(_: handleEventsForBackgroundURLSession :)` đánh thức ứng dụng để xử lý tác vụ nền đã hoàn thành. Bạn cần xử lý hai điều trong phương pháp này:

* Đầu tiên, ứng dụng cần tạo lại cấu hình và phiên nền phù hợp, sử dụng mã định danh được cung cấp bởi phương thức ủy nhiệm này. Nhưng vì ứng dụng này tạo phiên nền khi khởi tạo `SearchViewController`, nên bạn đã kết nối lại vào thời điểm này!

* Thứ hai, bạn sẽ cần nắm bắt trình xử lý hoàn thành được cung cấp bởi phương thức ủy nhiệm này. Gọi trình xử lý hoàn thành cho HĐH biết rằng ứng dụng của bạn đã hoàn thành công việc với tất cả các hoạt động nền cho phiên hiện tại và cũng khiến HĐH chụp nhanh giao diện người dùng cập nhật của bạn để hiển thị trong trình chuyển đổi ứng dụng.

Nơi để gọi trình xử lý hoàn thành được cung cấp là `urlSessionDidFinishEvents (forBackgroundURLSession :):` đó là một phương thức `URLSessionDelegate` kích hoạt khi tất cả các tác vụ liên quan đến phiên nền đã kết thúc.

Trong **SearchVC + URLSessionDelegates.swift** thêm thư viện

![](https://images.viblo.asia/24ba92ca-d383-4098-8f4c-b10f94f09e3a.png)

và thêm thư viện dưới đây:

![](https://images.viblo.asia/ce931610-f37c-4c28-9d88-77e614629c42.png)

cuối cùng, thêm phần mở rộng sau:

![](https://images.viblo.asia/356c7923-2cb7-4639-bce7-5ed8e86dbe28.png)

Đoạn mã trên chỉ đơn giản là lấy trình xử lý hoàn thành được lưu trữ từ đại biểu ứng dụng và gọi nó trên luồng chính. Bạn tham chiếu đại biểu ứng dụng bằng cách nhận đại biểu được chia sẻ từ ứng dụng UIApplication, có thể truy cập được nhờ nhập UIKit.

Xây dựng và chạy ứng dụng của bạn; bắt đầu một vài lượt tải xuống đồng thời và nhấn nút Home để làm nền cho ứng dụng. Đợi cho đến khi bạn nghĩ rằng quá trình tải xuống đã hoàn tất, sau đó nhấn đúp vào nút Home để hiển thị trình chuyển đổi ứng dụng.

Việc tải xuống đã hoàn tất, với trạng thái mới được phản ánh trong ảnh chụp nhanh ứng dụng. Mở ứng dụng để xác nhận điều này:

![](https://images.viblo.asia/2ee3fcfd-71b1-428e-954d-d88177ae76dd.png)

Bây giờ bạn có một ứng dụng phát nhạc đầy đủ chức năng!  Apple Music! :]

Bài gốc: https://www.raywenderlich.com/567-urlsession-tutorial-getting-started