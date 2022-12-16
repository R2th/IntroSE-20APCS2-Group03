Trong bài viết này, mình sẽ giới thiệu về **CustomStringConvertible** protocol trong Swift. Chúng ta sẽ cùng tìm hiểu qua ví dụ trong playground của Xcode.
# Bắt đầu
Chúng ta sẽ tạo ra 2 class là Person và Book
![](https://images.viblo.asia/e5fb81c1-f3c9-4af8-bc17-55ce1cf33884.png)
![](https://images.viblo.asia/e4e35aa5-6019-40b5-b075-03c1e163811b.png)

Bây giờ sẽ khởi tạo 1 đối tượng Book và in thử nó ra xem
![](https://images.viblo.asia/358e2f6f-8a03-4fc9-b1f1-9feece5c63f7.png)

Chúng ta sẽ nghĩ nó sẽ in ra 1 đối tượng book với rất nhiều thông tin cụ thể như ta vừa khởi tạo, nhưng đây là kết quả
![](https://images.viblo.asia/098bef41-046a-4a29-9f1d-839c735aafcd.png)

Vậy nếu chúng ta cần in ra các thông tin chi tiết về đối tượng book vừa khởi tạo để có thể đọc được, chúng ta cần phải sử dụng tới protocol CustomStringConvertible
# CustomStringConvertible
Gắn protocol CustomStringConvertible cho class Person
![](https://images.viblo.asia/e2af0ff3-5df0-4de4-8d20-1ff8ac474904.png)

Thuộc tính description là bắt buộc và phần return sẽ là phần được in ra trong console khi sử dụng print()
![](https://images.viblo.asia/ea7fa30e-a558-426f-b312-b2a2614d71e9.png)

Lúc này chúng ta có thể thấy được các thuộc tính của đối tượng authors như mong muốn.
Làm tương tự với class Book
![](https://images.viblo.asia/453ded1a-bc4f-4f60-ad52-603f147d6139.png)

Cuối cùng khi in ra đối tượng book ta sẽ được kết quả
![](https://images.viblo.asia/8edbd5f0-e6cf-4530-9296-4e21dd8d07a5.png)

Với việc sử dụng CustomStringConvertible sẽ giúp ích rất nhiều cho chúng ta trong việc code và debug, đây là một thuộc tính khá hay của Swift

Cuối cùng bạn có thể tìm hiểu kỹ hơn trên tài liệu chính thức của apple tại [đây](https://developer.apple.com/documentation/swift/customstringconvertible)

Tài liệu tham khảo tại [đây](https://medium.com/better-programming/what-is-the-customstringconvertible-protocol-in-swift-4b7ddbc5785b)