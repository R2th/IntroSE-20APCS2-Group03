Giống như bao mobile develop khác,tôi từng phát triển các ứng dụng của mình với ngôn ngữ java và  cũng giống như bao lập trình viên khác, tôi từng trải nếm trải cơn ác mộng mang tên "NullPointerException". Và khi chuyển sang làm việc với Kotlin, cơn ác mộng mang tên "NullPointerException" đã được Kotlin null safety xóa bỏ. Và từ version Flutter 2.0, null safety đã được ra mắt và các bạn có thể apply nó vào trong các dự án của mình. Các bạn có thể tham khảo [video](https://www.youtube.com/watch?v=iYhOU9AuaFs) này.
Với tính năng null safety chính thức ra mắt phiên bản beta, hàng nghìn gói có sẵn trên pub.dev đã bắt đầu được triển khai thêm tính năng này. Đầu tiên là các thư viện core của Dart, framework Flutter và hơn 40 package Dart và Flutter. Với điều đó, chúng tôi hy vọng sẽ thấy cộng đồng chấp nhận  và implement vào các thư viện của họ.
![](https://images.viblo.asia/4a19eb80-2d48-4f48-915e-4f8eb9b81e2a.png)

Với phiên bản beta, chúng tôi cũng đang bắt đầu giai đoạn gia đình trước khi đưa ra phiên bản ổn định của tính năng an toàn trống. Chúng tôi hy vọng rằng bạn sẽ sử dụng tính năng này và cho chúng tôi biết nếu các phần của tính năng này có thể được cải thiện, nếu thông báo giao diện người dùng có thể dễ hiểu hơn hoặc nếu tài liệu có thể được làm rõ ràng hơn. Chúng tôi thực sự mong đợi phản hồi của bạn.
# 1. Opting in to null safety

Trước khi chúng ta thảo luận về cách sử dụng null safety, điều quan trọng là phải nhắc lại rằng (như đã nêu trong các nguyên tắc về null safety của chúng tôi) bạn có quyền kiểm soát thời điểm bắt đầu áp dụng nó. Các ứng dụng và gói sẽ chỉ chạy với null safety nếu ràng buộc Dart SDK tối thiểu của chúng ít nhất là Dart 2.12.
```
environment:
  sdk: ">=2.12.0-0 <3.0.0"
```
Để trải nghiệm điều này, hãy thử tạo một ứng dụng "Hello world" nhỏ không an toàn (ví dụ: sử dụng dart create) có chứa mã như hình dưới đây. Sau đó, bạn có thể thử chạy ứng dụng cả trước và sau khi thay đổi ràng buộc SDK và chạy dart pub get, đồng thời trải nghiệm hành vi của chương trình thay đổi như thế nào. (Đảm bảo sử dụng SDK báo cáo 2.12 trong phi tiêu --version.)
```
bin/hello.dart:
...
void main() {
  var hello = 'Hello Dart developers';
  if (someCondition) {
    hello = null;
  }
  print(hello);
}
Before changing the SDK constraint:
$ dart run
null
After changing the SDK constraint (and running dart pub get):
$ dart run
bin/hello.dart:6:13: Error: Null can't be assigned to a variable of type 'String' because 'String' is not nullable.
hello = null;
```

# 2. Migrating to null safety
## 2.1 Kiểm tra dependencies của bạn
Chúng tôi thực sự khuyên bạn nên di chuyển mã theo thứ tự, với các phần của biểu đồ phụ thuộc được di chuyển trước. Ví dụ: nếu C phụ thuộc vào B phụ thuộc vào A, hãy chuyển A đến an toàn rỗng trước, sau đó đến B rồi đến C. Thứ tự này áp dụng cho dù A, B và C là thư viện, gói hay ứng dụng.

![](https://images.viblo.asia/ed51f3f0-6583-4dba-a75b-d12baf845138.png)

Tại sao thứ tự lại quan trọng? Mặc dù bạn có thể thực hiện một số tiến trình di chuyển mã trước khi phần phụ thuộc của bạn di chuyển, nhưng bạn có nguy cơ phải thực hiện lần di chuyển thứ hai nếu phần phụ thuộc của bạn thay đổi API của chúng trong quá trình di chuyển. Nếu một số phụ thuộc của bạn không an toàn, hãy xem xét liên hệ với nhà xuất bản gói bằng cách sử dụng chi tiết liên hệ được liệt kê cho mỗi gói trên pub.dev.

## 2.2 Verifying  dependencies

Để xác minh xem ứng dụng hoặc gói của bạn đã sẵn sàng để bắt đầu di chuyển hay chưa, bạn có thể sử dụng dart pub đã lỗi thời ở chế độ null-safe. Ví dụ bên dưới cho thấy rằng ứng dụng này đã sẵn sàng di chuyển nếu nó nâng cấp các phần phụ thuộc của mình lên các phiên bản đường dẫn, quy trình và pedantic được phát hành trước như được liệt kê trong cột Resolable.
![](https://images.viblo.asia/69962826-bfee-4555-abb6-f91aaa3c9719.png)

## 2.3 Statically analyze your migrated code

Cập nhật lại các package của dự án
```
flutter pub get
flutter analyze
```

## 2.4 Ensure tests pass
Chạy các test case của bạn và đảm bảo rằng chúng chạy success. Bạn có thể cần cập nhật các thử nghiệm mong đợi giá trị null, trong trường hợp bạn đã thay đổi mã gói của mình để không cho phép null nữa.
## 2.5 Publish your null-safe package
Khi quá trình migrared hoàn tất và các test case đều success, bạn có thể xuất bản gói của mình dưới dạng tiền vui lòng. Dưới đây là tóm tắt ngắn gọn về các phương pháp hay nhất:
- Tăng số phiên bản của bạn lên phiên bản chính tiếp theo (ví dụ: 2.3.x lên 3.0.0). Phương pháp hay nhất này đảm bảo rằng người dùng gói của bạn không nâng cấp lên gói này trước khi họ sẵn sàng sử dụng an toàn vô hiệu và nó cho phép bạn tự do cấu trúc lại các API của mình để tận dụng tốt nhất tính an toàn vô hiệu.
- Phiên bản và xuất bản gói của bạn dưới dạng phiên bản phát hành trước trên pub.dev. (Ví dụ: sử dụng 3.0.0-nullsafety.0, không phải 3.0.0.)
Để biết chi tiết đầy đủ về di chuyển và lập phiên bản, hãy xem hướng dẫn tại [đây](https://dart.dev/null-safety/migration-guide).
# 3. Lợi ích của null safety
## 3.1 Code an toàn
Gần đây, chúng tôi đã phát hiện ra một lỗi trong kênh chính của Flutter nơi các lệnh của công cụ Flutter khác nhau sẽ gặp sự cố trên một số cấu hình máy nhất định với lỗi null: The method '>=' was called on null. Vấn đề cơ bản là một yêu cầu gần đây để thêm hỗ trợ phát hiện Android Studio 4.1. PR đó đã thêm mã như thế này:
```
final int major = version?.major;
final int minor = version?.minor;
if (globals.platform.isMacOS) {
  /// plugin path of Android Studio changed after version 4.1.
  if (major >= 4 && minor >= 1) {
    ...
```

Bạn có thể phát hiện ra lỗi không? Bởi vì phiên bản có thể là null, cả chính và phụ cũng có thể là null. Lỗi này có vẻ dễ dàng phát hiện ở đây một cách riêng biệt, nhưng trên thực tế, mã như thế này luôn trượt qua mọi lúc, ngay cả với quy trình xem xét mã nghiêm ngặt như quy trình được sử dụng trong Flutter repo. Với tính năng an toàn rỗng, phân tích tĩnh giải quyết vấn đề này ngay lập tức:
![](https://images.viblo.asia/df2373b8-002d-415f-b2ee-31d01da3f26d.png)

Đó là một lỗi khá đơn giản. Trong thời gian đầu sử dụng null safety trong nội bộ tại Google, chúng tôi đã thấy nhiều lỗi phức tạp hơn được phát hiện và sau đó được giải quyết thông qua  null safety. Đây là vài ví dụ:
Một nhóm nội bộ nhận thấy rằng họ thường kiểm tra các giá trị null trong mã mà  null safety biết không bao giờ có thể là null. Sự cố này thường gặp nhất trong mã sử dụng protobuf, trong đó các trường tùy chọn trả về giá trị mặc định khi không được đặt và không bao giờ là giá trị rỗng. Điều này khiến mã kiểm tra không chính xác điều kiện mặc định, bằng cách nhầm lẫn giữa giá trị mặc định và giá trị null.
Nhóm Google Pay đã tìm thấy lỗi trong mã Flutter của họ, nơi họ sẽ gặp lỗi khi cố gắng truy cập các đối tượng Trạng thái Flutter bên ngoài ngữ cảnh của một Tiện ích. Trước khi an toàn null, những cái đó sẽ trả về null và che dấu lỗi; với an toàn rỗng, phân tích âm thanh xác định rằng các thuộc tính đó không bao giờ có thể là rỗng và tạo ra lỗi phân tích.
Nhóm Flutter đã tìm thấy một lỗi trong đó công cụ Flutter có thể gặp sự cố nếu null được chuyển cho tham số cảnh trong Window.render (). Trong quá trình di chuyển an toàn null, họ đã thêm một gợi ý để đánh dấu Scene là không thể null và sau đó có thể dễ dàng ngăn chặn sự cố ứng dụng tiềm ẩn mà null sẽ kích hoạt nếu vượt qua.
## 3.2 Tận dụng null safety không có trong quá trình biên dịch
Null safetycủa Dart không có hiệu lực  đáng hoan nghênh khác: nó có nghĩa là trình biên dịch của Dart có thể tận dụng thông tin vô hiệu. Điều này có thể làm cho các chương trình của bạn nhỏ hơn và nhanh hơn. Chúng tôi chưa có nhiều ứng dụng trong thế giới thực được chuyển đổi hoàn toàn sang mức độ an toàn không có âm thanh (vì chúng tôi hiện đang bắt đầu quá trình chuyển đổi hệ sinh thái của các gói mà các ứng dụng này phụ thuộc vào để đảm bảo độ an toàn), nhưng chúng tôi đang thấy những kết quả rất đáng khích lệ từ khuôn khổ cốt lõi.
Gần đây, chúng tôi đã thử nghiệm biên dịch lại mẫu hello_world để đo lường tác động của an toàn null đối với kích thước ứng dụng. Đây là một ví dụ tối thiểu chỉ hiển thị “hello world”. Khi so sánh kích thước tổng thể của mã đã biên dịch, kích thước mã không nén (được cài đặt trên thiết bị) đã giảm 3,5% mà không cần làm gì ngoài việc biên dịch lại với độ an toàn không có âm thanh. Điều này có thể xảy ra, mặc dù ứng dụng này chỉ là 10 dòng mã, bởi vì kích thước mã của tất cả các thư viện được bao gồm đều thu hẹp lại; ví dụ: bản thân khung công tác Flutter (gói: Flutter) đã giảm 3,9%.
Đối với tốc độ thực thi code , việc phải thực thi một hệ thống loại âm thanh có thể làm tăng thêm chi phí. Tuy nhiên, việc kiểm tra null ít hơn cũng có khả năng làm cho mã nhanh hơn. Phân tích ban đầu của chúng tôi về điểm chuẩn cho thấy rằng hiệu suất ngang bằng với các bản phát hành trước đó và thông tin về loại bổ sung mới tạo ra tiềm năng để chúng tôi thực hiện các loại cải tiến hiệu suất mới trong tương lai. Chúng tôi dự định viết thêm về công việc hiệu suất của chúng tôi trong các bài đăng blog trong tương lai.
Trong một số trường hợp, chúng tôi đã thấy an toàn rỗng dẫn đến tăng hiệu suất, điển hình là khi việc di chuyển sang an toàn rỗng đã phát hiện ra lỗ hổng trong logic mã. Ví dụ: chúng tôi đã tìm thấy sự cố trong bộ đệm ẩn bố cục văn bản web Flutter. Bộ đệm ẩn này đang sử dụng một khóa có thể null và sau đó sử dụng một số logic để sử dụng TextAlign.start khi null. Logic này gây ra một lỗ hổng trong bộ nhớ cache, nơi các phần tử sẽ trông giống như chúng đã thay đổi mặc dù chúng vẫn có giá trị mặc định. Kết quả là, thường xuyên có bộ nhớ cache bị bỏ lỡ. Thêm một getter textAlign không thể nullable đã giúp sửa lỗi bộ nhớ đệm, dẫn đến hiệu suất hiển thị văn bản tăng 14 lần trong trường hợp văn bản được lưu vào bộ nhớ đệm.