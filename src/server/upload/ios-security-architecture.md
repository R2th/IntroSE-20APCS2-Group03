iOS là một trong những hệ điều hành phổ biến nhất hiện này. Một trong số những đặc điểm ưu việt thường được nhắc tới của hệ điều hành này là tính bảo mật (hay nói đúng hơn là ít các vụ tấn công bảo mật xảy ra). Vậy để có được đặc điểm tuyệt vời này thì iOS đã ứng dụng những gì trong hệ điều hành của mình? Trong bài này mình sẽ giúp các bạn khái quát các ứng dụng chính được áp dụng cho cấu trúc bảo mật của hệ điều hành này nhé

## I. Mô hình cấu trúc bảo mật của iOS
![](https://images.viblo.asia/0874f060-6cf7-46f3-893a-3b4c50b9b61e.jpg)

Như từ hình trên có thể thấy, mỗi app sẽ được chạy trong một sandbox riêng của mình. Trong đó có một lớp bảo mật dữ liệu (Data protection class). Các sandbox này sẽ nằng trong phân vùng của người dùng. Các dữ liệu trong vùng này sẽ được áp dụng các thuật toán mã hoá của iOS. Phân vùng này là một phần của file system bên cạnh phân vùng hệ điều hành. Ngoài ra, việc bảo mật phần cứng và firmware của iOS cũng rất được chú trọng. Như việc sử dụng các secure enclave và secure element trong kernel, các crypto engine - thứ duy nhất truy cập được tới các khoá mã hoá của hệ thống. Cùng với đó, ở sâu nhất của hệ thống sẽ là các khoá thiết bị và khoá group sẽ nói tới ở phần sau cùng chứng chỉ root của Apple (Apple Root Certificate).

## II. Bảo mật phần cứng
Như đã nói ở phần trên, mỗi thiết bị iOS sẽ có 2 key mã hoá AES-256 bits built-in là ID của  thiết bị  (UID) và ID của nhóm thiết bị (GID). Hai key ID này sẽ được đính vào trong Application Processor (AP) và  Secure Enclave Processor (SEP)  ngay từ quá trình sản xuất. Các khoá này **chỉ có thể đọc** từ các  crypto engine.

GID là giá trị được chia sẽ giữa các bộ xử lý của cùng một lớp thiết bị, dùng để chống làm giả các file firmware cũng như ngăn các tác vụ mã hoá khác truy cập tới các thông tin của người dùng. Trong khi đó UID là giá trị độc nhất cho từng thiết bị, dùng để bảo vệ hệ thống key trong mã hoá các tệp tin hệ thống ở cấp độ thiết bị. Giá trị UID không được ghi lại trong quá trình sản xuất nên Apple cũng không thể recover lại được. (Đó là theo như Apple nói vậy).

## III. Secure Boot
Đầu tiên khi khởi động hệ thống iOS, hệ thống sẽ gọi tới *Boot ROM*, nơi chứa các đoạn code không thể sửa được cũng như là Apply CA (Được gắn trong 1 silicon chip). Tiếp theo, nếu kiểm tra chữ kí (signature) của *Low Level Bootloader (LLB)* đúng, đến lượt LLB kiểm tra chữ kí  của *iBoot bootloader*. Nếu chính xác, công việc tiếp theo sẽ chuyển tới cho iOS kernel. Nếu như thất bại tại 1 bước nào đó, quá trình khởi động sẽ ngay lập tức bị huỷ và chuyển qua *revorery mode*, nơi có dòng chữ "Connects to iTunes". Tuy nhiên, nếu như không khởi động được Boot ROM, nỗ lực cuối cùng của hệ thống sẽ là gọi tới *Device Firmware Upgrade (DFU)* để khởi tạo lại trạng thái nguyên thuỷ của hệ thống.

Quá trình trên gọi là *Secure Boot Chain* với sự tham gia của kernel, kernel extensions, bootloader và baseband firmware. Mục đích của nó là đảm bảo tính toàn vẹn của quá trình khởi động, chắc chắn hệ thống và các thành phần được viết và phân phối bởi Apple.

## IV. Code Signing

Apple đã triển khai một hệ thống DRM phức tạp với 1 mục đích duy nhất là chỉ các thiết bị được kí bởi Apple mới có quyền chạy trên thiết bị của Apple. Mục đích của việc này là để cho người dùng chỉ có thể cài đặt ứng dụng thông qua Apple app store. Có thể nói không ngoa rằng iOS chính là một nhà tù pha lê tráng lệ của người dùng hệ thống này.

Ngoài ra, các lập trình viên có chứng chỉ của Apple có thể chạy được ứng dụng. Các developer sẽ phải tham gia một chương trình đào tạo developer của Apple và phải trả phí hàng năm cho việc này. Ngoài ra cũng có các tài khoản miễn phí cho phép compile và deploy ứng dụng, tuy nhiên không được up lên App Store. Trên các thiết bị đã jailbreak, các ứng dụng còn có thể được cài đặt thông qua sideloading. (Chi tiết có thể xem tại bài viết của mình tại [đây](https://viblo.asia/p/cai-dat-ios-app-thong-qua-sideloading-1Je5EnJLKnL))

## V. Mã hoá và bảo vệ dữ liệu

Apple sử dụng một thuật toán gọi là Fairplay Code Encrypting. Về cơ bản, nó được phát triển như một DRM cho các nội dung đa phương tiện được thanh toán qua iTunes. Ban đầu nó được ứng dụng cho các luồng MPEG và QuickTime, tuy nhiên cũng có thể sử dụng cho các file thực thi. Nguyên lý cơ bản sẽ như thế này: Khi người dùng đăng kí một Apple ID, Apple sẽ tạo ra một bộ public/private key, trong đó private key được lưu an toàn tại thiết bị của người dùng. Khi người dùng tải một ứng dụng về, nó sẽ được mã hoá bằng public key và giải mã trên memory khi chạy RAM). Vì private key lưu trên máy người dùng, chỉ có thiết bị liên kết với tài khoản mới có quyền chạy ứng dụng.

Apple sử dụng mã hoá trên phần cứng và firmware ngay từ những đời 3GS. Mỗi thiết bị đều có mã hoá  phần cứng dựa trên các thuật toán AES-256 và SHA1. Thêm nữa, mỗi thiết bị sẽ có 1 UID gắn trên Application Processor (AP). UID này không được lưu tại bất cứ đâu khác và không thể truy cập tới (ngoại trừ các engine mã hoá).

## VI. Sandbox

Sandbox là một tính năng cốt lõi của iOS security. Nó đảm bảo rằng các ứng dụng sẽ chạy với quyền `mobile` và chỉ rất ít ứng dụng có thể chạy với quyền `root`. Một ứng dụng sẽ nằm trong 1 containers, thứ quy định nó chỉ có quyền truy cập tới file mà nó sở hữu cũng như một vài API nhất định. Việc truy cập tới các tài nguyên như file, network socket, IPC hay shared memory sẽ bị kiểm soát bởi sandbox. Cơ chế như sau:

- Ứng dụng chỉ được chạy tại thư mục mà nó được cấp (`(/private)/var/containers/Bundle/Application`) thông qua một chroot-like process.
- Các syscall `mmap` và  `mprotect` được sửa đổi đôi chút nhằm ngăn chặn ứng dụng cố gắng tạo ra các vùng thực thi trên bộ nhớ cũng như dừng các tiến trình  được sinh ra từ source code.
- Tất cả các tiến trình độc lập với nhau.
- Không thể trực tiếp truy cập tới các  driver phần cứng mà phải thông qua framework của Apple.

## VII. Các cơ chế hạn chế chung khác
iOS cũng sử dụng thêm address space layout randomization (ASLR) và eXecute Never (XN) để hạn chế các tấn công thực thi code.

ASLR sẽ sinh ra các địa chỉ ngẫu nhiên cho các file thực thi, dữ liệu, heap và stack mỗi lần thực thi. Vì các thư viện cần truy cập từ nhiều tiến trình nên địa chỉ sẽ được sinh ngẫu nhiên khi khởi động thiết bị. Việc này sẽ khiến địa chỉ của các tiến trình rất khó đoán, hạn chế các tấn công thực thi cũng như các tấn công return-to-lib.

XN là một cơ chế để đánh dấu một vùng nào đó trên memory là không thể thực thi. Trong iOS, heap và stack của các tiến trình người dùng sẽ được đánh dấu này. Các trang được gắn nhãn writable thì không thể gắn executable tại cùng thời điểm. Điều này giúp hạn chế việc chạy các đoạn mã máy trên heap và stack.

## Tổng kết
Trên đây là những trình bày vắn tắt về các cơ chế bảo mật của một hệ thống iOS. Có thể nói Apple đã áp dụng rất nhiều các giải pháp nhằm đảm bảo an toàn cho hệ thống và người dùng của họ. Tuy nhiên, hệ thống nào cũng có các lỗ hổng của riêng mình và Apple cũng luôn chào đón các phát hiện của cộng đồng cho các lỗ hổng của iOS để kịp thời khắc phục và hoàn thiện hơn. Nếu tình cờ một ngày bạn phát hiện ra trong các cơ chế bảo mật này có lỗ hổng thì đừng ngần ngại gì mà report nó lại cho Apple nhé.