Ở bài viết [trước đây](https://viblo.asia/p/android-security-tips-L4x5xrkBZBM), mình đã giới thiệu về các tip liên quan tới **lưu trữ dữ liệu**, **permissions** và **networking**. Ở phần bài này, mình sẽ trình bày tiếp các tip liên quan tới:
1. Xác thực đầu vào
2. Xử lý dữ liệu người dùng
3. WebView và những lưu ý khi sử dụng

Chi tiết từng loại sẽ được trình bày cụ thể bên dưới.

### 1. Xác thực đầu vào

Bỏ sót các trường hợp trong việc xác thực dữ liệu đầu vào là một trong những vấn đề bảo mật phổ biến nhất ảnh hưởng đến các ứng dụng, bất kể chúng chạy trên nền tảng nào. Android có các biện pháp đối phó ở cấp độ platform-level để giảm mức độ tiếp xúc của các ứng dụng với các vấn đề xác thực đầu vào và bạn nên sử dụng các tính năng đó nếu có thể. Cũng lưu ý rằng việc lựa chọn các ngôn ngữ an toàn kiểu type-safe có xu hướng làm giảm khả năng xảy ra các vấn đề xác thực đầu vào.

Nếu bạn đang sử dụng native code, mọi dữ liệu đọc từ tệp, nhận qua mạng hoặc nhận từ IPC đều có khả năng gây ra sự cố bảo mật. Các vấn đề phổ biến nhất là lỗi tràn bộ nhớ đệm, sử dụng sau khi đã xóa và lỗi [OBOE](https://vi.wikipedia.org/wiki/L%E1%BB%97i_Off-by-one). Android cung cấp một số công nghệ như ASLR và DEP làm giảm khả năng khai thác của những lỗi này, nhưng chúng không giải quyết được vấn đề cơ bản. Bạn có thể ngăn chặn những lỗ hổng này bằng cách xử lý cẩn thận các con trỏ và quản lý bộ nhớ đệm.

Các ngôn ngữ động, dựa trên chuỗi như JavaScript và SQL cũng có thể gặp phải các vấn đề xác thực đầu vào do các ký tự đặc biệt và script injection.

Nếu bạn đang sử dụng dữ liệu trong các truy vấn được gửi đến cơ sở dữ liệu SQL hoặc content provider, thì SQL injection có thể là một vấn đề. Cách bảo vệ tốt nhất là sử dụng các truy vấn được tham số hóa, như đã thảo luận trong phần trên về  content provider. Giới hạn quyền ở chế độ chỉ đọc hoặc chỉ ghi cũng có thể làm giảm khả năng gây hại liên quan đến SQL injection.

Nếu không thể sử dụng các tính năng bảo mật ở trên, bạn nên đảm bảo sử dụng các định dạng dữ liệu có cấu trúc tốt và xác minh rằng dữ liệu phù hợp với định dạng mong đợi. Mặc dù chặn các ký tự cụ thể hoặc thực hiện thay thế ký tự có thể là một chiến lược hiệu quả, nhưng các kỹ thuật này dễ xảy ra lỗi trong thực tế và nên tránh khi có thể.

### 2. Xử lý dữ liệu người dùng

Nói chung, cách tiếp cận tốt nhất để bảo mật dữ liệu người dùng là giảm thiểu việc sử dụng các API truy cập dữ liệu người dùng nhạy cảm. Nếu bạn có quyền truy cập vào dữ liệu người dùng và có thể tránh lưu trữ hoặc truyền dữ liệu đó, thì đừng lưu trữ hoặc truyền dữ liệu. Hãy xem xét liệu có cách nào mà logic ứng dụng của bạn có thể được triển khai bằng cách sử dụng dạng băm hoặc dạng không thể đảo ngược của dữ liệu hay không. Ví dụ: ứng dụng của bạn có thể sử dụng hàm băm của địa chỉ email làm khóa chính để tránh truyền hoặc lưu trữ địa chỉ email. Điều này làm giảm khả năng vô tình làm lộ dữ liệu và nó cũng làm giảm khả năng những kẻ tấn công cố gắng khai thác ứng dụng của bạn.

Nếu ứng dụng của bạn truy cập thông tin cá nhân như mật khẩu hoặc tên người dùng, hãy nhớ rằng một số khu vực pháp lý có thể yêu cầu bạn cung cấp chính sách bảo mật giải thích việc bạn sử dụng và lưu trữ dữ liệu đó. Tuân theo thực tiễn tốt nhất về bảo mật là giảm thiểu quyền truy cập vào dữ liệu người dùng cũng có thể đơn giản hóa việc tuân thủ.

Bạn cũng nên xem xét liệu ứng dụng của mình có thể vô tình tiết lộ thông tin cá nhân cho các bên khác, chẳng hạn như các thành phần của bên thứ ba để quảng cáo hoặc các dịch vụ của bên thứ ba được ứng dụng của bạn sử dụng hay không. Nếu bạn không biết tại sao một thành phần hoặc dịch vụ yêu cầu thông tin cá nhân, đừng cung cấp thông tin đó. Nói chung, giảm quyền truy cập vào thông tin cá nhân của ứng dụng của bạn sẽ giảm khả năng xảy ra các vấn đề trong lĩnh vực này.

Nếu ứng dụng của bạn yêu cầu quyền truy cập vào dữ liệu nhạy cảm, hãy đánh giá xem bạn có cần truyền dữ liệu đó đến máy chủ hay bạn có thể chạy hoạt động trên máy khách. Cân nhắc chạy bất kỳ mã nào sử dụng dữ liệu nhạy cảm trên máy khách để tránh truyền dữ liệu người dùng. Ngoài ra, hãy đảm bảo rằng bạn không vô tình để lộ dữ liệu người dùng cho các ứng dụng khác trên thiết bị thông qua quyền truy cập quá mức cho phép của các IPC , tệp có thể ghi trên storage hoặc network socket. Quyền truy cập quá mức cho phép của các IPC là một trường hợp đặc biệt của việc rò rỉ dữ liệu được bảo vệ bằng quyền, được thảo luận trong phần [Requesting Permissions](https://developer.android.google.cn/training/articles/security-tips#RequestingPermissions).

Nếu cần có GUID, hãy tạo một số lớn, duy nhất và lưu trữ nó. Không sử dụng số nhận dạng điện thoại như số điện thoại hoặc IMEI, có thể được liên kết với thông tin cá nhân. Chủ đề này được thảo luận chi tiết hơn trong [Android Developer Blog](http://android-developers.blogspot.com/2011/03/identifying-app-installations.html).

Hãy cẩn thận khi ghi log trên thiết bị. Trong Android, log là tài nguyên được chia sẻ và có sẵn cho ứng dụng có quyền READ_LOGS. Mặc dù dữ liệu nhật ký điện thoại là tạm thời và bị xóa khi khởi động lại, việc ghi thông tin người dùng không phù hợp có thể vô tình làm rò rỉ dữ liệu người dùng sang các ứng dụng khác. Ngoài việc không ghi lại log PII, ứng dụng nên hạn chế việc sử dụng log. Để dễ dàng thực hiện điều này, hãy sử dụng flag debug và các class Log tùy chình cho phù hợp.

### 3. WebView và những lưu ý khi sử dụng

Vì WebView sử dụng nội dung web có thể bao gồm HTML và JavaScript, việc sử dụng không đúng cách có thể gây ra các vấn đề bảo mật web phổ biến như JavaScript injection. Android bao gồm một số cơ chế để giảm phạm vi của những vấn đề tiềm ẩn này bằng cách giới hạn khả năng của WebView ở chức năng tối thiểu mà ứng dụng của bạn yêu cầu.

Nếu ứng dụng của bạn không trực tiếp sử dụng JavaScript trong WebView, không gọi function **setJavaScriptEnabled()**. Hãy xóa lệnh gọi phương thức đó nếu không cần thiết. Theo mặc định, WebView không thực thi JavaScript, do đó, không thể tạo tập lệnh giữa các trang web.

Sử dụng **addJavaScriptInterface()** một cách đặc biệt cẩn thận vì nó cho phép JavaScript gọi các function dành riêng cho ứng dụng Android. Nếu bạn sử dụng nó, hãy chỉ gọi **addJavaScriptInterface()** với các trang web mà từ đó tất cả thông tin đầu vào đều đáng tin cậy. Nếu đầu vào không đáng tin cậy được cho phép, JavaScript không đáng tin cậy có thể gọi các phương thức trong ứng dụng của bạn.

Nếu ứng dụng của bạn truy cập dữ liệu nhạy cảm bằng WebView, bạn có thể muốn sử dụng phương thức **clearCache()** để xóa bất kỳ tệp nào được lưu trữ cục bộ. Bạn cũng có thể sử dụng các **headers ở phía máy chủ**, chẳng hạn như **no-cache** để chỉ ra rằng một ứng dụng không nên lưu nội dung cụ thể vào bộ nhớ cache.

Chú ý rằng các thiết bị chạy nền tảng cũ hơn Android 4.4 sử dụng phiên bản webkit có một số vấn đề về bảo mật. Một giải pháp khác là nếu ứng dụng của bạn đang chạy trên các thiết bị này, ứng dụng phải xác nhận rằng các đối tượng WebView chỉ hiển thị nội dung đáng tin cậy.

Bên trên là những tip hữu dụng cho bạn sử dụng trong quá trình làm việc với Android nhằm tránh nhưng lỗi liên quan tới bảo mật. Phần cuối của chuỗi bài này sẽ được trình bày ở bài kế tiếp liên quan tới các phần sau:
1. Sử dụng mật mã
2. Giao tiếp giữa các tiến trình
3. Bảo mật trong native code