![image.png](https://images.viblo.asia/439a28f6-d80f-4c49-9d62-9658852ba2bd.png)

Làm cho văn bản của bạn đẹp hơn với một chút "make up" để thu hút người dùng. Gần đây tôi đã tìm hiểu thêm một chút kiến thức nữa của thế giới Flutter: Font Features. Tôi sẽ chia sẻ điều mà tôi đã học được với bạn trong bài viết này.

> Bạn có thể xem bài viết đầy đủ tại [200Lab Education](https://200lab.io/blog/tim-hieu-font-frong-flutter/)

## 1. Thay đổi font chữ

Bài viết này không chủ yếu viết về việc thay đổi font family, nhưng vì nó liên quan đến font chữ, tôi sẽ bắt đầu bằng cách xem xét ngắn gọn cách sử dụng các font chữ khác nhau trong ứng dụng của bạn.

### 1.1 System fonts (Font hệ thống)

Phông chữ mặc định trên Android là `Roboto` và trên iOS là .`.SF UI Display` hoặc `.SF UI Text`(SF nghĩa là San Francisco). Nếu bạn muốn sử dụng một phông chữ khác, thì bạn sẽ cần thêm phông chữ đó vào ứng dụng của mình.

![image.png](https://images.viblo.asia/55100ae5-16d9-4b61-8d59-0baa30947e3c.png)

![image.png](https://images.viblo.asia/4c89bc1d-2857-42c4-ab51-4ef470a2fbb5.png)

Với tôi chúng trông giống hệt nhau.

### 1.2 Tùy chỉnh font chữ (custom font) theo ý của bạn

Quy trình cơ bản để thêm custom font vào ứng dụng như sau:

* Thêm font chữ vào thư mục nội dung của bạn.
* Khai báo font chữ trong file pubspec.yaml.

```
flutter:
  fonts:
    - family: MyFont     
      fonts:
        - asset: assets/my_font.ttf
```

Sử dụng font chữ trong code của bạn bằng cách chỉ định `fontFamily`.

```
Text(
  'Hello world',
  style: TextStyle(
    fontFamily: 'MyFont',
  ),
)
```

![image.png](https://images.viblo.asia/23c49ccd-1c00-42d0-8e51-a716e5fd31b9.png)

### 1.3 Google fonts package

Giờ đây, chúng ta có package [google_fonts](https://pub.dev/packages/google_fonts) giúp mọi thứ trở nên dễ dàng hơn. Chỉ với một vài dòng code, bạn có gần một nghìn phông chữ open source khác nhau có sẵn để dùng.

Khai báo google_fonts vào file pubspec.yaml của bạn như sau:

```
dependencies:
  google_fonts: ^0.3.8
```

Sau đó, sử dụng bất kỳ phông chữ nào bạn muốn trong code của mình:

```
import 'package:google_fonts/google_fonts.dart';

Text(
  'Hello world',
  style: GoogleFonts.pinyonScript(
    fontSize: 50,
  ),
),
```

![image.png](https://images.viblo.asia/55e94d2e-9eed-48a1-aced-977cf3ecf83b.png)

Ghi chú:

* Bạn có thể tìm kiếm các font chữ khác nhau ở [đây](https://fonts.google.com/). Khi bạn tìm thấy một cái bạn thích, chỉ cần ghi lại tên và trong code của bạn viết `GoogleFonts.someFontName()`.
* Theo mặc định, các phông chữ được tải xuống lần đầu bạn sử dụng ứng dụng. Điều đó có thể mất một vài giây trong lần chạy đầu tiên, nơi font chữ mặc định được hiển thị trước khi nó chuyển sang font chữ tùy chỉnh của bạn. Nếu không thích điều đó, bạn có thể kết hợp phông chữ với ứng dụng.

Hãy bắt đầu với Tính năng font ngay bây giờ. Thật không may, hóa ra là bạn không thể sử dụng Tính năng font chữ với các font chữ của Google vì thông tin đó đã bị loại bỏ khỏi các font chữ này. (Nói cách khác, điều này giữ cho kích thước font chữ nhỏ hơn). Nếu bạn muốn sử dụng tính năng font chữ, bạn sẽ phải sử dụng font chữ hệ thống mặc định hoặc thêm font chữ tùy chỉnh của riêng bạn.

## 2. Font Features

Tính năng font chữ cho phép bạn điều chỉnh hành vi mặc định của font chữ. Có nhiều tính năng khác nhau. Tôi sẽ đưa ra một vài ví dụ khác nhau để bạn có thể hiểu được những gì họ làm.

### 2.1 Tabular vs Proportional Figures

Hình bảng so với Hình tỷ lệ (abular và Proportional Figures). Hãy xem animation sau:

![](https://images.viblo.asia/aeafea6a-4164-4401-8d10-97fb78855098.gif)

Lưu ý độ rộng của dòng dưới cùng chập chờn vào và ra như thế nào. Điều đó có thể gây khó chịu khi bạn cố gắng tạo một layout UI ổn định. Lý do cho độ rộng thay đổi là do các glyph của font chữ đang sử dụng độ rộng tương ứng (`proportionalFigures`). Tức là mỗi số và chữ cái có độ rộng khác nhau. Mặt khác, dòng trên cùng có phông chữ được đặt thành `tabularFigures`, hay nói cách khác, monospace, mặc dù nó không phải là phông chữ monospace.

Đây là dòng code:

```
import 'dart:ui';
Text(
  'There are ${_value.toInt()} cars.',
  style: TextStyle(
    fontFeatures: [
      FontFeature.tabularFigures(),
    ]
  ),
),
Text(
  'There are ${_value.toInt()} cars.',
  style: TextStyle(
      fontFeatures: [
        FontFeature.proportionalFigures(),
      ]
  ),
),
```

Bạn có tìm full source code ở [đây](https://gist.github.com/suragch/2a0b7519bc45698de7845a3953d275cc). (Vì một số lý do, phiên bản DartPad không hiển thị số liệu tỷ lệ, vì vậy tôi cung cấp cho bạn GitHub gist link. Bạn có thể paste nó vào dự án Android hoặc iOS để kiểm tra.)

### 2.2 Regular vs Oldstyle numbers

Các số old style đôi khi ngắn hoặc được viết bên dưới baseline. Bạn có thể thấy chúng trên dòng thứ hai của hình ảnh sau đây.

![image.png](https://images.viblo.asia/71fed682-7bde-43c4-ab05-aeeb8bdeeb90.png)

Để lấy chúng, bạn có thể sử dụng `FontFeature.oldstyleFigures()` như trong ví dụ sau:

```
Text(
  '0123456789',
),
Text(
  '0123456789',
  style: TextStyle(
    fontFeatures: [
      FontFeature.oldstyleFigures(),
    ],
  ),
),
```

### 2.3 Slashed zero

Một số người cho là sử dụng FontFeature.slashedZero() giúp họ tạo ra con số 0. Tuy nhiên tôi chỉ có thể làm được khi dùng FontFeature.stylisticSet(6). Điều này được chứng minh bằng hình ảnh và code dưới đây. Thực tế thì slashedZero không hoạt động có thể là do bug trong Flutter hoặc font chữ có vấn đề.

![image.png](https://images.viblo.asia/93ede31e-477b-403b-a487-bce1581b43c5.png)

```
Text(
  '0',
),
Text(
  '0',
  style: TextStyle(
    fontFeatures: [
      FontFeature.slashedZero(),
    ],
  ),
),
Text(
  '0',
  style: TextStyle(
    fontFeatures: [
      FontFeature.stylisticSet(6),
    ],
  ),
),
```

Lưu ý: `FontFeature.stylisticSet(n)` nhận một số nguyên `n` từ 1 đến 20. Các bộ khác nhau có các biến thể về glyphs phông chữ. Tuy nhiên, tôi nhận thấy rất ít sự thay đổi trong font chữ hệ thống.

### 2.4 Randomized variations (Các biến thể ngẫu nhiên)

Điều này có vẻ thú vị. Vấn đề là tôi không thể tìm thấy font chữ nào miễn phí.

Một font chữ viết tay có thể trông giống thật hơn bằng cách có một số biến thể cho mỗi glyph. Các biến thể glyph này sau đó có thể được hiển thị ngẫu nhiên. Điều này được thể hiện qua hình ảnh sau:

![image.png](https://images.viblo.asia/da629290-2b7b-4741-af4a-031d1dd8ae09.png)

Nếu bạn có một font chữ hỗ trợ điều này, về mặt lý thuyết, bạn có thể có được các biến thể ngẫu nhiên với đoạn code sau:

```
Text(
  'Anna meets Otto',
  style: TextStyle(
    fontFamily: 'Some handwriting font',
    fontFeatures: [
      FontFeature.randomize(),
    ],
  ),
),
```

### 2.5 Các tính năng font chữ khác

Các tính năng font chữ mà tôi đã trình bày ở trên đã được xác định trước trong Flutter, nhưng còn rất nhiều, rất nhiều, rất nhiều,  rất nhiều nữa. Bạn có thể truy cập chúng bằng cách sử dụng mã bốn chữ cái với `FontFeature.enable('xxxx')` trong đó `xxxx` là nơi chuỗi code đi. Ví dụ, `FontFeature.tabularFigures()` tương đương với `FontFeature.enable('tnum')`.

Hãy xem một vài ví dụ. Trước tiên là hình ảnh và sau đó là dòng code để tạo ra nó.

![image.png](https://images.viblo.asia/5c158125-a1e5-4172-b039-8dbda523ec80.png)

```
Text(
  'Small Caps',
  style: TextStyle(
    fontFeatures: [
      FontFeature.enable('smcp'),
    ],
  ),
),
```

![image.png](https://images.viblo.asia/45e68c33-91da-456e-8a10-b4b9e7fa9d9e.png)

```
Text(
  'Subscript',
  style: TextStyle(
    fontFeatures: [
      FontFeature.enable('subs'),
    ],
  ),
),
```

![image.png](https://images.viblo.asia/7d352a00-2c7c-49c8-9649-b48fdff82506.png)

```
Text(
  'Superscript',
  style: TextStyle(
    fontFeatures: [
      FontFeature.enable('sups'),
    ],
  ),
),
```

![image.png](https://images.viblo.asia/bf34ec64-f638-4d05-95d2-d8a9b1629e19.png)

```
Text(
  '1/2  3/4  27/56',
  style: TextStyle(
    fontFeatures: [
      FontFeature.enable('frac'),
    ],
  ),
),
```

![image.png](https://images.viblo.asia/c42f1143-0da7-46dd-980b-f7a8da114cec.png)

```
Text(
  '你爱我吗',
  style: TextStyle(
    fontFeatures: [
      FontFeature.enable('trad'),
    ],
  ),
),
```

(Ví dụ trên text đã được chuyển đổi chữ Hán giản thể sang chữ phồn thể.)

### 2.6 Kết hợp nhiều Font Features lại với nhau

Như bạn thấy, `fontFeatures` có một danh sách các `FontFeature`. Điều này có nghĩa là bạn có thể kết hợp nhiều hiệu ứng để đi cùng nhau. Tuy nhiên, khi tôi kiểm tra, nó không hoạt động:

![image.png](https://images.viblo.asia/78e3c324-8219-45f8-9c03-f2e8f1dcb5a3.png)

```
Text(
  '1/2 Cup Flour',
  style: TextStyle(
    fontFeatures: [
      FontFeature.enable('frac'),
      FontFeature.enable('smcp'),
    ],
  ),
),
```

Tuy nhiên, bạn vẫn có thể sử dụng nhiều tính năng font chữ nếu bạn sử dụng TextSpans.

![image.png](https://images.viblo.asia/da1ac18e-0ee4-47c6-a302-948a0d9f4e98.png)

```
Text.rich(
  TextSpan(
    children: [
      TextSpan(
        text: '1/2',
        style: TextStyle(
          fontFeatures: [
            FontFeature.enable('frac'),
          ],
        ),
      ),
      TextSpan(
        text: ' Cup Flour',
        style: TextStyle(
          fontFeatures: [
            FontFeature.enable('smcp'),
          ],
        ),
      ),
    ],
  ),
),
```

## Tóm lại:

Tính năng font chữ không tạo ra những thay đổi lớn đối với font chữ của bạn, nhưng chúng có thể rất hữu ích cho một số trường hợp. Gần đây, tôi đã tạo một audio player widget hiển thị thời gian phát hiện tại. Nếu không sử dụng tabularFigures, nó sẽ là một mớ hỗn độn. Tính năng font chữ đã giải quyết được vấn đề.
Nhân tiện, tất cả các font chữ trong hình ảnh ở trên cùng đều là phông chữ của Google.

Bài viết được dịch từ: [Font Features in Flutter](https://suragch.medium.com/font-features-in-flutter-320222fc171d)