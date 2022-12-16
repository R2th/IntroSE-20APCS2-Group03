# Giới thiệu


 ![](https://images.viblo.asia/13c690ef-65ce-4043-a9fc-4d3e6e331373.png)
 
 **Rekit Studio**  , một IDE hoàn chỉnh cho phát triển React, Redux, React Router. Một cái tên khá mới lạ.
 
 Phiên bản trước của Rekit Studio là Rekit Portal, không có khả năng chỉnh sữa mã, Rekit Studio cung cấp một trải nghiệm tuyệt vời cho việc coding.   Là một IDE bên cạnh có khả năng sửa code. Rekit Studio cung cấp khả năng tạo mã, lập sơ đồ phụ thuộc, refactoring,  building, unit tests và một cách có ý nghĩa để điều hướng code.
 
 
 Bạn sẽ không còn quan tâm đến cách thiết lập dự án, cấu hình webpack hoặc sắp xếp cấu trúc thư mục của bạn. Rekit Studio cung cấp một cách tích hợp để quản lý toàn bộ dự án. Đó là những gì làm cho Rekit Studio khác biệt với các trình soạn thảo mã khác như Sublime Text và VS Code.
 
##  Trăm nghe không bằng một thấy, trăm thấy không bằng một thử ....
##  
***Cách 1:***

Truy cập bản demo trực tiếp: http://demo.rekit.org  . Đó là một phiên bản Rekit Studio chạy ở chế độ chỉ đọc. Vì vậy, bạn không thể thực hiện bất kỳ thay đổi nào đối với dự án mà nó quản lý (mã của chính Rekit Studio!).
<br>
<br>
***Cách 2***

Tạo ứng dụng Rekit chỉ trong 3 bước:
![](https://images.viblo.asia/e144c9b3-6108-4aa3-a1b7-3b4a434910dd.png)
Sau đó truy cập *http: // localhost: 6075* cho ứng dụng của bạn. *http: // localhost: 6076* cho Rekit Studio theo mặc định.

Rekit Studio là gói npm trong dự án của bạn và chạy trong trình duyệt. Cơ chế này đảm bảo rằng mỗi ứng dụng có Rekit Studio riêng để không bao giờ có sự cố tương thích phiên bản.
# Hiển thị code của bạn một cách ý nghĩa
Hầu như tất cả các IDE để phát triển front-end chỉ hiển thị các tệp theo cùng một cách với cấu trúc thư mục. Mọi người phàn nàn rằng điều hướng giữa các tập tin là bực bội. Tồi tệ hơn là dường như không có cách nào để cải thiện, bởi vì các trình soạn thảo mã không biết tệp nào là components, đó là action, file kiểu nào thuộc về components nào, nơi quy tắc routing được xác định, v.v. . Trong khi cấu trúc dự án theo phong cách tự do, nó sẽ không bao giờ được cải thiện.

Bây giờ **Rekit** theo mô hình về cách tổ chức một ứng dụng web có thể mở rộng. Và dựa vào đó, **Rekit Studio** hiểu dự án của bạn. Rekit Studio biết tệp nào là components, là actions, nơi quy tắc routing được xác định, v.v. Sau đó, dev có thể hiển thị cấu trúc dự án một cách có ý nghĩa.

![](https://images.viblo.asia/a8af2bfd-2221-45bc-b689-0b02f25164a8.png)

**Rekit Studio** biết các tính năng của các thành phần dự án đó, như hành động nào không đồng bộ (với dấu màu xanh da trời, có nghĩa là các thành phần kết nối với *Redux store*  (với dấu màu xanh lá cây Cọ) và các thành phần nào được quản lý bởi *React Router*  ( với dấu màu cam Rv) được sử dụng trong một số quy tắc routing.

Với  **Rekit Studio**  bạn có thể dễ dàng điều hướng giữa các yếu tố dự án. Bạn cũng có thể nhận thêm thông tin về một yếu tố mà không cần mở nó và xem code.

Một nhược điểm đó là **Rekit Studio** chỉ hiển thị các tệp trong thư mục src trong dự án để nó có hiệu suất tốt. Vì vậy, nếu bạn muốn chỉnh sửa các tệp trong thư mục *src*, chẳng hạn như *pack.json* hoặc *.gitignore,* bạn có thể cần một số trình soạn thảo văn bản khác.

# Code generation

Cũng giống như các *IDE* thực sự khác như *Eclipse* cho *Java* hoặc *Visual Studio cho .Net*, **Rekit Studio** giúp tạo các mẫu mã với giao diện người dùng trực quan của nó mà không phải trả bất kỳ chi phí nào . Ví dụ, để tạo một *component*, nhấp chuột phải vào một nút *feature* trong the project explorer và nhấp vào  *Add Component* 

![](https://images.viblo.asia/18c158ce-ddd6-44b5-96ea-089e3c7906e2.png)

Bên cạnh việc đặt tên cho nó, bạn có thể đặt liệu nó có *connect* với  *Redux store* hay không, liệu nó có được sử dụng trong quy tắc *Router React* hay không. Sau khi nhấp vào `Ok`, nó tạo ra tất cả các cấu hình và mã cần thiết. Bạn có thể thấy những gì nó làm phía sau bởi nhật ký hoạt động. Nó tạo ra một tệp *less / scss* để style, một tệp test để testing, nó thêm quy tắc *React Router* để truy cập nó bằng URL (nếu đường dẫn url được đặt), v.v...

<br>

Không có phép thuật nào đằng sau nó - **Rekit Studio** chỉ giúp bạn tự động làm những gì cần thực hiện thủ công trước đó. Và bạn luôn biết những gì đã xảy ra bằng cách kiểm tra nhật ký.

<br>

Để tạo hành động không đồng bộ *Redux*, **Rekit Studio** sử dụng `redux-thunk` theo mặc định để tạo các bộ giảm tốc và hành động:
![](https://images.viblo.asia/6de14cc7-9132-4182-ad16-ce3d0015393f.png)
Ngoài ra, bạn có thể tạo các hành động không đồng bộ bằng cách sử dụng `redux-saga` bằng cách cài đặt plugin` rekit-plugin-redux-saga` 


Tất cả tên tệp, tên hàm hoặc tên biến do Rekit tạo ra buộc phải tuân theo các quy tắc được xác định trước như được mô tả [ở đây](http://rekit.js.org/docs/namings.html) . Vì vậy, ngay cả khi bạn nhập một tên như  `my component` vào trường tên, **Rekit** sẽ chuyển đổi nó thành` MyComponent`. Theo cách tiếp cận này, tất cả các tên trong dự án luôn nhất quán.

Những mẫu code này được tạo ra theo thông lệ tốt nhất chung. Bạn chỉ cần điền logic business vào bên trong chúng mà không phải viết code dài dòng bằng tay. Khi code được tạo, bạn có thể chỉnh sửa miễn phí.
# Refactoring là quan trọng 
Khi tạo một ứng dụng lớn, tái cấu trúc là rất quan trọng để làm cho code sạch, dễ đọc và sau đó có thể bảo trì. Một số phần chính của tái cấu trúc là đổi tên, di chuyển và xóa các phần tử dự án. Với các công nghệ mặt trước hiện đại, công việc này trở nên quá khó khăn.


*Ví dụ:* nếu chúng ta muốn đổi tên một hành động không đồng bộ, nó thường cần chạm vào một số tệp và sửa đổi hàng tá mã ở các vị trí khác nhau. Giả sử  bạn muốn đổi tên một hành động không đồng bộ từ `fetchTopics` thành` fetchTopicList`, nó cần những sửa đổi sau:

![](https://images.viblo.asia/9719bd43-67d1-4bfa-89d2-5dc6df93d0ff.png)

Nó trông thật điên rồ đến mức bạn sẽ không bao giờ muốn làm nó bằng tay, phải không? Nỗi đau tương tự tồn tại trong việc di chuyển và xóa các *component* và *action* . Không có sự giúp đỡ của công cụ, nỗi đau này được sử dụng để ngăn chặn nhiều người trong chúng ta tái cấu trúc code của bạn. Điều này khiến dự án của bạn trở nên khó duy trì trong một thời gian ngắn.

Giờ đây với Rekit Studio, bạn có thể nhấp chuột phải vào một thành phần hoặc hành động để di chuyển và đổi tên hoặc xóa nó giống như bạn làm với các IDE khác như *Eclipse* cho Java hoặc *Visual Studio* cho .Net. **Rekit Studio** sẽ tự động làm tất cả mọi thứ và bạn có thể kiểm tra nhật ký để xem những gì nó làm phía sau.

![](https://images.viblo.asia/30710792-3da1-4404-aed0-8d510bf5cdfe.png)

# Review dự án của bạn với các sơ đồ trực quan
Khi dự án của bạn phát triển, mối quan hệ phụ thuộc của các modules trở nên phức tạp. Điều này thường dẫn đến các vấn đề hồi quy nếu bạn không xem xét chúng đẩy đủ. Đó là một hành động tốt để luôn giữ mối quan hệ đơn giản,  để code luôn dễ hiểu **Rekit Studio** cung cấp hai loại sơ đồ để bạn xem xét các phụ thuộc:

### 1. Sơ đồ tổng quan

Nó được hiển thị trên trang bảng điều khiển (trang chủ), trong đó chúng ta có thể thấy không chỉ các phụ thuộc giữa các tính năng (khái niệm cấp cao về ứng dụng Rekit), mà cả các modules thông thường như các thành phần và hành động. Vì vậy, bạn có thể dễ dàng tìm thấy modules nào nguy hiểm để tái cấu trúc (có nhiều dep) và modules nào dễ tái cấu trúc (với ít deps hơn).

![](https://images.viblo.asia/55e17c5a-48f1-475f-a1d8-ff1edc498d86.png)

Sơ đồ này cũng giúp bạn tìm thấy các modules không sử dụng đó - ví dụ, hai components của chức năng `home` không được sử dụng nữa trong dự án như trong sơ đồ trên. Bạn có thể loại bỏ chúng một cách an toàn. Loại bỏ code  không cần thiết giúp giảm độ phức tạp của dự án cùng với kích thước gói của ứng dụng.

### 2. Sơ đồ nguyên tố

Mở một phần tử từ *project explorer *, sau đó bạn có thể thấy sơ đồ phần tử trong tab *diagram*. Nó cung cấp một cái nhìn rất trực quan về cách một phần tử được tạo hoặc sử dụng bởi những người khác. Đó là sự phức tạp của một modules

![](https://images.viblo.asia/a851bdcf-680c-470c-aed8-cc0ecfc2bbdf.png)

Ví dụ, `SidePanel` là một t components phức tạp sử dụng nhiều *components* và *action* khác. Và nó có sự phụ thuộc từ các tính năng khác. Có lẽ nó là một *components* để tái cấu trúc để trở nên đơn giản và dễ hiểu.

# Build and testing
Là một IDE, **Rekit Studio** cũng có thể xây dựng và kiểm tra dự án với các UI trực quan. Theo mặc định, Rekit Studio sẽ cố gắng chạy lệnh `npm run build` để xây dựng dự án và sẽ chạy` npm test - [test-file-pattern]` để chạy thử nghiệm đơn vị.

Để xây dựng dự án, nhấp vào mục menu `Build` từ menu chính:
![](https://images.viblo.asia/a9a627a1-9d49-4591-9ed2-c10810755431.png)

Sau đó, bạn có thể thấy một thanh tiến trình và kết quả xây dựng. Trước khi triển khai đến máy chủ sản xuất, bạn cũng có thể xác minh kết quả bản dựng bằng cách truy cập máy chủ dist mà theo mặc định chạy tại: http: // localhost: 6077  .

Để chạy thử nghiệm đơn vị, bạn có thể chạy tất cả các thử nghiệm bằng cách nhấp vào mục menu `Run tests` từ menu chính hoặc nhấp chuột phải vào tệp / thư mục có các thử nghiệm. Rekit Studio sẽ tự động chuyển đổi lệnh để kiểm tra mẫu tệp:
![](https://images.viblo.asia/8e8ae12f-1484-4bc1-b1a9-74144742c6fc.png)
Trên đây là kết quả thử nghiệm của tính năng `sơ đồ`. Nếu bạn chạy tất cả các thử nghiệm của dự án, nó sẽ tạo ra một báo cáo bảo hiểm thử nghiệm. Bạn có thể truy cập nó từ menu chính:
![](https://images.viblo.asia/82eb9cf8-525c-4fb4-b713-cf6c09679313.png)
# Hệ thống plugin
Chúng ta có thể thấy rằng Rekit Studio có thể tạo ra các mẫu tính năng, actions và components. Nếu bạn muốn tạo một số phần tử mới như bộ chọn hoặc bạn muốn thay đổi bản tóm tắt mã mặc định (như sử dụng `redux-saga` thay vì` redux-thunk` cho các hành động không đồng bộ), bạn có thể tạo plugin để thực hiện.

Xem thêm về hệ thống plugin[ tại đây .](http://rekit.js.org/docs/plugin.html)

# Command line interface
Ngoài Rekit Studio, còn có một [giao diện command line](http://rekit.js.org/docs/cli.html) khác để quản lý dự án Rekit. Trên thực tế, cả Rekit Studio và Rekit CLI đều sử dụng `rekit-core` để quản lý các yếu tố dự án. Hệ thống CLI hỗ trợ nhiều loại plugin hơn. Và Rekit Studio sẽ được cải thiện trong tương lai để cung cấp giao diện người dùng thống nhất cho hệ thống plugin.
# Di chuyển từ Rekit Portal sang Rekit Studio
Nếu dự án hiện tại của bạn đang sử dụng Rekit Portal, việc di chuyển sang Rekit Studio rất dễ dàng, bởi vì Rekit Studio hoàn toàn tương thích với các dự án Rekit trước đây. Tất cả những gì bạn cần làm là cài đặt Rekit Studio và cập nhật tập lệnh để khởi động nó trong server.js
[ tại đây .](https://github.com/supnate/rekit-boilerplate/commit/5186b5c3ec141b5306471c52a8955dfb288598bd)

# Next
Rekit Studio vẫn đang trong giai đoạn đầu, mặc dù nó đã sử dụng nó để xây dựng các ứng dụng web từ lâu. Các nhà phát triển sẽ tiếp tục cải thiện nó vì tất cả chúng ta sử dụng nó trong công việc hàng ngày .

Một số ưu điểm nổi bật của nó :

* Cú pháp mã tốt hơn nổi bật.
* Hỗ trợ các quy tắc ESlint tùy chỉnh.
* Mã tự động hoàn thành tốt hơn, chẳng hạn như cài đặt tên mô-đun.
* Mở tệp nhanh bằng Cmd + P.
* Hỗ trợ nhiều tập tin chưa lưu. Hiện tại, chỉ có một tệp có thể ở trạng thái chưa lưu để giữ mã của bạn an toàn.
* Thêm nhiều loại sơ đồ.
* Cho phép người dùng tạo / đổi tên / xóa các tệp bình thường bên cạnh các thành phần và hành động.
* Tích hợp sách truyện.
* Hỗ trợ TypeScript.
* Hỗ trợ kết xuất phía máy chủ.

# Tóm lược 
Mặc dù công nghệ front end phát triển rất nhanh, Rekit như một bộ công cụ, thay vì một khung, đã rất ổn định trong hơn hai năm. Các thực hành sau đây là độc lập với công nghệ. Bây giờ việc phát hành Rekit Studio là một cột mốc mới để  cải thiện trải nghiệm mã hóa của mình. hy vọng bạn cũng sẽ thích nó!

Cuối cùng, tôi muốn chỉ ra rằng Rekit không cung cấp bất kỳ gói SDK hoặc npm nào cho ứng dụng của bạn. Nó chỉ là một công cụ để tạo và quản lý dự án. Ngay cả khi không có Rekit, bạn có thể sử dụng bất kỳ trình soạn thảo văn bản nào để viết mã và sử dụng thiết bị đầu cuối để chạy các tập lệnh cho dự án Rekit. Đó là, bạn sử dụng Rekit, nhưng bạn không phụ thuộc vào nó.
Bài viết được tham khảo từ nguồn https://medium.freecodecamp.org/introducing-rekit-studio-a-real-ide-for-react-and-redux-development-baf0c99cb542