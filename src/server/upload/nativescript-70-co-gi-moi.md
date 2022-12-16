NativeScript 7.0 đánh dấu một bước tiến quan trọng cho khung công tác bằng cách phù hợp với các tiêu chuẩn JS hiện đại và mang lại tính nhất quán rộng rãi trên toàn bộ ngăn xếp. Nó cũng thống trị trong việc quản lý toàn diện tất cả các mã nguồn mở xung quanh khuôn khổ, cung cấp khả năng cập nhật hiệu quả hơn với các thay đổi của hệ sinh thái JS.
Cài đặt NativeScript 7.0 cli:
```
npm i -g nativescript
```
Bây giờ nó có một vài bí danh cli mới:
* **ns** - tiêu chuẩn mới 
* **nsc** - đối với những người không thể ngừng nghĩ về javac, bạn có thể coi đây là "Trình biên dịch NativeScript"
* **tns** - điều này sẽ luôn hoạt động vì lý do lịch sử

Có một lệnh sạch mới rất tiện lợi và điều này thường trở thành một trở ngại chung của các nhóm phát triển. Điều này giúp đảm bảo các tệp dự án thích hợp được làm sạch khi cần thiết.
```
ns clean
```
LƯU Ý: Nếu thế giới của bạn bị đảo lộn, chỉ cần dọn dẹp từ đây trở đi 🧹😊
Bạn cũng có thể di chuyển các dự án hiện có bằng cách sử dụng:
```
ns migrate
```

LƯU Ý: Luôn kiểm tra các plugin trong dự án của bạn về khả năng tương thích với NativeScript 7 trước khi di chuyển và vui lòng nhận xét về bài đăng đó nếu bạn sử dụng plugin chưa được liệt kê với hỗ trợ và chúng tôi có thể giúp tác giả.

Bạn cũng nên xem hướng dẫn tham chiếu để giúp làm phẳng mọi dự án của bạn có thể đang sử dụng.

Hãy xem xét các yếu tố chính mà 7.0 mang lại cho bảng.

### **From es5 to es2017+**

NativeScript đã nhắm mục tiêu es5 và commonjs ngay từ đầu. Nó đã hoạt động tốt nhưng ngày nay vẫn có những cải tiến đáng được tận dụng.

Nhắm mục tiêu es2017 + cho phép mã nhanh hơn và hiệu suất hơn cùng với việc cho phép bạn sử dụng các cải tiến mới nhất của ES giống như toán tử liên kết Nullish thực sự. Trước đây, TypeScript cho phép bạn sử dụng nhiều tính năng mới nhưng chúng sẽ được chuyển đổi thành mã ES5 và một số khía cạnh có thể thực sự trở thành mã chậm hơn. Công cụ v8 mà NativeScript sử dụng (bây giờ cũng có trên iOS! 🎉) luôn có hỗ trợ tiên tiến cho hỗ trợ ES mới nhất.

Một số gói npm khuôn khổ đã được xác định phạm vi (@nativescript) bao gồm một số plugin để giúp làm rõ và xác định những gì được NativeScript 7 hỗ trợ (các bản dựng dựa trên es2017). Nó cũng giúp ích cho một số tổ chức phụ thuộc dự án mà chúng tôi hằng mong ước.

## **@NativeClass () decorator (chỉ dành cho các dự án dựa trên TypeScript)**

Điều này chỉ bắt buộc nếu bạn sử dụng TypeScript và đang mở rộng một lớp gốc. Nếu bạn đang sử dụng JavaScript thuần túy, bạn có thể sử dụng hàm .extend () như bình thường.

Một trong những tính năng hấp dẫn (và thú vị) với NativeScript là khả năng mở rộng classs nền tảng gốc trực tiếp trong JavaScript. Tuy nhiên, JavaScript không có cách nào biết cách tự mở rộng một lớp gốc. Khi bạn viết **class MyClass extends android.os.class** và nó được biên dịch sang ES5, thời gian chạy đã sử dụng hàm **__extends** để xử lý hành vi. Trong ES2017, mở rộng được hỗ trợ nguyên bản và do đó được biên dịch "nguyên trạng", loại bỏ các **extends** cần thiết cho thời gian chạy.

Đây là một cơ hội hoàn hảo để sử dụng trình trang trí và nhờ Martin Guillon, một cộng tác viên cộng đồng xuất sắc, còn gọi là farfromrefug, chúng tôi đã có thể giới thiệu trình trang trí @NativeClass () để hỗ trợ tại đây.

## **nsconfig.json → nativescript.config.ts**

Có một vài nơi mà cấu hình ứng dụng đã được xử lý và nó xứng đáng được tập trung và đơn giản hóa - cũng như được đánh máy mạnh mẽ!

![](https://images.viblo.asia/0bde5f5f-2ee8-4603-b5b7-532c228d1a54.gif)

Từ lâu đã có một **nativescript key** trong root **package.json**  của bất kỳ ứng dụng nào để quản lý id gói ứng dụng và các phiên bản thời gian chạy. Cũng có một **package.json** khác được nhúng trong thư mục src của ứng dụng chứa các cờ thời gian chạy. Và một tệp khác có tên **nsconfig.json** chứa các cấu hình ứng dụng khác được sử dụng để xác định nhiều thứ khác nhau về dự án.

Trong NativeScript 7, tất cả điều này được hợp nhất thành một **nativescript.config.ts** (hoặc **nativescript.config.js**). Hãy xem một ví dụ:

## **BEFORE**

* nsconfig.json
```
{
  "appResourcesPath": "App_Resources",
  "appPath": "src",
  "webpackConfigPath": "webpack.config.js"
}
```
* src/package.json
```
{
  "main": "app.js",
  "android": {
    "v8Flags": "--nolazy --expose_gc",
    "markingMode": "none",
    "suppressCallJSMethodExceptions": false
  },
  "discardUncaughtJsExceptions": false
}
```
* package.json
```
{
  "nativescript": {
    "id": "com.company.app",
    "tns-android": {
      "version": "6.5.3"
    },
    "tns-ios": {
      "version": "6.5.2"
    	}
  },
  ...
```

## **AFTER**

* nativescript.config.ts
```
import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'com.company.app',
  main: 'app.js',
  appResourcesPath: 'App_Resources',
  webpackConfigPath: 'webpack.config.js',
  ios: {
    discardUncaughtJsExceptions: true
  },
  android: {
    discardUncaughtJsExceptions: true,
    v8Flags: '--nolazy --expose_gc',
    "markingMode": "none",
    "suppressCallJSMethodExceptions": false
  }
} as NativeScriptConfig;
```

Giờ đây, các phiên bản thời gian chạy có thể được quản lý đơn giản như người ta mong đợi trong devDependencies:

```
"devDependencies": {
  "@nativescript/android": "~7.0.0",
  "@nativescript/ios": "~7.0.0"
}
```

## **Công cụ v8 IOS**

Thời gian chạy Android của NativeScript đã chạy **JavaScript v8** được một thời gian, tuy nhiên thời gian chạy iOS đã sử dụng **JavaScriptCore** suốt thời gian qua. Điều này dẫn đến một số khác biệt nhỏ trong cách mỗi thời gian chạy hoạt động.

Trong NativeScript 7, lần đầu tiên, thời gian chạy iOS mặc định hiện đang sử dụng cùng một công cụ v8 với **@ nativescript / ios**. Điều này cũng giúp cải thiện việc duy trì cả hai thời gian chạy.

> Lưu ý: Bạn vẫn có thể sử dụng thời gian chạy **tns-io**s dựa trên JavaScriptCore nếu bạn thấy rằng công cụ v8 mới có vấn đề. Bạn cũng có thể sử dụng **tns-android** cho vấn đề đó nếu bạn cũng cần sử dụng thời gian chạy android cũ hơn.

## **Tôi nên sử dụng phiên bản phụ thuộc nào cho NativeScript 7?**

```
"dependencies": {
	"@nativescript/core": "~7.0.0"
},
"devDependencies": {
  "@nativescript/android": "~7.0.0",
  "@nativescript/ios": "~7.0.0",
	"@nativescript/types": "~7.0.0",
  "@nativescript/webpack": "~3.0.0",
	"typescript": "~3.9.0"
}
```

Với **@ nativescript / type** mới, bạn thực sự có thể đơn giản hóa **references.d.ts** của mình cho điều này nếu bạn muốn cả khai báo kiểu iOS và Android:

```
/// <reference path="./node_modules/@nativescript/types/index.d.ts" />
```

Bạn cũng có thể bao gồm các loại nền tảng cụ thể nếu cần nếu bạn muốn; ví dụ: giả sử bạn muốn các loại sdk Android khác nhau cùng với các loại iOS:

```
/// <reference path="./node_modules/@nativescript/types-ios/index.d.ts" />
/// <reference path="./node_modules/@nativescript/types-android/lib/android-29.d.ts" />
```

Tham khảo tại: ttps://nativescript.org/blog/nativescript-7-announcement/