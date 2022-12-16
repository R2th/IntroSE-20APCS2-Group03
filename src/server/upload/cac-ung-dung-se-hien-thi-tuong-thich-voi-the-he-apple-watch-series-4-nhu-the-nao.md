# Mở đầu
Trong bài viết trước đây tôi đã trình bày về cách mà [các ứng dụng iOS hiển thị như thế nào trên thế hệ iPhone mới nhất là XR và Xs Max như thế nào](https://viblo.asia/p/cac-ung-dung-ios-se-hien-thi-tuong-thich-voi-the-he-iphone-moi-la-xr-va-xs-max-nhu-the-nao-Ljy5VLbbZra). Để nối tiếp chủ đề này, tiếp theo đây tôi sẽ trình bày về cách mà một ứng dụng watchOS sẽ hiển thị như thế nào trên Apple Watch series 4.

Trong sự kiện WWDC tháng Chín 2018, cùng với việc ra mắt iPhone, iPad với thiết kế mới, Apple cũng cho ra mắt thế hệ watch mới với tên gọi Apple Watch Series 4, lần đầu tiên thiết kế màn hình của một chiếc AW được thay đổi từ lần đầu ra mắt là năm 2015.

Và bây giờ đây, lập trình viên  khi phát triển ứng dụng cần quan tâm đến bốn kích thước màn hình của AW:

* 38mm: 136×170 point (272×340 pixels)
* 42mm: 156×195 point (312×390 pixels)
* 40mm: 162×197 point (324×394 pixels)
* 44mm: 184×224 point (368×448 pixels)

Các ứng dụng AW có phần hiển thị nhỏ hơn so với iOS cộng thêm với việc màn hình với kích thước mới sẽ gây ra một số vấn đề. Trên các thiết bị AW mới với màn hình tràn viền, các cạnh được bo tròn vì thế phần hiển thị của status bar sẽ bị ảnh hưởng, tương tự đối với cạnh dưới cùng. Chúng ta hãy cùng xem Apple xử lý như thế nào nhé:

# Với Apple watch 38mm and 42mm
Đối chiếu với các thiết bị AW thế hệ trước (38mm và 42mm), sau đây là cách màn ứng dụng được build bằng Xcode 9/watchOS 4 hiển thị trên 38mm và 42mm Apple Watch:

![](https://images.viblo.asia/c6c8b54c-5163-4ffb-844a-7e7cb9fd5006.jpeg)https://images.viblo.asia/c6c8b54c-5163-4ffb-844a-7e7cb9fd5006.jpeg
*Ứng dụng build bằng Xcode 9/ watchOS 4 chạy trên Simulator Apple Watch 38mm và 42mm chạy watchOS 5*

Thanh status bar chiếm 19 points (tương đương với 38 pixels) và 21 points (tương đương với 42 pixels) lần lượt ứng với các màn hình thiết bị 38mm và 42mm.

# Xcode 9 / watchOS 4

Các ứng dụng được xây dựng bằng Xcode 9 (các ứng dụng làm ra tương thích với watchOS 4), khi mà Apple watch series 4 (40mm và 44 mm) chưa được ra đời, vì vậy cách hiển thị của chúng trên màn hình của các thiết bị này đơn giản chỉ là được phóng to lên để lấp đầy màn hình, vì thế nó chỉ hiển thị tương đương với màn hình kích thước 38mm và 42mm. Vì thế, tương tự như màn hnihf 38mm và 42mm, chiều cao của status bar vẫn là 19 và 21 points.

![](https://images.viblo.asia/52dc5859-8a90-4417-bf7f-91e9ab1e4a55.jpeg)
*Ứng dụng build bằng Xcode 9/ watchOS 4 chạy trên Simulator Apple Watch 40mm và 44mm chạy watchOS 5*

Nhìn bằng mắt thường, với màn hình OLED deep black sẽ khá là khó để phát hiện, nhưng về cơ bản ứng dụng sẽ được hiển thị trên màn hình dưới dạng hình nhữ nhật truyền thống (không tràn viền) như sau:

![](https://images.viblo.asia/cff57bcc-364b-4cd9-9736-c3fcc977d483.jpeg)
*Ứng dụng build bằng Xcode 9/ watchOS 4 chạy trên Simulator Apple Watch 40mm và 44mm chạy watchOS 5*

# Xcode 10 / watchOS 5

Khi cùng là ứng dụng này được build trên Xcode 10 watchOS 5 , nó sẽ được hiển thị một cách tự nhiên nhất, đúng với bản chất của màn hình 40mm và 44mm.

![](https://images.viblo.asia/9790ef70-3c09-450f-9908-56309ea7f256.jpeg)
*Ứng dụng build bằng Xcode 10/ watchOS 5 chạy trên Simulator Apple Watch 40mm và 44mm chạy watchOS 5*

Status bar giờ đã có độ cao 28 point (56 pixeks) và 31 points (62 pixels) tương ứng trên AW 40mm và 44mm. Do bốn góc của AW hiện đã bo tròn, nên Apple luôn khuyến khích các lập trình viên thiết kế ứng dụng AW với nền màu đen để hài hòa với màu sắc của thiết bị. Trong khôn khổ của bài viết này tôi cho ứng dụng của mình có nền màu trắng để chúng ta có thể nhìn thấy một cách rõ ràng hơn cách hiển thị của một app trên AW.

![](https://images.viblo.asia/d7b2275b-f7b5-4174-9258-bd9f076d9033.jpeg)
*Ứng dụng build bằng Xcode 10/ watchOS 5 chạy trên Simulator Apple Watch 40mm và 44mm chạy watchOS 5*

# Tổng kết
Đúng như dự đoán, Apple đã thiết kế Apple watch với kích thước 40mm và 44mm và watchÓ 5 có thể tự tương thích ngược với các ứng dụng được xây dựng trên Xcode 9, nơi mà thậm chí các thiết bị hiện tại còn chưa ra đời. 

Tuy nhiên, việc build lại ứng dụng trên Xcode 10 khiến cho ứng dụng tương thích một cách tuyệt đối với các màn hình mới, đem lại trải nghiệm tốt nhất cho người dùng.