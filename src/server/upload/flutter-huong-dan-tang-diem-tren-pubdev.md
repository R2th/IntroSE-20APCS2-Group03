## Giới thiệu
Ở bài trước mình đã giới thiệu về cách upload plugin lên pub.dev (Xem lại [tại đây](https://viblo.asia/p/flutter-huong-dan-dua-plugin-len-pubdev-LzD5dMjoKjY)). Hôm nay mình sẽ nói về cách tăng điểm pub points trên pub.dev nhé. Cùng bắt đầu thôi nào!

## Phân tích cách tính điểm trên pub.dev
Trên pub.dev sẽ có 6 mục lớn để tính điểm cho plugin của bạn

![](https://images.viblo.asia/35fd6bfe-b6cf-4bf1-9d20-23c1614d4de3.png)

### Tuân thủ quy ước của Dart (20 điểm)
- 10 điểm: Cung cấp file pubspec.yaml hợp lệ
- 5 điểm: Cung cấp file README.md hợp lệ
- 5 điểm: Cung cấp file CHANGELOG.md hợp lệ

Các bạn có thể tham khảo [bài viết trước](https://viblo.asia/p/flutter-huong-dan-dua-plugin-len-pubdev-LzD5dMjoKjY) của mình nha

### Cung cấp hướng dẫn (20 điểm)
- 10 điểm: Có ví dụ. Pub.dev sẽ lấy file example/lib/main.dart để làm ví dụ cho người dùng. Bạn nên cung cấp ví dụ đầy đủ trong 1 file này. Vì người khác sẽ ngại việc lấy project của bạn để hiểu được plugin của bạn dùng như thế nào
- 10 điểm: Cung cấp hướng dẫn cho từng API. Theo yêu cầu của pub.dev thì bạn phải cung cấp ít nhất 20% các api. Tức ở mỗi biến, hàm, lớp được tạo ra, bạn phải thêm hướng dẫn bằng `///`

### Hỗ trợ nhiều nền tảng (20 điểm)

- 20 điểm: Pub.dev cần bạn hỗ trợ android, ios và web. Nếu chỉ hỗ trợ android và ios thôi thì bạn sẽ chỉ được 10 điểm. Sau khi code android và ios xong thì bạn nên nghiên cứu thêm cho cả bản web nữa nha

### Vượt qua bộ phân tích (30 điểm)

- 30 điểm: Bạn cần fix hết các lỗi,cảnh báo, vấn đề. Hiện tại mình không chắc pub.dev dùng bộ check nào, hiện tại mình dùng [bộ này](https://github.com/flutter/flutter/blob/master/analysis_options.yaml) và đã đạt được 30/30 điểm. Các bạn thử xem, nếu có bộ nào tốt hơn các bạn gợi ý cho mình dưới comment nha.

### Các gói phụ thuộc phải được cập nhật (10 điểm)

- 10 điểm: Khi bạn thêm gói vào dependencies và dev-dependencies. Bạn cần cập nhật bản mới nhất cho những gói đó### Các gói phụ thuộc phải được cập nhật

### Hỗ trợ null-safety (20 điểm)

- 20 điểm: Plugin của bạn cần nâng cấp lên hỗ trợ null-safety. Bởi vì từ bản flutter 2.12 trở về sau khi tạo dự án sẽ mặc định là có null-safety, thì những dự án này sẽ không thể thêm plugin của bạn nếu bạn có hỗ trợ null-safety

## Công cụ kiểm tra điểm
Thật là khó chịu khi mà upload plugin xong mới biết bạn được bao nhiêu điểm đúng không?

Vậy thì sẽ có cách bạn tự kiểm tra trước xem mình được bao nhiêu điểm, và bị mất điểm ở phần nào luôn nha.

Công cụ đó chính là [pana](https://pub.dev/packages/pana)

Các bạn cài pana vào máy tính bằng dòng lệnh sau:
```shell
pub global activate pana
```

Sau đó bạn vào terminal của dự án và gõ lệnh:
```shell
flutter pub global run pana
```

Đây là mình sau khi chạy lệnh được tool báo được chưa hỗ trợ nền tảng web nên chỉ được 110 điểm thôi.

![](https://images.viblo.asia/adef096c-a7cb-4fe5-9042-0caed6fc8f38.png)

## Kết thúc
Hi vọng qua bài viết của mình sẽ giúp được các bạn đang gặp khó khăn với việc upload plugin lên pub.dev nha.

Nguồn tham khảo
- [Publishing packages](https://dart.dev/tools/pub/publishing)
- [Deploy your Dart Package With All Pub Points](https://www.topcoder.com/thrive/articles/deploy-your-dart-package-with-all-pub-points)

Bài viết khác
- [[Flutter] Hướng dẫn tạo plugin và gọi thư viện native](https://viblo.asia/p/flutter-huong-dan-tao-plugin-va-goi-thu-vien-native-Eb85orYWl2G)
- [[Flutter] Hướng dẫn đưa plugin lên pub.dev](https://viblo.asia/p/flutter-huong-dan-dua-plugin-len-pubdev-LzD5dMjoKjY)

Cảm ơn các bạn đã xem bài viết.
## Tác giả
Phạm Tiến Dũng
tiendung01023@gmail.com