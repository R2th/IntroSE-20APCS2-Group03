Trong bài viết này sẽ giới thiệu các vấn đề sau:
- Xcode Memory Graph Debugger là gì?
- Làm thế nào để sử dụng nó và một vài tip hữu ích
- Ưu nhược điểm khi sử dụng

# Xcode Memory Graph Debugger là gì?

Đơn giản để hiểu, "Memory graph debugger" giúp chúng ta trả lời câu hỏi: **Tại sao một object vẫn tồn tại trong memory?**

Memory graph debugger giúp tìm và sửa các "retain cycles" và "memory leak". Khi được kích hoạt, nó tạm dừng thực thi ứng dụng và hiển thị các đối tượng hiện tại trên heap, cùng với các mối quan hệ của chúng và các tham chiếu nào đang giữ cho chúng tồn tại.

## Sử dụng như thế nào
Có 3 bước để xác định các "retain cycles" và "memory leaks":
## 1. Chọn các thuộc tính qua Xcode scheme editor

![](https://images.viblo.asia/285764a5-d393-4f64-ac2e-f318521355f3.png)

- Chọn thuộc tính "Malloc Scribble" ở mục Memory Management
- Chọn "Malloc Stack" và chọn "Live Allocations Only" ở mục Logging

Các thuộc tính này cho phép log lại các quá trình khởi tạo object một cách trực tiếp. So với mục "All Allocations" thì thuộc tính "Live Allcation Only" tốn ít tài nguyên hơn trong quá trình debug. Chúng ta chỉ cần phát hiện ra các "nơi" có hiện tượng retain cycles and memory leaks.

## 2. Chế độ graph debugging
Thực hiện bất kỳ hành động ứng dụng nào bạn muốn phân tích (hành động bạn nghi ngờ đang gây ra retain cycles và memory leaks) và vào chế độ  biểu đồ debug bộ nhớ bằng cách chọn thanh gỡ lỗi như hình:

![](https://images.viblo.asia/23abb7b8-abfb-403b-aa2a-15d06300c213.png)

## 3. Các thông số trong trình debug

Trình debug này sẽ tạm dừng các tiến trình xử lý của ứng dụng và hiển thị các mục như sau:

![](https://images.viblo.asia/3034b4a0-2f27-4dc8-80eb-4f3c2bc08f50.png)


- Phía bên trái là các Heap(**Heap Content**): Nơi chứa các object được sử dụng.
- Ở giữa sẽ hiện thị các mối liên hệ các tham chiếu tới object được chọn từ vùng Heap: Được gọi là **Object references**
- Sau khi chọn các references ở màn hình giữa sẽ hiển thị các thông tin bộ nhớ của đối tượng và các alloc phía bên: Đây là phần **Backtrace**

Phần thông báo memory leak sẽ được hiển thị như sau trong trình debug:

![](https://images.viblo.asia/6fd49edf-517d-4d6d-9316-dbe39c0e80ac.png)

# Một số mẹo giúp việc điều tra hiện tượng retain cycles và memory leaks hiệu quả hơn

## 1. Sử dụng chức năng filter
Chức năng filter giúp lọc ra các object bị memory leak ở phân vùng: **Heap Content**

![](https://images.viblo.asia/606c652c-04fe-4917-8be0-67e52a89e25d.png)

## 2. Tổng số leaks
Trình debug runtime sẽ giúp hiển thị tổng số các leaks đang xảy ra
 
 ![](https://images.viblo.asia/ab043421-c94e-4dd8-8c10-b8987897e2e0.png)


# Ưu và nhược điểm

**Ưu điểm**: Chúng ta có thể may mắn và dễ dàng tìm ra được các memory leaks(nhưng case retain cycles đơn giản). Ví dụ: Một object đang tự lưu trữ chính nó trong một closure. Được phát hiện và fix một cách đơn giản bằng việc sử dụng weak references.

**Nhược điểm**: Gặp các trường hợp không phải retain cycles hoặc leak. Ví dụ — Khi chúng ta khởi tạo một UIButton object và thêm nó vào một UIToolBars item array: chúng ta sẽ thấy nó được xác định là memory leaks nhưng lại không biết tại sao ?? :D ??

-----

Mọi người có thể tham khảo thêm các tính năng có thể dùng ở đây:

- https://developer.apple.com/videos/play/wwdc2016/410/
- https://developer.apple.com/library/content/documentation/DeveloperTools/Conceptual/debugging_with_xcode/chapters/special_debugging_workflows.html#//apple_ref/doc/uid/TP40015022-CH9-DontLinkElementID_1
- https://useyourloaf.com/blog/xcode-visual-memory-debugger/