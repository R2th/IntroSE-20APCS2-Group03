### Giới thiệu

SF Symbols được giới thiệu trong triển lãm  WWDC 2019, đây thực sự là một món quà to lớn mà Apple dành tặng cho các nhà phát triển. Apple đã cung cấp các biểu tượng miễn phí để sử dụng trong ứng dụng, việc sử dụng chúng cũng rất đơn giản.

Với SF Symbols 2.0 được giới thiệu tại WWDC 2020 và 3.0 tại WWDC 2021, chúng ta có nhiều biểu tượng đẹp và hiển thị chúng trong ứng dụng của mình.

**Nào chúng ta cùng tìm hiểu nhé!**

### SF Symbols là gì?

SF Symbols là một tập hợp với hơn 3100 biểu tượng mà bạn có thể sử dụng trong ứng dụng , chúng được căn chỉnh về chiều rộng cũng như làm sao thích ứng với thiết kế của bạn. 

![](https://images.viblo.asia/7e9d7b9e-a58a-4b61-9ffd-ede783c76c2c.png)

###  Tuỳ chỉnh nâng cao màu sắc
 
 ![](https://images.viblo.asia/0175075f-4354-4243-ac8c-318127fe4da7.jpeg)

SF Symbols 3.0 giới thiệu tuỳ chọn để cấu hình các biểu tượng với chế độ render khác nhau, cung cấp khả năng kiểu soát màu tốt hơn cho các biểu tượng.
Tất nhiên không phải mọi biểu tượng đều hỗ trợ tuỳ chỉnh nâng cao, để biết chi tiết vui lòng kiểm tra phần khả dụng:

![](https://images.viblo.asia/d2076bfd-2e67-4569-9b90-2abbd8809988.png)


### Những nền tảng nào hỗ trợ  SF Symbols

Những nền tảng hỗ trợ SF Symbols như sau:
- iOS 13 trở lên
- watchOS 6 trở lên
- macOS 11 trở lên
- tvOS 13 trở lên

### Làm thế nào để lựa chọn các biểu tượng trong SF Symbols

Apple cung cấp ứng dụng SF Symbols cho phép bạn duyệt, sao chép và xuất bất kỳ biểu tượng nào có sẵn. 
Bạn có thể tải xuống ứng dụng tại: [](https://developer.apple.com/sf-symbols/) và có sẵn cho macOS 10.14 trở lên.

### Làm thế nào để sử dụng SF Symbols trong Swift

Bạn có thể dễ dàng sử dụng với đoạn code như sau:

```
let image = UIImage(systemName: "square.and.pencil")
```


Bạn cũng có thể dễ dàng thay đổi scale của Swift như sau:

```
let smallConfiguration = UIImage.SymbolConfiguration(scale: .small)
let smallSymbolImage = UIImage(systemName: "square.and.pencil", withConfiguration: smallConfiguration)
```


###  Kết luận

Với hơn 3000 biểu tượng sử dụng miễn phí trong ứng dụng, có thể nói Apple đã rất ưu ái khi giúp các nhà phát triển có thể sử dụng các ký hiệu SF để tạo ứng dụng gốc đẹp mắt. SF Symbols thật sự là một người bạn đồng hành tuyệt vời.


Nguồn: https://www.avanderlee.com/swift/sf-symbols-guide/
https://developer.apple.com/sf-symbols/