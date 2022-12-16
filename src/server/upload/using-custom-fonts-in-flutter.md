Hệ thống fonts chữ trong SDK rất đa dạng và phong phú, tuy vậy nó chưa bao giờ là đủ với nhu cầu người dùng. Vì vậy, hôm nay mình sẽ giới thiệu với các bạn cách sử dụng `Custom fonts` trong Flutter. Nội dung gồm 4 phần:
1. Cách import fonts
2. Khai báo fonts trong `pubspec.yaml`
3. Thiếp lập fonts cho toàn bộ app
4. Thiếp lập fonts cho Widget xác định

![](https://images.viblo.asia/69b6b10e-a9d5-431f-8a6c-385ad47145ce.png)

### 1. Cách import fonts
Bạn cần chuẩn bị 1 fonts nào đó dạng .ttf để import. Ở đây mình sử dụng font [DancingScript.ttf](https://www.1001fonts.com/dancing-script-font.html)
![](https://images.viblo.asia/6e8b1f78-05e8-42de-873b-b6f8843dd6ea.png)

Tại thư mục root của project bạn tạo 1 folder để chứa các file fonts này. Các bạn có thể tự tạo hoặc làm theo mình nha, thư mục có đường dẫn
> assets/fonts

![](https://images.viblo.asia/068e442c-efc5-4d87-b278-9680e038df50.png)
Sau khi tạo vào copy font vào thư mục thì bước 1 hoàn thành.

### 2. Khai báo pubspec.yaml
Bước này bạn cần khai báo font trong file pubspec.yaml để Flutter có thể hiểu được bạn sẽ dùng font này. Cú pháp như sau:

![](https://images.viblo.asia/ad011caf-7ba6-47b5-9716-f453bb92a8ec.png)

Giải thích 1 chút về đoạng lệnh trên nhé

* Từ khóa `family` để định danh tên font, chính là tên để bạn gọi khi khai báo thuộc tính `fontFamily` của `TextStyle`
* Từ khóa `asset` để xác định đường dẫn tương đối của thư mục chứa font so với thư mục chứa file `pubspec.yaml`
* 1 font có thể tham chiếu đến nhiều file với nhiều weight và style khác nhau
    * `weight` dùng để xác định độ dày net chữ font, giá trị này được dùng để xác định giá trị cho thuộc tính `fontWeight` trong `TextStyle`, Nó nhận giá trị là 100, 200, 300, ...900
    * `style` dùng để xác định các biến thể của font, giá trị này được dùng để xác định giá trị cho thuộc tính `fontStyle` trong `TextStyle`. Nó có 2 giá trị là `normal` và `italic`

### 3. Thiết lập font cho toàn bộ app
Có 2 lựa chọn để áp dụng font: cho toàn bộ app hoặc cho 1 widget xác định.

Để thiết lập font chung cho toàn bộ app, khai báo thuộc tính `fontFamily` của object `ThemeData` trong thẻ `theme`. Như đã nói ở phần 2, giá trị của `fontFamily` phải khớp với giá trị của từ khóa `family` đã khi báo trong file `pubspec.yaml`

![](https://images.viblo.asia/b51bf110-5ba5-4135-b10d-5c662c7fa336.png)

### 4. Thiết lập font cho Widget xác định
Nếu bạn chỉ muốn áp dụng font cho 1 widget nào đó, mà không phải cho toàn bộ app, ví dụ cho `Text` chẳng hạn. Bạn cần thiết lập TextStyle cho nó, trong đó bạn khai báo thuộc tính fontFamily tương tự như fontFamily của ThemeData ở trên. Và giá trị của thuộc tính này cũng phải khớp với giá trị của từ khóa `family` đã khi báo trong file `pubspec.yaml`

![](https://images.viblo.asia/ba6713aa-b58b-42e9-b343-1737b563ebc6.png)

![](https://images.viblo.asia/38e656fd-2b2e-4105-a61e-e77eee3448e4.png)

Nếu bạn còn băn khoăn với `TextStyle` thì hãy đọc [bài này](https://viblo.asia/p/text-and-textstyle-in-flutter-aWj53N6pl6m#_5-style-4) nhé.

Trên đây, mình đã hướng dẫn các bạn cách khai báo và sử dụng 1 custom font cho ứng dụng Flutter. Hy vọng nó hữu ích với bạn. Thanks all

Tài liệu tham khảo:
* [Flutter.dev](https://flutter.dev/)
* [Custom font Flutter](https://flutter.dev/docs/cookbook/design/fonts)