85network-share! chào các bạn! ở bài trước chúng tôi đã giới thiệu cho các bạn về linux lí do nên sử dụng linux thay thế Windows cũng như các[ phân vùng hệ thống quá trình khởi động](https://85network-share.blogspot.com/2021/09/linux-phan-vung-o-ia-tren-he-thong.html). Linux yêu cầu một kiến thức nhỏ về kỹ thuật để sử dụng, cũng không quá cao siêu gì lắm đâu vì vậy các bạn cũng đừng quá lo lắng vì là mã nguồn mở nên có rất nhiều hướng dẫn cụ thể trên internet việc của bạn là chỉ cần lựa chọn phù hợp cho bạn thôi! Hôm nay cùng tôi tìm hiểu thêm về cách khôi phục dữ liệu trên linux và cả linux mint với công cụ Testdisk một công cụ cực hiểu ích theo  riêng cá nhân tôi đánh giá nhé!
1. Giới thiệu về công cụ Testdisk
![](https://images.viblo.asia/eadce44c-843b-4e02-a8b4-66d3501cc9e3.png)

TestDisk cái tên đã nói lên tất cả nó là phần mềm khôi phục dữ liệu miễn phí mạnh mẽ! Nó chủ yếu được thiết kế để giúp khôi phục các phân vùng bị mất và hoặc làm cho các đĩa không khởi động được có thể khởi động lại khi máy bạn đang bị lỗi không khởi động được do phần mềm bị lỗi gây ra: một số loại vi-rút hoặc lỗi của con người (chẳng hạn như vô tình xóa Bảng phân vùng).

TestDisk có các tính năng cơ bản và nâng cao cho người mới bắt đầu cũng như các chuyên gia, nó có thể thu thập thông tin chi tiết ổ đĩa hệ thống đang sử dụng sau đó cung cấp một cái nhìn tổng quát nhất cho người dùng phân tích Testdisk là công cụ khôi phục hữu ích nhất khi bạn đang cố gắng tìm một công cụ để tự sửa chửa tại nhà.
2. Cách cài đặt  và sử dụngTestDisk trên Linux Mint.

Bước 1: chạy lệnh testdisk trên terminnal để tạo một file testdisk.log để ghi lại thông tin quá trình chạy có 3 phương án để chọn lựa:

    Create: tạo mới file log.
    Appen: thêm tiếp thông tin vào lần chạy testdisk lần trướt.
    No log: không ghi lại các thông tin về quá trình chạy.

Bước 2: Chọn đĩa bạn cần khôi phục.

Sau khi chọn một trong ba phướng án trên thì testdisk hiện ra danh sách ổ lưu trữ được tìm thấy trên hệ thống Chọn ổ đĩa nơi file của chúng ta được lưu trữ, sau đó sử dụng các phím mũi tên phải và trái để điều hướng và chọn Proceed. Tiếp theo, nhấn nút ENTER

![](https://images.viblo.asia/d564b287-9b0b-4ee2-af4b-263f7f7426f3.png)

Bước 3: Chọng bảng phân vùng.

Trong bước này thì hệ thống sẽ tự động dự đoán và làm nổi bật sự lựa chọn bảng phân vùng tốt nhất đối với ổ đĩa của chúng ta. nhấn ENTER để tiếp tục
chon phân vùng
![](https://images.viblo.asia/a9241d64-7897-4c1a-9875-3eda521707f5.png)

Sau khi chỉ định đúng ổ đĩa và loại phân vùng, cửa sổ màn hình tiếp theo sẽ hiển thị danh sách các tùy chọn khôi phục. Chúng ta có thể chọn một trong các tùy chọn màn hình phù hợp với như cầu. Trong ví dụ này chúng ta cần khôi phục một tệp đã bị xóa do đó chúng ta thực hiện chọn tùy chọn Advance.
![](https://images.viblo.asia/dbfa1573-23b7-48a5-902b-5706a123d185.png)

Bước 4: kiểm tra thư mục nguồn đã xóa
![](https://images.viblo.asia/b71e3ce3-e5f9-4d25-95af-71467e3cb026.png)

Khi chúng ta chọn tùy chọn Undelete thì tiện ích TestDisk hiển thị các thư mục hệ thống cho tất cả các phân vùng, chúng ta cần di chuyển đến thư mục cụ thể nơi chứa các file mà chúng ta đã xóa.

Bước 5: khôi phục file đã xóa
![](https://images.viblo.asia/dfcd5894-d139-46a7-8379-7ce820fa36e9.png)

Khi đã tìm thấy file bị mất của chúng ta trong danh sách. Chúng ta di chuyển xuống các file cần khôi phục. Trong ví dụ này chúng ta sẽ sao chép các file bằng cách bấm phím "c" trên bàn phím. 
![](https://images.viblo.asia/9583fc42-f337-4a37-85a4-f038330d0d82.png)


File này sẽ được khôi phục đến vị trí chúng ta sẽ chỉ định. Ngay sau khi ấn phím "c" thì tiện ích TestDisk sẽ hiển thị màn hình sau để chúng ta có thể chỉ định nơi khôi phục file
![](https://images.viblo.asia/7737b715-3836-4b82-98e6-c3b5197af81c.png)

Chúng ta nhận đươc thông báo sao chép thành công như trên.

Để thoát khỏi các bạn cứ nhấn quit rồi enter hoặc cứ nhấn phím q nhé

Qua bài này chúng ta đã hướng dẫn bạn khôi phục dữ liệu đã xóa trên linux mint, trên ubuntu bạn cũng làm tương tự nhé! Chúc các bạn thành công.

85network-share kiến thức như ngọn lửa càng chia sẻ càng bùng cháy!