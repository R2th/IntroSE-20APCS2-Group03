![](https://images.viblo.asia/42d1db4c-cbe9-4f0e-8eed-9644488106d9.png)

Trong phát triển đa nền tảng hiện nay chúng ta đang có nhiều tùy chọn như Flutter, React Native và bây giờ là Kotlin Multiplatform Mobile. Bây giờ mối quan tâm là chúng ta phải chọn công nghệ nào trong số chúng.

Hãy để chúng tôi so sánh các công nghệ này trên nhiều cơ sở khác nhau.

# UI

Trong trường hợp UI flutter sử dụng canvas từ native SDK của nền tảng khác nhau và draw (vẽ) UI component (thành phần giao diện người dùng)  trên canvas đó bằng cách sử dụng các đặc điểm thiết kế Material design. React Native sử dụng các thành native được ánh xạ tới mã js. Và trong KMM (Kotlin Multiplatform Mobile ), ta phải viết mã giao diện người dùng riêng cho Android và IOS.

![](https://images.viblo.asia/64900508-ddd8-4a55-a1ec-9eb22ce18189.png)

# Business Logic

Trong flutter,react native và KMM và logic là dùng chung nhưng được viết bằng các ngôn ngữ khác nhau tương ứng là dart, js và kotlin.

# Layered Architecture (Kiến trúc phân lớp)

![](https://images.viblo.asia/6c75da30-76b9-4f41-8131-931d8f000cc6.png)

# Interoperability (khả năng tương tác)

Kotlin cũng có thể tương tác với java và các ngôn ngữ khác. Nhưng trong trường hợp của Flutter, chúng ta phải chỉ dùng Dart và React Native chúng ta chỉ phải dùng js.

# Easy to go Native (dễ sử dụng Native)

Trong KMM, rất dễ dàng để viết mã gốc ở bất kỳ cấp độ mã hóa nào và ở bất kỳ lớp nào của kiến trúc.

# Integration with existing Projects (Tích hợp với các dự án hiện có)

KMM có khả năng tích hợp với bất kỳ dự án hiện có nào nhưng trong Flutter hoặc React Native thì không.

# Kết luận

Các nhà phát triển native có thể chuyển sang KMM vì theo quan điểm của Android, Kotlin cùng ngôn ngữ mà họ đang sử dụng trong quá trình phát triển các ứng dụng Native. Nếu KMM được sử dụng bởi một nhà phát triển Android thì nhà phát triển IOS phải thực hiện một nhiệm vụ rất nhỏ, chỉ tạo giao diện người dùng của Ứng dụng và họ sẽ nhận được mã logic từ chia sẻ của KMM. 



Bài viết  tham khảo :

https://medium.com/47billion/flutter-vs-kotlin-multiplatform-mobile-kotlin-native-vs-react-native-47billion-3ef6a174049c