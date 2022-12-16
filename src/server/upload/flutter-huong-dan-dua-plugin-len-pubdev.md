## Giới thiệu
Ở bài trước mình đã giới thiệu về cách tạo plugin flutter và cách kết nối xuống native (Xem lại [tại đây](https://viblo.asia/p/flutter-huong-dan-tao-plugin-va-goi-thu-vien-native-Eb85orYWl2G)). Hôm nay mình sẽ nói về cách đưa plugin bạn đã viết lên trang chia sẻ của flutter là pub.dev. Cùng bắt đầu thôi nào!

**Lưu ý**: Khi bạn đã xuất bản plugin lên pub.dev rồi thì không thể gỡ xuống được nữa. Vậy nên các bạn hãy xuất bản những gói ít nhất là có thể sử dụng được, tránh việc xuất bản chơi/thử nghiệm.

## Chuẩn bị plugin
Khi xuất bản plugin lên pub.dev sẽ cần có những tiêu chuẩn cần tuân theo:
- LICENSE: file này mô tả giấy phép cho plugin của bạn, quy định cách người khác sử dụng plugin của bạn như thế nào. Một số giấy phép phổ biến như MIT, Apache, BSD. Bạn có thể tham khảo cách viết một số license [tại đây](https://choosealicense.com/licenses/).
- Dung lượng plugin: dung lượng sau khi nén gzip của bạn phải nhỏ hơn 100MB. Nếu lớn hơn bạn có thể chia ra nhiều plugin hoặc giảm các thành phần không cần thiết trong thư mục example.
- Phụ thuộc: phần dependencies chỉ được phụ thuộc vào các plugin có sẵn trên pub.dev
- Tài khoản: bạn cần có 1 tài khoản google đăng nhập sẵn trên pub.dev

## Tệp quan trọng
Trang pub.dev sẽ dùng 1 số file để tạo nội dung cho plugin của bạn, bạn nên chăm chút các file này để plugin trông đẹp hơn
- **README.md**: Đây là file mô tả về nội dung plugin của bạn, cách người khác sử dụng plugin. File này theo định dạng markdown. Bạn có thể tham khảo cách viết README của pub.dev [tại đây](https://dart.dev/guides/libraries/writing-package-pages)
- **CHANGELOG.md**: File này mô tả sự thay đổi trong plugin của bạn, mỗi khi bạn cập nhật 1 bản mới, bạn cần viết mô tả rõ ràng về sự thay đổi đó. File này cũng định dạng markdown
- **pubspec.yaml**: File này điền các thông tin chi tiết của plugin
> name: Tên plugin

> description: Mô tả của gói, bạn nên mô tả từ 60 đến 180 ký tự để được cộng điểm pub.dev

> version: phiên bản plugin

> homepage: đường dẫn đến repository git

![](https://images.viblo.asia/6fd19789-d405-4f35-81b5-f464ba2330fa.png)

## Chạy thử nghiệm
Việc này giúp bạn biết gói của mình đã đủ thông tin chưa, sẽ còn cần bổ sung thêm những gì.

Gọi lệnh trên terminal:
```shell
dart pub publish --dry-run
```
hoặc
```shell
flutter packages pub publish --dry-run
```
Sau khi chạy lệnh, nếu bạn thấy báo `Package has 0 warnings.` là đã ok rồi.

## Xuất bản
Khi đã sẵn sàng cho việc xuất bản. Hãy gọi lệnh:
```shell
dart pub publish
```
hoặc
```shell
flutter packages pub publish
```

Flutter sẽ hỏi bạn có sẵn sàng để upload chưa, bạn điền `y` và nhấn `Enter`.

Tiếp đến nếu bạn chưa upload lần nào lên pub.dev, terminal sẽ hiện lên 1 link, bạn click vào link này để mở trình duyệt và chọn tài khoản google bạn muốn quản lý thư viện
![](https://images.viblo.asia/12403570-20b4-433e-a976-7b8dd8e855ca.png)

Sau đó bạn trở về đợi terminal báo thành công thôi.

Sau khi upload thành công thì bạn đợi khoảng 1 tiếng để pub.dev quét plugin của bạn và tính điểm thì plugin của bạn mới được hiển thị với mọi người.

## Kết thúc
Hi vọng qua bài viết của mình sẽ giúp được các bạn đang gặp khó khăn với việc upload plugin lên pub.dev nha.

Nguồn tham khảo
- [Publishing packages](https://dart.dev/tools/pub/publishing)

Bài viết khác
- [[Flutter] Hướng dẫn tạo plugin và gọi thư viện native](https://viblo.asia/p/flutter-huong-dan-tao-plugin-va-goi-thu-vien-native-Eb85orYWl2G)
- [[Flutter] Hướng dẫn tăng điểm trên pub.dev](https://viblo.asia/p/flutter-huong-dan-tang-diem-tren-pubdev-gGJ596OPKX2)

Cảm ơn các bạn đã xem bài viết.
## Tác giả
Phạm Tiến Dũng
tiendung01023@gmail.com