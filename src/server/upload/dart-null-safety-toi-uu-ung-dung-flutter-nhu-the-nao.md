![image.png](https://images.viblo.asia/92143d70-fcf7-4653-990a-d94846b12120.png)

Với sự ra mắt của Flutter 2, nhánh stable của Flutter đã chính thức có được một tính năng vô cùng quan trọng và được cộng đồng ngóng chờ bấy lâu: [Null Safety](https://medium.com/dartlang/announcing-dart-null-safety-beta-87610fee6730).

Bài viết này nói về trải nghiệm cá nhân của tôi khi chuyển các ứng dụng và package sang Null Safety, cùng với việc tạo ứng dụng mới với Null Safety ngay từ đầu. Và bạn biết đó, kết quả nó mang lại cho các sản phẩm của tôi là vô cùng tuyệt vời!

> Bạn có thể xem bài viết đầy đủ tại [200Lab Education](https://200lab.io/blog/toi-uu-app-flutter-voi-dart-null-safety/)

## 1. Migrate app và package sang Dart Null Safety

Khi lần đầu tiên tôi nâng cấp Flutter lên phiên bản 2.0 (phiên bản hỗ trợ Null Safety) và cập nhật phiên bản Dart SDK lên 2.12 trong tệp pubspec.yaml của ứng dụng Flutter, IDE đã cảnh báo tôi có rất nhiều lỗi trong project.

Ban đầu, tôi muốn thử làm tay để chuyển sang Null Safety (nghĩa là di chuyển mà không cần công cụ), vì vậy tôi bắt đầu giải quyết các lỗi Null Safety theo cách thủ công - thêm dấu ? và ! cho toàn bộ code của mình.

Tôi cố ý thực hiện tất cả công việc đó, chỉ để hiểu tất cả những công việc khó khăn mà team Flutter đã làm để tạo ra công cụ[ null safety migration tool](https://dart.dev/null-safety/migration-guide#migration-tool) hỗ trợ cho cộng đồng Flutter Developer chuyển đổi các dự án của họ sang Null Safety. Cuối cùng, tôi quyết định sử dụng công cụ tuyệt vời này để hoàn tất quá trình chuyển đổi cho ứng dụng của mình.

Ứng dụng này là ứng dụng thống kê các thông số có liên quan đến COVID-19 và nó hoàn toàn có open source. Bạn có thể tìm thấy nó trên GitHub, mình để link ở cuối bài viết.

Thực sự thú vị khi thấy tất cả các code thay đổi mà công cụ chuyển đổi (migration tool) thực hiện trong dự án của tôi - những code thay đổi như thêm `?` trong giá trị Null (Nullable) và thêm `!` khi công cụ phát hiện ra rằng giá trị sẽ không bao giờ là giá trị rỗng.

![image.png](https://images.viblo.asia/1eb8b420-2d93-44b1-9c1e-23cdeb644633.png)

Sau đây là một ví dụ về công cụ di chuyển tự động thêm `?` và `!`.  `_homeCountry` là thuộc tính Nullable của một lớp có tên `HomeCountry` (cũng có thể nullable). Do đó, để bảo vệ quyền truy cập vào một trong các thuộc tính của `_homeCountry` (nếu class `HomeCountry` null thì bình thường nếu ta truy cập đến biến `_homeCountry` có thể gây crash ứng dụng), công cụ đã thêm toán tử `?`.‌‌     

![image.png](https://images.viblo.asia/8935c6d4-b7b8-4cb6-89dd-9054ef23797b.png)

Sau khi thực hiện việc migrate, một số vấn đề trong code đã bắt đầu xuất hiện và rõ ràng hơn, đó là phần tốt nhất.

![image.png](https://images.viblo.asia/57cf4499-4f34-491b-ab15-60d0bef87714.png)

Một trong những vấn đề xuất hiện đó là một số chuỗi nullable đang được chuyển dưới dạng danh sách cho một chức năng nội bộ của plugin [shared_preferences](https://pub.dev/packages/shared_preferences). Bởi vì các giá trị này có thể là Nullable, công cụ đã tạo toàn bộ danh sách kiểu `<String?>[]`, việc xuất hiện lỗi vì hàm chấp nhận kiểu `<String>[]`.

![image.png](https://images.viblo.asia/1814acf6-492b-4faa-a5bc-aea60cafe97f.png)

Một giải pháp đơn giản cho vấn đề này là loại bỏ `?` để phù hợp với bộ công cụ phân tích. Khi tôi làm điều đó, công cụ phân tích bắt đầu cho rằng một biến Nullable (`String?`) không thể gán vào một biến non-nullable (`String`).

![image.png](https://images.viblo.asia/64877f79-ff78-4d5d-be8b-dad81244f8f4.png)

Để giải quyết vấn đề, tôi đã đặt mỗi thuộc tính của lớp `HomeCountry` là non-nullable và thêm từ khóa `required` trong hàm khởi tạo. Điều đó có nghĩa là bây giờ cần phải truyền các tham số trong khi khởi tạo `HomeCountry`. Tôi không phải thay đổi hàm `setHomeCountry` vì các biến được truyền vào danh sách hiện non-nullable.

Thay đổi này đã ngăn tôi gửi nhầm các giá trị null đến các `shared preferences`, điều này là một trong những tính năng tuyệt vời của Null Safety khi bạn đảm bảo được các giá trị của bạn không bị null.

‌‌Một điều khác Null Safety được tìm thấy là một bug có thể gây ra crash app khi ứng dụng đang chạy. Xem đoạn mã sau:

![image.png](https://images.viblo.asia/7469feb7-b6ba-41ce-9c2a-bf8abf013cde.png)

Bởi vì `list` là một biến nullable, việc đọc các phần tử dựa trên index của nó có thể gây ra crash. Sau khi chuyển sang Null Safety, tôi không thể biên dịch ứng dụng vì không có kiểm tra null trước khi đọc các giá trị trong danh sách này.

Cuối cùng, tôi đã thêm check null để làm cho code có thể biên dịch được và để ngăn ứng dụng bị lỗi tại vị trí này trong code. Thật ngạc nhiên khi việc di chuyển đã giúp tôi tìm ra một lỗi thực sự!

![image.png](https://images.viblo.asia/ebc75082-6dab-4485-8e0d-38811f00227d.png)

Tôi cũng đã thực hiện việc migrate cho một package rất nhỏ, bạn có thể tìm thấy package này trên pub.dev, được gọi là [progress_indicators](https://pub.dev/packages/progress_indicators). Tôi đã rất ngạc nhiên khi thấy cách công cụ di chuyển thêm các `late` keyword thay vì `?` khi nó kết luận rằng các biến đó đã được khởi tạo trước khi được sử dụng.

![image.png](https://images.viblo.asia/b9df75c7-48b9-4c57-992f-80505a58316a.png)

## 2. Viết code trong môi trường Null-safe

Giờ đây, Flutter đã có Null Safety, việc tạo ứng dụng mới là trải nghiệm tốt hơn cho lập trình viên. Viết code mới trong môi trường null-safe cũng giúp hiểu rõ hơn về các flow code, cùng với việc có thể viết mã crash-safe. Đoạn code dưới đây không thể biên dịch được:

```
class MyClass {
  String a;

  MyClass({this.a});
}
```

Đoạn code này gây ra lỗi trong thời gian biên dịch bởi vì biến `a` được đánh dấu là một biến có thể null, đặt thêm từ khóa `required` trong hàm khởi tạo hoặc thêm trong lúc khởi tạo. Lúc này, đoạn code mà bạn viết ra đảm bảo rằng biến `a` không bao giờ null. Vì vậy, tùy thuộc vào trường hợp sử dụng của bạn, bạn có thể thực hiện điều này:

```
class MyClass {
  String? a;

  MyClass({this.a});
}
```

Hoặc bạn có thể làm điều này:

```
class MyClass {
  String a;

  MyClass({required this.a});
}
```

Hoặc bạn có thể giữ cho biến `a` là một biến optional, nhưng thêm giá trị mặc định khi khởi tạo nếu không thì chương trình của bạn sẽ không chạy được thêm một trình khởi tạo để cung cấp cho nó một giá trị mặc định nếu một giá trị không được thông qua:

```
class MyClass {
  String a;

  MyClass({this.a = ''});
}
```

Ngoài ra, bây giờ bạn có thể tạo các biến nullable cho các class của riêng bạn:

```
class MyClass {
  String? a;

  MyClass({this.a});
}
// somewhere in main code
MyClass? myClass;
```

Bởi vì `myClass` có kiểu nullable, trình biên dịch của bạn sẽ báo lỗi nếu bạn viết một cái gì đó như thế này:

```
print(myClass.a);
```

‌‌Đây là lỗi mà chương trình sẽ văng ra:

> The property ‘a’ can’t be unconditionally accessed because the receiver can be ‘null’.

Bạn có thể sửa lỗi đó bằng cách thêm `?`:

```
print(hello?.a);
```

Tính năng Null Safety của Dart đảm bảo rằng bạn viết code an toàn hơn. Phát hiện lỗi liên quan đến biến null trong thời gian biên dịch là một bổ sung  rất tuyệt vời mà Flutter mang lại cho các Flutter Developer. Ví dụ trên cho thấy cách trình biên dịch ngăn bạn biên dịch code bất cứ khi nào nó phát hiện ra khả năng có ngoại lệ null-pointer khiến ứng dụng gặp sự cố trong thời gian chạy. Điều này rõ ràng có nghĩa là trình biên dịch cố gắng viết mã null-safe càng nhiều càng tốt.

Tóm lại, Sound null safety của Dart là bước khởi đầu đáng tin cậy để xây dựng các ứng dụng an toàn hơn, nhanh hơn và đáng tin cậy hơn! Tôi khuyên bạn nên migrate các ứng dụng Dart cũ của mình sang null safety để hiểu cách hoạt động của nó. Có thể bạn sẽ đủ may mắn để tìm và sửa một số lỗi trong mã của mình!

Happy coding! :)

Link Github:

https://github.com/wal33d006/novel_covid_19

Bài viết được dịch từ [đây](https://medium.com/dartlang/how-darts-null-safety-helped-me-augment-my-projects-af58f8129cf).