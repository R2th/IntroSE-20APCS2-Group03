![image.png](https://images.viblo.asia/f4177886-9939-4fd8-b378-0dc2bab67bcd.png)
Trong bài viết trước chúng ta đã biết một số thông tin thú vị về ngôn ngữ Dart. Từ bài này trở đi chúng ta mới thực sự bắt tay vào tìm hiểu những kiến thức về ngôn ngữ Dart và thực hành những ví dụ code cụ thể. Hãy bắt đầu viết ứng dụng đầu tiên của bạn nhé!

Bạn có thể xem thêm bài viết tại đây:[ series tự học ngôn ngữ Dart](https://200lab.io/blog/tu-hoc-ngon-dart-nhung-dieu-can-biet-truoc-khi-bat-dau/)

## 1. Hàm chính khởi chạy chương trình

Mỗi ứng dụng đều có một số hàm trong chương trình đóng vai trò như là hàm khởi chạy. Ngôn ngữ Dart cũng thế, hàm khởi chạy của nó chính là `main()`.

Có thể bạn chưa quen với tên hàm này, không sao cả! Từ bây giờ, chỉ cần nhớ rằng mỗi khi bạn khởi chạy một chương trình Dart, trình biên dịch sẽ tìm kiếm hàm `main()` và thực thi những dòng code được viết bên trong đó. Nếu không tìm thấy hàm `main() `bạn sẽ gặp lỗi và ứng dụng sẽ không chạy được.

Code mà bạn viết trong hàm `main()` sẽ được gói lại bởi dấu ngoặc móc (`{}`). Hãy xem syntax đơn giản này ở hình bên dưới.

![image.png](https://images.viblo.asia/9266d81f-8e39-4205-b771-e4fe5b308bd5.png)

Sau từ khóa `main` là bộ dấu ngoặc đơn (`()`) và sau dấu ngoặc đơn là một dấu ngoặc móc (`{`). Hãy viết code của bạn ở dòng tiếp theo. Khi kết thúc, hãy chèn dấu ngoặc móc (`}`) vào hàng phía dưới hàng code cuối cùng.

Insert code here là nơi mà bạn sẽ viết code cho những chức năng mà bạn muốn ứng dụng của mình thực hiện.

Hãy nhìn vào chương trình Hello Word nổi tiếng dưới đây. Một ứng dụng huyền thoại với những ai mới học một ngôn ngữ lập trình mới. Mục đích của ứng dụng đơn giản chỉ là in ra từ “Hello Word”.

```
main() {
  // Printing the text 'Hello World'
  print("Hello World");
}
```

Output: `Hello World`

### Phân tích code

Chúng ta đã đi qua hàm `main()`. Hãy chuyển đến dòng tiếp theo nhé.

### Câu lệnh Print

Ở đoạn code trên, chúng ta đã sử dụng câu lệnh Print. Câu lệnh đã in ra dòng chữ “Hello Word”. `print()` được sử dụng để hiển thị kết quả của code trên console. Nó tuân theo syntax này:

![image.png](https://images.viblo.asia/481abdce-b6cf-4920-9e6a-3495e6b1be12.png)

Vì Hello Word là dạng văn bản nên để in được ta cần đặt nó trong dấu ngoặc kép. Syntax để hiển thị văn bản như sau:

![image.png](https://images.viblo.asia/1eec8a2a-2897-447e-b095-c78d85cc6d48.png)

### Dấu chấm phẩy

Bạn có thể thấy rằng câu lệnh print sẽ kết thúc bằng dấu chấm phẩy.

```
print("Hello World");
```

Trong Dart, cũng như hầu hết các ngôn ngữ lập trình khác, mỗi câu lệnh đều phải kết thúc bằng dấu phẩy để chương trình có thể thực thi thành công. Bạn có thể thử bỏ đi dấu phẩy xem thử đúng không nhé!

### Nhận xét

Dòng code này của chương trình: `// Printing the text 'Hello World'` là một **nhận xét**. Mục đích của nhận xét đó là giúp cho các dev có thể đọc và hiểu các code mà người khác đã viết. Bên cạnh đó nó cũng cho phép bạn mô tả về dòng code của mình mà không hề ảnh hưởng đến những chức năng trong chương trình. Syntax chung của nó được tuân theo như hình dưới đây:

![image.png](https://images.viblo.asia/56904ff6-decf-4fa9-96f5-ee8757203123.png)

Bạn đơn giản chỉ cần gõ 2 dấu gạch chéo lên phía trước rồi viết những gì bạn muốn mô tả.

## 2. Lập trình điều lệnh (Imperative Programming)

Code bên trong hàm `main()` sẽ được thực thi lần lượt theo thứ tự. Hãy sửa đổi một chút trong đoạn mã trên và thử in **From Dart** cùng với **Hello World.**

```
main() {
  print("Hello World");
  print("From Dart");
}
```
Output:
```
Hello World
From Dart
```

Khi bạn thực hiện đoạn code ở trên, câu lệnh `print("Hello World")`; sẽ được thực thi trước sau đó mới tới câu lệnh `print("From Dart");`.

Kiểu lập trình này được gọi là lập trình điều lệnh. Về cơ bản, nó là một mô hình lập trình, trong đó bạn viết một tập hợp hướng dẫn được thực thi theo thứ tự. Lập trình điều lệnh không nhất thiết phải mô tả những gì chương trình phải hoàn thành, thay vào đó nó chỉ ra cách chương trình phải hoàn thành nó.

Vì vậy, trong trường hợp này, chúng ta đã tạo một chương trình trước và in ra văn bản **Hello World**, sau đó chuyển sang dòng tiếp theo và in văn bản **From Dart**.

## 3. Một chương trình tương tác đơn giản (Interactive Program)

Chương trình Hello World được viết ở phần trên chỉ đơn giản là hiển thị output. Nhưng trong nhiều trường hợp, chúng ta cần phải lấy input từ người dùng rồi in chúng lên console.

Hãy viết một ứng dụng với lời chào được cá nhân hóa hơn nhé! Chương trình sẽ hỏi người dùng tên của họ và sau đó hiển thị một lời chào với tên riêng cho mỗi người.

> Chương trình code trong bài viết này yêu cầu input từ người dùng để có thể in thành công.
*> Trước khi bạn nhấn nút RUN, bạn phải chọn nút  >STDIN. Nó sẽ cung cấp một input field nơi mà bạn có thể gõ input của mình vào.
> Sau khi bạn gõ input vào, nhấn nút RUN để thực thi chương trình.*

```
import 'dart:io';

main() {
   print("Hello " + stdin.readLineSync());
}
```

### Phân tích code

Những dòng code phía trên nhìn có vẻ hơi đáng sợ. Nhưng đừng lo quá nhé, chúng ta sẽ đi tìm hiểu từng dòng một.

### Thư viện

Dòng đầu tiên của đoạn code phía trên, chúng ta đã import thư viện `dart:io`

Trong lập trình máy tính, thư viện là một tập hợp những code tương tự mà bạn có thể tham khảo cho code của mình. Khi bạn import một thư viện, bạn có thể truy cập tất cả code trong thư viện đó.

Mỗi thư viện đều có một mục đích cụ thể. Thư viện `dart:io` cung cấp I/O (input/output) hỗ trợ cho các ứng dụng non-web. Chúng ta đã import `dart:io` vì chương trình mà chúng ta viết yêu cầu input từ người dùng.

### Đưa input vào Dart

Dart cung cấp nhiều phương pháp để bạn có thể lấy được những input bên ngoài từ người dùng, tùy thuộc vào kiểu input mà chương trình yêu cầu. Trong bài viết này, chúng ta sẽ sử dụng hàm `readLineSync()`  để đọc dòng code từ input.

Câu lệnh hoàn chỉnh sẽ là `stdin.readLineSync()`. stdin được viết tắt bởi chữ standard input, để trình biên dịch biết được vài loại input từ người dùng. `readLineSync()` là một built-in method mà chúng ta đã đề cập ở trên.

Dòng `print("Hello " + stdin.readLineSync());` nối chữ Hello với input được cung cấp bởi người dùng bằng dấu  (`+`) .

Vậy là bạn đã bắt đầu tiếp cận với ngôn ngữ Dart rồi. Hãy tiếp tục tìm hiểu về kiểu dữ liệu và biến trong bài viết tiếp theo nhé!