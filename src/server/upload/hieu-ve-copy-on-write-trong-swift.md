Trong Swift, ta có kiểu reference type (Class) và value type (Struct, Tuble, enum). Kiểu value type có bản chất là copy. Có nghĩa là nếu bạn gán một value type cho một biến hoặc pass nó như một parameter của function (không phải inout), dữ liệu của value type này sẽ được copy. Lúc này, bạn sẽ có 2 value type có nội dung giống nhau nhưng có 2 địa chỉ bộ nhớ riêng biệt.
Hôm nay chúng ta sẽ nói về Copy-on-Write (CoW), một thứ rất quan trọng để hiểu về cách quản lý bộ nhớ value type của Swift

# **Copy-on-Write là gì?**

Trong Swift, khi bạn có một lượng lớn các value type và gán hoặc truyền chúng qua các function, việc copy rất tốn kém về mặt hiệu năng vì bạn sẽ phải copy tất cả dữ liệu sang một vị trí khác trong bộ nhớ.
Để giảm thiểu vấn đề này, thư viện chuẩn của Swift đã cài đặt một cơ chế cho một số loại value type như Array, khi mà giá trị chỉ được copy khi chúng bị thay đổi, thậm chí là chỉ khi có hơn một tham chiếu đến nó (bởi nếu giá trị có một tham chiếu duy nhất, nó không cần phải copy nữa, khi đó, nó chỉ cần thay đổi trên tham chiếu thôi). Khi đó, nếu chỉ gán hoặc truyền một Array qua function, sẽ không cần phải copy và sẽ cải thiện được hiệu năng

**Một lưu ý quan trọng là …**

Copy-on-Write không phải là cách làm việc mặc định của value type, nó chỉ được cài đặt cho một số loại dữ liệu cụ thể trong Swift Standard Library như Array và Collection mà thôi. Điều này có nghĩa là không phải mọi value type trong Swift Standard Library điều có CoW. Đương nhiên là các value type bạn tự tạo cũng sẽ không có nó, trừ khi bạn tự mình cài đặt chúng (sẽ được đề cập ở phần sau)

Giờ hãy xem nó hoạt động thế nào qua ví dụ sau:
![](https://images.viblo.asia/d311990e-d441-46f9-a0dc-1a11e9af5f47.png)

Đây là cách đơn giản cho thấy cách mà Copy-on-Write hoạt động. Khởi tạo array1 với giá trị, sau đó gán cho array2. Khi đó, khi array2 chưa có sự thay đổi, ta có thể thấy nó chưa hề được copy, địa chỉ của array2 vẫn giống với array1. Sau khi thay đổi array2, ta thấy địa chỉ của nó đã bị thay đổi.


# **Cài đặt Copy-on-Write cho custom value type**
Bạn có thể tự cài đặt CoW cho value type của mình. Ví dụ dưới đây có thể tìm thấy ở [OptimizationTips.rst](https://github.com/apple/swift/blob/master/docs/OptimizationTips.rst)  của  [Swift main](https://github.com/apple/swift) repo.

{@embed: https://gist.github.com/LucianoPAlmeida/e816b444834232506bad0078b4be0ad3}

Đây là đoạn code mới chỉ ra cách dùng một reference type để cài đặt CoW cho một value type T bất kỳ. Về cơ bản, đây là một wrapper quản lý reference type và chỉ trả về một instance mới khi giá trị không có tham chiếu độc nhất. Mặt khác, nó chỉ thay đổi giá trị của reference type

# **Kết luận**
Copy-on-Write là một phương pháp thông minh để tối ưu việc copy của value type và là một cơ chế được dùng rất nhiều trong Swift, cho dù chúng ta hầu như không thể nhìn thấy nó vì nó đã được cài đặt trong Standard Library. Nhưng chắc chắn vẫn tốt khi ta có thể biết và có thể áp dụng nó vào code hàng ngày để nâng cao được hiệu năng của ứng dụng.