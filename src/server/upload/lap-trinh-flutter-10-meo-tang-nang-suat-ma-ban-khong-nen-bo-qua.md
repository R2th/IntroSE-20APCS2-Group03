![image.png](https://images.viblo.asia/48270b6e-dbe9-4b50-a373-b21bd982a7e0.png)

Lập trình Flutter để có được ứng dụng mạnh mẽ là mục tiêu của rất nhiều developer. Dưới đây là một số mẹo và thủ thuật mà mình đã khám phá ra trong ba năm làm ứng dụng và nội dung Flutter. Minh chắc chắn rằng chúng sẽ cải thiện workflow của bạn nếu bạn chưa biết về chúng.

Bài viết được lược dịch từ [https://betterprogramming.pub.](https://betterprogramming.pub/)


## 1. Lập trình Flutter với nhiều Packages

Điều này nghe có vẻ ngược ngạo, nhưng đối với nhiều người, chỉ việc hoàn thành một dự án là bước đầu tiên để bạn có được người dùng thử nghiệm ứng dụng của mình. Theo thời gian, khi ứng dụng được phát hành và bạn nhận được phản hồi tích cực, đó là lúc bạn nên xem qua các package và thay thế chúng bằng code của riêng bạn để có nhiều quyền kiểm soát hơn.

Bạn có thể tìm thấy tất cả các package tại [Pub.dev](https://pub.dev/).

https://200lab.io/blog/flutter-la-gi/

## 2. Hãy tận dụng các đoạn code có sẵn

Trước đây, mình chỉ sử dụng các đoạn code có sẵn (snippet) giống như dùng StatelessWidget. Khi bạn thực sự code cho các tác vụ bạn hay làm đi làm lại, bạn hãy xây dựng các snippet riêng sẽ tiết kiệm được rất nhiều thời gian! Mình sẽ đưa ra một ví dụ về đoạn code. Những thứ này ban đầu đến từ [FilledStacks](https://github.com/filledstacks) và mình đã sử dụng chúng kể từ đó!

Nếu bạn đang sử dụng VSCode, bạn có thể nhấn F1, tìm kiếm “Snippets” và bạn sẽ tìm thấy “Configure user snippets.”. Thêm tệp theo ý thích của bạn và đoạn mã bạn chọn. Dưới đây là đoạn mã thử nghiệm của tôi:

```
{
  "Main Test Suite Setup": {

		"prefix": "testm",
		"body": [
			"import 'package:flutter_test/flutter_test.dart';",
			"",
			"void main() {",
			" group('${1:${TM_FILENAME_BASE/(.*)/${1:/pascalcase}/g}} -', (){",
			"",
			" });",
			"}"
		],
		"description": "Main Test Suite Setup"
	},
	"Test Group Setup": {
		"prefix": "testg",
		"description": "Creates a Test group with a test",
		"body": [
			"group('${1} -', () {",
			" test('${2}', () {",
			"",
			" });",
			"});",
		]
	},
	"Single Test Setup": {
		"prefix": "tests",
		"description": "Creates a single test",
		"body": [
			" test('${1}', () {",
			"",
			" });",
		]
	},
}
```

## 3. Sử dụng linting sớm

Có rất nhiều cách khác nhau để set up linting, nhưng mình chỉ khuyên bạn nên set up lint package vì nó rất rất rất dễ dàng!

* Thêm package vào tệp pubspec.yaml của bạn.
* Tạo tệp analysis_options.yaml.
* Thêm dòng mô tả trong package.

## 4. Sử dụng công cụ (Tooling)

Bạn có thể đã làm điều này, nhưng sẽ dễ dàng hơn khi làm theo mẹo tiếp theo. Bằng cách sử dụng công cụ, bạn sẽ đơn giản hóa được quá trình xây dựng ứng dụng của mình.  Extract Widget chắc là sở thích của mình – và hợp lý.

## 5. Private Widgets

Điều này có thể gây tranh cãi, nhưng cách tiếp cận của mình để giữ code clean và dễ điều hướng là rất đơn giản. Giả sử chúng ta có một  big widget với rất nhiều lồng ghép. Được thôi, hãy tiếp tục và cố gắng gỡ bỏ chúng bằng cách sử dụng Extract Widget.

Để giải quyết vấn đề trên, bạn hãy đặt nó ở chế độ private bằng cách đặt tiền tố với dấu gạch dưới ngay trước tên widget. Những gì bạn cần làm bây giờ chỉ là chuyển code vào phần private này và mọi thứ sẽ trở nên dễ đọc và dễ thay đổi hơn rất nhiều. Bạn không cần phải cố gắng tìm ra cụ thể Container đó dùng để làm gì, vì bây giờ nó đã có một cái tên hay ho rồi.

## 6. App Icon and Splash Screen

![image.png](https://images.viblo.asia/4dd32bc7-f08f-4952-bfd5-c603a8cfff4e.png)

Hai packages sau đây sẽ tiết kiệm thời gian rất lớn cho các dự án của bạn: [Flutter launcher icons](https://pub.dev/packages/flutter_launcher_icons) và[ Flutter Native Splash](https://pub.dev/packages/flutter_native_splash). Mình khuyên bạn nên thử qua chúng vì chúng có các tài liệu tuyệt vời về cách bắt đầu, điều này đã tiết kiệm được rất nhiều thời gian.

## 7. Toán tử nhận biết Null (Null Aware Operators)

Có một loạt các toán tử null-aware khác nhau như ??, ??=, và nhiều cái khác nữa. Dùng chúng sẽ không chỉ làm cho code của bạn trở nên rõ ràng và dễ dàng hơn mà còn đơn giản hóa rất nhiều khi null safety trở nên ổn định trong Flutter.

## 8. Sử dụng lại x.of (context)

Như bạn đã biết, khi bạn muốn sử dụng các theme trong Flutter, bạn cần viết những thứ như Theme.of(context).textTheme.bodyText1. Điều đó là tốt, nhưng nếu bạn phải làm điều đó nhiều lần trong cùng một widget, mình khuyên bạn nên chuyển nó lên hàng đầu của build method. Bạn có thể làm điều đó dễ dàng bằng cách sao chép dòng mình đã viết và đặt nó vào một biến như sau: final theme = Theme.of(context).textTheme. Bây giờ mỗi khi bạn cần theme, bạn chỉ cần viết theme.bodyText1 vào widget của mình.

## 9. debugPrint

Đôi khi chúng ta chỉ cần có thêm nhiều thông tin khi chúng ta đang debugging – đặc biệt là đối với các yêu cầu network. Vì vậy, thay vì sử dụng bản thông thường print(myNetworkData), bạn có thể sử dụng debugPrint(myNetworkData). Điều này sẽ mang lại nhiều dữ liệu mô tả (metadata) hơn cho bạn trong trường hợp bạn cần!

## 10. Single-Responsibility Widget

![image.png](https://images.viblo.asia/520c05de-17a4-44b1-a2e0-a0ee892e2cc4.png)

Nếu bạn biết về các nguyên tắc SOLID, thì điều này có thể đã nghe rất quen thuộc. Với “single-responsibility”, có nghĩ là một widget chỉ được thực hiện một nhiệm vụ duy nhất.

Không tạo ra các mega widget (widget lớn) làm nhiều việc khác nhau. Ví dụ: nếu bạn nhận thấy rằng bạn có một widget bao gồm nhiều widget khác tạo nên custom button của bạn, hãy loại bỏ điều đó. Hãy phân tách nó và biến nó thành từng widget riêng biệt. Điều này sẽ giúp bạn dễ quản lý hơn rất nhiều và bây giờ bạn sẽ dùng được quy tắc duy nhất (single-responsibility) cho các widget tạo nên button đó.

> Bạn có thể xem bài viết đầy đủ tại [200Lab Education](https://200lab.io/blog/lap-trinh-flutter-10-meo-tang-nang-suat/)
>